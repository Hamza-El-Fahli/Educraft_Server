import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" 
        onClick={(e)=>{
            e.stopPropagation()
            onClose()
        }}>
            <div className="modal_1">
                {children}
                <button className="modal_btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
