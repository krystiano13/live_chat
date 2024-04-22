export function Register() {
    return (
        <section className="section w-full h-full flex justify-center items-center">
            <form className="max-w-[95vw] md:max-w-auto flex flex-col gap-12 bg-blue-950 bg-opacity-50 p-6 pt-12 pb-12 rounded-lg">
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
            </form>
        </section>
    )
}