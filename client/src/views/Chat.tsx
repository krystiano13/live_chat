import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../components/Message";

interface Props {
  loggedIn: boolean;
  accessToken: string;
  owner: string;
}

interface Message {
  user: string;
  text: string;
}

const socketURL: string = "ws://127.0.0.1:3000/cable";
const socket = new WebSocket(socketURL);

export const Chat: React.FC<Props> = ({ loggedIn, accessToken, owner }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  socket.onopen = function () {
    console.log("Connected to websocket server");

    const msg = JSON.stringify({
      command: "subscribe",
      identifier: JSON.stringify({
        id: Math.random().toString(36).substring(2, 15),
        channel: "MessagesChannel",
      }),
    });

    socket.send(msg);
  };

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const message = data.message;

    if (typeof message === "object") {
      setMessages(message.messages);
    }
  };

  socket.onerror = (err) => console.log(err);

  function sendMessage(user: string, text: string) {
    if (accessToken) {
      fetch("http://127.0.0.1:3000/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ message: { user: user, text: text } }),
      })
        .then((res) => res.json())
        .then((data) => data);
    }
  }

  function getMessages() {
    if (accessToken) {
      fetch("http://127.0.0.1:3000/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages([...data.messages]);
          return data;
        });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;

    sendMessage(owner, text);
    getMessages();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-between">
        <div
          id="messages"
          ref={messagesRef}
          className="w-[90vw] md:w-[45rem] overflow-y-auto p-5 h-[30rem] bg-slate-600 bg-opacity-25 rounded-t-lg"
        >
          {messages.map((item) => (
            <>
              <Message user={item.user} text={item.text} owner={owner} />
            </>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[90vw] md:w-full p-3 bg-slate-700 bg-opacity-25 h-[5rem] flex items-center justify-center"
        >
          <input
            ref={inputRef}
            name="text"
            placeholder="Your message ..."
            className="box-border p-1.5 bg-slate-900 text-white border-b-solid border-b-2 border-b-blue-600 outline-none text-sm md:text-base"
          />
          <button
            type="submit"
            className="border-b-solid border-b-2 border-b-blue-600 box-border text-sm md:text-base p-1.5 pl-6 pr-6 text-white bg-blue-600 cursor-pointer hover:bg-blue-500 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};
