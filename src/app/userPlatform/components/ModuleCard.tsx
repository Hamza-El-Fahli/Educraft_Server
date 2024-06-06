import { API_Server_Chapters, API_Storage_Server } from '@/configuration/API'
import { IChapter, IModule } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'

function ModuleCard({ _module, user_id }: { _module: IModule, user_id: string }) {
    const [IsChaptersOpened, setIsChaptersOpened] = useState(false)
    const [Chapters, setChapters] = useState([])
    const chapters = useRef<any>(null)
    const [Height, setHeight] = useState(0)
    useEffect(() => {
        fetch(`${API_Server_Chapters}?module_id=${_module._id}&user_id=${user_id}`)
            .then(async (res) => {

                if (res.ok) {
                    const data = await res.json()
                    setChapters(data)
                }
            }).catch((err) => {
                // console.error(err.error)
            })
    }, [])

    function itemFocused() {
        if (chapters.current != null) {
            const originalHeight = chapters.current.scrollHeight
            setHeight(originalHeight)
        }

    }

    function itemNotFocused() {
        setHeight(0)

    }
    function HandleClick() {
        if (IsChaptersOpened) {
            itemNotFocused()
        } else {
            itemFocused()
        }
        setIsChaptersOpened(!IsChaptersOpened)
    }


    return (
        <div className='border w-full rounded-t-2xl overflow-hidden '>
            <div className="w-full  flex justify-between bg-gray-600/80 p-2 px-6 ">
                <span className='w-full '>
                    <h1 className='float-left text-lg' >Module {_module.order_num}:&nbsp;</h1> <h2 className='mt-1 ml-2'> {_module.title}</h2>
                    <h2>{_module.description}</h2>
                </span>
                <span className='self-center text-firstBlue'>

                    <button className='line p-3 pb-4 text-firstBlue rotate-180 origin-center  duration-500 text-2xl hover:rotate-0' onClick={() => HandleClick()}>&#10699;</button>
                </span>

            </div>
            <div ref={chapters} className=' w-full overflow-hidden duration-500' style={{ height: Height }}>

                {Chapters.length > 0 ?
                    Chapters.map((chapter: IChapter, index: number) => {
                        return (
                            <div key={index} className='px-3 border-b flex justify-between  bg-gray-900/80  '>
                                <h1 className=' text-[#C3C1C1] font-semibold'>Chapter {index + 1} : {chapter.title}</h1>
                                <a target='_blank' href={`${API_Storage_Server}/resources/${chapter._id}`} className='text-firstBlue w-44 text-right'>View chapter</a>
                            </div>
                        )
                    }) :
                    <div>No Chapters Here</div>
                }
            </div>
        </div>
    )
}

export default ModuleCard