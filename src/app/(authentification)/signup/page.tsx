"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [Loading, setLoading] = useState(true);

  const [name, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handlesubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/api/users`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    // console.log(res);
  }

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => handlesubmit(e)}
        className="bg-opacity-20 backdrop-filter  bg-white  shadow-md rounded-lg px-10 py-8 mb-4 flex flex-col w-96"
      >
        <h1 className="text-center text-2xl font-bold text-blue-500 mb-6">
          Sign Up
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            value={name}
            onChange={(e) => setusername(e.target.value)}
            className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
