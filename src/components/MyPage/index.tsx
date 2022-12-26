import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./mypage.scss";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../../common/Carousel";
import { VscAccount } from "react-icons/vsc";
import BarChart from "../../charts/BarChart";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../modules";
import e from "express";
import { ButtonBase } from "@mui/material";

function MyPage() {  
  const userInfo = useSelector((state: RootState) => state.user.info);
  const { name, email } = userInfo;
  
  let navigate = useNavigate();  
  const [studyData, setStudyData] = useState([{}]);

  const propFunc = (title:string) => {
    type pType = {
      list : string[],
      option : string,
      title : string
    };

    let option = 'list';
    let arr: string[];

    //TODO : DB에서 가져오는걸로 바꿔야함
    let contents: string[] = ["네트워크", "운영체제", "알고리즘"];
    let interviews: string[] = ["배달의민족", "네이버", "SK하이닉스", "GS칼텍스"];
    let study: string[] = [];
    if(title == '내 컨텐츠'){
      arr = contents;    
    }else if(title == '모의면접 진행'){
      arr = interviews;
    }else if(title == '스터디 진행률'){
      arr = study;
    }else {
      arr = [];
    }

    let props: pType = {
      list : arr, 
      option : option,
      title : title
    };

    return props;
  };

  // useEffect(() => {
  //   // 게시판 불러오기
  //   BoardService.getPosts()
  //   .then(
  //     response => {
  //       let data = response.data.data;
  //       data.map((key: any, idx: number) => {          
  //         key.index = ++idx;
  //       })
        
  //       setRows(data);
  //     },
  //     error => {
  //       const resMessage = error.response.data?.message;
  //     }
  //   );
    
  // }, []);

  return (
    <body id="mypage">
      <div style={{marginTop: '70px'}}></div>
      <div className="title_container">
        <VscAccount className="account"></VscAccount>
        <span className="sub-title">{name}</span>
        <span className="sub-title">{email}</span>
      </div>
      <Carousel {...propFunc('내 컨텐츠')}/>      
      <Carousel {...propFunc('모의면접 진행')}/>
      <Carousel {...propFunc('스터디 진행률')}/>
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
    </body>
  );
}

export default MyPage;
