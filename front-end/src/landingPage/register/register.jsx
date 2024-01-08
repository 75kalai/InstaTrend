import './register.css'
import { useContext, useRef } from 'react'
import { AppContext } from '../../App'
import apiUtil from '../../util/apiUtil';

export default function Register() {

     const appEnvironment = useContext(AppContext);
     const username = useRef()
     const password = useRef()

     function registerUser() {

          apiUtil.postAPI(
               "/api/v1/auth/register",
               {
                    username: username.current.value,
                    password: password.current.value
               },
               (body, response)=>{
                    console.log('body:', body);
                    console.log('response', response);
               }
          )

     }

     return (
          <div className="register-form">

               <h2>
                    Create an account
               </h2>

               <div className="username">
                    <label htmlFor="register-form-username">Username</label>
                    <input type="text" id="register-form-username" placeholder="Enter username" ref={username} />
               </div>

               <div className="password">
                    <label htmlFor="register-form-password">Password</label>
                    <input type="password" id="register-form-password" placeholder="Enter password" ref={password} />
               </div>

               <div className="btn btn-primary" onClick={registerUser}>
                    Register
               </div>
          </div>
     )
}