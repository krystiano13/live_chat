import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    loggedIn: boolean
}

export const Chat:React.FC<Props> = ({ loggedIn }) => {
    const navigate = useNavigate();

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
            console.log(event.data)
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