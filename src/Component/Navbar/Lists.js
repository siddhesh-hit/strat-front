import React, { useReducer } from "react";
import { useEffect, useState } from "react";
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
import $, { post } from "jquery";
import { IoIosArrowDropleft } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
// import { IoIosArrowDropleft } from "react-icons/io";
// import { AiFillStar } from "react-icons/ai";
import Blank from "../../image/envelop.svg";
import { Reducer } from "./Reducer";
import Footerpage from "../Navbar/Cartpage";
import loading from "../image/loading.gif";

const List = () => {
  const [lists, setLists] = useState([]);
  const [show, toggleShow] = useState({});
  const [active, setActive] = useState();
  const [saved, setSaved] = useState([]);
  // const [clear, setClear] = useState([]);
  const [hot, setHot] = useState([]);
  const [isSavedClass, setIsSavedClass] = useState(false);

  // console.log({saveToggle})

  const [searchTerm, setSearchTerm] = useState("");
  const { state } = useLocation();
  const location = useLocation();
  let result = location.pathname;
  let channel = result.split("/")[1];
  let medium = result.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios
        .get(
          `https://admin.strategytool.io/api/lists?filters[channel][text]=${channel}&filters[medium][medium]=${medium}&populate=contentMedia&populate=contentMedia2&populate=contentMedia3&poulate=hot&&pagination[page]=1&pagination[pageSize]=150`
        )
        .then((res) => res.json())
        .then(Response);
      const { body } = Response;
      setPost(body);
      const listdt = data.data;
      const listlen = listdt.length;
      var sub_array = [];
      for (var i = 0; i < listlen; i++) {
        const list_id = listdt[i].id;
        const userid = localStorage.getItem("user_id");
        let result = await fetch("https://api.strategytool.io/checkdt", {
          method: "POST",
          body: JSON.stringify({ list_id, userid }),
          headers: {
            "Content-Type": "application/json",
          },
        });

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
        sub_array.push(listdt[i]);
      }
      // console.log(sub_array)
      setLists(sub_array);
      savedHandler5();
    };

    fetchData();
  }, []);

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
    let result = await fetch("https://api.strategytool.io/cartcnt", {
      method: "POST",
      body: JSON.stringify({ userid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    let result = await fetch("https://api.strategytool.io/delcartdt", {
      method: "POST",
      body: JSON.stringify({ cart_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    savedHandler5();
    setTimeout(
      function () {
        window.location.reload();
      }.bind(this),
      1000
    );
  };

  const savedHandler1 = async (list_id) => {
    const userid = localStorage.getItem("user_id");
    let result = await fetch("https://api.strategytool.io/cartdt", {
      method: "POST",
      body: JSON.stringify({ list_id, userid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    savedHandler5();
    setTimeout(
      function () {
        window.location.reload();
      }.bind(this),
      2000
    );
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

  return (
    <div>
      {/*start sidebar */}
      {/*start content*/}
      <main className="page-content">
        {post ? post : "loaing.gif"}
        {/*start email wrapper*/}
        <div className="email-wrapper">
          <div className="email-sidebar" id="hidden">
            <div className="email-sidebar-content">
              <div className="email-navigation">
                <div className="list-group list-group-flush">
                  <div className="box_fixed">
                    <div className="top_searchbar">
                      <div>
                        <form className="search_form">
                          <input
                            type="search"
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </form>
                      </div>
                      {/* onClick={setSaved(lists.attributes)} */}

                      {/* / className={e.saved ? "buttonActive" : "button"} */}

                      <div onClick={savedHandler5} className="buttonn">
                        <Link to="/Cartpage">
                          <div className="iconn">
                            <i className="fa fa-floppy-o"></i>
                          </div>
                        </Link>
                        <p className="count">
                          {localStorage.getItem("cart_cnt")}
                        </p>
                      </div>
                    </div>

                    <ButtonGroup aria-label="Basic example">
                      <Button
                        className="buttonGroup"
                        style={{
                          backgroundColor: "White",
                          color: "#2162E1",
                          border: "1px solid black",
                          marginRight: "8px",
                          borderRadius: "20px",
                          fontSize: "16px",
                          width: "46%",
                        }}
                      >
                        Trending
                      </Button>
                      <Button
                        className="buttonGroup"
                        style={{
                          backgroundColor: "White",
                          color: "#2162E1",
                          border: "1px solid black",
                          borderRadius: "20px",
                          fontSize: "16px",
                          width: "46%",
                          // marginBottom:"5px",
                          // marginTop:"5px"
                        }}
                        onClick={newResults}
                      >
                        New
                      </Button>
                    </ButtonGroup>
                  </div>

                  {lists
                    .filter((val) => {
                      if (searchTerm === "") {
                        return val;
                      } else if (
                        val.attributes.list
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((e) => {
                      const list = ReactHtmlParser(e.attributes.list);
                      //const listReverse = e.attributes.list.reverse()
                      const content = e.attributes.content;
                      const newContent = content.replace(/(<([^>]+)>)/gi, "");

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
          <div className="email-content">
            {/* <div> */}
            <button onClick={Show} className="show_lsit">
              <IoIosArrowDropleft />
            </button>

            <div className="email-read-box p-3">
              {lists.map((e) => {
                const list = ReactHtmlParser(e.attributes.list);
                const content = ReactHtmlParser(e.attributes.content);
                const content1 = ReactHtmlParser(e.attributes.content1);
                const img = e.attributes.contentMedia.data;
                const img1 = e.attributes.contentMedia2.data;
                const img2 = e.attributes.contentMedia3.data;
                const content2 = ReactHtmlParser(e.attributes.content2);
                const content3 = ReactHtmlParser(e.attributes.content3);

                // const photo = e.contentMedia.url;

                // console.log({ photo });
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
                        <hr />
                        <div className="email-read-content">
                          {/* <ReactMarkdown escapeHtml={false} >
                            {content}
                            </ReactMarkdown> */}
                          {content}

                          {img?.map((i) => {
                            if (i?.attributes?.ext === ".gif")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".png")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".jpg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".jpeg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".webp")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".PNG")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".svg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                            if (i?.attributes?.ext === ".mp4")
                              return (
                                <video
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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

                          {img1?.map((i) => {
                            if (i?.attributes?.ext === ".gif")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img1?.map((i) => {
                            if (i?.attributes?.ext === ".png")
                              return (
                                <img
                                  src={`https://admin.strategytool.ion/${i["attributes"]["url"]}`}
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
                          {img1?.map((i) => {
                            if (i?.attributes?.ext === ".jpg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img1?.map((i) => {
                            if (i?.attributes?.ext === ".jpeg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img1?.map((i) => {
                            if (i?.attributes?.ext === ".svg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img1?.map((i) => {
                            if (i?.attributes?.ext === ".mp4")
                              return (
                                <video
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          <p className="fontss">{content2}</p>

                          {img2?.map((i) => {
                            if (i?.attributes?.ext === ".gif")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img2?.map((i) => {
                            if (i?.attributes?.ext === ".png")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img2?.map((i) => {
                            if (i?.attributes?.ext === ".jpg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img2?.map((i) => {
                            if (i?.attributes?.ext === ".jpeg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img2?.map((i) => {
                            if (i?.attributes?.ext === ".svg")
                              return (
                                <img
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          {img2?.map((i) => {
                            if (i?.attributes?.ext === ".mp4")
                              return (
                                <video
                                  src={`https://admin.strategytool.io/${i["attributes"]["url"]}`}
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
                          <p
                            className="fontss"
                            style={{ paddingBottom: "30px" }}
                          >
                            {content3}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <img src={Blank} className="blank "></img>

            {/* </div> */}
          </div>

          {/*start email overlay*/}
          {/* <div className="overlay email-toggle-btn-mobile" /> */}
          {/*end email overlay*/}
        </div>
        {/*end email wrapper*/}

        {/* <Footerpage /> */}
      </main>
      {/*end page main*/}
      {/* <Footerpage/> */}
      {/* <div>
            <div class="footer1">
                <div className="row">
                    <div className="col-lg-3">
                    <button onClick={prevClickHandler} className="previous_strat">Previous Strategy</button>
                    </div>
                    <div className="col-lg-6">
                    <p className="text_abcdssases">Was this Strategy usefull?<button className="yes_no">yes</button> <button className="yes_no">No</button></p>
                    </div>
                    <div className="col-lg-3">
                    <button onClick={nextClickHandler} className="next_strat">Next Strategy</button>
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  );
};

export default List;
