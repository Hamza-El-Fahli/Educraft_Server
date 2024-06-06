"use client"
import { Header } from "../../components/Header";
import ModuleCard from "../../components/ModuleCard";
import { useParams } from 'next/navigation'
import { API_Server_Chapters, API_Server_Modules } from "@/configuration/API";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { IModule } from "@/types/types";

export default function User_modules() {
    const [Modules, setModules] = useState([])
    const [Loading, setLoading] = useState(true)
    let cookies: string | undefined = getCookie("currentUser")
    const currentUser = JSON.parse(cookies ? cookies : '[]')
    const user_id = currentUser._id
    const params = useParams<{ tag: string; item: string }>()
    const course_id = params.course_id
    useEffect(() => {

        fetch(`${API_Server_Modules}?course_id=${course_id}&user_id=${user_id}`)
            .then(async res => {
                const data = await res.json()
                setModules(data)
                console.log(data)
                setLoading(false)
            })
    }, [])
    return (
        <div className=" h-svh w-full flex  flex-col" style={{ background: 'url(/networking-bg.png)' }} >
            <Header />
            <main className="w-full h-full">

                <div className="h-full flex flex-col space-y-8 px-10 pt-10  bg-secondary/50 text-white">
                    <div>
                        <h1 className="font-bold text-2xl">CCNA 1: <span className="text-xl">Description of ccna 1</span></h1>
                    </div>
                    <h1 className="font-bold text-2xl">Modules:</h1>
                    {Loading ? <LoadingSpinner /> :
                        <div className="flex gap-2 flex-col">
                            {Modules.map((_module:IModule)=>{

                           return <ModuleCard key={_module._id} _module={_module} user_id={user_id} />
                            })}

                        </div>
                    }
                </div>

            </main>
            <footer className="h-32">
                This is footer
            </footer>





        </div>
    )
}