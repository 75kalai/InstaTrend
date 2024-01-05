import { useState } from 'react';
import './modal.css'
import { FaRegWindowClose, FaWindowClose } from "react-icons/fa";

export default function Modal({isOpen, onClose, children}){
     
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
                    <span 
                         className="close-modal" 
                         onClick={onClose}
                         onMouseEnter={()=>{ setIsCloseBtnHovered(true) }}
                         onMouseLeave={()=>{ setIsCloseBtnHovered(false) }}
                    >
                         {isCloseBtnHovered? <FaWindowClose /> : <FaRegWindowClose /> }
                    </span>
                    {children}
               </div>
          </div>     
     )
}