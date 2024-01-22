import { useState, useContext, useRef, useEffect } from 'react'
import './editProfile.css'
import { FaAngleLeft } from "react-icons/fa6"
import { AppContext } from '../../App'
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import Modal from "../../components/modal/modal"
import apiUtil from '../../util/apiUtil'
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
     const AppEnvironment = useContext(AppContext);
     const userData = AppEnvironment.userSession.userData
     const navigate = useNavigate();

     const newUsernameRef = useRef()
     const fileSelectorRef = useRef()
     const profilePicRef = useRef()
     const bioRef = useRef()

     const STATUS = {
          AVAILABLE: 0,
          NOT_AVAILABLE: 1,
          SAME: 2
     }
     const [isNewUsernameAvailable, setIsNewUsernameAvailable] = useState(STATUS.SAME)
     const [profilePic, setProfilePic] = useState(userData.profilePhotoURL? `${process.env.REACT_APP_BACKEND_URL}/api/v1/profile/dp/${userData.profilePhotoURL}`: null )
     const [profileModalState, setProfileModalState] = useState(false)
     const [removeProfilePic, setRemoveProfilePic] = useState(false);

     useEffect(() => {
          fileSelectorRef.current.addEventListener('change', (event) => {
               var file = fileSelectorRef.current.files[0];

               if (file) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                         setProfilePic(e.target.result)
                    };

                    reader.readAsDataURL(file);
               } else {
                    setProfilePic("#")
               }
          })
     }, [])

     function checkUsernameAvailability() {
          let newUsername = newUsernameRef.current.value
          if (userData.username == newUsername) {
               setIsNewUsernameAvailable(STATUS.SAME)
          } else {
               apiUtil.getAPI(
                    `/api/v1/settings/check-username-availability/${newUsername}`,
                    (body, response) => {
                         if (body.data.isUsernameAvailable) {
                              setIsNewUsernameAvailable(STATUS.AVAILABLE)
                         } else {
                              setIsNewUsernameAvailable(STATUS.NOT_AVAILABLE)
                         }
                    }
               )
          }
     }

     function updateProfile() {

          let body = {}
          body.username = newUsernameRef.current.value
          body.description = bioRef.current.value
          body.removeProfilePic = removeProfilePic

          let formData = new FormData();

          formData.append("profileDetails", JSON.stringify(body))

          if( !removeProfilePic ){
               if (fileSelectorRef.current.files[0]) {
                    // console.log('fileSelectorRef.current.files', fileSelectorRef.current.files[0]);
                    formData.append("profilePhoto", fileSelectorRef.current.files[0])
               } else {
                    formData.append("profilePhoto", null)
               }
          }


          apiUtil.uploadMedia(
               `/api/v1/settings/update-profile`,
               formData,
               (body, response) => {
                    AppEnvironment.refreshUserData(body.data)
                    navigate(`/profile/${body.data.username}`)
               }
          )
     }

     return (
          <div className="edit-profile">
               <div className="header">
                    <div className="back" onClick={() => { window.history.back() }}>
                         <FaAngleLeft />
                    </div>
                    <div className="title">
                         <h2>Edit Profile</h2>
                    </div>
               </div>
               <div className="section-1">
                    <h3>Username</h3>
                    <div className="content">
                         <div className="box-1">
                              <input
                                   type="text"
                                   defaultValue={userData.username}
                                   placeholder="Enter new username"
                                   ref={newUsernameRef}
                                   onKeyUp={checkUsernameAvailability}
                              />
                              <span className="btn" onClick={checkUsernameAvailability}>
                                   Check Availability
                              </span>
                         </div>
                         <p className={'username-availability-status ' + (
                              isNewUsernameAvailable == STATUS.SAME ? ""
                                   : (isNewUsernameAvailable == STATUS.AVAILABLE ? "available" : "not-available")
                         )}>
                              {isNewUsernameAvailable == STATUS.SAME && "This is your current username"}
                              {isNewUsernameAvailable == STATUS.AVAILABLE && "Username is available"}
                              {isNewUsernameAvailable == STATUS.NOT_AVAILABLE && "Username is not available, try a different name"}
                         </p>
                    </div>
               </div>
               <div className="section-2">
                    <h3>Profile Picture</h3>
                    <div className="content">
                         <div className="left">
                              <img
                                   src={profilePic || defaultAvatar}
                                   alt="Profile picture"
                                   ref={profilePicRef}
                              />
                         </div>
                         <div className="right">
                              <div className="btn" onClick={() => { setProfileModalState(true) }}>View Photo</div>
                              <div className="btn" onClick={() => { setProfilePic(null); fileSelectorRef.current.value = null; setRemoveProfilePic(true) }}>
                                   Remove Photo
                              </div>
                              <div className="btn" onClick={() => { fileSelectorRef.current.click() }}>
                                   Upload New Photo
                              </div>
                              <input type="file" ref={fileSelectorRef} />
                         </div>
                    </div>
               </div>
               <div className="section-3">
                    <h3>Bio</h3>
                    <div className="content">
                         <textarea placeholder='Enter your bio 😊' ref={bioRef} defaultValue={userData.description}>
                         </textarea>
                    </div>
               </div>

               <div className="section-end">
                    <h3>Update profile details?</h3>
                    <div className="btn btn-primary" onClick={updateProfile}>Yes, update</div>
               </div>

               <Modal
                    heading="Profile Picture"
                    isOpen={profileModalState}
                    onClose={() => setProfileModalState(false)}
               >
                    <img className="modal-view-profile-pic" src={profilePic || defaultAvatar} alt="Profile Picture" />
               </Modal>
          </div>
     )
}