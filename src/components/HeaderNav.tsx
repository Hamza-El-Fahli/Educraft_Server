"use client";
import { useLogout } from "@/hooks/useLogout";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeaderNav({ activeView }: { activeView: string }) {
  const router = useRouter();
  const logoutHook = useLogout();
  const logout = () => {
    logoutHook.logout();
    router.push("/");
  };
  return (
    <nav className="headerNav">
      <div className="headerNav_user" onClick={(e) => logout()}>
        <Image
          className="rounded-full"
          src="/avatars/F_2.jpg"
          alt="My image description"
          width={35} // Optional: Set width
          height={35} // Optional: Set height
        />
        <span>
          Mr Whigga <br /> (white nigga)
        </span>
        <span>▼</span>
      </div>
      <div className="headerNav_search">Search</div>
      <div className="headerNav_notification">n</div>
    </nav>
  );
}
