import React from "react";
// import Navbar from "../FrontPage/Navbar";
import Wavinghand from "../../icons/wavinghand.svg";
import Whatsapp from "../../icons/Whatsapp.svg";
import Youtude from "../../icons/Youtube.svg";
import Clubhouse from "../../icons/Clubhouse.svg";
import Craigslist from "../../icons/Craigslist.svg";
import Facebook from "../../icons/Facebook.svg";
import GitHub from "../../icons/GitHub.svg";
import Gmail from "../../icons/Gmail.svg";
import Google from "../../icons/Google.svg";
import Instagram from "../../icons/Instagram.svg";
import Linkedin from "../../icons/Linkedin.svg";
import Line from "../../icons/Line.svg";
import Medium from "../../icons/Medium.svg";
import Messenger from "../../icons/Messenger.svg";
import Pinterest from "../../icons/Pinterest.svg";
import ProductHunt from "../../icons/ProductHunt.svg";
import QQ from "../../icons/QQ.svg";
import Quora from "../../icons/Quora.svg" ;
import Reddit from "../../icons/Reddit.svg";
import Salesnavigator from "../../icons/Salesnavigator.svg";
import Slack from "../../icons/Slack.svg";
import SMS from "../../icons/SMS.svg";
import Snapchat from "../../icons/Snapchat.svg";
import Telegram from "../../icons/Telegram.svg";
import Tiktok from "../../icons/Tiktok.svg";
import Tumblr from "../../icons/Tumblr.svg";
import Twitter from "../../icons/Twitter.svg";
import Wechat from "../../icons/Wechat.svg";
import YellowPages from "../../icons/YellowPages.svg";
import NavHome from "../Navbar/NavHome";
import SearchbarHome from "../SearchBarHome/SearchBar";
import Banner from "./Banner";
import EmpowerTeam from "./EmpowerTeam";
import WhoItWork from "./WhoItWork";
import Footer from './Footer';
// import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap"
  rel="stylesheet"
></link>;
const SocialMedia = () => {
  const navigate = useNavigate();
  const All = () => {
    navigate("/");
  };
  return (
    <div className="Home_background">
      <NavHome />
      <h2 className="Landing-Page">
        <img src={Wavinghand} className="Wavinghand_space"></img>
        <b className="homepage_font padding-homepage">
          Hello, what are we creating today?
        </b>
      </h2>
      <p className="Landing-para homepage_font">
        Get started by selecting the idea type from the options below
      </p>
      <SearchbarHome />
      <div className="all_buttons container">
        <button className="btn-all homepage_font" onClick={All}>
          All
        </button>
        <button className="socialmedia-btn homepage_font">Social Media</button>
        <button className="socialmedia-btn homepage_font">Copywriting</button>
        <button className="socialmedia-btn homepage_font">SEO</button>
        <button className="socialmedia-btn homepage_font">E-Commerce</button>
        <button className="socialmedia-btn homepage_font">Product</button>
      </div>
      <div className="all-channels container">
        <div className="display-flex">
          <div className="display">
            <div className="icon">
              <img src={Linkedin}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">LinkedIn</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
          <div className="display">
            <div className="icon">
              <img src={Whatsapp}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Whatsapp</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
          <div className="display">
            <div className="icon">
              <img src={Youtude}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Youtube</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
        </div>
        <div className="display-flex">
          <div className="display">
            <div className="icon">
              <img src={Facebook}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Facebook</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
          <div className="display">
            <div className="icon">
              <img src={Instagram}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Instagram</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
          <div className="display">
            <div className="icon">
              <img src={Medium}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Medium</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
        </div>
        <div className="display-flex">
          <div className="display">
            <div className="icon">
              <img src={Snapchat}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Snapchat</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
          <div className="display">
            <div className="icon">
              <img src={Telegram}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Telegram</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
          <div className="display">
            <div className="icon">
              <img src={Tiktok}></img>
            </div>
            <div className="padd">
              <h6 className="channel_content_h6 homepage_font">Tiktok</h6>
              <p className=" homepage_font">
                Informative answers to your questions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Banner/>
    <EmpowerTeam/>
    <WhoItWork/>
    <Footer/>
    </div>
  );
};
export default SocialMedia;