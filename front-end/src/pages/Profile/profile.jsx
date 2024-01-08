import './profile.css'
import TiledPosts from '../../components/tiledPosts/tiledPosts';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import defaultAvatar from '../../assets/defaultAvatar.jpg'

export default function Profile(props) {

     let AppEnvironment = useContext( AppContext )

     let userData = props.profile;
     let tabs={
          posts:0,
          saved:1
     }
     let [selectedTab, setSelectedTab] = useState(tabs.posts);

     useEffect(()=>{
          AppEnvironment.refreshUserData();
     },[])

     return (
          <div className="profile">
               <div className="info">
                    <div className="left">
                         <img src={userData.profilePhotoURL ? userData.profilePhotoURL : defaultAvatar} alt="" />
                    </div>
                    <div className="right">
                         <div className="section-1">
                              <h3>{userData.username}</h3>
                         </div>
                         <div className="section-2">
                              <div className="posts">
                                   <h4>{userData.posts.length}</h4> posts
                              </div>
                              <div className="followers">
                                   <h4>{userData.followers.length}</h4> followers
                              </div>
                              <div className="following">
                                   <h4>{userData.following.length}</h4> following
                              </div>
                         </div>
                         <div className="section-3">
                              <h5>{userData.username}</h5>
                         </div>
                         <div className="section-4">
                              {userData.description}
                         </div>
                    </div>
               </div>
               <div className="body">
                    <div className="nav">
                         <span className={selectedTab==tabs.posts?"selected":""} onClick={()=>{ setSelectedTab(tabs.posts) }}>Posts</span>
                         <span className={selectedTab==tabs.saved?"selected":""} onClick={()=>{ setSelectedTab(tabs.saved) }}>Saved</span>
                    </div>
                    <div className="body-content">
                         {selectedTab==tabs.posts && ( <TiledPosts posts={userData.posts}/> )}
                         {selectedTab==tabs.saved && ( <TiledPosts posts={userData.savedPosts}/> )}
                    </div>
               </div>
               <div className="footer"></div>
          </div>
     )
}