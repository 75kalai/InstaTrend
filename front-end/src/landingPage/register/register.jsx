import './register.css'
import { useContext, useRef } from 'react'
import { AppContext } from '../../App'
import apiUtil from '../../util/apiUtil';
import { useNavigate } from 'react-router-dom';

export default function Register() {

     const navigate = useNavigate();

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
                    if( response.status==200 && body.code==0 ){
                         window.alert("Server says: "+body.message+ "\n You can login now.");    
                    }
               }
          )

     }

     return (
          <div className="register-form">

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