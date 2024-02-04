import './landing.css'
import Modal from '../components/modal/modal'
import { useState } from 'react'
import Login from './login/login';
import Register from './register/register'
import logo from '../assets/logo.png'
import mockup from './assets/final-removebg.png'
import { FaLinkedin, FaWhatsappSquare,  } from "react-icons/fa";
import { MdEmail, MdCall } from "react-icons/md";

export default function Landing() {
     const [loginModalState, setLoginModalState] = useState(false);
     const [registerModalState, setRegisterModalState] = useState(false);

     return (
          <div className="landing-page">
               <div className="header">
                    <div className="left">
                         <div>
                              <img src={logo} alt="" />
                         </div>
                         <h2>“Capture and share the world's moment”</h2>
                    </div>
                    <div className="right">
                         <span onClick={() => { setLoginModalState(true) }} className='btn btn-primary'>
                              Login
                         </span>
                         <span onClick={() => { setRegisterModalState(true) }} className='btn'>
                              Register
                         </span>
                    </div>
               </div>
               <div className="section-1">
                    <div className="sub-1">
                         Responsive UI
                    </div>
                    <h2 className="sub-2">
                        Works seamlessly on all devices 
                    </h2>
                    <div className="sub-3">
                         <img src={mockup} className="laptop"></img>
                    </div>
               </div>
               <div className="section-2">
                    <div className="sub-1">Feedback</div>
                    <h2 className="sub-2">Like this app? Share your thoughts</h2>
                    <div className="sub-3">
                         <input type="text" placeholder='Your name' />
                         <input type="text" placeholder='Your contact info: email/mobile' />
                         <textarea name="" id="" cols="30" rows="10" placeholder='feedback'></textarea>
                         <div className="btn btn-primary">Submit Feedback</div>
                    </div>
               </div>
               <div className="section-3">
                    <div className="sub-1">Contact</div>
                    <h2 className="sub-2">Get in touch</h2>
                    <div className="sub-3">
                         <a href="https://www.linkedin.com/in/r-kalai/" target="_blank">
                              <FaLinkedin/>    
                         </a>
                         <a href="https://wa.me/+917358229808" target="_blank">
                              <FaWhatsappSquare/>    
                         </a>
                         <a href="mailto:75kalai@gmail.com">
                              <MdEmail/>
                         </a>
                         <a href="tel:+917358229808">
                              <MdCall/>
                         </a>
                    </div>
               </div>

               <div className="section-end"></div>

               <Modal
                    heading={"Login to InstaTrend"}
                    isOpen={loginModalState}
                    onClose={() => { setLoginModalState(false) }}
               >
                    {/* LOGIN MODAL */}
                    <Login />
               </Modal>

               <Modal
                    heading={"Create an account"}
                    isOpen={registerModalState}
                    onClose={() => { setRegisterModalState(false) }}
               >
                    {/* REGISTER MODAL */}
                    <Register />
               </Modal>
          </div>
     )
}