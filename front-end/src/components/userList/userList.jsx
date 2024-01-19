import { SlOptions } from "react-icons/sl";
import { Link } from 'react-router-dom'
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import './userList.css'
export default function UserList({ user, isUserIDOnly = false }) {
     let username = isUserIDOnly ? user : user.username;
     return (
          <div className='user-li'>
               {!isUserIDOnly && (
                    <Link to={`/profile/${user}`} className="left">
                         <img src={user.profilePhotoThumbURL ?
                              process.env.REACT_APP_BACKEND_URL + "/api/v1/profile/dpThumb/" + user.profilePhotoThumbURL
                              : defaultAvatar
                         } alt="" />
                    </Link>
               )}
               <Link to={`/profile/${username}`} className="middle">
                    <h3>{username}</h3>
               </Link>
               <div className="right">
                    <SlOptions />
               </div>
          </div>
     );
}
