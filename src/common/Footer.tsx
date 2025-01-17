import React, { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Navbar/navbar.scss';

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
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
          className={`${'header__content__nav'} 
            ${menuOpen && size.width < 768 ? `${'isMenu'}` : ''} 
            }`}
        >
          {menuOpen && size.width < 768 ? (
            <ul>
              <li>
                <Link to="/interview">INTERVIEW</Link>
              </li>
              <li>
                <Link to="/help">COMMUNITY</Link>
              </li>
              <li>
                <Link to="/mypage">MYPAGE</Link>
              </li>

              <Link to="/register">
                <button className="btn">SIGNUP</button>
              </Link>
              <Link to="/login">
                <button className="btn btn__login">LOGIN</button>
              </Link>
              <div className="home_search_bar_div_footer">
                <input
                  className="home_search_bar"
                  placeholder="검색"
                  type="text"
                />
              </div>
            </ul>
          ) : null}
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
};

export default Footer;
