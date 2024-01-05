import { useState, useEffect, useRef } from 'react';
import './createPost.css'
// import env from "react-dotenv";
import { MdFileUpload } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import apiUtil from '../../util/apiUtil';

const BACKEND_URL="http://localhost:3100";

export default function CreatePost() {

     let fileInputEl = useRef();
     let elLeft = useRef();
     let elRight = useRef();
     let [selectedFiles, setSelectedFiles] = useState([]);
     let [selectedMediaId, setSelectedMediaId] = useState(0);

     let captionRef = useRef() 
     let locationRef = useRef()
     let hideViewsRef = useRef()
     let hideLikesRef = useRef()
     let hideCommentsRef = useRef()
     let disableCommentsRef = useRef()

     useEffect(() => {
          fileInputEl.current.addEventListener('change', (e) => {
               setSelectedFiles(e.target.files);
          });
     }, [])

     useEffect(() => {
          setSelectedMediaId(0);
          for (let file of selectedFiles) {
               console.log(file.name, isAllowedFileFormat(file),file.name.split('.').pop());
               if( !isAllowedFileFormat(file) ){
                    console.log("Only JPG, JPEG, PNG & MP4 formats are allowed");
               }
          }
     }, [selectedFiles])

     function showMedia(e) {
          setSelectedMediaId(e.target.parentElement.dataset.fileId);
     }

     function isAllowedFileFormat(file) {
          switch (file.name.split('.').pop()) {
               case 'png':
               case 'jpg':
               case 'jpeg':
               case 'mp4':
                    // allowed formats
                    return true;
               default:
                    // show an notification for not-allowed formats
                    return false;
          }
     }

     function createNewPost() {

          let postDetails = {
               caption : captionRef.current.value,
               location : locationRef.current.value,
               advancedOptions:{
                    hideLikes: hideLikesRef.current.checked,
                    hideViews: hideViewsRef.current.checked,
                    hideComments : hideCommentsRef.current.checked,
                    disableComments: disableCommentsRef.current.checked
               }
          }

          let formData = new FormData();

          formData.append("post-details", JSON.stringify(postDetails) )

          for( let i=0 ; i<selectedFiles.length ; i++ ){
               formData.append("media", selectedFiles[i])
          }

          let requestOptions = {
               method: 'POST',
               body: formData
          }

          // fetch(BACKEND_URL + "/api/v1/media/upload", requestOptions)
          //      .then(response => response.json())
          //      .then(result => console.log(result))
          //      .catch(error => console.error(error));

          apiUtil.uploadMedia(
               '/api/v1/media/createPost', 
               formData,
               ( data, headers )=>{
                    console.log('data', data);
                    console.log('headers', headers);
               }
               );

     }

     return (
          <div className="new-post">
               {selectedFiles.length === 0 && (
                    <div className="overlay-fresh-upload">
                         <div className="graphic-box" onClick={() => { fileInputEl.current.click() }}>
                              <MdFileUpload />
                              <h2>Upload</h2>
                         </div>
                    </div>
               )}
               <div className="left" ref={elLeft}>
                    <div className="upload-image">
                         <div className="btn btn-primary next-button" onClick={ ()=>{
                              //code
                              elLeft.current.style="left:-100%";
                              elRight.current.style="left:0";
                         }}>
                              Next
                         </div>
                         <div className="btn" onClick={() => {
                              setSelectedFiles([])
                         }}>
                              <IoClose />
                         </div>
                         <label htmlFor="add-new-post" className="btn">
                              <MdFileUpload />
                         </label>
                         <input type="file" id="add-new-post" ref={fileInputEl} multiple />
                         {selectedFiles.length > 0 && (
                              <p>{selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"} selected</p>
                         )}

                    </div>
                    <div className="media-container">
                         <div className="display-img">
                              {selectedFiles.length !== 0 &&
                                   <>
                                        {
                                             selectedFiles[selectedMediaId].type.includes("image") &&
                                             <img src={URL.createObjectURL(selectedFiles[selectedMediaId])} className='media-thumb' alt="failed to load"/>
                                        }
                                        {
                                             selectedFiles[selectedMediaId].type.includes("video")
                                             &&
                                             <video src={URL.createObjectURL(selectedFiles[selectedMediaId])} className='media-thumb' autoPlay loop controls alt="failed to load"/>
                                        }
                                   </>
                              }

                         </div>
                    </div>
                    <div className="media-drawer">

                         {[...selectedFiles].map((file, index) => {

                              return (
                                   <div className="media-thumb-container" key={index} data-file-id={index} onClick={showMedia}>
                                        {
                                             file.type.includes("image") &&
                                             <img src={URL.createObjectURL(file)} className='media-thumb' alt="failed to load" />
                                        }
                                        {
                                             file.type.includes("video")
                                             &&
                                             <video src={URL.createObjectURL(file)} className='media-thumb' autoPlay loop no-controls="true" alt="failed to load"/>
                                        }
                                   </div>
                              );
                         })}

                    </div>

               </div>
               <div className="right" ref={elRight}>
                    <div className="details">
                         <div>
                              <h3>Post Details</h3>
                         </div>
                         <div className='captions'>
                              <label htmlFor="new-post-caption">Caption</label>
                              <textarea id="new-post-caption" rows="7" placeholder='Write a caption...' ref={captionRef}></textarea>
                         </div>
                         <div className="location">
                              <label htmlFor="new-post-location">Location</label>
                              <input type="text" id="new-post-location" placeholder='Add a location' ref={locationRef} />
                         </div>

                         <div>
                              <h3>Advanced Options</h3>
                         </div>
                         <div className="advanced-features">
                              <div className="hide-views">
                                   <input type="checkbox" id="new-post-hide-views" ref={hideViewsRef}/>
                                   <label htmlFor="new-post-hide-views">Hide Views</label>
                              </div>
                              <div className="hide-likes">
                                   <input type="checkbox" id="new-post-hide-likes" ref={hideLikesRef}/>
                                   <label htmlFor="new-post-hide-likes">Hide Likes</label>
                              </div>
                              <div className="hide-comments">
                                   <input type="checkbox" id="new-post-hide-comments" ref={hideCommentsRef}/>
                                   <label htmlFor="new-post-hide-comments">Hide Comments</label>
                              </div>
                              <div className="disable-comments">
                                   <input type="checkbox" id="new-post-disable-comments" ref={disableCommentsRef}/>
                                   <label htmlFor="new-post-disable-comments">Disable Comments</label>
                              </div>
                         </div>
                    </div>
                    <div className="actions">
                         <div className="back btn" onClick={ ()=>{
                              //code/
                              elLeft.current.style="left:0%";
                              elRight.current.style="left:100%";
                         }}>Back</div>
                         <div className="add-post btn btn-primary" onClick={createNewPost}>Add Post</div>
                    </div>
               </div>
          </div>
     );
}