import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Wavinghand from "../../icons/wavinghand.svg";
import SearchbarHome from "../SearchBarHome/SearchBar";
import NavHome from "../Navbar/NavHome";
import { AuthTokenContext } from "../../App";
import "../HomePage/HomePage.css";
import Banner from "./Banner";
import EmpowerTeam from "./EmpowerTeam";
import WhoItWork from "./WhoItWork";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { API } from "../../config";
/* import { Twitter } from "@mui/icons-material"; */
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap"
  rel="stylesheet"
></link>;
function FrontPage({ setAuthToken }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [all, al] = useState([]);
  const [some, sm] = useState([]);
  const [cpw, cp] = useState([]);
  const [seo, se] = useState([]);
  const [ecom, ec] = useState([]);
  const [oth, ot] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetch(`${API.localhost}/all_platforms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      localStorage.setItem('data', JSON.stringify(data));
      al(data);
    }

    const fetchData1 = async () => {
      let result = await fetch(`${API.localhost}/sm_platforms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      localStorage.setItem('data', JSON.stringify(data));
      sm(data);
    }

    const fetchData2 = async () => {
      let result = await fetch(`${API.localhost}/cp_platforms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      localStorage.setItem('data', JSON.stringify(data));
      cp(data);
    }

    const fetchData3 = async () => {
      let result = await fetch(`${API.localhost}/seo_platforms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();
      localStorage.setItem('data', JSON.stringify(data));
      se(data);
    }

    const fetchData4 = async () => {
      let result = await fetch(`${API.localhost}/ecom_platforms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      localStorage.setItem('data', JSON.stringify(data));
      ec(data);
    }

    const fetchData5 = async () => {
      let result = await fetch(`${API.localhost}/oth_platforms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      localStorage.setItem('data', JSON.stringify(data));
      ot(data);
    }

    fetchData();
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
  }, [])
  
  const handlefilter = (e) => {
    if(e.target.value != '')
    {
      setSearchTerm(e.target.value);
    }
    else
    {
      setSearchTerm('');
    }
  }

  return (
    <div className="Home_background">
      {/* {(authToken.length !== 0) ? <Topbar /> : <NavHome />} */}
      <NavHome setAuthToken={setAuthToken}/>
      <div className="container">
        <h2 className="Landing-Page">
          <img src={Wavinghand} className="Wavinghand_space"></img>
          <span className="homepage_font padding-homepage">
            Hello, what are we creating today?
          </span>
        </h2>
        <p className="Landing-para homepage_font">
          Get started by selecting the idea type from the options below
        </p>
        <div>
        <div class="styles_searchContainer__BMCIH tw-text-t-black-50 tw-bg-white tw-border-gray-20 tw-border | tw-flex tw-items-center tw-justify-center | tw-pr-5 | tw-h-12">
          <button
            data-cy="search-button"
            class="styles_actionButton__7eSIr tw-flex tw-justify-center tw-items-center | tw-px-4 | tw-h-full">
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search">
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                stroke-width="1.333"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
          <input placeholder="Search content types like Facebook Ads, Blog ideas, SEO..." data-cy="search-input"
            class="tw-flex-1 | tw-h-full tw-w-full | tw-py-3 | focus:tw-outline-none" onInput={(e)=>handlefilter(e)} />
        </div>
    </div>
    </div>
      <div className="all_buttons container">
        <Tabs
          id="controlled-tab-example"
          className="mb-3">
          <Tab className="tabsss" eventKey="all" title="All">
            <div className="all-channels container">
              <div className="row">
                {all.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ){
                        return val;
                      }
                    }).map(data => (
                  <div className="col-lg-4">
                    <div className="display11">
                      <div className="icon"><img src={"https://admin.strategytool.io" + data.url} className="iconns"></img>
                      </div>
                      <div className="padd"> 
                        <h6 className="channel_content_h6 homepage_font">{data.text}</h6>
                        <p className=" homepage_font">{data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab className="tabsss" eventKey="social media" title="Social Media">
            <div className="all-channels container">
              <div className="row">
                {some.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ){
                        return val;
                      }
                    }).map(data => (
                  <div className="col-lg-4">
                    <div className="display11">
                      <div className="icon"><img src={"https://admin.strategytool.io" + data.url} className="iconns"></img>
                      </div>
                      <div className="padd">
                        <h6 className="channel_content_h6 homepage_font">{data.text}</h6>
                        <p className=" homepage_font">{data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab className="tabsss" eventKey="copywriting" title="Copywriting">
            <div className="all-channels container">
              <div className="row">
                {cpw.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ){
                        return val;
                      }
                    }).map(data => (
                  <div className="col-lg-4">
                    <div className="display11">
                      <div className="icon"><img src={"https://admin.strategytool.io" + data.url} className="iconns"></img>
                      </div>
                      <div className="padd">
                        <h6 className="channel_content_h6 homepage_font">{data.text}</h6>
                        <p className=" homepage_font">{data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab className="tabsss" eventKey="seo" title="SEO">
            <div className="all-channels container">
              <div className="row">
                {seo.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ){
                        return val;
                      }
                    }).map(data => (
                  <div className="col-lg-4">
                    <div className="display11">
                      <div className="icon"><img src={"https://admin.strategytool.io" + data.url} className="iconns"></img>
                      </div>
                      <div className="padd">
                        <h6 className="channel_content_h6 homepage_font">{data.text}</h6>
                        <p className=" homepage_font"> {data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab className="tabsss" eventKey="e-commerce" title="E-Commerce">
            <div className="all-channels container">
              <div className="row">
                {ecom.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ){
                        return val;
                      }
                    }).map(data => (
                  <div className="col-lg-4">
                    <div className="display11">
                      <div className="icon"><img src={"https://admin.strategytool.io" + data.url} className="iconns"></img>
                      </div>
                      <div className="padd">
                        <h6 className="channel_content_h6 homepage_font">{data.text}</h6>
                        <p className=" homepage_font">{data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          <Tab className="tabsss" eventKey="other" title="Others">
            <div className="all-channels container">
              <div className="row">
                {oth.filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.text
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                          ){
                        return val;
                      }
                    }).map(data => (
                  <div className="col-lg-4">
                    <div className="display11">
                      <div className="icon"><img src={"https://admin.strategytool.io" + data.url} className="iconns"></img>
                      </div>
                      <div className="padd">
                        <h6 className="channel_content_h6 homepage_font">{data.text}</h6>
                        <p className=" homepage_font">{data.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
      <Banner />
      <EmpowerTeam />
      <WhoItWork />
      <Footer />
    </div>
  )
}
export default FrontPage;
