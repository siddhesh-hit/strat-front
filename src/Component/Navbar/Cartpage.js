import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthTokenContext } from "../../App";
import { ImCross } from "react-icons/im";
import { BsBoxArrowRight } from "react-icons/bs";
import Nav_toggle from "../Nav-toggle";
import Channel from "../Channels/Channel";
import Medium from "../Mediums/Mediums";
import axios from "axios";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./Lists.css";
import envelop from "../../image/33.png";
import { Buffer } from "buffer";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import $ from "jquery";
import { IoIosArrowDropleft } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
// import { IoIosArrowDropleft } from "react-icons/io";
// import { AiFillStar } from "react-icons/ai";
import Blank from "../../image/homepage.gif";
import Blank1 from "../../image/empty-wishlist.png";
import { Reducer } from "./Reducer";
import Footerpage from "../Navbar/Cartpage";
import FadeLoader from "react-spinners/FadeLoader";
import Strategy from "../../icons/Strategy.png";
import { API } from "../../config";
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap"
  rel="stylesheet"
></link>;

const Cartpage = ({ setAuthToken }) => {
  const authToken = useContext(AuthTokenContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (authToken.length === 0) {
      window.location.href = "/";
    }
  });

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [shows, setShows] = useState(true);
  const [lists, setLists] = useState([]);
  const [show, toggleShow] = useState({});
  const [active, setActive] = useState();
  const [saved, setSaved] = useState([]);
  // const [clear, setClear] = useState([]);
  const [hot, setHot] = useState([]);
  const [isSavedClass, setIsSavedClass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // console.log({saveToggle})

  const [searchTerm, setSearchTerm] = useState("");

  const { state } = useLocation();

  const location = useLocation();

  let result = location.pathname;

  let channel = result.split("/")[1];

  let medium = result.split("/")[2];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userid = localStorage.getItem("user_id");
    let result = await fetch(
      `${API.localhost}/checkdata`,
      {
        method: "POST",
        body: JSON.stringify({ userid }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();

    const list_id = data[0].list_id;
    let result1 = await fetch(
      `${API.localhost}/listdt`,
      {
        method: "POST",
        body: JSON.stringify({ list_id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const listdt = await result1.json();
    const listlen = listdt.length;
    var sub_array = [];
    for (var i = 0; i < listlen; i++) {
      const list_id = listdt[i].id;
      const userid = localStorage.getItem("user_id");
      let result = await fetch(
        `${API.localhost}/checkdt`,
        {
          method: "POST",
          body: JSON.stringify({ list_id, userid }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      if (data != "") {
        const listdata = data[0];
        if (listdata.cart_id != "") {
          listdt[i]["cart_id"] = listdata.cart_id;
          listdt[i]["is_active"] = 1;
        }
      } else {
        listdt[i]["is_active"] = 0;
      }

      let result3 = await fetch(
        `${API.localhost}/filesdt`,
        {
          method: "POST",
          body: JSON.stringify({ list_id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data1 = await result3.json();
      listdt[i]["contentMedia"] = data1;
      sub_array.push(listdt[i]);
      setIsLoading(true)


    }
    setLists(sub_array);
    setIsLoading(false)
    savedHandler5();
  };

  const elementSavedHandler = (e) => {
    const output = saved.filter((saveElement) => saveElement.id === e.id);
    if (e.cart_id != null) {
      savedHandler4(e.cart_id);
    } else {
      savedHandler1(e.id);
    }

    if (output.length === 0) {
      setSaved((prev) => [...prev, e]);
      lists.reduce((acc, curr) => {
        if (curr.id === e.id) {
          curr.saved = true;
        }
        acc = [...acc, curr];
        return acc;
      }, []);
    } else {
      const result = saved.filter((saveElement) => saveElement.id !== e.id);
      setSaved(result);
      lists.reduce((acc, curr) => {
        if (curr.id === e.id) {
          curr.saved = false;
        }
        acc = [...acc, curr];
        return acc;
      }, []);
    }
  };   

  const savedHandler5 = async () => {
    const userid = localStorage.getItem("user_id");
    let result = await fetch(
      `${API.localhost}/cartcnt`,
      {
        method: "POST",
        body: JSON.stringify({ userid }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    if (data != "") {
      const cartdata = data[0];
      if (cartdata.cart_cnt > 0) {
        var crt_cnt = cartdata.cart_cnt;
        localStorage.setItem("cart_cnt", crt_cnt);
      } else {
        var crt_cnt = 0;
        localStorage.setItem("cart_cnt", crt_cnt);
      }
    } else {
      var crt_cnt = 0;
      localStorage.setItem("cart_cnt", crt_cnt);
    }
  };

 

  const savedHandler4 = async (cart_id) => {
    let result = await fetch(
      `${API.localhost}/delcartdt`,
      {
        method: "POST",
        body: JSON.stringify({ cart_id }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();
    if (data) {
      savedHandler5();
      fetchData();
    }
  };

  const savedHandler1 = async (list_id) => {
    const userid = localStorage.getItem("user_id");
    let result = await fetch(
      `${API.localhost}/cartdt`,
      {
        method: "POST",
        body: JSON.stringify({ list_id, userid}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await result.json();
    if (data) {
      savedHandler5();
      fetchData();
    }
  };

  const newResults = () => {
    const output = lists.reduce((acc, curr, index) => {
      acc[lists.length - index - 1] = curr;
      return acc;
    }, []);
    setLists(output);
  };

  const Hidden = () => {
    if ($(window).width() < 600) {
      document.getElementById("hidden").style.display = "none";
    } else {
      document.getElementById("hidden").style.display = "block";
    }
  };

  const Show = () => {
    document.getElementById("hidden").style.display = "block";
  };

  const comp = () => {


    const backclick = () => {
    }

    const listlen = lists.length;



    return (
      <div className="no_scroll">
        <div className="wrapper">
          {/* <Topbar setAuthToken={setAuthToken} /> */}

          <header className="top-header">
            <nav className="navbar navbar-expand" style={{ left: "65px" }}>
              <button onClick={logOut} className="logout">
                <span>Logout</span>
                <span className="logout_arrow">
                  <BsBoxArrowRight />
                </span>
              </button>
              <Link to="/Homepage">
              <img src={Strategy} width="100" alt="STRATEGY TOOL" />
              <button className="robotic_back" onClick={"backclick"}>Go Back</button>
              </Link>
            </nav>
          </header>
          <aside
            className="sidebar-wrapper"
            style={{ width: "65px", display: shows ? "block" : "none" }}
          >
            <div className="iconmenu">
              <Nav_toggle />

              {/* <Channel/> */}
            </div>

            {/* <Medium/> */}
          </aside>

          <div>
            {/*start sidebar */}
            {/*start content*/}
            <main className="page-content" style={{ marginLeft: "55px" }}>
              {/*start email wrapper*/}
              {isLoading ? 
          <div className='loading2'>
            <FadeLoader color={"#1F34E9"}  loading={isLoading} size={40} className="loader"/>
          </div>     
         :
              <div className="email-wrapper">
                <div className="email-sidebar" id="hidden"  style={{ display: listlen > 0  ? 'block': 'none'}} >
                  <div className="email-sidebar-content">
                    <div className="email-navigation">
                      <div className="list-group list-group-flush">
                        <div className="box_fixed">
                          <div className="top_searchbar">
                            {/* onClick={setSaved(lists.attributes)} */}

                            {/* / className={e.saved ? "buttonActive" : "button"} */}

                            <div className="buttonn">
                              <Link to="/Cartpage">
                                <div className="iconn caertt">
                                  <i className="fa fa-floppy-o"></i>
                                </div>
                              </Link>
                              <p className="count">
                                {localStorage.getItem("cart_cnt")}
                              </p>
                            </div>
                          </div>
                        </div>

                        {lists
                          .filter((val) => {
                            if (searchTerm === "") {
                              return val;
                            } else if (
                              val.list
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((e) => {
                            const list = ReactHtmlParser(e.list);
                            //const listReverse = e.attributes.list.reverse()
                            const content = e.content;
                            const newContent = content.replace(
                              /(<([^>]+)>)/gi,
                              ""
                            );

                            return (
                              <div
                                className="list-height"
                                style={{ cursor: "pointer" }}
                              >
                                <li
                                  href="javascript:;"
                                  className="list-group-item  align-items-center fontss list-hover"
                                  data-bs-toggle="pill"
                                  style={
                                    e.id === active
                                      ? {
                                          backgroundColor: "#D5E0F1",
                                          // borderLeft:"4px solid #03a9f4"
                                        }
                                      : null
                                  }
                                  // style={{margin: '10px',
                                  //   borderRadius: '8px',
                                  //   backgroundColor: 'aliceblue',
                                  //   }}
                                  onClick={() => {
                                    toggleShow({ id: e.id });
                                    setActive(e.id);
                                  }}
                                >
                                  <div key={e.id} className="box">
                                    <div onClick={Hidden}>
                                      <p
                                        className="list-para1"
                                        style={{
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          display: "-webkit-box",
                                          WebkitLineClamp: 2 /* number of lines to show */,
                                          lineClamp: 2,
                                          WebkitBoxOrient: "vertical",
                                        }}
                                      >
                                        {list}
                                      </p>

                                      <p className="List-para">{newContent}</p>
                                    </div>

                                    {/* <div class="button1"> 
                                <div class="iconn1">  
                                  <i class="fa fa-trash"></i> 
                                  </div>  
                              </div> */}

                                    <div
                                      onClick={() => {
                                        elementSavedHandler(e);
                                      }}
                                      className={
                                        e.saved
                                          ? "buttonActive"
                                          : e.is_active == 1
                                          ? "buttonActive"
                                          : "button"
                                      }
                                    >
                                      <div class="iconn">
                                        <i class="fa fa-floppy-o"></i>
                                      </div>
                                    </div>

                                    {/* <p className="save-btn">Save Button</p> */}
                                    {/* </p> */}
                                  </div>
                                </li>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="email-content" style={{ marginLeft: listlen > 0  ? '280px': '0px'}}>
                  {/* <div> */}
                  <button onClick={Show} className="show_lsit">
                    <IoIosArrowDropleft />
                  </button>
                  {lists.length ? 
                  <div className="email-read-box p-3">
                    {lists.map((e) => {
                      const list = ReactHtmlParser(e.list);
                      const content = ReactHtmlParser(e.content);
                      const content1 = ReactHtmlParser(e.content1);
                      const content2 = ReactHtmlParser(e.content2);
                      const content3 = ReactHtmlParser(e.content3);
                      const img = e.contentMedia;
                      return (
                        <div>
                          {e.id === show.id && (
                            <div>
                              {/* <div className="d-flex">
                          <span className="whislist_star"><AiFillStar/></span> <span className="page_number">1/100</span>
                        </div>*/}

                              {/*<hr style={{marginTop:"35px"}}/>*/}
                              <h4 key={e.id} className="fontss">
                                {list}
                              </h4>
                              <div className="email-read-content">
                                {content}
                                {img?.map((i) => {
                                  if (i?.ext === ".gif")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".png")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".jpg")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".jpeg")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".webp")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".PNG")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".svg")
                                    return (
                                      <img
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></img>
                                    );
                                })}
                                {img?.map((i) => {
                                  if (i?.ext === ".mp4")
                                    return (
                                      <video
                                        src={`https://admin.strategytool.io/${i["url"]}`}
                                        autoPlay
                                        controls
                                        style={{
                                          width: "70%",
                                          marginRight: "5px",
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          marginTop: "10px",
                                          marginBottom: "1rem",
                                        }}
                                      ></video>
                                    );
                                })}
                                <p className="fontss">{content1}</p>
                                <p className="fontss">{content2}</p>
                                <p
                                  className="fontss"
                                  style={{ paddingBottom: "30px" }}
                                >
                                  {content3}
                                </p>
                              </div>
                              <hr />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div> : 
                    <div>
                       <img src={Blank1} className="blank" style={{ display: listlen > 0  ? 'none': 'block'}}></img>
                    </div>
                  }
                  <img src={Blank} className="blank" style={{ display: listlen > 0  ? 'block' : 'none'}}></img>

                  {/* </div> */}
                </div>

                {/*start email overlay*/}
                {/* <div className="overlay email-toggle-btn-mobile" /> */}
                {/*end email overlay*/}
              </div>
              }
              {/*end email wrapper*/}

             
            </main>
           
          </div>
        </div>
      </div>
    );
  };

  return <>{comp()}</>;
};

export default Cartpage;
