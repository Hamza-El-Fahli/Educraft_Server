import CourseCard from "../components/CourseCard";
import { Header } from "../components/Header";

export default function User_modules() {
    return (
        <div className=" h-svh w-full flex  flex-col" style={{ background: 'url(/networking-bg.png)' }} >
            <Header />
            <main className="w-full h-full">
                
                <div className="h-full flex flex-col space-y-8 px-10 pt-10  bg-secondary/50 text-white">
                    <div>
                        <h1 className="font-bold text-2xl">CCNA 1: <span className="text-xl">Description of ccna 1</span></h1>
                    </div>
                    <h1 className="font-bold text-2xl">Modules:</h1>
                    <div className="flex gap-2 flex-col">
                        Wrong Page
                    </div>
                </div>

            </main>
            <footer className="h-32">
                {/*This is footer*/}
            </footer>





        </div>
    )
}