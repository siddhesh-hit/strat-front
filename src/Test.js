import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Channels from "../src/Component/Channels/Channel";
const Mediums = () => {
  const [mediums, setMediums] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log({ state });
  console.log({ mediums });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:4241/`
      );
      setMediums(data);
      console.log(data);
    };
    fetchData();
  }, [state]);
  
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Channels />

         {/* <Routes>
        
        <Route path='/facebook' element={<Mediums />} />
            <Route path='/twitter' element={<Mediums />} />
            <Route path='/instagram' element={<Mediums />} />
            <Route path='/pinterest' element={<Mediums />} />
            <Route path='/whatsapp' element={<Mediums />} />
            <Route path='/facebook/ads' element={<List />} />
            <Route path='/facebook/story' element={<List />} />
            <Route path='/facebook/reels' element={<List />} />
            <Route path='/facebook/profile' element={<List />} />
            <Route path='/facebook/post' element={<List />} />
            <Route path='/instagram/story' element={<List />} />
            <Route path='/instagram/reels' element={<List />} />
            <Route path='/instagram/post' element={<List />} />
            <Route path='/instagram/ads' element={<List />} />
            <Route path='/twitter/ads' element={<List />} />
            <Route path='/twitter/tweet' element={<List />} />
            <Route path='/pinterest/ads' element={<List />} />
        </Routes> */}
      </div>
     
    </div>
  );


  {hot.map((e) => {
    const list = e.attributes.list;
    const content = e.attributes.content;
{if(newHot){

    return (

      
      <div className="list-height">
      <li
        href="javascript:;"
        className="list-group-item  align-items-center fontss list-hover"
        data-bs-toggle="pill"
        onClick={() => { 

         toggleShow({ id: e.id });
         setActive(list);
        }}
        style={list === active ? {backgroundColor: '#D5E0F1'} : null}
      >
        <div key={e.id} className="box">
          <p className="list-para1">{list}</p>

          <p className="List-para">{content}</p>
          <div onClick={() => elementSavedHandler(e)}  
            className={e.saved ? "buttonActive" : "button"} >
            <div class="iconn">
              <i class="fa fa-floppy-o"></i>
            </div>
          </div>
          {/* <p className="save-btn">Save Button</p> */}
          {/* </p> */}
        </div>
      </li>
    </div>
    )

      }}

  })}





};
export default Mediums;
