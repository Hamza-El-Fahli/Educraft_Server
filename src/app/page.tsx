"use client"
import { useRouter } from "next/navigation";

export default function Hello() {
  const route = useRouter()
  route.push('/login')
  // return <h1 className="text-2xl">Hiiii</h1>;
}
