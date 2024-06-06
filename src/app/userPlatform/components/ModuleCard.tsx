import React from 'react'

function ModuleCard() {

    return (
        <div className='border w-full rounded-t-2xl overflow-hidden '>
            <div className="w-full  flex justify-between bg-gray-600/80 p-2 px-6 ">
                <span className='w-full '>
                    <h1 className='float-left text-lg' >Module 1 :&nbsp;</h1> <h2 className='mt-1 ml-2'> Module title Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum repudiandae eveniet, doloribus officia voluptas labore amet enim fuga veritatis nemo vitae non saepe rem eum quas ducimus sed, quos nesciunt!</h2>
                    <h2>Module description</h2>
                </span>
                <span className='self-center text-firstBlue'>

                <button className='line p-3 pb-4 text-firstBlue rotate-180 origin-center  duration-500 text-2xl hover:rotate-0'>&#10699;</button>
                </span>

            </div>
            <div  className=' w-full overflow-hidden duration-500 h-1 hover:h-auto'>
                <div className='px-3 border-b  bg-gray-900/80 '>
                    <h1 className='inline-block text-[#C3C1C1] font-semibold'>Chapter 1 : Title of chapter 1</h1>
                    <a href="#" className='float-right text-firstBlue'>View chapter</a>
                </div>
                <div className='px-3 border-b  bg-gray-900/80 '>
                    <h1 className='inline-block text-[#C3C1C1] font-semibold'>Chapter 1 : Title of chapter 1</h1>
                    <a href="#" className='float-right text-firstBlue'>View chapter</a>
                </div>
                <div className='px-3 border-b  bg-gray-900/80 '>
                    <h1 className='inline-block text-[#C3C1C1] font-semibold'>Chapter 1 : Title of chapter 1</h1>
                    <a href="#" className='float-right text-firstBlue'>View chapter</a>
                </div>
            </div>
        </div>
    )
}

export default ModuleCard