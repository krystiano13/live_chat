import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    loggedIn: boolean,
    accessToken: string,
    owner: string
}

const socketURL:string = "ws://127.0.0.1:3000/cable";
const socket = new WebSocket(socketURL);

export const Chat:React.FC<Props> = ({ loggedIn, accessToken, owner }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<string[]>([]);
    const [guid, setGuid] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    socket.onopen = function(event) {
        console.log("Connected to websocket server");

        const msg = JSON.stringify({
            command: "subscribe",
            identifier: JSON.stringify({
              id: Math.random().toString(36).substring(2,15),
              channel: "MessagesChannel",
            }),
        })

        socket.send(msg);
    }

    socket.onmessage = function(event) {   
        const data = JSON.parse(event.data);
        const message = data.message;  

        if(typeof message === "object") {
            setMessages(message.messages)
        }
    }

    socket.onerror = (err) => console.log(err)

    function sendMessage(user:string, text:string) {
        if(accessToken) {
            fetch('http://127.0.0.1:3000/create', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/JSON"
                },
                body: JSON.stringify({ message: { user: user, text: text } })
            })
            .then(res => res.json())    
            .then(data => data)     
            }
    }

    function getMessages() {
        if(accessToken) {
            fetch('http://127.0.0.1:3000/all', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setMessages([...data.messages]);
                return data;
            })
        }
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const text = formData.get("text") as string;

        sendMessage(owner,text);
        getMessages();
        
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    useEffect(() => {
        if(!loggedIn) {
            navigate("/login");
        }
    }, [loggedIn]);

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <section className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col justify-between">
                <div className="w-[90vw] md:w-[45rem] min-h-[30rem] bg-slate-600 bg-opacity-25 rounded-t-lg">
                    {
                        messages.map(item => (
                            <p className="text-white font-normal text-lg">{ item.text }</p>
                        ))
                    }
                </div>
                <form onSubmit={handleSubmit} className="w-full bg-slate-700 bg-opacity-25 h-[5rem] flex items-center justify-center">
                    <input ref={inputRef} name="text" placeholder="Your message ..." />
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    )
}