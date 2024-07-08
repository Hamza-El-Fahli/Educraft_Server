"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLogout } from "@/hooks/useLogout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchComponent from "./SearchComponent";

export default function HeaderNav({ activeView }: { activeView: string }) {
  const router = useRouter();
  const logoutHook = useLogout();
  const user = useCurrentUser()
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
          {user && user.name+'     (Logout)'}    
        </span>
        <span>▼</span>
      </div>
      <div className="headerNav_search"><SearchComponent /></div>
      <div className="headerNav_notification">
        <img style={{height:"80%"}} src="./notification-bell-svgrepo-com.png" alt="" />
      </div>
    </nav>
  );
}
