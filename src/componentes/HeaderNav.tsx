export default function HeaderNav({ activeView } : {activeView:string}) {
    
    return (
        <nav className="mx-auto h-full bg-secondary col-span-10 grid grid-cols-5 gap-4">
  <div className="col-span-1">User</div>
  <div className="col-span-3">Search</div>
  <div className="col-span-1 overflow-hidden">n</div>
</nav>
    );
  }
  