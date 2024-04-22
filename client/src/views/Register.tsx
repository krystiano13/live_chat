import React from "react";
import { AuthForm } from "../components/AuthForm.tsx";

interface Props {
    setAccessToken: (token:string) => void,
    setOwner: (owner:string) => void,
    setLoggedIn: (value:boolean) => void
}

export const Register:React.FC<Props> = ({ setAccessToken, setLoggedIn, setOwner }) => {
    return (
        <section className="section w-full h-full flex justify-center items-center">
           <AuthForm
               mode="register"
               setAccessToken={setAccessToken}
               setLoggedIn={setLoggedIn}
               setOwner={setOwner}
           />
        </section>
    )
}