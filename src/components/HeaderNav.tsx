import Image from 'next/image';


export default function HeaderNav({ activeView } : {activeView:string}) {
    
    return (
        <nav className="headerNav">
  <div className="headerNav_user" >
    <Image
    className='rounded-full'
        src="/avatars/F_2.jpg"
        alt="My image description"
        width={35} // Optional: Set width
        height={35} // Optional: Set height
    
        />
      <span >Mr Whigga <br /> (white nigga)</span>
      <span  >▼</span>
      </div>
  <div className="headerNav_search">Search</div>
  <div className="headerNav_notification">n</div>
</nav>
    );
  }
  