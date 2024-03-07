"use client"

import { useRouter } from "next/navigation";

export default function SideNav({ activeView } : {activeView:string}) {
  const navs = [
    {
      name: "dashboard",
      link: "/dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "users management",
      link: "/users",
      title: "Users Management",
      logo: `<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#2F80ED"/></svg>
      `,
    },

    {
      name: "courses management",
      link: "/courses",
      title: "courses management",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "modules management",
link : "/modules",
      title: "Modules Management",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
link : "/dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },

    {
      name: "Dashboard",
link : "/dashboard",
      title: "Dashboard",
      logo: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#2F80ED" /> </svg>`,
    },
  ];
  const router = useRouter();

  return (
    <nav className="SideNav">
      <ul >
        {/* ▼ List All Nav with acriveView as the crrent selected nac ▼ */}
        {navs.map((nav, index) =>
          nav.name == activeView ? (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: nav.logo + nav.title }}
              className="Sidenav_selected"
            />
          ) : (
            <li             onClick={()=>{router.push(nav.link)}}
            key={index} className="Sidenav_unselected">{nav.title}</li>
          )
        )}
                {/* ▲ List All Nav with acriveView as the crrent selected nac ▲ */}

      </ul>
    </nav>
  );
}
