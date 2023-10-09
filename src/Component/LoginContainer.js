import React from 'react'
// import GoogleLoginComponent from './GoogleLogin'
// import GoogleLogin from 'react-google-login'
import Login from './SignIn/Login'


const LoginContainer=({setAuthToken})=>{

    return (
        <div>
            <Login setAuthToken={setAuthToken}/>
        </div>
    )
}

export default LoginContainer