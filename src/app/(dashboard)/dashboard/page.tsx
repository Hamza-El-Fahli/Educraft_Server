import Image from "next/image";

export default function Dashboard() {
  return (
    <div className=" grid grid-cols-12 grid-rows-12 h-screen text-white  gap-2 bg-primary">
      <div className=" h-full w-full bg-secondary col-span-12 grid grid-cols-12 ">
        <div className="col-span-2">User</div>
        <div className="col-span-9">Search</div>
        <div className="overflow-hidden">n</div>
      </div>
      <nav className=" h-full w-full  col-span-2 row-span-8 p-3">
        <ul className="w-full p-5 flex flex-col bg-secondary rounded-md">
          <li className=" text-center rounded-md py-1.5 pl-4 text-firstBlue border border-firstBlue flex flex-row items-center gap-5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z"
                fill="#2F80ED"
              />
            </svg>
            Dashboard
          </li>
          <li className=" text-center rounded-md py-3">Dashboard</li>
          <li className=" text-center rounded-md py-3">Dashboard</li>
          <li className="text-center rounded-md py-3  ">Dashboard</li>
          <li className="text-center rounded-md py-3  ">Dashboard</li>
          <li className="text-center rounded-md py-3  ">Dashboard</li>
          <li className="text-center rounded-md py-3  ">Dashboard</li>
        </ul>
      </nav>
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
