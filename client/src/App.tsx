import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./views/Login.tsx";
import { Register } from "./views/Register.tsx";
import { Navbar } from "./components/Navbar.tsx";
import "./App.css"

function App() {
  return (
    <main className="w-[100vw] h-[100vh] bg-gray-800 flex flex-col">
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </main>
  )
}

export default App
