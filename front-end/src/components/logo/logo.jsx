import { useState, useEffect } from 'react';
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill } from 'react-icons/bs';
import './logo.css'

export default function Logo() {

     let [init, setInit] = useState(false);
     let [flag, setFlag] = useState(0);

     let timer;

     // useEffect(() => {

     //      if (!init) {
     //           // console.log('hit 1');
     //           // timer = 
     //           setInterval(() => {
     //                setFlag(flag+1);
     //                if (flag >= 3) {
     //                     setFlag(0);
     //                     console.log('33', flag);
     //                }
     //                console.log('hit2', flag);
     //           }, 1000)
     //           console.log('did Mount');
     //           setInit(true)
     //      }else{
     //           console.log('did Update');
     //      }

     //      // return ()=>{
     //      //      // clearInterval( timer );
     //      // }
     // }, [])
     

     function x(){
          setInterval( flag+1 );
     }

     return (
          <div className="logo" onClick={x}>
               {flag === 0 && <BsSuitClubFill className="logo-icon" />}
               {flag === 1 && <BsSuitDiamondFill className="logo-icon" />}
               {flag === 2 && <BsSuitHeartFill className="logo-icon" />}
               {flag === 3 && <BsSuitSpadeFill className="logo-icon" />}
          </div>
     )
}