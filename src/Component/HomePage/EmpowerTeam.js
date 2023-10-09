import React from "react";
import {Row,Col} from 'react-bootstrap';
import './FrontPageBanner.css';
import Laptop_Empower from "../../LandingPageIcon/Laptop_Empower.png";
import Metric from '../../LandingPageIcon/Metric.png';
import Colaborate from '../../LandingPageIcon/Colaborate.png';
import Plan from '../../LandingPageIcon/Plan.png';
import Ideas from '../../LandingPageIcon/Ideas.png';
import Tasks from '../../LandingPageIcon/Tasks.png';
import Track from '../../LandingPageIcon/Track.png';
import Integrate from '../../LandingPageIcon/Integrate.png';
import Build from '../../LandingPageIcon/Build.png';
import Progress from '../../LandingPageIcon/Progress.png';
import power from '../../LandingPageIcon/power.png'
import { useNavigate } from "react-router-dom";
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap" rel="stylesheet"></link>





function EmpowerTeam () {

  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/Contactus")
  }


  return (
    <div className="empower_bgcolor">
      <div className="container">
      <Row>
        <Col lg={6} className="order-md-1">
        <img src={Laptop_Empower} className="Laptop_Empower"></img>
        </Col>
        <Col lg={6}  className="empower_header order-md-2">
          <h3 className="homepage_font empower_title">Empower Your Team  to Suggest and Test the Ideas</h3>
          <p className="homepage_font empowe_para">
            With Strategy Tool, you can centralize idea suggestions, allowing
            any team member to suggest out-of-the-box ideas that can be refined
            with data, compared against your knowledge base, and prioritized
            according to your own criteria and current goals.
          </p>
          <button className="contact_us homepage_font" onClick={submitHandler}>Contact us</button>
        </Col>
      </Row>
      </div>
      <div>
        <h2 className="tool_icon homepage_font">With Strategy Tool you will get</h2>
        <div className="container tool_icon">
        <Row>
          <Col lg={4}>
          <img src={Metric} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Strategy and Metrics Dashboards</h6>
          </Col>
          <Col lg={4}>
          <img src={Colaborate} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Invite Your Team to Collaborate</h6>
          </Col>
          <Col lg={4}>
          <img src={Plan} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Play Your Experiment Hypothesis</h6>
          </Col>
          <Col lg={4}>
          <img src={Ideas} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Prioritize Ideas</h6>
          </Col>
          <Col lg={4}>
          <img src={Tasks} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Assign Tasks</h6>
          </Col>
          <Col lg={4}>
          <img src={Track} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Track Experiments Status</h6>
          </Col>
          <Col lg={4}>
          <img src={Integrate} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Integrate Your Growth Stack</h6>
          </Col>
          <Col lg={4}>
          <img src={Build} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Build a learning Centre</h6>
          </Col>
          <Col lg={4}>
          <img src={Progress} className="icon_img"></img><br/>
          <h6 className="homepage_font icon_title">Report on Your Progress</h6>
          </Col>
        </Row>
        </div>
      </div>
    </div>
  );
};
export default EmpowerTeam;