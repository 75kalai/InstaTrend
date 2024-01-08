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
                    username,
                    password
               },
               (body, headers) => {
                    // callback
                    appEnvironment.logInUser(body.data)
                    
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
               <div className="btn btn-primary" onClick={
                    ()=>{
                         loginUser( usernameRef.current.value, passwordRef.current.value )
                    }
               }>
                    login
               </div>
               <hr />
               <div className="btn" onClick={() => { loginUser("kalai", "kalai") }}>
                    Login into test account "kalai"
               </div>
               <div className="btn" onClick={() => { loginUser("superstar", "rajiniKanth") }}>
                    Login into test account "superstar"
               </div>
          </div>
     )
}