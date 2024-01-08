import './tiledPosts.css'
import { FaComment, FaHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import apiUtil from '../../util/apiUtil';
import { useEffect, useState } from 'react';
import loadingGif from '../../assets/loading.gif'

export default function TiledPosts(props) {

     let posts = props.posts;

     return (
          <div className="tiledPosts">
               {posts.slice().reverse().map((post, index) => {
                    return <Tile post={post} index={index} key={index} />
               })}
          </div>
     );
}

function Tile(props) {
     let { post, index } = props
     // let [thumbImage, setThumbImage] = useState(null);

     /* 
     >> setting image by using fetch calls will
     >> reduce the page load times.

     let [isfirstRunTime, setIsFirstRunTime] = useState(true)
     useEffect(() => {
          if (isfirstRunTime) {
               apiUtil.getMedia(
                    "/api/v1/posts/" + post.media[0].fileName,
                    async (data, response) => {
                         setIsFirstRunTime(false)
                         if (response.status == 200) {
                              setThumbImage(  )
                         }
                    }
               )
          }
     }, [])
     */

     return (
          <Link to={`/post/${post.postID}`} className="post-thumb" key={index} id={index}>
               <img
                    src={process.env.REACT_APP_BACKEND_URL+"/api/v1/media/"+post.media[0].fileName} 
                    // src={thumbImage}
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
     );
}