import React, { useState } from "react";

interface Props {
    setAccessToken: (token:string) => void,
    setOwner: (owner:string) => void,
    setLoggedIn: (value:boolean) => void
}

export const Register:React.FC<Props> = ({ setAccessToken, setLoggedIn, setOwner }) => {
    const [errors, setErrors] = useState<string[]>([]);
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        if(formData.get("password") !== formData.get("password_confirmation")) {
            setErrors(["Password fields are not the same"]);
            return;
        }

        fetch("http://127.0.0.1:3000/users/tokens/sign_up", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if(data.error_description) {
                    setErrors(data.error_description as string[])
                }
                else {
                    setErrors([]);
                    setAccessToken(data.token);
                    setOwner(data.resource_owner.email);
                    setLoggedIn(true);
                    localStorage.setItem("refresh_token", data.refresh_token);
                }
            })
    }
    return (
        <section className="section w-full h-full flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-[95vw] md:w-96 flex flex-col gap-12 bg-blue-950 bg-opacity-50 p-6 pt-12 pb-12 rounded-lg">
                <input
                    className="outline-0 transition-colors focus:border-b-blue-700 bg-gray-900 text-white p-2 text-lg border-b-2 border-b-blue-800"
                    placeholder="Email address"
                    name="email"
                    type="text"
                />
                <input
                    className="outline-0 transition-colors focus:border-b-blue-700 bg-gray-900 text-white p-2 text-lg border-b-2 border-b-blue-800"
                    placeholder="Password"
                    name="password"
                    type="password"
                />
                <input
                    className="outline-0 transition-colors focus:border-b-blue-700 bg-gray-900 text-white p-2 text-lg border-b-2 border-b-blue-800"
                    placeholder="Confirm password"
                    name="password_confirmation"
                    type="password"
                />
                <button
                    className="hover:bg-blue-700 transition-colors w-full text-white bg-blue-800 p-2 pl-6 pr-6 cursor-pointer font-medium text-lg"
                    type="submit"
                >
                    Create Account
                </button>
                {
                    errors.map(item => (
                        <p className="text-red-500 font-medium text-lg">{ item }</p>
                    ))
                }
            </form>
        </section>
    )
}