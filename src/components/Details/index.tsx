import React, { useEffect, useState } from "react";
import SwipeableTemporaryDrawer from "../Navbar/drawerNav";
import SideBar from "../Navbar/sideBar";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { initNavState } from "../../modules/navBar";
import { initUnitState } from "../../modules/unit";

const ContentDetail = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState({width: 0, height: 0});
  const [list, setList] = useState<{[key:string]:any}>([]);
  const [selectedList, setSelectedList] = useState<{[key:string]:any}>({});
  const selectUnit = useSelector((state: RootState) => state.unit.selectedUnitId);
  const selectMenu = useSelector((state: RootState) => state.unit.selectedMenuId);
  const sideBarOpen = useSelector((state: RootState) => state.navBar.open);
  
  useEffect(() => {
    Axios.get(`/api/unit/title/list/${selectUnit}`).then((res)=>{
      setList(res.data.data[0]);
    });

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      //페이지 나갈떄 state 초기화 위해서 dependency없는 useEffect (최초 한번만 실행하는거)의 return 값으로 만들어둔 state초기화 모듈을 호출한다.
      //이는 useEffect가 componentDidMount와 componentWillUnmount가 합쳐져 있기 때문이다.
      dispatch(initNavState());
      dispatch(initUnitState());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if(selectMenu){
      Axios.get(`/api/unit/title/${selectMenu}`).then((res)=>{
        setSelectedList(res.data.data);
      });
    }
  }, [selectMenu]);

  return (
    <div style={{display: "flex"}}>
      {
        window.innerWidth < 768 ? (
          Object.keys(list).length != 0 ? (
            <SwipeableTemporaryDrawer {...list}/>
          ) : null
        ) : (
          Object.keys(list).length != 0 ? (
            <SideBar {...list}/>
          ) : null
        )
      }

      {
        Object.keys(selectedList).length != 0 ? (
          <div style={window.innerWidth > 768 ? {marginLeft: sideBarOpen ? 0 : '-300px'} : {}}>
            <h2>{selectedList.title}</h2>
            <h3>{selectedList.content}</h3>
          </div>
        ):(
          <div style={window.innerWidth > 768 ? {marginLeft: sideBarOpen ? 0 : '-300px'} : {}}>
            <h1>{list.title}</h1>
            <h2>{list.content}</h2>
          </div>
        )
      }
    </div>
  );
}

export default ContentDetail;
