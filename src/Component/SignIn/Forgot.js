import React, {useState} from "react";
import axios from "axios";
import "./SignIn.css";
import { kMaxLength } from "buffer";
import userEvent from "@testing-library/user-event";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";


function Forgot () {
  // const history=useNavigate()
  const [email, setEmail] = useState ('');
  // console.log(email)
    const submitHandler = async() => { 
      const res=await axios({  
        method: 'post',
        url:"https://api.strategytool.io/forgot",
        headers: {},
        data: {
          email
        }  
      });
  
      console.log({res})
      if(res.status==200){
        // alert(res.data)
        console.log(res.data)
        // swal(res.data)
        // swal("" `Password Reset Link successfully to ${email}`, "success");
      }
    }
   

 return (
    <div className="background_color">
    <div className="outer">
  <div className="inner">
    <form>   
        <h3 className="outer robotic-font">Forgot Password</h3> 
        <div className="form-group">      
            <label className="robotic-font">Email</label>
            <input type="email" className="form-control" placeholder="Enter Email" id="email" onChange={(e)=>setEmail(e.target.value)} required/>
            <button type="submit" className="btn btn-dark btn-lg btn-block robotic-font" onClick={submitHandler}>Submit</button>
            </div>
            </form>
            </div>
            </div>
            </div>            
 )
 
}
export default Forgot;