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


// Entire front end app variables stored here
export const AppContext = createContext();

function App() {

     const [appEnvironment, setAppEnvironment] = useState({
          applicationName: "InstaBook",
          author: "kalai.r",
          userSession: {
               isLoggedIn: false,
               userData: null
          },
          __setUserData:(data)=>{
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
          refreshUserData: () => {
               apiUtil.getAPI("/api/v1/auth/me", null, (body, headers) => {
                    if (body.code == 0) {
                         appEnvironment.__setUserData(body.data)
                    } else if (body.code == 1004) {
                         appEnvironment.logOutUser()
                    }
               })
          }
     })

     //----------
     // const [isfirstRunTime, setIsFirstRunTime] = useState(true)

     useEffect(() => {
          // if (isfirstRunTime) {
          apiUtil.getAPI("/api/v1/auth/me", null, (body, headers) => {
               if (body.code == 0) {
                    appEnvironment.logInUser(body.data)
               } else
                    if (body.code == 1004) {
                         appEnvironment.logOutUser()
                    }
          })
          // setIsFirstRunTime(false)
          // }
     }, [])


     //----------

     let app = (
          <div className="app">
               <BrowserRouter>
                    <Navbar />
                    <div className="content">
                         <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/profile" element={<Profile profile={appEnvironment.userSession.userData} />} >
                                   {/* :id */}
                              </Route>
                              <Route path="/post/:postID" element={<PostViewer />}>
                                   <Route path="comments">
                                   </Route>
                              </Route>
                              <Route path='/new-post' element={<CreatePost />} />
                              <Route path="/search" element={<Search/>}></Route>
                              <Route path="*" element={<Error />} />
                         </Routes>
                    </div>
               </BrowserRouter>
               
          </div>
     );

     let landingPage = (<Landing />);

     return (
          <AppContext.Provider value={appEnvironment}>
               {appEnvironment.userSession.isLoggedIn ? app : landingPage}
          </AppContext.Provider>
     );
}

export default App;
