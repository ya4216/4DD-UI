import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./home.scss";
import Carousel from "../../common/Carousel";
import Axios from 'axios';

function Home() {

  useEffect(() => {
    Axios.get('/api/635fabf8bf0c844b8f72c097')
      .then(res => {
        console.log(res);
      })
  }, []);

  let propFunc = (num:number, title:string) => {
    type pType = {
      list : string[],
      option : string,
      title : string
    };

    let option = 'list';
    let arr: string[];

    if(num == 1){
      option = 'banners';
    }else {
      option = 'list';
    }

    //TODO : DB에서 가져오는걸로 바꿔야함
    let bnArr: string[] = ["새 강의", "공지사항", "이벤트"];
    let myArr: string[] = ["네트워크", "운영체제"];
    let csArr: string[] = ["네트워크", "운영체제", "자료구조", "알고리즘", "데이터베이스", "1", "2", "3", "4", "5", "6"];
    let basArr: string[] = ["HTML5", "CSS3", "JavaScript", "1", "2", "3", "4", "5", "6"];
    let libArr: string[] = ["React", "VUE", "Angular", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let fwArr: string[] = ["React", "VUE", "Angular", "1", "2", "3", "4", "5", "6"];

    if(title == ''){
      arr = bnArr;
    }else if(title == '내 컨텐츠'){
      arr = myArr;
    }else if(title == 'CS지식'){
      arr = csArr;
    }else if(title == '웹 기초'){
      arr = basArr;
    }else if(title == '라이브러리'){
      arr = libArr;
    }else if(title == '프레임워크'){
      arr = fwArr;
    }else{
      arr = [];
    }

    let props: pType = {
      list : arr, 
      option : option,
      title : title
    };

    return props;
  };

  return (
    <>
      <Navbar />
      
      <div className="home_search_bar_div">
        <input className="home_search_bar" placeholder="검색" type="text"/>
      </div>

      <Carousel {...propFunc(1, '')}/>

      <Carousel {...propFunc(2, '내 컨텐츠')}/>
      
      <Carousel {...propFunc(2, 'CS지식')}/>

      <Carousel {...propFunc(2, '웹 기초')}/>

      <Carousel {...propFunc(2, '라이브러리')}/>
      
      <Carousel {...propFunc(2, '프레임워크')}/>

      <h2>Vite + React + TS (Hamburger + Responsive + Router)</h2>

      <footer className="footer">
        <p className="footer-by">
          A project by{" "}
          <a
            href="https://naver.com/"
            rel="noopener"
            className="small-link"
          >
            TEAM 4DD
          </a>
          <a
            href="https://naver.com/"
            rel="noopener"
            target="_blank"
            className="no-link icon-twitter"
            aria-label="Follow me on Twitter"
          ></a>
        </p>
      </footer>
    </>
  );
}

export default Home;