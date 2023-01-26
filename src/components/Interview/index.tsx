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
    setList({ category: '면접질문' });

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
  //     main_category: interviewCreateDto.main_category,
  //     main_category_code: interviewCreateDto.main_category_code,
  //     middle_category: interviewCreateDto.middle_category,
  //     middle_category_code: interviewCreateDto.middle_category_code,
  //     sub_category: interviewCreateDto.sub_category,
  //     sub_category_code: interviewCreateDto.sub_category_code,
  //     multiple_choice: interviewCreateDto.multiple_choice;
  //     sub_category_contents: interviewCreateDto.sub_category_contents,
  //     interview_answer: interviewCreateDto.interview_answer;
  //     answer_example: interviewCreateDto.answer_example;
  //     useYN: interviewCreateDto.useYN,
  return (
    <>
      {window.innerWidth < 768 ? (
        Object.keys(list).length != 0 ? (
          <SwipeableTemporaryDrawer {...list} />
        ) : null
      ) : Object.keys(list).length != 0 ? (
        <SideBar {...list} />
      ) : null}
      <h1>Browse Interview</h1>
      <h2>Vite + React + TS (Hamburger + Responsive + Router)</h2>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '400px' }}>
          대분류 : &nbsp;
          <select name="main_category">
            <option value="바나나" main_category_code="123">
              바나나
            </option>
            <option value="사과">사과</option>
            <option value="파인애플" selected>
              파인애플
            </option>
          </select>
          새 대분류&nbsp;
          <input type="checkbox" name="main_category" onClick={() => {}} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 중분류 : &nbsp;
          <select name="middle_category">
            <option value="바나나">바나나</option>
            <option value="사과">사과</option>
            <option value="파인애플" selected>
              파인애플
            </option>
          </select>
          새 중분류&nbsp;
          <input type="checkbox" name="middle_category" onClick={() => {}} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 소분류 : &nbsp;
          <select name="sub_category">
            <option value="바나나">바나나</option>
            <option value="사과">사과</option>
            <option value="파인애플" selected>
              파인애플
            </option>
          </select>
          새 소분류&nbsp;
          <input type="checkbox" name="sub_category" onClick={() => {}} />
        </div>
      </div>
    </>
  );
}

export default Works;
