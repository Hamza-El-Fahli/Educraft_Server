export default function HeaderNav({ activeView } : {activeView:string}) {
    
    return (
        <nav className=" h-full w-full bg-secondary col-span-5 grid grid-cols-5">
            <div className="col-span-1">User</div>
            <div className="col-span-3">Search</div>
            <div className="overflow-hidden">n</div>
      </nav>
    );
  }
  