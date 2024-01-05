import "./postViewer.css"
import { useParams } from "react-router-dom"
import { UserPosts } from '../../sampleData'
import Post from '../post/post'
import { FaAngleLeft } from "react-icons/fa6";

export default function PostViewer() {

     const { postID } = useParams();

     let foundPost = UserPosts.find((el) => {
          if (el.postID == postID) {
               return true
          } else {
               return false
          }
     })

     return (
          <div className="post-viewer">
               <div className="header">
                    <div className="back">
                         <FaAngleLeft />
                    </div>
                    <div className="title">
                         Post
                    </div>
               </div>
               <div className="content">
                    <Post post={foundPost} ></Post>
               </div>
          </div>
     )
}