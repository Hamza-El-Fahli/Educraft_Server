"use client"
import SideNav from "@/components/sidenav";
import HeaderNav from "@/components/HeaderNav";
import Copyright from "@/components/CopyRight";
import Charts from "@/components/Charts";

export default function Dashboard() {
  return (
    <div className="col-span-4">
      {/* Charts component */}
      <Charts />
      
    </div>
  );
}
