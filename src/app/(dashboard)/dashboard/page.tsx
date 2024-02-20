export default function Dashboard() {
  return (
    <div className="border grid grid-cols-12 grid-rows-12 h-screen text-white text-4xl">
      <div className="border h-full w-full bg-gray-800 col-span-12">header</div>
      <nav className="border h-full w-full bg-gray-800 col-span-2 row-span-10">nav</nav>
      <main className="border h-full w-full bg-gray-800 col-span-10 row-span-10">main</main>

      <footer className="border h-full w-full bg-gray-800 col-span-12">footer</footer>
    </div>
  );
}
