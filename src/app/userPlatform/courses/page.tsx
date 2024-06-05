import CourseCard from "../components/CourseCard";
import { Header } from "../components/Header";

export default function User_courses() {
    return (
        <div className=" h-svh w-full flex  flex-col " style={{background:'url(/networking-bg.png)'}} >
            <Header />
            <main className="w-full h-full  ">
                <div className="w-full flex gap-10 text-white pt-10 bg-secondary/50">
                    <nav className="bg-[#1F233A] w-auto px-10 py-2 flex justify-center items-center rounded-t-full">Reaseax Informatiques</nav>
                    <nav className="bg-[#1F233A] w-auto px-10 py-2 flex justify-center items-center rounded-t-full">SE Open Source</nav>
                    <nav className="bg-[#1F233A] w-auto px-10 py-2 flex justify-center items-center rounded-t-full">Gestion Des Bases De donnees</nav>
                </div>
                <div className="h-full flex flex-col space-y-8 px-10 pt-10  bg-secondary/50 text-white">
                    <div><h1>Reaseax Informatiques</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam recusandae voluptatem error repellendus ut aspernatur. Voluptatibus, modi? Doloribus, maiores minima facilis quidem distinctio ullam soluta, quasi illum, placeat vero eaque!</p>
                    </div>
                    <div>user courses:</div>
                    <div className="grid grid-flow-row md:grid-cols-3 xl:grid-cols-6 gap-4">
                        
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />

                    </div>
                </div>

            </main>
            <footer className="h-32">
                This is footer
            </footer>





        </div>
    )
}