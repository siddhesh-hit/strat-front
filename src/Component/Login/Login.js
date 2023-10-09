
import  {useState}  from 'react';
import {auth} from "../firebase"
import {  RecaptchaVerifier , signInWithPhoneNumber} from "firebase/auth";
import PhoneInput from 'react-phone-number-input'
import OTPInput, { ResendOTP } from "otp-input-react";
import axios from 'axios';
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import LoginImg from "../../image/login.svg";
import "./Login.css"

const Login = () => {
  
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('')

   const navigate = useNavigate();

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

    if(phoneNumber.length>= 10) {
        setExpandForm(true);
       generateRecaptcha();
       
       const appVerifier = window.recaptchaVerifier;
       console.log(auth)
       console.log(appVerifier)
       console.log(phoneNumber)
       
       signInWithPhoneNumber(auth, phoneNumber, appVerifier)
       .then((confirmResult) => {
       
        window.confirmResult = confirmResult;
        console.log("success")
        
      }).catch((error) => {
       
        window.recaptchaVerifier.render().then(widgetId => {
            window.recaptchaVerifier.reset(widgetId);
            console.log(widgetId)
          });
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
      console.log(user.phoneNumber)
       navigate(`/Login`);
    
      // ...
    })
    .catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error);
      // ...
    });
};
  
  
  
  return (
  <div className="backgroundcolor">
    <div className="form">
    <h4 className="login-h4">Welcome to Strategy Tool</h4>
      <Formik>
          <form onSubmit={requestOTP}>
            <input
            international
            defaultCountry="IN"
              type="tel"
               aria-describedby="email-help"
                value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 className='login_Phone_Number'
            />
            <div id='phoneNumberHelp' className='form-text'>please enter your phone number</div>
            <br/>
            <br/>
            {expandForm === true ?
    <>
    <div>
    
    <input numInputs={6} className='form-control' type="number" value={OTP} onChange={e => setOTP(e.target.value)} />
    <button onClick={verifyOtp}>verifyOtp</button>
    <div id='otpHelp' className='login-btn'>please enter your otp</div>
    </div>
    </> 
    :
    null
    }
            {
        expandForm === false ?
        <button type='submit' className='otp_btn'>Request OTP</button>
        : 
        null
    }
          </form>
        
      </Formik>
    </div>
    {/* <img src={LoginImg} className="bgimg"></img> */}
    <div id='recaptcha-container'></div>
  </div>
)};
export default Login;