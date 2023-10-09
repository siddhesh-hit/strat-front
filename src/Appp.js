import  {useState} from 'react';
import {auth} from "../src/Component/firebase"
import {  RecaptchaVerifier , signInWithPhoneNumber} from "firebase/auth";

function Appp() {
    const [phoneNumber , setPhoneNumber] = useState("+91");
    const [expandForm ,setExpandForm] = useState(false);
    const [OTP , setOTP] = useState('')

    
 console.log(expandForm)

    const generateRecaptcha = () => {
      console.log("running")
      
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 
          
          "size":"invisible",
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log(response)
            }
          }, auth);
    }

    const requestOTP = (e) => {
        e.preventDefault()

        if(phoneNumber.length >= 10) {
            setExpandForm(true);
           generateRecaptcha();
           
           const appVerifier = window.recaptchaVerifier;
           console.log(auth)
           console.log(appVerifier)
           console.log(phoneNumber)
           
           signInWithPhoneNumber(auth ,phoneNumber, appVerifier)
           .then((confirmResult) => {
           
            window.confirmResult = confirmResult;
            console.log("success")
            
          }).catch((error) => {
           
            // window.recaptchaVerifier.render().then(widgetId => {
            //     window.recaptchaVerifier.reset(widgetId);
            //     console.log(widgetId)
              // });
            console.log(error)
           
          }
          );

          console.log(signInWithPhoneNumber)
        }

    }
    const verifyOtp = (e) => {
      e.preventDefault();
      let confirmResult = window.confirmResult;
      confirmResult
        .confirm(OTP)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("user succesfully entered", user);
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.log(error);
          // ...
        });
    };

  return <div>
<form onSubmit={requestOTP}>
    <h1>Sign with phoneNumber</h1>
    <div>
    
    <input className='form-control' type="tel" aria-describedby="email-help" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
    <div id='phoneNumberHelp' className='form-text'>please enter your phone number</div>
    </div>
    {expandForm === true ?
    <>
    <div>
    
    <input className='form-control' type="number" value={OTP} onChange={e => setOTP(e.target.value)} />
    <button onClick={verifyOtp}>verifyOtp</button>
    <div id='otpHelp' className='form-text'>please enter your otp</div>
    </div>
    </> 
    :
    null
    }
    {
        expandForm === false ?
        <button type='submit' className='btn'>Request OTP</button>
        : 
        null
    }
    
</form>

<div id='recaptcha-container'></div>

  </div>;
}

export default Appp;
