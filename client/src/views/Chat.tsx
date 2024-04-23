import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    loggedIn: boolean,
    accessToken: string
}

export const Chat:React.FC<Props> = ({ loggedIn, accessToken }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<string[]>([]);

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
                setMessages(data.messages);
                return data;
            })
        }
    }

    function createSocket() {
        const socketURL:string = "ws://localhost:3000/cable";
        const socket = new WebSocket(socketURL);

        socket.onopen = function(event) {
            const msg = {
                command: "subscribe",
                identifier: JSON.stringify({ 
                    id: 1,
                    channel: "messages_channel"
                })
            }
            socket.send(JSON.stringify(msg));
        }

        socket.onmessage = function(event) {     
            if(event.data.message) {
                getMessages();
            }
        }
    }

    useEffect(() => {
        if(!loggedIn) {
            navigate("/login");
        }
        createSocket();
    }, [loggedIn]);

    return <></>
}