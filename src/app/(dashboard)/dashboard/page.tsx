import Image from "next/image";
import SideNav from "@/components/sidenav";
import HeaderNav from "@/components/HeaderNav";
import Copyright from "@/components/CopyRight";
import Charts from "@/components/Charts";
export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      <HeaderNav activeView="dashboard" />
      <SideNav activeView="dashboard" />
      <Charts />
     <Copyright />
    </div>
  );
}
