import Image from "next/image";
import SideNav from "@/componentes/sidenav";
import HeaderNav from "@/componentes/HeaderNav";
import Copyright from "@/componentes/CopyRight";
import Charts from "@/componentes/Charts";
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
