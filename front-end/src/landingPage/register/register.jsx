import './register.css'
import { useContext, useRef } from 'react'
import { AppContext } from '../../App'

export default function Register() {

     const appEnvironment = useContext(AppContext);
     const username = useRef()
     const password = useRef()

     function registerUser() {

          fetch(appEnvironment.backendURL + '/api/v1/auth/register', {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({
                    username: username.current.value,
                    password: password.current.value
               })
          })
               .then((response) => {
                    response.json().then((data) => {
                         console.log("data", data);
                    })
               }).catch((err) => {
                    console.error(err);
               })
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