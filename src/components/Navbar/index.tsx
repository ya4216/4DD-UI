import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import AuthService from "../../services/auth";
import { useCookies } from 'react-cookie';
import SwipeableTemporaryDrawer from "./drawerNav";

import testLogo from '../../image/test.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [footerMenuOpen, setFooterMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [cookies, setCookie] = useCookies(['accessToken']);

  // const getUserInfo = () => {
  //   AuthService.getUserInfo()
  //   .then(
  //     response => {
        
  //     },
  //     error => {
        
  //     }
  //   );
  // }
  
  const profile = () => {
    navigate('/profile');
  }
  
  useEffect(() => {        
    if(localStorage.getItem('user') !== null) {
      setIsLogin(true);
    }
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768) {
      if(headerMenuOpen){
        setHeaderMenuOpen(false);
      }else if(footerMenuOpen){
        setFooterMenuOpen(false);
      }
    }
  }, [size.width, headerMenuOpen, footerMenuOpen]);

  const headerMenuToggleHandler = () => {
      setHeaderMenuOpen((p) => !p);
  };

  const footerMenuToggleHandler = () => {
      setFooterMenuOpen((p) => !p);
  };

  const logout = () => {
    AuthService.logout()
    .then(
      response => {
        localStorage.removeItem("user");
        setSuccessful(true);
        setMessage(response.data.message);
        navigate('/home');
        allDelCookies('localhost', '/');
        setIsLogin(false);
      },
      error => {
        const resMessage = error.response.data?.message;
        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  // 쿠키 전체 삭제하기
  const allDelCookies = (domain: string, path: string) => {
    domain = domain || document.domain;
    path = path || '/';

    const cookies = document.cookie.split('; '); // 배열로 반환
    const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

    // 반목문 순회하면서 쿠키 전체 삭제
    if (!document.cookie) {
    } else {
      for (let i = 0; i < cookies.length; i++) {
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
      }
    }
  };

  const navElement = (elType : string) => {
    return (
        <ul>
          <li>
            <Link to="/">회사검색</Link>
          </li>
          <li>
            <Link to="/Works">면접질문</Link>
          </li>
          <li>
            <Link to="/board">자유게시판</Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>

          {/* <Link to="/register">
            <button className="btn">회원가입</button>
          </Link> */}
          {!isLogin ?
            (<Link to="/login">
              <button className="btn btn__login_out">로그인</button>
            </Link>)
            : 
            (<div style={{display: "contents"}}>
              <button className="btn btn__login_out" onClick={logout}>로그아웃</button>
              <Link to="/profile">
                <VscAccount className="account"></VscAccount>
              </Link>
            </div>)
          }
        </ul>
    )
  }

  return (
    <>
      <header className="header">
        <meta name="viewport" content="width=device-width,initial-scale=1" user-scalable="no"/>
        <div className="header__content">
          <Link to="/" className="header__content__logo">
            <span className="header__content__logo__name">FOR</span> &#40;var&nbsp;
            <span className="header__content__logo__name">DREAM</span> of&nbsp;
            <span className="header__content__logo__name">DEVELOPER</span>&#41; &#123;
          </Link>
          <nav
            className={`${"header__content__nav"} 
            ${headerMenuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
            }`}
          >
            {navElement("header")}
          </nav>
          <div className="header__content__toggle">
            {!footerMenuOpen ? ( !headerMenuOpen ? (
              !isLogin ? (
                <BiMenuAltRight onClick={headerMenuToggleHandler} />
                ) : (
                <VscAccount onClick={headerMenuToggleHandler} />
              )
            ) : (
              <AiOutlineClose onClick={headerMenuToggleHandler} />
            )) : null}
          </div>
          &#125;
        </div>
      </header>
      <footer className="footer">
        <nav
          className={`${"footer-by__content__nav"} 
          ${footerMenuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          {footerMenuOpen && size.width < 768 ? (navElement("footer")):null}
        </nav>
        <div className="footer-by__content__toggle">
          
            {!headerMenuOpen ? (!footerMenuOpen ? (
              <BiMenuAltRight onClick={footerMenuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={footerMenuToggleHandler} />
            )) : null}
          </div>
      </footer>
    </>
  );
}

export default Navbar;