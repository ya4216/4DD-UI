import React, { useEffect } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./home.scss";
import Carousel from "../../common/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { getSave } from "../../modules/unit";
import customAxios from "../../common/CustomAxios";

const Home = () => {

  const list = customAxios({ url: '/api/unit/title'});

  return (
    <> 
      <div className="home_search_bar_div">
        <input className="home_search_bar" placeholder="검색" type="text"/>
      </div>

      <Carousel props={list}/>
    </>
  );
}

export default Home;