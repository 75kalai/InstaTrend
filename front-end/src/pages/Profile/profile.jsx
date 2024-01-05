import './profile.css'
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { UserPosts, SavedPosts } from '../../sampleData';
import TiledPosts from '../../components/tiledPosts/tiledPosts';
import { useState } from 'react';

export default function Profile(props) {

     let Profile = props.profile;
     let tabs={
          posts:0,
          saved:1
     }
     let [selectedTab, setSelectedTab] = useState(tabs.posts);

     return (
          <div className="profile">
               <div className="info">
                    <div className="left">
                         <img src={Profile.profileImage} alt="" />
                    </div>
                    <div className="right">
                         <div className="section-1">
                              <h3>{Profile.profileId}</h3>
                         </div>
                         <div className="section-2">
                              <div className="posts">
                                   <h4>{Profile.postsCount}</h4> posts
                              </div>
                              <div className="followers">
                                   <h4>{Profile.followers}</h4> followers
                              </div>
                              <div className="following">
                                   <h4>{Profile.following}</h4> following
                              </div>
                         </div>
                         <div className="section-3">
                              <h5>{Profile.name}</h5>
                         </div>
                         <div className="section-4">
                              {Profile.description}
                         </div>
                    </div>
               </div>
               <div className="body">
                    <div className="nav">
                         <span className={selectedTab==tabs.posts?"selected":""} onClick={()=>{ setSelectedTab(tabs.posts) }}>Posts</span>
                         <span className={selectedTab==tabs.saved?"selected":""} onClick={()=>{ setSelectedTab(tabs.saved) }}>Saved</span>
                    </div>
                    <div className="body-content">
                         {selectedTab==tabs.posts && ( <TiledPosts posts={UserPosts}/> )}
                         {selectedTab==tabs.saved && ( <TiledPosts posts={SavedPosts}/> )}
                    </div>
               </div>
               <div className="footer"></div>
          </div>
     )
}