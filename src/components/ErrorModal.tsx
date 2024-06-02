"use client"
import  { useEffect, useState } from 'react';
import './ErrorModal.scss';

function ErrorModal({setonError,modalOpened,title,message}:any) {
  const [modalType, setModalType] = useState('');
useEffect(()=>{
if(modalOpened) openModal()
},[modalOpened])
  const handleButtonClick = (buttonId:any) => {
    setModalType(buttonId);
    openModal();
  };

  const openModal = () => {
    const modal_container = document.getElementById('modal-container')
     if(modal_container != null) modal_container.className = 'one';
     document.body.classList.add('modal-active');
    };

  const closeModal = () => {
    const modal_container = document.getElementById('modal-container')
    if(modal_container?.classList)modal_container.classList.add("out");  
      document.body.classList.remove('modal-active');
      setonError(false)
  };

  return (
    <div>
      <div id="modal-container" onClick={closeModal}>
        <div className="modal-background">
          <div className="modal">
            <h2>{title ? title : "I'm a Modal"}</h2>
            <p>{message ? message : "Hear me roar."}</p>
            <svg
              className="modal-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
            >
              <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
      {/* <div className="content">
        <h1>Modal Animations</h1>
        <div className="buttons">
          <div id="one" className="button" onClick={() => handleButtonClick('one')}>
            Unfolding
          </div>
          </div>
      </div> */}
    </div>
  );
}


export default ErrorModal;