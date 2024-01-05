import './tiledPosts.css'
import { FaComment, FaHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function TiledPosts(props) {

     let posts = props.posts;

     return (
          <div className="tiledPosts">
               {posts.map((post, index) => {
                    return (
                         <Link to={`/post/${post.postID}`} className="post-thumb" key={index} id={index}>
                              <img src={post.thumbnail} alt="not found" />
                              <div className="post-thumb-overlay">
                                   <span>
                                        <FaHeart /> {post.likesCount}
                                   </span>
                                   <span>
                                        <FaComment /> {post.commentsCount}
                                   </span>
                              </div>
                         </Link>
                    );
               })}
          </div>
     );
}