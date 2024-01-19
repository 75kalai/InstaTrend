import "./postViewer.css"
import { useParams } from "react-router-dom"
import Post from '../post/post'
import { FaAngleLeft } from "react-icons/fa6"
import apiUtil from '../../util/apiUtil'
import { useState, useEffect } from "react"

export default function PostViewer() {

     const { postID } = useParams();

     const [postDetails, setPostDetails] = useState(null)


     useEffect(() => {
          apiUtil.getAPI(`/api/v1/posts/${postID}`, (body, response) => {
               setPostDetails(body.data)
          })
     }, [postID])

     return (
          <div className="post-viewer">
               <div className="header">
                    <div className="back" onClick={() => { window.history.back() }}>
                         <FaAngleLeft />
                    </div>
                    <div className="title">
                         Post
                    </div>
               </div>
               <div className="content">
                    <Post post={postDetails} setPost={setPostDetails} ></Post>
                    {/* SHOW SUGGESTIONS ? */}
               </div>
          </div>
     )
}