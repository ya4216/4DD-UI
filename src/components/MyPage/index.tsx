import React, { useEffect, useState } from "react";
import "./mypage.scss";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import BarChart from "../../charts/BarChart";
import Carousel from "../../common/Carousel"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../modules";

type carouselForm = {
  category: string;
  menu_level: number;
  title: string;
  useYN: string;
  _id: string;
}

type unit = {
  category?: string;
  category_number?: number;
  _id: string;
  title: string;
  title_image_path?: string;
  useYN?: string;
  percent?: number;
}

function MyPage() {  
  const userInfo = useSelector((state: RootState) => state.user.info);
  const { name, email } = userInfo;
  const [data, setData] = useState<carouselForm[][]>([]);
  let navigate = useNavigate();  
  // const [chart, setChart] = useState<JSX.Element[]>([]);
  const [chart, setChart] = useState<unit[]>([]);
  
  useEffect(() => {    
    console.log("### userInfo : ", userInfo);
    if(userInfo.id){
      userInfo.user_sub_info.likes.length > 0 &&
      (userInfo.user_sub_info.likes[0].category = '좋아요');
      setData([userInfo.user_sub_info.likes]);
      barChart();
    }else{
      navigate('/login');
    }
  }, []);

  // 댓글 트리구조 만들기
  let innerHtml: JSX.Element[] = [];  
  const barChart = () => {
    // unit 9개마다 자르기
    let tmp: unit[] = [];
    // let groupTmp = [];
    // let cnt = 0;
    let tmpArr: any =  [];
    userInfo.user_sub_info.views.map((key: any)=>{
      //중복제거를 위해 임시적으로 작성
      !tmpArr.includes(key.unit.title) && 
      tmp.push({_id: key.unit._id, title: key.unit.title, [userInfo.name]: key.progress_rate});
      tmpArr.push(key.unit.title);
      // if(tmp.length%9 === 0){
      //   groupTmp.push(tmp);
      //   tmp = [];
      // }
      // cnt++;
    });
    // if(cnt !== 0 && cnt%9 !== 0) groupTmp.push(tmp); 
    
    // groupTmp.map((unit, idx)=>{
      // innerHtml.push(
      //   <BarChart key={idx} data={unit} />
      // );
    // });
    // setChart(innerHtml);
    setChart(tmp);
  }

  return (
    <div id="mypage">
      <div style={{marginTop: '70px'}}></div>
      <div className="title_container">
        <VscAccount className="account"></VscAccount>
        <span className="sub-title">{name}</span>
        <span className="sub-title">{email}</span>
      </div>
      <Carousel props={data} />
      <div className="contens_title">스터디 진행률</div>
      <div className="barchart_container">
        {/* {chart} */}
        <BarChart data={chart} />
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
