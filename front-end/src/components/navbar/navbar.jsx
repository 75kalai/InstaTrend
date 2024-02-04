import './navbar.css'
import { Link } from "react-router-dom"
import { GoHome } from 'react-icons/go';
import {
     IoNotificationsOutline, IoPaperPlaneOutline, IoCompassOutline,
     IoAddCircleOutline, IoSearchOutline,
     IoMenuOutline
} from 'react-icons/io5';
import { TbUserSquareRounded } from "react-icons/tb";
import { useContext, useState, useRef } from 'react';
import { AppContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { PopupMenu, PopupMenuList} from '../popup-menu/popupMenu';
import logo from '../../assets/logo.png'
import logoIcon from '../../assets/logo-favicon.png'

export default function Navbar() {

     const appEnvironment = useContext(AppContext);
     const settingsRef = useRef();
     const [togglePopupMenu, setTogglePopupMenu] = useState(false)

     let location = useLocation();


     return (
          <div className="navbar">
               <div className="top">
                    <img className="logo-full" src={logo} alt="logo" />
                    <img className="logo-icon" src={logoIcon} alt="logo" />
               </div>
               <div className="middle">
                    <Link to="/" className={"list " + (location.pathname === '/' ? 'current-tab' : '')}>
                         <GoHome className='icon' />
                         <h4 className="label">Home</h4>
                    </Link>
                    <Link to="/search" className={"list " + (location.pathname === '/search' ? 'current-tab' : '')}>
                         <IoSearchOutline className='icon' />
                         <h4 className="label">Search</h4>
                    </Link>
                    <Link to="/explore" className={"list " + (location.pathname === '/explore' ? 'current-tab' : '')}>
                         <IoCompassOutline className="icon" />
                         <h4 className="label">Explore</h4>
                    </Link>
                    <Link to="/messages" className={"list " + (location.pathname === '/messages' ? 'current-tab' : '')} style={{ "display": "none" }}>
                         <IoPaperPlaneOutline className='icon' />
                         <h4 className="label">Messages</h4>
                    </Link>
                    <Link to="/notifications"
                         className={"list notifications " + (location.pathname === '/notifications' ? 'current-tab' : '')}>
                         <IoNotificationsOutline className='icon' />
                         <h4 className="label">Notifications</h4>
                    </Link>
                    <Link to="/new-post" className={"list " + (location.pathname === '/new-post' ? 'current-tab' : '')}>
                         <IoAddCircleOutline className='icon' />
                         <h4 className="label">New Post</h4>
                    </Link>
                    <Link to={"/profile/" + appEnvironment.userSession.userData.username}
                         className={"list " + (location.pathname === '/profile' ? 'current-tab' : '')}>
                         <TbUserSquareRounded className="icon" />
                         <h4 className="label">My Profile</h4>
                    </Link>

               </div>
               <div className="bottom">
                    <div className="settings list " onClick={() => setTogglePopupMenu((prev) => !prev)} ref={settingsRef}>
                         <IoMenuOutline className='icon' />
                         <h4 className="label">Settings</h4>
                    </div>
                    <PopupMenu elementRef={settingsRef} isOpen={togglePopupMenu} onClose={ ()=>{setTogglePopupMenu()} } >
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