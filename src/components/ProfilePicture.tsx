import React, { useRef, useState } from 'react';

export const ProfilePicture = () => {
  const [profilePic, setProfilePic] = useState<string>('/avatars/M_1.jpg');
  const uploadBtn = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      if (reader.result != null) {
        setProfilePic(reader.result as string);
      }
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    if (uploadBtn.current != null) {
      uploadBtn.current.click();
    }
  };

  return (
    <div className="">
      <div className="circle">
        <div className="rounded-full overflow-hidden h-full">
          <img className="profile-pic" src={profilePic} alt="Profile" />
        </div>
        <div className="p-image">
          <img src='/camera-icon.png' onClick={triggerFileUpload} />
          <input
            className="file-upload"
            ref={uploadBtn}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }} // Hide the file input
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
