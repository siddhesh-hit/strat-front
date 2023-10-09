import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";
const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small mt-2">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid><p className="footer"> &copy; {new Date().getFullYear()} Copyright: <a href="#"> All Rights Reserved. Design & Developed by DIY Strategies</a></p>
         <Link to="/Privacypolicy" style={{ marginRight: 10,fontWeight: '500', color: "black", fontSize: 15 }}>Privacy Policy</Link>
         <Link to="/Termscondition" style={{ marginRight: 10,fontWeight: '500', color: "black", fontSize: 15 }}>Terms & Condition</Link>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
export default FooterPage;