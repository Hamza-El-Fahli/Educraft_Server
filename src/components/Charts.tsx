export default function Charts() {
  return (
    <>
      <main className="dashboardCards">
        <div className="dashboardCards_add">
        <svg width="15" height="15" viewBox="0 0 15 15">
    <path d="M7.5 0L7.5 15M0 7.5L15 7.5" fill="none" stroke="#fff" strokeWidth="2" />
</svg>


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
    </>
  );
}
