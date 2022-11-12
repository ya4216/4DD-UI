import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./home.scss";
import Carousel from "../../common/Carousel";
import Axios from 'axios';
import { useAsync } from "react-async";
import { Link } from "react-router-dom";

//TODO
// import { BiMenuAltRight } from "react-icons/bi";
// import { AiOutlineClose } from "react-icons/ai";
// import "../Navbar/navbar.scss";

const getUnitTitle = async () => {
    try{
      const res = await Axios.get('/api/unit/title');
      return res.data.data;
    }catch(err){
      console.log("error!!! : ", err);
    }
}

const Home = () => {

  //TODO
  // const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // const [size, setSize] = useState({
  //   width: 0,
  //   height: 0,
  // });
  // useEffect(() => {
  //   if (size.width > 768 && menuOpen) {
  //     setMenuOpen(false);
  //   }
  // }, [size.width, menuOpen]);
  // const menuToggleHandler = () => {
  //   setMenuOpen((p) => !p);
  // };




  const {
      data: list,
      error,
      isLoading
  } = useAsync({
      promiseFn: getUnitTitle
  });

  if (isLoading) return null;
  if (error) return null;
  if (!list) return null;

  return (
    <> 
      <div className="home_search_bar_div">
        <input className="home_search_bar" placeholder="검색" type="text"/>
      </div>

      <Carousel {...list}/>

      {/* <h2>Vite + React + TS (Hamburger + Responsive + Router)</h2> */}
    </>
  );
}

export default Home;