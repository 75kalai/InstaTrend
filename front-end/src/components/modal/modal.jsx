import { useState } from 'react';
import './modal.css'
import { IoClose } from "react-icons/io5";

export default function Modal({heading, isOpen, onClose, children}){
     
     const [isCloseBtnHovered, setIsCloseBtnHovered] = useState(false);

     if(!isOpen){
          return null;
     }

                  
     function exitModalonBGClick(e){
          if(e.target.classList.contains("modal-overlay")){
               onClose();
          }
     }

     return (
          <div className="modal-overlay" onClick={exitModalonBGClick}>
               <div className="modal">
                    <div className="header">
                         <h2 className="heading">
                              {heading}
                         </h2>
                         <div className="close" onClick={onClose}>
                              <IoClose />
                         </div>
                    </div>
                    <div className="modal-content">
                         {children}
                    </div>
               </div>
          </div>     
     )
}