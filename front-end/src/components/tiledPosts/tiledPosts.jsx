import './tiledPosts.css'
import { FaComment, FaHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import apiUtil from '../../util/apiUtil';
import { useEffect, useState } from 'react';

export default function TiledPosts({ posts, isPostIDOnly }) {

     return (
          <div className="tiledPosts">
               {posts.slice().reverse().map((post, index) => {
                    return <Tile 
                         isPostIDOnly={isPostIDOnly} 
                         postDetails={post} 
                         index={index} 
                         key={isPostIDOnly?post:post.postID} 
                    />
               })}
               {posts.length == 0 && (
                    <>
                         <h4></h4>
                         <h4 className='no-posts-message'>
                              {isPostIDOnly ?
                                   "No Saved posts."
                                   :
                                   "No posts yet. Click on the upload button to make a new post."
                              }
                         </h4>
                    </>
               )}
          </div>
     );
}


function Tile({ isPostIDOnly, postDetails, index }) {

     let [thumbImage, setThumbImage] = useState(null);
     let [post, setPost] = useState(isPostIDOnly ? null : postDetails)

     useEffect(() => {
          if (isPostIDOnly) {
               apiUtil.getAPI(
                    `/api/v1/posts/${postDetails}`,
                    (body, response) => {
                         setPost(body.data.content);
                    }
               )
          }
     }, [])

     useEffect(() => {
          if (post != null) {
               // Load Image Dynamically
               apiUtil.getMedia(
                    "/api/v1/media/" + post.media[0].fileName,
                    async (dataURL, response) => {
                         setThumbImage(dataURL)
                    }
               )
          }
     }, [post])


     if (post == null || (post && thumbImage == null)) {
          return (
               <div className="loading-animation"></div>
          )
     } else {
          return (
               <Link to={`/post/${post.postID}`} className="post-thumb" key={index} id={index}>

                    <img
                         // src={process.env.REACT_APP_BACKEND_URL+"/api/v1/media/"+post.media[0].fileName} 
                         src={thumbImage}
                         alt="not found"
                    />
                    <div className="post-thumb-overlay">
                         <span>
                              <FaHeart /> {post.likes.length}
                         </span>
                         <span>
                              <FaComment /> {post.comments.length}
                         </span>
                    </div>

               </Link>
          )
     }
}