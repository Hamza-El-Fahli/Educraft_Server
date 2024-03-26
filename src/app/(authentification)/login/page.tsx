"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
}

export default function Login(): JSX.Element {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    }; 

    const name = target.username.value;
    const password = target.password.value;

    try {
      const checkUserCall = await axios.post<User>(`http://localhost:3000/api/users`, { name, password });
      const checkUser = checkUserCall.data;

      if (checkUser.hasOwnProperty('_id')) {
        router.push("/dashboard");
      } else {
      }
    } catch (error:any) {
      const responseError = error.response.data.error.toLowerCase()
      console.error('Error during login:', responseError.search('user'));
      
      document.getElementById("usernameError")?.classList.add('hidden');
      document.getElementById("passwordError")?.classList.add('hidden');
      if( responseError.search('user')!=-1) document.getElementById("usernameError")?.classList.remove('hidden');
      if( responseError.search('pass')!=-1) document.getElementById("passwordError")?.classList.remove('hidden');

      // Handle error, show error message, etc.
    }
  };


  return (
    <div className="bg-primary flex justify-center items-center  h-screen">
      <form className=" backdrop-filter  bg-third bg-opacity-30 shadow-md rounded-lg px-10 py-8 mb-4 flex flex-col w-96"
      onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold text-firstBlue mb-6">
          Login
        </h1>
        <div className="mb-4"> 
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            required
          />
          <label id="usernameError" className="hidden text-red-800">Email/Username incorrect</label>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-400 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-opacity-20 backdrop-filter  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          /> 
                   <label id="passwordError" className="hidden text-red-800">Password incorrect</label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <p className="mt-4 text-center text-gray-500  cursor-default">
          Don't have an account?{" "}
          <Link href="/signup" className="text-third font-bold hover:underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
