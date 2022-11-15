import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import AuthService from "../../services/auth";
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const logout = () => {
    console.log("%%%% logout in");    
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
    console.log(cookies);
    const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

    // 반목문 순회하면서 쿠키 전체 삭제
    if (!document.cookie) {
    } else {
      for (let i = 0; i < cookies.length; i++) {
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
      }
    }
  };

  return (
    <header className="header">
      <meta name="viewport" content="width=device-width,initial-scale=1" user-scalable="no"/>
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          FOR DREAM DEVELOPER
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <li>
              <Link to="/">회사검색</Link>
            </li>
            <li>
              <Link to="/Works">면접질문</Link>
            </li>
            <li>
              <Link to="/help">자유게시판</Link>
            </li>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>

            {/* <Link to="/register">
              <button className="btn">회원가입</button>
            </Link> */}
            {!isLogin ?
              <Link to="/login">
                <button className="btn btn__login_out">로그인</button>
              </Link>
              : 
              <div style={{display: "contents"}}>
                <button className="btn btn__login_out" onClick={logout}>로그아웃</button>
                <Link to="/profile">
                  <VscAccount className="account"></VscAccount>
                </Link>
              </div>
            }
          </ul>
        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
