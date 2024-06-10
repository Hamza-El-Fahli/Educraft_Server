import React, { useRef, useState } from 'react';

export const ProfilePicture = () => {
  const [profilePic, setProfilePic] = useState('/avatars/M_1.jpg');
    const updloadBtn = useRef(null)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    updloadBtn.current.click()
  };

  return (
    <div className="">
      <div className="circle">
        <div className="rounded-full overflow-hidden h-full">
          <img className="profile-pic" src={profilePic} alt="Profile" />
        </div>
        <div className="p-image">
        <img  src='/camera-icon.png'  onClick={()=>{triggerFileUpload()}} />
          <input className="file-upload" ref={updloadBtn} type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
