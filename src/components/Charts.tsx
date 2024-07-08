import LoginChart from "@/app/(dashboard)/dashboard/charts/LoginChart";
import PieChart from "@/app/(dashboard)/dashboard/charts/PieChart"; 
import NewStudentsChart from "@/app/(dashboard)/dashboard/charts/NewStudentsChart"
import CourseList from "@/app/(dashboard)/dashboard/charts/CourseListChart";
export default function Charts() {

  return (
    <>
      <main className="dashboardCards">
        <div className="dashboardCards_add">
        <svg width="15" height="15" viewBox="0 0 15 15">
    <path d="M7.5 0L7.5 15M0 7.5L15 7.5" fill="none" stroke="#fff" strokeWidth="2" />
</svg>


           Ajouter
        </div>
         
    <div className="col-span-2 h-full max-h-80 w-full bg-secondary">
    <LoginChart />
    </div>

    <div className="col-span-2 h-full w-full max-h-80 bg-secondary flex justify-center items-center">
    <PieChart />
    </div>
        

    <div className="col-span-2 h-full w-full max-h-80 bg-secondary">
    <NewStudentsChart />
    </div>
        

    <div className="col-span-2 h-full w-full max-h-80 bg-secondary">
    <CourseList />
    </div>
        

        
      </main>
    </>
  );
}
