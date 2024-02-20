import Link from "next/link";

export default function Signup() {
    return (
        <div className="bg-gray-200 flex justify-center items-center h-screen">
        <div className="bg-opacity-20 backdrop-filter  bg-white  shadow-md rounded-lg px-10 py-8 mb-4 flex flex-col w-96">
            <h1 className="text-center text-2xl font-bold text-blue-500 mb-6">Sign Up</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign Up
            </button>
            <p className="mt-4 text-center">
                Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
            </p>
        </div>
    </div>
    )
    
}