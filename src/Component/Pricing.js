import React, { useEffect, useState, useContext } from "react";
import scroll_down from "../image/scroll-down.gif";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthTokenContext } from "../App";
import { API } from "../config";

const Pricing = (setAuthToken) => {
  const authToken = useContext(AuthTokenContext);
  const [platforms, setPlatforms] = useState([{}]);
  const [platformcnt, setPlatformcnt] = useState([]);
  const [type, type1] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userid, setUserId] = useState();
  const [setState] = useState();

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose2 = () => {
    setShow(false);
  };

  useEffect(() => {
    const userid = localStorage.getItem("user_id");
    if (userid == null) {
      navigate("/login");
    }
  });

  const fecthApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const listlen = data.length;
      var sub_array = [];
      for (var i = 0; i < listlen; i++) {
        var str = localStorage.getItem("uniqueid");
        // console.log(str, "ye hai kyabut");
        if (str != null) {
          var chanid = data[i]["id"];
          console.log(str, chanid, "ye dekh toh jara");
          let result1 = await fetch(`${API.localhost}/checkpt`, {
            method: "POST",
            body: JSON.stringify({ str, chanid }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data1 = await result1.json();
          if (data1 != "") {
            const listdata = data1[0];
            if (listdata.platform_purchase_id != "") {
              data[i]["pur_id"] = listdata.platform_purchase_id;
              data[i]["is_checked"] = 1;
            }
          } else {
            data[i]["is_checked"] = 0;
          }
        }
        sub_array.push(data[i]);
      }
      setPlatforms(sub_array);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthApiData(`${API.localhost}/pf_dt`);
    localStorage.removeItem("uniqueid");
  }, []);

  const savedHandler1 = async () => {
    var str = localStorage.getItem("uniqueid");
    let result = await fetch(`${API.localhost}/ps_cnt`, {
      method: "POST",
      body: JSON.stringify({ str }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    const cnt = data[0]["selected_count"];
    setPlatformcnt(cnt);
    type1(2);
  };

  function show3(e) {
    const checked = e.target.checked;
    console.log(checked, "check hua");
    const value = parseInt(e.target.value);
    if (checked == true) {
      savedHandler(value);
      savedHandler1();
      fecthApiData(`${API.localhost}/pf_dt`);
    }
  }

  function show1(e) {
    const value = parseInt(e.target.value);
    savedHandler2(value);
  }

  function handleSubmit() {
    var str = localStorage.getItem("uniqueid");
    if (type == "") {
      swal("Please Select Plan First");
    } else {
      var total = platformcnt * 405;
      var options = {
        key: "rzp_test_wwKeLsIebAHemk",
        key_secret: "ewOWjjIqKa42UoU2EX7WNtDu",
        amount: total * 100,
        currency: "INR",
        name: "Strategy Tool Project",
        description: "Wallet Recharge",
        handler: function (response) {
          const paymentid = response.razorpay_payment_id;
          getplatform(platformcnt, paymentid, str);
        },
        prefill: {
          name: "Harish Pawar",
          email: "harish@handsintechnology.com",
          contact: "9619358377",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  }

  function getplatform(platformcnt, paymentid, str) {
    var axios = require("axios");
    var data = JSON.stringify({
      str: str,
    });

    var config = {
      method: "post",
      url: `${API.localhost}/getplatformdt`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const platformid = response.data["0"]["channel_id"];
        insert_subscription(platformcnt, paymentid, platformid);
      })
      .catch(function (error) {});
  }

  function insert_subscription(platformcnt, paymentid, platformid) {
    const total = platformcnt * 405;
    const user_id = localStorage.getItem("user_id");
    const plan_name = platformid == null ? "Lifetime" : "Individual";
    const platform_id = platformid == null ? 0 : platformid;

    var axios = require("axios");
    var data = JSON.stringify({
      user_id: user_id,
      plan_name: plan_name,
      transaction_id: paymentid,
      amount: total,
      platforms: platform_id,
    });

    var config = {
      method: "post",
      url: `${API.localhost}/subscription`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(data, "ye hai kya");

    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          swal({
            title: "Wow!",
            text: "Plan Purchase Successfully!!!",
            type: "success",
          }).then(function () {
            check_subscription(user_id);
          });
        } else {
          swal({
            title: "Oops!",
            text: "Something Went Wrong Please Try Again!",
            type: "warning",
          }).then(function () {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "https://api.strategytool.io/#/Homepage";
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const check_subscription = async (userid) => {
    let result = await fetch(`${API.localhost}/subscriptiondt`, {
      method: "POST",
      body: JSON.stringify({ userid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data != "") {
      const platform_ids = data[0]["platforms"];
      localStorage.setItem("subscribe_platform_id", platform_ids);
      const token = sessionStorage.getItem("token");
      localStorage.setItem("token", token);
      sessionStorage.clear();
      navigate("/Homepage");
    } else {
      navigate("/Pricing");
    }
  };

  const savedHandler2 = async (value) => {
    let result = await fetch(`${API.localhost}/delpt`, {
      method: "POST",
      body: JSON.stringify({ value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (data) {
      savedHandler1();
      fecthApiData(`${API.localhost}/pf_dt`);
    }
  };

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  const savedHandler = async (value) => {
    var str = localStorage.getItem("uniqueid");
    if (str != null) {
      rString = str;
    } else {
      var rString = randomString(
        32,
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      );
      localStorage.setItem("uniqueid", rString);
    }
    if (platformcnt + 1 > 5) {
      handleShow();
      fecthApiData(`${API.localhost}/pf_dt`);
    } else {
      let result = await fetch(`${API.localhost}/purchaseplat`, {
        method: "POST",
        body: JSON.stringify({ value, rString }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
    }
  };

  function handleShow12() {
    setPlatformcnt(40);
    type1(1);
  }

  let textInput = React.createRef();
  const applycoupon = async () => {
    var str = localStorage.getItem("uniqueid");
  };

  return (
    <div>
      <div id="pricing">
        <div className="container">
          {/* <h3 className="pricing">Pricing</h3> */}
          <h4 className="pricing1">Get Started Now Pick a Plan </h4>
          <p className="pricing2">
            {/* Get the best ideas from the top market expert */}
          </p>
        </div>
        <div className="container pricing123">
          <div className="row">
            <div className="col-lg-6 first_divv">
              <h3 className="plan_price">
                Individual Plan (<span>$5</span> per platform)
              </h3>
              <p className="para_name">Select the platform of your choices</p>
              <hr className="hireee"></hr>
              <img className="scroll_downnnn" src={scroll_down} />
              <div className="row123">
                {platforms.map((data) => (
                  <div className="row">
                    {data.pur_id != null ? (
                      <div className="col-lg-3 check">
                        <input
                          type="checkbox"
                          className="checkboxses"
                          id="checkboxsas"
                          value={data.pur_id}
                          onClick={show1}
                          style={{ marginRight: "20px" }}
                          checked={data.is_checked}
                        />
                        <img
                          style={{ width: "48px" }}
                          src={"https://admin.strategytool.io/" + data.url}
                        />
                      </div>
                    ) : (
                      <div className="col-lg-3 check">
                        <input
                          type="checkbox"
                          className="checkboxses"
                          id="checkboxsas"
                          value={data.id}
                          onClick={show3}
                          style={{ marginRight: "20px" }}
                          checked={data.is_checked}
                        />
                        <img
                          style={{ width: "48px" }}
                          src={"https://admin.strategytool.io/" + data.url}
                        />
                      </div>
                    )}
                    <div className="col-lg-9">
                      <p className="titlesss123">{data.text}</p>
                      <p className="titlesss1234">{data.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 second_divv">
              <div className="verrr123">
                <h3 className="plan_price">
                  Life Time Plan (Just @ <span>$67</span>{" "}
                  <span className="fontsess">$165</span>)
                </h3>
                <p className="para_name">Get All Access 30+ Platform</p>
                <hr className="hireee"></hr>
                <div
                  style={{
                    marginLeft: "15px",
                    marginRight: "15px",
                    marginTop: "15px",
                  }}
                >
                  {platforms.slice(0, 40).map((data) => (
                    <img
                      style={{
                        marginRight: "15px",
                        width: "50px",
                        marginBottom: "2px",
                      }}
                      src={"https://admin.strategytool.io/" + data.url}
                    />
                  ))}
                  <p>
                    To stand out on social, you need the right strategies and
                    tools. With STRATEGY TOOL, you've got everything you need to
                    build your following and grow your brand across all digital
                    channels. We have the perfect Growth Hacks for your business
                    which you can implement on your OWN
                  </p>
                  <div>
                    <button className="robotic_submit" onClick={handleShow12}>
                      Submit For Life Time Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          size="sm"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Strategy Tool</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            (For Life Time Access Of The Social Media Platforms The Amount Will
            Be $ 67 ( INR 5427 ))
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose2}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="container checkoutabcd">
          <div className="row">
            <div className="col-lg-4">
              <div className="verrr">
                <h3 className="platform">Platform Selected</h3>
                <h4 className="platform12">
                  {platformcnt != "" ? platformcnt : 0}
                </h4>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="verrr">
                <h3 className="platform">Total Amount(in $)</h3>
                <h4 className="platform12">
                  {type == 1 ? 67 : platformcnt != "" ? platformcnt * 5 : 0} $
                </h4>
              </div>
            </div>
            {/* <div className="col-lg-3">
              <div className="verrr">
                <h3 className="platform">Promo Code</h3>
                <div style={{ display: "flex" }}>
                  <input
                    className="form-control"
                    placeholder="Enter the promo code"
                    ref={textInput}
                  />
                  <span>
                    <button className="apply_now" onClick={applycoupon}>Apply</button>
                  </span>
                </div>
              </div>
            </div> */}
            <div className="col-lg-4">
              <div className="verrr">
                <button className="checkouttt" onClick={handleSubmit}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
