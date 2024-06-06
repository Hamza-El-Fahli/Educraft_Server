import CourseCard from "../components/CourseCard";
import { Header } from "../components/Header";

export default function User_courses() {
    return (
        <div className=" h-svh w-full flex  flex-col" style={{ background: 'url(/networking-bg.png)' }} >
            <Header />
            <main className="w-full h-full">
                <div className="w-full flex gap-10 text-white pt-10 pl-5 bg-secondary/50 " style={{ borderBottomWidth: 1 }}>
                    <nav className="bg-[#1F233A] w-auto px-10 py-2 flex justify-center items-center rounded-t-full border-b-4 border-firstBlue " style={{ marginBottom: -1 }}>Reaseax Informatiques</nav>
                    <nav className="bg-[#1F233A] w-auto px-10 py-2 flex justify-center items-center rounded-t-full" style={{ marginBottom: -1 }}>SE Open Source</nav>
                    <nav className="bg-[#1F233A] w-auto px-10 py-2 flex justify-center items-center rounded-t-full" style={{ marginBottom: -1 }}>Gestion Des Bases De donnees</nav>
                </div>
                <div className="h-full flex flex-col space-y-8 px-10 pt-10  bg-secondary/50 text-white">
                    <div><h1 className="font-bold text-2xl">Reaseax Informatiques</h1>
                        <p className="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam recusandae voluptatem error repellendus ut aspernatur. Voluptatibus, modi? Doloribus, maiores minima facilis quidem distinctio ullam soluta, quasi illum, placeat vero eaque!</p>
                    </div>
                    <h1 className="font-bold text-2xl">user courses:</h1>
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