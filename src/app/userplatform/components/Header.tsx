"use client";
import React from "react";
import "@/styles/dropdown.css";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
export const Header = () => {
  const user = useCurrentUser();

  const router = useRouter();
  const logoutHook = useLogout();
  const logout = () => {
    logoutHook.logout();
    router.push("/");
  };
  return (
    <header className="sticky top-0 bg-primary bg- w-full flex px-36 py-2 text-white justify-between items-center z-10 ">
      <button
        className="absolute left-5 text-white text-2xl"
        onClick={() => router.back()}
      >
        &#60;
      </button>
      <a href="/">
        <img src="/WhiteLogo.png" className="h-8" />
      </a>

      <nav className="sub-menu-parent" tab-index="0">
        <span className="flex items-center gap-3">
          <span className="text-left text-md font-bold">
            {user?.name}
            <br />
            <h6 className="text-xs">{/* Two lines */}</h6>
          </span>
          <img src="/avatars/M_1.jpg" className="h-8 rounded-full " />
        </span>
        <ul className="sub-menu">
          <li className="">
            <a href="#">Parametres</a>
          </li>
          <li>
            <a href="#" onClick={(e) => logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
