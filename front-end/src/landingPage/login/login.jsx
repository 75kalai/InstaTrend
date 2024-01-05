import './login.css'
import { useContext, useRef } from 'react'
import { AppContext } from '../../App'

import apiUtil from '../../util/apiUtil'

export default function Login() {

     const appEnvironment = useContext(AppContext);
     const usernameRef = useRef()
     const passwordRef = useRef()

     function loginUser(username = null, password = null) {

          apiUtil.postAPI(
               '/api/v1/auth/login',
               {
                    // Use params if available, else use input value
                    username: username ? username : usernameRef.current.value,
                    password: password ? password : passwordRef.current.value
               },
               (data, headers) => {
                    // callback
                    appEnvironment.logInUser(data)
                    
               })
     }

     return (
          <div className="login-form">
               <h2>
                    Login to app
               </h2>
               <div className="username">
                    <label htmlFor="login-form-username">Username</label>
                    <input type="text" name="" id="login-form-username" placeholder="Enter username" ref={usernameRef} />
               </div>
               <div className="password">
                    <label htmlFor="login-form-password">Password</label>
                    <input type="password" name="" id="login-form-password" placeholder="Enter password" ref={passwordRef} />
               </div>
               <div className="btn btn-primary" onClick={loginUser}>
                    login
               </div>
               <hr />
               <div className="btn" onClick={() => { loginUser("kalai", "kalai") }}>
                    Login into test account "kalai"
               </div>
               <div className="btn">
                    Login into test account 2
               </div>
          </div>
     )
}