import React from "react";
import Navbar from "../Navbar";
import "./home.scss";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  function SampleNextArrow() {
    return (
      <div style={{ position: 'absolute', top: -20, right: 5 }}>
            오른쪽
        </div>
    );
  }
  
  function SamplePrevArrow() {
    return (
      <div style={{ position: 'absolute', top: -20, left: 5 }}>
            왼쪽
        </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    draggable : true, 	//드래그 가능 여부 
    responsive: [ // 반응형 웹 구현 옵션
      {  
        breakpoint: 960, //화면 사이즈 960px
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:3,
          slidesToScroll: 3
        } 
      },
      { 
        breakpoint: 768, //화면 사이즈 768px
        settings: {	
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:2,
          slidesToScroll: 2
        } 
      }
    ]
  };

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed : 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable : true, 	//드래그 가능 여부 
    responsive: [ // 반응형 웹 구현 옵션
      {  
        breakpoint: 960, //화면 사이즈 960px
        settings: {
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:1,
          slidesToScroll: 1
        } 
      },
      { 
        breakpoint: 768, //화면 사이즈 768px
        settings: {	
          //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
          slidesToShow:1,
          slidesToScroll: 1
        } 
      }
    ]
  };

  return (
    <body>
      <Navbar />
      
    <div className="home_search_bar_div">
      <input className="home_search_bar" placeholder="검색" type="text"/>
    </div>

      {/* <h1>메인화면(넷플릭스 참고)</h1> */}
      <div>
        <Slider {...settings1}>
          <div>
            <div className="banners">새 강의</div>
          </div>
          <div>
            <div className="banners">공지사항</div>
          </div>
          <div>
            <div className="banners">이벤트</div>
          </div>
        </Slider>
      </div>


      
      <div>
        <h2>CS지식</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black', width: '85%', marginLeft: '22px'}}>네트워크</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%', marginLeft: '22px'}}>운영체제</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%', marginLeft: '22px'}}>자료구조</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%', marginLeft: '22px'}}>알고리즘</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%', marginLeft: '22px'}}>데이터베이스</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>1</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>2</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>3</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>5</h3>
          </div>
        </Slider>
      </div>

      <div>
        <h2>웹 기초</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>HTML5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>CSS3</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>JavaScript</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>6</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>7</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>8</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>9</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>10</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>11</h3>
          </div>
        </Slider>
      </div>

      <div>
        <h2>라이브러리</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>React</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>VUE</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>Angular</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>6</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>7</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>8</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>9</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>10</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>11</h3>
          </div>
        </Slider>
      </div>

      <div>
        <h2>프레임워크</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>React</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>VUE</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>Angular</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>6</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>7</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>8</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>9</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%'}}>10</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black', width: '85%', marginLeft: '26px'}}>11</h3>
          </div>
        </Slider>
      </div>







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
    </body>
  );
}

export default Home;
