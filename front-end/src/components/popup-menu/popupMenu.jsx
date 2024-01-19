import { useEffect, useRef, useState } from "react";
import "./popupMenu.css"

function PopupMenu( { isOpen, onClose, elementRef, children} ){
     
     const popupRef = useRef()
     const [menuStyle, setMenuStyle] = useState({})
     function closePopUp(e){
          if(e.target.classList.contains("popup-menu")){
               onClose(false)
          }
     }

     useEffect( ()=>{
          if( isOpen ){
               let initiatorDomRect = elementRef.current.getBoundingClientRect();
               let initiatorYpos = initiatorDomRect.y 
               let initiatorXpos = initiatorDomRect.x

               let vh = window.innerHeight
               let vw = window.innerWidth
               
               let popupDomRect = popupRef.current.getBoundingClientRect()
               let popupHeight = popupDomRect.height;
               let popupWidth = popupDomRect.width;
          
          
               let newMenuStyle = {
                    top: ( initiatorYpos + popupHeight < vh ) ? initiatorYpos : (initiatorYpos-popupHeight),
                    left:( initiatorXpos + popupWidth < vw ) ? initiatorXpos : (initiatorXpos-popupWidth)
               }
               setMenuStyle( newMenuStyle )
          }
     }, [isOpen] )


     if(isOpen){
          return (
               <div className="popup-menu" onClick={closePopUp} >
                    <ul style={menuStyle} ref={popupRef} >
                         {children}
                    </ul>
               </div>
          )
     }else{
          return null;
     }
}

function PopupMenuList( { styling=null, callback, children } ){
     return (
          <li className={"popup-menu-list "+(styling?styling:"") } onClick={callback} >
               {children}
          </li>
     )
}

export {
     PopupMenu, 
     PopupMenuList
}