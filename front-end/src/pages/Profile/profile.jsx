import './profile.css'
import TiledPosts from '../../components/tiledPosts/tiledPosts';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import { useParams } from 'react-router-dom';
import apiUtil from '../../util/apiUtil';
import Modal from '../../components/modal/modal'
import { Link } from 'react-router-dom'
import UserList from '../../components/userList/userList'

export default function Profile(props) {

     let AppEnvironment = useContext(AppContext)
     let { username } = useParams()

     const loggedInUserData = AppEnvironment.userSession.userData

     // Default is CURRENT USER, useEffect will change based on path
     const [userData, setUserData] = useState(null);
     const [userProfilePhoto, setUserProfilePhoto] = useState(null)
     const [isProfilePhotoLoading, setIsProfilePhotoLoading] = useState(false)

     const tabs = {
          posts: 0,
          saved: 1
     }
     const [selectedTab, setSelectedTab] = useState(tabs.posts);
     const [isViewingOwnAccount, setIsViewingOwnAccount] = useState(false)
     const [followersModalState, setFollowersModalState] = useState(false)
     const [followingModalState, setFollowingModalState] = useState(false)

     useEffect(() => {
          apiUtil.getAPI(
               "/api/v1/profile/" + username,
               (body, response) => {
                    if (username == AppEnvironment.userSession.userData.username) {
                         AppEnvironment.refreshUserData(body.data);
                         setIsViewingOwnAccount(true)
                    } else {
                         setIsViewingOwnAccount(false)
                    }
                    setUserProfilePhoto(null)
                    setUserData(body.data)
               }
          )

     }, [username])

     useEffect(()=>{
          if( userData ){

               if( userData.profilePhotoURL ){
                    setIsProfilePhotoLoading(true)
                    apiUtil.getMedia(
                         "/api/v1/profile/dp/" + userData.profilePhotoURL,
                         async (dataURL, response) => {
                              setIsProfilePhotoLoading(false)
                              setUserProfilePhoto(dataURL)
                         }
                    )
               }
          }
     },[userData])

     function followUser() {
          apiUtil.putAPI(
               `/api/v1/profile/${username}/follow`,
               null,
               (body, response) => {
                    setUserData(body.data);
               }
          )
     }

     function unfollowUser() {
          apiUtil.putAPI(
               `/api/v1/profile/${username}/unfollow`,
               null,
               (body, response) => {
                    if (response.status == 200 && body.code == 0) {
                         setUserData(body.data)
                    }
               }
          )
     }

     let [followingActionToggleState, setFollowingActionToggleState] = useState(false)


     if (userData == null) {
          return (
               <div className="profile-loading">
                    <h3>Profile is loading...</h3>
               </div>
          )
     } else {
          // console.log('userData.posts',userData.posts);
          return (
               <>
                    <div className="profile">
                         <div className="info">
                              <div className="left">
                                   {isProfilePhotoLoading? 
                                   (
                                        <div className="loading-animation">
                                        </div>
                                   )
                                   :
                                   (
                                        <img 
                                             src={ userProfilePhoto || defaultAvatar} 
                                             alt="Profile Pic" 
                                        />
                                   )
                                   }
                              </div>
                              <div className="right">
                                   <div className="section-1">
                                        <div className="username">
                                             <h3>{userData.username}</h3>
                                        </div>
                                        <div className="action-bar">
                                             {isViewingOwnAccount ?
                                                  (<>
                                                       <Link to="/edit-profile" className="btn">
                                                            Edit profile
                                                       </Link>
                                                  </>)
                                                  :
                                                  (<>
                                                       {userData.followers.includes(loggedInUserData.username)
                                                            && (
                                                                 <div
                                                                      className={"btn " + (followingActionToggleState ? "unfollow" : "")}
                                                                      onClick={unfollowUser}
                                                                      onMouseEnter={() => { setFollowingActionToggleState(true) }}
                                                                      onMouseLeave={() => { setFollowingActionToggleState(false) }}
                                                                 >
                                                                      {followingActionToggleState ? "Unfollow?" : "Following"}
                                                                 </div>
                                                            )}
                                                       {!userData.followers.includes(loggedInUserData.username)
                                                            && (
                                                                 <div className="btn btn-primary" onClick={followUser}>
                                                                      Follow
                                                                 </div>
                                                            )}
                                                  </>)
                                             }
                                        </div>

                                   </div>
                                   <div className="section-2">
                                        <div className="posts">
                                             <h4>{userData.posts.length}</h4> posts
                                        </div>
                                        <div className="followers" onClick={() => { setFollowersModalState(true) }}>
                                             <h4>{userData.followers.length}</h4> followers
                                        </div>
                                        <div className="following" onClick={() => { setFollowingModalState(true) }}>
                                             <h4>{userData.following.length}</h4> following
                                        </div>
                                   </div>
                                   <div className="section-3">
                                        {userData.description}
                                   </div>

                              </div>
                         </div>
                         <div className="info-mobile-view">
                              <div className="section-desc">
                                   {userData.description}
                              </div>
                              <div className="section-stats">
                                   <div className="posts">
                                        <h4>{userData.posts.length}</h4> posts
                                   </div>
                                   <div className="followers" onClick={() => { setFollowersModalState(true) }}>
                                        <h4>{userData.followers.length}</h4> followers
                                   </div>
                                   <div className="following" onClick={() => { setFollowingModalState(true) }}>
                                        <h4>{userData.following.length}</h4> following
                                   </div>
                              </div>
                         </div>
                         <div className="body">
                              <div className="nav">
                                   <span className={selectedTab == tabs.posts ? "selected" : ""} onClick={() => { setSelectedTab(tabs.posts) }}>Posts</span>
                                   {
                                        isViewingOwnAccount
                                        && (<span className={selectedTab == tabs.saved ? "selected" : ""} onClick={() => { setSelectedTab(tabs.saved) }}>Saved</span>)
                                   }
                              </div>
                              <div className="body-content">
                                   {
                                        selectedTab == tabs.posts 
                                        && (<TiledPosts posts={userData.posts} isPostIDOnly={false}/>)
                                   }
                                   {
                                        selectedTab == tabs.saved
                                        && isViewingOwnAccount
                                        && (<TiledPosts posts={userData.savedPosts} isPostIDOnly={true}/>)
                                   }
                              </div>
                         </div>
                         <div className="footer"></div>

                    </div>
                    <Modal
                         heading={"Followers"}
                         isOpen={followersModalState}
                         onClose={() => { setFollowersModalState(false) }}
                    >
                         {userData.followers.map(( user, index )=>{
                              return <UserList user={user} isUserIDOnly={true} key={index} />
                         })}
                         {userData.followers.length == 0 && (
                              <h3>No Followers yet.</h3>
                         ) }
                    </Modal>

                    <Modal
                         heading={"Following"}
                         isOpen={followingModalState}
                         onClose={() => { setFollowingModalState(false) }}
                    >
                         {userData.following.map(( user, index )=>{
                              return <UserList user={user} isUserIDOnly={true} key={index}/>
                         })}
                         {userData.following.length == 0 && (
                              <h3>Not following anybody yet.</h3>
                         ) }
                    </Modal>
               </>
          )
     }
}
