import Image from "next/image";
import SideNav from "@/componentes/sidenav";
export default function Dashboard() {
  return (
    <div className=" grid grid-cols-12 grid-rows-12 h-screen text-white  gap-2 bg-primary">
      <div className=" h-full w-full bg-secondary col-span-12 grid grid-cols-12 ">
        <div className="col-span-2">User</div>
        <div className="col-span-9">Search</div>
        <div className="overflow-hidden">n</div>
      </div>
      <SideNav activeView="dashboard" />
      <main className=" h-full w-full col-span-10 row-span-11 grid grid-cols-5 grid-rows-2 gap-3 p-3">
        <div className="col-span-2 h-full w-full bg-third col-start-5 row-start-1">
          ADD
        </div>
        <div className="col-span-2 h-full w-full bg-secondary">
          Platform users
        </div>
        <div className="col-span-2 h-full w-full bg-secondary">
          Active users
        </div>
        <div className="col-span-2 h-full w-full bg-secondary">
          Most tanked Student
        </div>
        <div className="col-span-2 h-full w-full bg-secondary">
          Recent added Courses
        </div>
      </main>
      <nav className=" h-full w-full col-span-2 row-span-3 flex items-end justify-center ml-1">
        <footer className="bg-secondary w-full p-1 m-3 text-center rounded-md">
          <div className="uppercase font-bold">Educraft</div>
          <div className="text-gray-500 mt-3">Version : 1.0.0</div>
        </footer>
      </nav>
    </div>
  );
}
