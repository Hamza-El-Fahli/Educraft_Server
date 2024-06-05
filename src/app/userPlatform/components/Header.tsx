import React from 'react'

export const Header = () => {
  return (
    <header className=" bg-primary bg- h-16 w-full flex px-36 text-white justify-between items-center ">
      <img src='/WhiteLogo.png' className='h-8' />
      <span className='flex items-center gap-3'>
        <span className='text-left text-sm'>UserNAME<br /><h6 className='text-xs'>Two lines</h6></span>
        <img src='/avatars/M_1.jpg' className='h-8 rounded-full ' />
      </span>
    </header>)
}
