import './home.css'
import Topbar from '../../components/topbar/topbar'
import Feed from '../../components/feed/feed'
import { useEffect, useState } from 'react'
import apiUtil from '../../util/apiUtil'
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function Home() {

     const [posts, setPosts] = useState([])

     useEffect(() => {
          apiUtil.getAPI(
               '/api/v1/feeds',
               (body, response) => {
                    setPosts(body.data)
               }
          )
     }, [])

     const quotes = [
          "As silent as the moon on a cloudless night.",
          "As silent as a whisper in an empty room.",
          "As silent as a snowflake falling to the ground.",
          "As silent as the depth of a serene lake.",
          "As silent as the wings of an owl in flight.",
          "As silent as the pages turning in a library.",
          "As silent as the stillness before a storm.",
          "As silent as a shadow gliding through the night.",
          "As silent as the mist settling on a tranquil valley.",
          "As silent as a heartbeat in the quiet of dawn."
     ]

     return (
          <div className="home">
               <Topbar />
               <Feed postsArray={posts} />
               {posts.length == 0 && (
                    <div className="no-content">
                         <span className='quote'>
                              <FaQuoteLeft />
                              <h1>{quotes[Number.parseInt(Math.random() * 10)]}</h1>
                              <FaQuoteRight />
                         </span>
                         <h4>Start following someone to view their posts.</h4>
                    </div>
               )}
          </div>
     )
}