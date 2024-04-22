import { NavLink } from "react-router-dom";

interface Props {
    loggedIn: boolean
}

export const Navbar:React.FC<Props> = ({ loggedIn }) => {
    return (
        <nav className="fixed p-5" >
            <section id="navigation" className="relative flex gap-5 items-center justify-start">
                <NavLink to="/">
                    <h1 className="font-bold text-xl text-white cursor-pointer">LiveChat</h1>
                </NavLink>
                {
                    loggedIn &&
                    <NavLink className="text-white font-medium text-lg" to="/chat">Chat</NavLink>
                }
                {
                    !loggedIn && <>
                        <NavLink className="text-white font-medium text-lg" to="/">Log In</NavLink>
                        <NavLink className="text-white font-medium text-lg" to="/register">Register</NavLink>
                    </>
                }
                {
                    loggedIn &&
                    <NavLink className="text-white font-medium text-lg" to="/logout">Log Out</NavLink>
                }
            </section>
        </nav>
    )
}