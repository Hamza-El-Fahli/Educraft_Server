"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.css";
import { useState } from "react";

const navLinks: { name: string; href: string }[] = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
  { name: "Forgot-Password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  const [input, setinput] = useState("");

  return (
    <>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
      </div>
      {navLinks.map((nav) => {
        const isActive = currentPath.startsWith(nav.href);

        return (
          <Link
            href={nav.href}
            key={nav.name}
            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
          >
            {nav.name}
          </Link>
        );
      })}
      {children}
    </>
  );
}
