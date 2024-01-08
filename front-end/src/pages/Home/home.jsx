import './home.css'
import Topbar from '../../components/topbar/topbar'
import Feed from '../../components/feed/feed'
import { useEffect, useState } from 'react'

export default function Home() {

     useEffect(() => {
          
     }, [])
    

     return (
          <div className="home">
               <Topbar />
               {/* <Feed postsArray={null} /> */}
          </div>
     )
}