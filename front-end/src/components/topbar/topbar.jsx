import './topbar.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

/* VISIBLE ONLY IN MOBILE VIEW */

export default function Topbar() {

     return (
          <div className="topbar" id="topbar">
               <div className="left">
                    <h1>InstaBook</h1>
               </div>
               <div className="right">
                    <input type="text" placeholder="Search" />
                    <div className="icon">
                         <span> <AiOutlineHeart /> </span>
                         <span> <AiFillHeart /> </span>
                    </div>
               </div>
          </div>
     )
}