export default function SideNav({ activeView } : {activeView:string}) {
  const navs = [
    {
      name: "dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "users management",
      title: "Users Management",
      logo: `<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#2F80ED"/></svg>
      `,
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
              className=" cursor-pointer text-center rounded-md py-1.5 pl-4 text-firstBlue border border-firstBlue flex flex-row items-center gap-5"
            />
          ) : (
            <li key={index} className=" cursor-pointer text-center rounded-md py-3">{nav.title}</li>
          )
        )}
                {/* ▲ List All Nav with acriveView as the crrent selected nac ▲ */}

      </ul>
    </nav>
  );
}
