import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../Navbar";
import "./mypage.scss";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { VscAccount } from "react-icons/vsc";
import BarChart from "../../charts/BarChart";
import Carousel from "../../common/Carousel"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../modules";
import e from "express";
import { ButtonBase } from "@mui/material";

type carouselForm = {
  category: string;
  menu_level: number;
  title: string;
  useYN: string;
  _id: string;
}

function MyPage() {  
  const userInfo = useSelector((state: RootState) => state.user.info);
  const { name, email } = userInfo;
  const [data, setData] = useState<carouselForm[][]>([]);
  let navigate = useNavigate();  
  
  useEffect(() => {
    setData([[{
      category: "Likes",
      menu_level: 1,
      title: "자식들 이름",
      useYN: "Y",
      _id: "1"
    }]]);    
  }, []);

  return (
    <div id="mypage">
      <div style={{marginTop: '70px'}}></div>
      <div className="title_container">
        <VscAccount className="account"></VscAccount>
        <span className="sub-title">{name}</span>
        <span className="sub-title">{email}</span>
      </div>
      <Carousel props={data} />
      <div className="barchart_container">
        <BarChart isFirst= {true}/>
        <BarChart isFirst= {false}/>
      </div>
      {/* <div>
        <div>
          공지사항
        </div>
        <div>
          Q & A
        </div>
      </div> */}
    </div>
  );
}

export default MyPage;
