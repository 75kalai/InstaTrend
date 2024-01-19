import './landing.css'
import Modal from '../components/modal/modal'
import { useState } from 'react'
import Login from './login/login';
import Register from './register/register'
 
export default function Landing (){
     const [loginModalState, setLoginModalState] = useState(false);
     const [registerModalState, setRegisterModalState] = useState(false);

     return (
          <div className="landing-page">
               <div className="header">
                    <div className="left">
                         <h2>InstaTrend</h2>
                    </div>
                    <div className="right">
                         <span onClick={()=>{setLoginModalState(true)}}>
                              Login
                         </span>
                         <span onClick={()=>{setRegisterModalState(true)}}>
                              Register
                         </span>
                    </div>
               </div>
               <div className="body"></div>

               <Modal 
                    heading={"Login to InstaTrend"}
                    isOpen={loginModalState} 
                    onClose={()=>{setLoginModalState(false)}}
               >
                    {/* LOGIN MODAL */}
                    <Login/>
               </Modal>

               <Modal 
                    heading={"Create an account"}
                    isOpen={registerModalState} 
                    onClose={()=>{setRegisterModalState(false)}}
               >
                    {/* REGISTER MODAL */}
                    <Register/>
               </Modal>
          </div>
     )
}