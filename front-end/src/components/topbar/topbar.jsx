import './topbar.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useContext } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { PopupMenu, PopupMenuList} from '../popup-menu/popupMenu';
import { AppContext } from '../../App';

/* VISIBLE ONLY IN MOBILE VIEW */
export default function Topbar() {
     
     const appEnvironment = useContext(AppContext);
     
     const navigate = useNavigate();
     const searchRef = useRef()
     const menuRef = useRef();

     const [ togglePopupMenu, setTogglePopupMenu ] = useState(false)

     function navToSearch(event){
          if( event.key=="Enter" ){
               navigate(`/search?query=${searchRef.current.value}`)
          }
     }

     return (
          <div className="topbar" id="topbar">
               <div className="left">
                    <img src={logo} alt="" />
               </div>
               <div className="right">
                    <input type="text" placeholder="Search" onKeyDown={navToSearch} ref={searchRef}/>
                    <div className="icon" ref={menuRef} onClick={() => setTogglePopupMenu((prev) => !prev)}>
                         <IoMenuOutline/>
                    </div>
                    <PopupMenu elementRef={menuRef} isOpen={togglePopupMenu} onClose={ ()=>{setTogglePopupMenu()} } >
                         <PopupMenuList>Switch Appearence*</PopupMenuList>
                         <PopupMenuList>Settings*</PopupMenuList>
                         <PopupMenuList 
                              styling="log-out" 
                              callback={() => { appEnvironment.logOutUser() }}
                         >
                              Logout
                         </PopupMenuList>
                         
                    </PopupMenu>
               </div>
          </div>
     )
}