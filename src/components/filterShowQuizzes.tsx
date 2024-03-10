export function Filters({setSelectedRegister}:any) {
  return (
    <div className="flex flex-row-reverse">
      <div className=" flex items-center">

      <div className="dashboardCards_add" onClick={(e)=>setSelectedRegister(-1)}>
        <svg width="15" height="15" viewBox="0 0 15 15">
          <path
            d="M7.5 0L7.5 15M0 7.5L15 7.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
        Add Quiz
      </div>
      </div>

      <div className=" flex-auto flex  flex-col">
        <div className=" flex gap-5 text-center">
          <div className="m-1 border rounded-md p-2">Class selection</div>
          <div className="m-1 border rounded-md p-2">Module selection</div>
          <div className="m-1 border rounded-md p-2">Chapter selection</div>
          <div className="border ml-auto rounded-full m-1 p-2">Reset Filters</div>
        </div>

        <div className=" flex gap-5 text-center">
          <div className=" border m-1 rounded-full flex-auto p-2 ">Here ID input</div>
          <div className=" border m-1 rounded-full p-2 ">Search button </div>
        </div>
      </div>
    </div>
  );
}
