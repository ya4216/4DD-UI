import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import SideBar from '../Navbar/sideBar';
import SwipeableTemporaryDrawer from '../Navbar/drawerNav';

function Works() {
  const [list, setList] = useState<{ [key: string]: any }>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // useEffect(() => {
  //   Axios.get(`/api/unit/title/list/${selectUnit}`).then((res) => {
  //     setList(res.data.data[0]);
  //   });
  // }, [callback]);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //TODO HWI 아래 Object.keys(list).length == 0 이거 DB데이터 세팅 되면 Object.keys(list).length != 0 로 바꿔야함
  return (
    <>
      {window.innerWidth < 768 ? (
        Object.keys(list).length == 0 ? (
          <SwipeableTemporaryDrawer {...list} />
        ) : null
      ) : Object.keys(list).length == 0 ? (
        <SideBar {...list} />
      ) : null}
      <h1>Browse Works</h1>
      <h2>Vite + React + TS (Hamburger + Responsive + Router)</h2>
    </>
  );
}

export default Works;
