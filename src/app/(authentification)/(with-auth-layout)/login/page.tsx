"use client";

export default function Login() {
  if (Math.random() * 5 > 3) throw new Error("wrong login detected");
  return <h1>Login</h1>;
}
