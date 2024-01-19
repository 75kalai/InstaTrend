import './App.css';
import { createContext, useEffect, useState } from 'react';
import Landing from './landingPage/landing'
import Navbar from './components/navbar/navbar';
import Profile from './pages/Profile/profile';
import CreatePost from './pages/CreatePost/createPost'
import Error from './pages/Error/error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home'
import apiUtil from './util/apiUtil'
import PostViewer from './components/postViewer/postViewer'
import Search from './pages/Search/search';
import EditProfile from './pages/EditProfile/editProfile';


// Entire front end app variables stored here
export const AppContext = createContext();

function App() {

     const [appEnvironment, setAppEnvironment] = useState({
          applicationName: "InstaTrend",
          author: "kalai.r",
          userSession: {
               isLoggedIn: false,
               userData: null
          },
          __setUserData: (data) => {
               // data.profilePhotoURL = data.profilePhotoURL ? process.env.REACT_APP_BACKEND_URL + "/api/v1/profile/dp/" + data.profilePhotoURL : data.profilePhotoURL
               // data.profilePhotoThumbURL = data.profilePhotoThumbURL ? process.env.REACT_APP_BACKEND_URL + "/api/v1/profile/dpThumb/" + data.profilePhotoThumbURL : data.profilePhotoThumbURL
               setAppEnvironment((prevAppEnv) => {
                    return {
                         ...prevAppEnv,
                         userSession: {
                              isLoggedIn: true,
                              userData: data
                         }
                    }
               })
          },
          logInUser: (data) => {
               appEnvironment.__setUserData(data)
          },
          logOutUser: () => {
               setAppEnvironment((prevAppEnv) => {
                    // TODO: await response and return.
                    apiUtil.postAPI("/api/v1/auth/logout")

                    return {
                         ...prevAppEnv,
                         userSession: {
                              isLoggedIn: false,
                              userData: null
                         }
                    }
               })
          },
          refreshUserData: (data = null) => {
               if (data) {
                    // NOTE: Only use data that is obtained 
                    // using "backend:ProfileUtil.getUserDetails" !
                    appEnvironment.__setUserData(data);
               } else {
                    apiUtil.getAPI("/api/v1/auth/me", (body, headers) => {
                         if (body.code == 0) {
                              appEnvironment.__setUserData(body.data)
                         } else if (body.code == 1004) {
                              appEnvironment.logOutUser()
                         }
                    })
               }
          }
     })

     //----------

     useEffect(() => {
          apiUtil.getAPI("/api/v1/auth/me", (body, headers) => {
               if (body.code == 0) {
                    appEnvironment.logInUser(body.data)
               } else
                    if (body.code == 1004) {
                         appEnvironment.logOutUser()
                    }
          })
     }, [])

     //----------

     let app = (
          <div className="app">
               <Navbar />
               <div className="content">
                    <Routes>
                         <Route path="/" element={<Home />} />
                         <Route path="/profile/:username" element={<Profile />} />
                         <Route path="/post/:postID" element={<PostViewer />}>
                              <Route path="comments">
                              </Route>
                         </Route>
                         <Route path='/new-post' element={<CreatePost />} />
                         <Route path="/search" element={<Search />}></Route>
                         <Route path="/edit-profile" element={<EditProfile />} />
                         <Route path="*" element={<Error />} />
                    </Routes>
               </div>

          </div>
     );

     let landingPage = (<Landing />);

     return (
          <AppContext.Provider value={appEnvironment}>
               <BrowserRouter>
                    {appEnvironment.userSession.isLoggedIn ? app : landingPage}
               </BrowserRouter>
          </AppContext.Provider>
     );
}

export default App;
