import './post.css'
import { useState } from "react";
import {SlOptions} from "react-icons/sl";
import { FaRegComment, FaRegHeart, FaHeart, FaRegPaperPlane, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import defaultAvatar from '../../assets/defaultAvatar.jpg'

export default function Post(props) {

    

     let [likeState, setLikeState] = useState(false)
     let [bookMarkState, setBookMarkState] = useState(false)

     if( props.post == null ){
          return null;
     }

     function computePostedTime(postedTime) {
          let timeDiff = Date.now() - postedTime;

          let S = timeDiff / 1000
          let M = S / 60
          let H = M / 60
          let D = H / 24
          
          S = Math.round(S);
          M = Math.round(M);
          H = Math.round(H);

          if( D !== 0){
               if( D === 2 ){
                    return "Yesterday"
               }else
               if( D>=60 && D<=90 ){
                    return "Last Month"
               }else
               if( D>=365 && D<=730 ){
                    return "Last Year"
               }else{
                    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                    let postedDate = new Date(postedTime);
                    return postedDate.getDate()+" "+months[postedDate.getMonth()]+" "+postedDate.getFullYear();
                    
                    
               }
          } else
          if ( H !== 0) {
               return H + "h ago"
          } else
          if ( M !==0 ){
               return M+"m ago"
          } else
          if( S !==0 ){
               return S+"s ago"
          }else{
               return "Just now"
          }

     }

     let POST = props.post;
     // console.log("POST", POST)
     // return null;

     function toggleLikeState(){
          setLikeState( !likeState );
     }
     function toggleBookMarkState(){
          setBookMarkState( !bookMarkState );
     }

     return (
          <div className="post">
               <div className="head">
                    <div className="left">
                         <div className="profile-pic-container">
                              <img src={ POST.profilePhotoThumbURL ? POST.profilePhotoThumbURL : defaultAvatar } alt="profile pic" />
                         </div>
                         <p className="profile-name">
                              {POST.profile.username}
                         </p>
                         <p className="posted-time">
                              {computePostedTime(POST.content.postedTime)}
                         </p>
                    </div>
                    <div className="right icon">
                         <SlOptions/>
                    </div>
               </div>
               <div className="post-content">
                    {POST.content.media[0].mimeType.includes("image") && (
                         <img src={process.env.REACT_APP_BACKEND_URL+"/api/v1/media/"+POST.content.media[0].fileName} alt="Unable to load" />
                    )}
                    {POST.content.media[0].mimeType.includes("video") && (
                         <video src={process.env.REACT_APP_BACKEND_URL+"/api/v1/media/"+POST.content.media[0].fileName} autoPlay muted loop></video>
                    )}
               </div>
               <div className="actions">
                    <div className="left">
                         <div className="like icon" onClick={toggleLikeState}>
                              { !likeState && <FaRegHeart/> }
                              { likeState && <FaHeart className='red-heart-like'/>}
                         </div>
                         <div className="comment icon">
                              <FaRegComment/>
                         </div>
                         <div className="share icon">
                              <FaRegPaperPlane/>
                         </div>
                    </div>
                    <div className="right">
                         <div className="save-post icon" onClick={toggleBookMarkState}>
                              {bookMarkState && <FaBookmark/>}
                              {!bookMarkState && <FaRegBookmark/>}
                         </div>
                    </div>
               </div>
               <div className="like-count">
                    {POST.content.likes.length+" likes"}
               </div>
               <div className="description">
                    <span>
                         {POST.profile.username}
                    </span>
                    {" " + POST.content.caption}
                    <div>
                         {POST.content.comments.length===1 && `View ${POST.content.comments.length} comment`}
                         {POST.content.comments.length>1 && `View all ${POST.content.comments.length} comments`}
                    </div>
               </div>

          </div>
     )
}