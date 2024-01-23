import { useState, useEffect, useRef } from 'react';
import './search.css'
import { IoSearchOutline } from 'react-icons/io5';
import ApiUtil from '../../util/apiUtil'
import defaultAvatar from '../../assets/defaultAvatar.jpg'
import { Link, useSearchParams } from "react-router-dom"

export default function Search() {

     let searchInputRef = useRef()

     const [ searchResults, setSearchResults ] = useState([])
     const [searchParams, setSearchParams] = useSearchParams();

     useEffect(() => {
          let query = searchParams.get("query")
          if(query){
               searchInputRef.current.value = query
               performSearch( null, query )
          }else{
               performSearch()
          }
     }, [])

     function performSearch( event, query=null ) {
          let value = (query?query:searchInputRef.current.value)
          ApiUtil.getAPI(
               "/api/v1/search?query=" + value,
               (body, response) => {
                    setSearchResults( body.data )
               }
          )
     }

     return (
          <div className="search">
               <div className="dummy"></div>
               <div className="search-container">
                    <div className="search-bar">
                         <input 
                              type="text" 
                              placeholder='Search an user...' 
                              ref={searchInputRef} 
                              onKeyUp={ performSearch }
                         />
                         <span className="search-action" onClick={performSearch}>
                              <IoSearchOutline />
                         </span>
                    </div>
               </div>
               <div className="search-results">
                    {searchResults.map( (user, index )=>{
                         return (
                              <ProfileCard user={user} index={index} key={index} />
                         )
                    } )}
                    {searchResults.length==0 && (
                         <h3>No results</h3>
                    )}
               </div>
          </div>
     )
}

function ProfileCard( props ) {
     let {user} = props
     // return null;
     return (
          <Link to={"/profile/"+user.username} className="profile-card">
               <div className="profile-image-container">
                    <img 
                         src={ user.profilePhotoThumbURL ? process.env.REACT_APP_BACKEND_URL+"/api/v1/profile/dpThumb/"+user.profilePhotoThumbURL : defaultAvatar } 
                         alt="User image" 
                    />
               </div>
               <div className="profile-name">
                    @{user.username}
               </div>
          </Link>
     );
}
