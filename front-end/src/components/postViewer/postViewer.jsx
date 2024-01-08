import "./postViewer.css"
import { useParams } from "react-router-dom"
import Post from '../post/post'
import { FaAngleLeft } from "react-icons/fa6"
import apiUtil from '../../util/apiUtil'
import { useState, useEffect } from "react"

export default function PostViewer() {

     const { postID } = useParams();

     const [postDetails, setPostDetails] = useState(null)


     const [ isFirstRun, setIsFirstRun ] = useState(true)
     useEffect( ()=>{
          if( isFirstRun ){

               apiUtil.getAPI( `/api/v1/posts/${postID}`, null, (body, response)=>{
                    setPostDetails( body.data )
               } )

               setIsFirstRun(false)
          }
     }, [isFirstRun, postID] )

     return (
          <div className="post-viewer">
               <div className="header">
                    <div className="back" onClick={()=>{window.history.back()}}>
                         <FaAngleLeft />
                    </div>
                    <div className="title">
                         Post
                    </div>
               </div>
               <div className="content">
                    <Post post={postDetails} ></Post>
               </div>
          </div>
     )
}