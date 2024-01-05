import './post.css'
import { useState } from "react";
import {SlOptions} from "react-icons/sl";
import { FaRegComment, FaRegHeart, FaHeart, FaRegPaperPlane, FaRegBookmark, FaBookmark } from "react-icons/fa6";


export default function Post(props) {

     let [likeState, setLikeState] = useState(false)
     let [bookMarkState, setBookMarkState] = useState(false)

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
                              <img src={POST.profile.thumbnail} alt="profile pic" />
                         </div>
                         <p className="profile-name">
                              {POST.profile.name}
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
                    {POST.content.type === "image" && (
                         <img src={POST.content.image} alt="Unable to load" />
                    )}
                    {POST.content.type === "video" && (
                         <video src={POST.content.video} autoPlay muted loop></video>
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
                    {POST.contentResponse.likesCount+" likes"}
               </div>
               <div className="description">
                    <span>
                         {POST.profile.name}
                    </span>
                    {" " + POST.content.description}
                    <div>
                         {POST.contentResponse.commentCount===1 && `View ${POST.contentResponse.commentCount} comment`}
                         {POST.contentResponse.commentCount>1 && `View all ${POST.contentResponse.commentCount} comments`}
                    </div>
               </div>

          </div>
     )
}