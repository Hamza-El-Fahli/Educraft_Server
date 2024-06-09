"use client";
import React, { useState } from "react";
import API_Documentation from "./content";

function Documentation() {
  return (
    <div className="min-h-dvh border flex flex-col relative">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

function Header() {
  return <header className="border flex flex-col justify-center items-center text-3xl font-bold h-20  bg-slate-400">E-Learning Platforme Documentation</header>;
}

const SideNavItem = ({ item }: { item: ItemType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="p-2 hover:bg-gray-700 cursor-pointer flex justify-between items-center"
        onClick={handleToggle}
      >
        <span>{item.title}</span>
        {item.children && <span>{isOpen ? "-" : "+"}</span>}
      </div>
      {isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child:ItemType, index:number) => (
            <SideNavItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const SideNav = ({ items }: { items: ItemType[] }) => {
  return (
    <div className="w-56 bg-gray-800 text-white h-lvh overflow-y-auto sticky top-0 mr-1">
      <div className="p-4 text-lg font-bold">Menu</div>
      <div className="mt-2">
        {items.map((item, index) => (
          <SideNavItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

function Body() {
  return (
    <div className="border flex ">
      <SideNav  items={navItems} />
      <main className=" border w-full">
        <API_Documentation /> 
      </main>
    </div>
  );
}

function Footer() {
  return <footer className="self-end absolute bottom-0">footer</footer>;
}

export default Documentation;

type ItemType = any;
// src/data.js
export const navItems = [
  {
    title: "API Documentation",
    children: [
      {
        title: "Users API",
        children: [
          { title: "Create User" },
          { title: "Authentication" },
          { title: "Get User Data" },
          { title: "Update User" },
          { title: "Remove User" },
        ],
      },
      {
        title: "Courses API",
        children: [
          { title: "Create Courses" },
          { title: "Get Courses" },
          { title: "Update Courses" },
          { title: "Delete Courses" },
        ],
      },
      {
        title: "Modules API",
        children: [
          { title: "Create Modules" },
          { title: "Get Modules" },
          { title: "Update Modules" },
          { title: "Delete Modules" },
        ],
      },
      {
        title: "Chapters API",
        children: [
          { title: "Create Chapters" },
          { title: "Get Chapters" },
          { title: "Update Chapters" },
          { title: "Delete Chapters" },
        ],
      },
      {
        title: "Quizzes API",
        children: [
          { title: "Create Quizzes" },
          { title: "Get Quizzes" },
          { title: "Update Quizzes" },
          { title: "Delete Quizzes" },
        ],
      },
          ],
  },
];
