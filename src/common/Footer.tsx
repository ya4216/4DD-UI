import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar/navbar.scss";

const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
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

  return (
    <>
        <footer className="footer">
            <nav
            className={`${"header__content__nav"} 
            ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
            }`}
            >
              <ul>
                <li>
                  <Link to="/profile">회사검색</Link>
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

                <Link to="/register">
                  <button className="btn">회원가입</button>
                </Link>
                <Link to="/login">
                  <button className="btn btn__login">로그인</button>
                </Link>
              </ul>
            </nav>
            <div className="header__content__toggle">
            {!menuOpen ? (
                <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
                <AiOutlineClose onClick={menuToggleHandler} />
            )}
            </div>
        </footer>
    </>
  );
}

export default Footer;
