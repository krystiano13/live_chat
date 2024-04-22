import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { Login } from "./views/Login.tsx";
import { Register } from "./views/Register.tsx";
import { Chat } from "./views/Chat.tsx";

import { Navbar } from "./components/Navbar.tsx";
import "./App.css"


function App() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [owner, setOwner] = useState<string>("");

    return (
        <main className="w-[100vw] h-[100vh] bg-gray-800 flex flex-col">
            <BrowserRouter>
                <Navbar setLoggedIn={(value:boolean) => setLoggedIn(value)} setOwner={(owner:string) => setOwner(owner)}  setAccessToken={(token:string) => setAccessToken(token)} loggedIn={loggedIn} />
                <Routes>
                    <Route path="/" element={<Chat loggedIn={loggedIn} />} /><Route path="/" element={<Chat loggedIn={loggedIn} />} />
                    <Route path="/login" element={<Login setLoggedIn={(value:boolean) => setLoggedIn(value)} setOwner={(owner:string) => setOwner(owner)}  setAccessToken={(token:string) => setAccessToken(token)} />} />
                    <Route path="/register" element={<Register setLoggedIn={(value:boolean) => setLoggedIn(value)} setOwner={(owner:string) => setOwner(owner)}  setAccessToken={(token:string) => setAccessToken(token)} />} />
                </Routes>
            </BrowserRouter>
        </main>
  )
}

export default App
