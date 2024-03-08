import SideNav from "@/components/sidenav";
import HeaderNav from "@/components/HeaderNav";
import Copyright from "@/components/CopyRight";
import Charts from "@/components/Charts";

export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      {/* Header navigation component */}
      <HeaderNav activeView="dashboard" />
      
      {/* Side navigation component */}
      <SideNav activeView="dashboard" />
      
      {/* Charts component */}
      <Charts />
      
      {/* Copyright component */}
      <Copyright />
    </div>
  );
}
