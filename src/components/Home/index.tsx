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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrow: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <body>
      <Navbar />
      
      <h1>메인화면(넷플릭스 참고)</h1>


      
      <div>
        <h2>Computer Science</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black'}}>네트워크</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>운영체제</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>자료구조</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>알고리즘</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>데이터베이스</h3>
          </div>
        </Slider>
      </div>

      <div>
        <h2>basic</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black'}}>HTML5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>CSS3</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>JavaScript</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>6</h3>
          </div>
        </Slider>
      </div>

      <div>
        <h2>Library</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black'}}>React</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>VUE</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>Angular</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>6</h3>
          </div>
        </Slider>
      </div>

      <div>
        <h2>FrameWork</h2>
        <Slider {...settings}>
          <div>
            <h3 style={{border: '1px solid black'}}>React</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>VUE</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>Angular</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>4</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>5</h3>
          </div>
          <div>
            <h3 style={{border: '1px solid black'}}>6</h3>
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
            HWI ONE
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
