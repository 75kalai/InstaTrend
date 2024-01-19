import './post.css'
import { useContext, useEffect, useState, useRef } from "react";
import { SlOptions } from "react-icons/sl";
import { FaRegComment, FaRegHeart, FaHeart, FaRegPaperPlane, FaRegBookmark, FaBookmark } from "react-icons/fa6";
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import apiUtil from "../../util/apiUtil"
import { AppContext } from '../../App';
import UserList from '../userList/userList';
import Modal from '../modal/modal'

export default function Post({ post, setPost }) {

     /* ----------------------------------------------------
          This input data value must be structured as below:
          {
               profile:{
                    username,
                    profilePhotoURL,
                    profilePhotoThumbURL
               },
               content:{
                    postID,
                    flags,
                    media:[...] ,
                    postedTime,
                    likes,
                    comments,
                    caption,
               }
          }
     ---------------------------------------------------- */

     let AppEnvironment = useContext(AppContext);

     const [likeState, setLikeState] = useState(false);
     const [bookMarkState, setBookMarkState] = useState(false);
     const [likesModalState, setLikesModalState] = useState(false)
     const [shareModalState, setShareModalState] = useState(false)

     const shareLinkTextRef = useRef()

     useEffect(() => {
          if (post) {
               setLikeState(
                    (post.content.likes.find((userObj) => userObj.username == AppEnvironment.userSession.userData.username)) ? true : false
               );
               setBookMarkState(
                    (AppEnvironment.userSession.userData.savedPosts.includes(post.content.postID)) ? true : false
               );
          }
     }, [post])

     function computePostedTime(postedTime) {
          let timeDiff = Date.now() - postedTime;

          let S = timeDiff / 1000
          let M = S / 60
          let H = M / 60
          let D = H / 24

          S = Math.round(S);
          M = Math.round(M);
          H = Math.round(H);

          if (D !== 0) {
               if (D === 2) {
                    return "Yesterday"
               } else
                    if (D >= 60 && D <= 90) {
                         return "Last Month"
                    } else
                         if (D >= 365 && D <= 730) {
                              return "Last Year"
                         } else {
                              let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                              let postedDate = new Date(postedTime);
                              return postedDate.getDate() + " " + months[postedDate.getMonth()] + " " + postedDate.getFullYear();


                         }
          } else
               if (H !== 0) {
                    return H + "h ago"
               } else
                    if (M !== 0) {
                         return M + "m ago"
                    } else
                         if (S !== 0) {
                              return S + "s ago"
                         } else {
                              return "Just now"
                         }

     }

     function toggleLikeState() {
          if (likeState) {
               apiUtil.putAPI(
                    `/api/v1/posts/${post.content.postID}/unlike`,
                    null,
                    (body, response) => {
                         if (response.status == 200 && body.code == 0) {
                              setLikeState(false);
                              setPost(body.data)
                         }
                    }
               )
          } else {
               apiUtil.putAPI(
                    `/api/v1/posts/${post.content.postID}/like`,
                    null,
                    (body, response) => {
                         if (response.status == 200 && body.code == 0) {
                              setLikeState(true);
                              setPost(body.data)
                         }
                    }
               )
          }
     }
     function toggleBookMarkState() {
          if (bookMarkState) {
               apiUtil.putAPI(
                    `/api/v1/posts/${post.content.postID}/unsave`,
                    null,
                    (body, response) => {
                         if (response.status == 200 && body.code == 0) {
                              console.log('POST IS UNSAVED');
                              setBookMarkState(false);
                              setPost(body.data.postDetails)
                              AppEnvironment.refreshUserData(body.data.currentUserDetails)
                         }
                    }
               )
          } else {
               apiUtil.putAPI(
                    `/api/v1/posts/${post.content.postID}/save`,
                    null,
                    (body, response) => {
                         if (response.status == 200 && body.code == 0) {
                              console.log('POST IS SAVED');
                              setBookMarkState(true);
                              setPost(body.data.postDetails)
                              AppEnvironment.refreshUserData(body.data.currentUserDetails)
                         }
                    }
               )
          }
     }

     function copyPostURL(){
          var copyText = shareLinkTextRef.current

          // Select the text field
          copyText.select();
          copyText.setSelectionRange(0, 99999); // For mobile devices
        
           // Copy the text inside the text field
          navigator.clipboard.writeText(copyText.value);
        
     }

     if (post == null) {
          return null;
     }
     return (
          <div className="post">
               <div className="head">
                    <div className="left">
                         <Link to={"/profile/" + post.profile.username} className="profile-pic-container">
                              <img src={post.profile.profilePhotoThumbURL ?
                                   process.env.REACT_APP_BACKEND_URL + "/api/v1/profile/dpThumb/" + post.profile.profilePhotoThumbURL
                                   : defaultAvatar
                              } alt="profile pic" />
                         </Link>
                         <Link to={"/profile/" + post.profile.username} className="profile-name" >
                              {post.profile.username}
                         </Link>
                         <p className="posted-time">
                              {computePostedTime(post.content.postedTime)}
                         </p>
                    </div>
                    <div className="right icon">
                         <SlOptions />
                    </div>
               </div>
               <div className="post-content">
                    <Splide>
                         {post.content.media.map((media, index) => {
                              return (
                                   <SplideSlide key={index}>
                                        {media.mimeType.includes("image") && (
                                             <img src={process.env.REACT_APP_BACKEND_URL + "/api/v1/media/" + media.fileName} alt="Unable to load" />
                                        )}
                                        {media.mimeType.includes("video") && (
                                             <video src={process.env.REACT_APP_BACKEND_URL + "/api/v1/media/" + media.fileName} autoPlay muted loop></video>
                                        )}
                                   </SplideSlide>
                              )
                         })}
                    </Splide>
               </div>
               <div className="actions">
                    <div className="left">
                         <div className="like icon" onClick={toggleLikeState}>
                              {!likeState && <FaRegHeart />}
                              {likeState && <FaHeart className='red-heart-like' />}
                         </div>
                         <div className="comment icon">
                              <FaRegComment />
                         </div>
                         <div className="share icon" onClick={() => { setShareModalState(true) }}>
                              <FaRegPaperPlane />
                         </div>
                    </div>
                    <div className="right">
                         <div className="save-post icon" onClick={toggleBookMarkState}>
                              {bookMarkState && <FaBookmark />}
                              {!bookMarkState && <FaRegBookmark />}
                         </div>
                    </div>
               </div>
               <div className="like-count" onClick={() => { setLikesModalState(true) }}>
                    {post.content.likes.length + " likes"}
               </div>
               <div className="description">
                    <span>
                         {post.profile.username}
                    </span>
                    {" " + post.content.caption}
                    <div>
                         {post.content.comments.length === 1 && `View ${post.content.comments.length} comment`}
                         {post.content.comments.length > 1 && `View all ${post.content.comments.length} comments`}
                    </div>
               </div>
               <Modal
                    heading={"Liked by"}
                    isOpen={likesModalState}
                    onClose={() => { setLikesModalState(false) }}
               >
                    {post.content.likes.map((likedByUserBasicDetails, index) => {
                         return <UserList user={likedByUserBasicDetails} isUserIDOnly={false} key={index} />
                         // return likedByUserBasicDetails.username
                    })}
                    {post.content.likes.length == 0 && (
                         <h4>No likes yet</h4>
                    )}
               </Modal>
               <Modal
                    heading={"Liked by"}
                    isOpen={shareModalState}
                    onClose={() => { setShareModalState(false) }}
               >
                    <div className="share-link">
                         <input 
                              type="text" 
                              readOnly 
                              ref={shareLinkTextRef}
                              value={`${process.env.REACT_APP_FRONTEND_URL}/post/${post.content.postID}`}  
                         />
                         <div className="btn btn-primary" onClick={copyPostURL}>Copy link</div>
                    </div>
               </Modal>
          </div>
     )
}