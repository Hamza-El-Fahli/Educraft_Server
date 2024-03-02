export default function SideNav({ activeView } : {activeView:string}) {
  const navs = [
    {
      name: "dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },
  ];

  return (
    <nav className=" h-full w-full  col-span-2 row-span-8 p-3">
      <ul className="w-full p-5 flex flex-col bg-secondary rounded-md">
        {/* ▼ List All Nav with acriveView as the crrent selected nac ▼ */}
        {navs.map((nav, index) =>
          nav.name == activeView ? (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: nav.logo + nav.title }}
              className=" text-center rounded-md py-1.5 pl-4 text-firstBlue border border-firstBlue flex flex-row items-center gap-5"
            />
          ) : (
            <li key={index} className="text-center rounded-md py-3">{nav.title}</li>
          )
        )}
                {/* ▲ List All Nav with acriveView as the crrent selected nac ▲ */}

      </ul>
    </nav>
  );
}
