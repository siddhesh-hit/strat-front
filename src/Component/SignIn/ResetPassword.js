import React, {useState} from "react";
import axios from "axios";
import "./SignIn.css";
import { kMaxLength } from "buffer";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
    const history=useNavigate()
const [password, setPassword] = useState ('');
const customURL = window.location.href;
  const params = new URLSearchParams(customURL.split("?")[1]);
  const ParamValue = params.get("id");
console.log({ParamValue})
    const submitHandler= async() => {   
     const res=await axios.post("https://api.strategytool.io//reset",{password,id:ParamValue})
     console.log(res)
     const {data,status}=res
     console.log(data,status)
     if(status===200){     
        alert(data)
        history("/login") 
     }
    }

 return (
    <div className="background_color">
    <div className="outer">
  <div className="inner">
        <h3 className="outer robotic-font">Reset Password</h3> 
        <div className="form-group">      
            <label className="robotic-font">Password</label>
            <input type="text" className="form-control"  placeholder="Enter Password" id="email" onChange={(e)=>setPassword(e.target.value)} required/>
            <button onClick={submitHandler} className="btn btn-dark btn-lg btn-block robotic-font">Submit</button>
            </div>
            </div>
            </div>
            </div>  
 )
 
}

export default ResetPassword;