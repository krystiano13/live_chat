import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { Login } from "./views/Login.tsx";
import { Register } from "./views/Register.tsx";
import { Navbar } from "./components/Navbar.tsx";
import "./App.css"


function App() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [owner, setOwner] = useState<string>("");

    const auth = () => {
        if(!localStorage.getItem("refresh_token")) {
            setAccessToken("");
            setOwner("");
            setLoggedIn(false);
            localStorage.removeItem("refresh_token");
            return;
        }
        fetch("http://127.0.0.1:3000/users/tokens/refresh", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("refresh_token") as string}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    setLoggedIn(true);
                    setAccessToken(data.token);
                    setOwner(data.resource_owner.email);
                    localStorage.setItem("refresh_token", data.refresh_token);
                }
            })
    }

    useEffect(auth, []);

    return (
        <main className="w-[100vw] h-[100vh] bg-gray-800 flex flex-col">
            <BrowserRouter>
                <Navbar setLoggedIn={(value:boolean) => setLoggedIn(value)} setOwner={(owner:string) => setOwner(owner)}  setAccessToken={(token:string) => setAccessToken(token)} loggedIn={loggedIn} />
                <Routes>
                    <Route path="/" element={<Login setLoggedIn={(value:boolean) => setLoggedIn(value)} setOwner={(owner:string) => setOwner(owner)}  setAccessToken={(token:string) => setAccessToken(token)} />} />
                    <Route path="/register" element={<Register setLoggedIn={(value:boolean) => setLoggedIn(value)} setOwner={(owner:string) => setOwner(owner)}  setAccessToken={(token:string) => setAccessToken(token)} />} />
                </Routes>
            </BrowserRouter>
        </main>
  )
}

export default App
