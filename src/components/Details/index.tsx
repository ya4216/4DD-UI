import React, { useEffect, useState } from 'react';
import SwipeableTemporaryDrawer from '../Navbar/drawerNav';
import SideBar from '../Navbar/sideBar';
import Axios, { AxiosRequestConfig } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { initNavState, setOpenSave } from '../../modules/navBar';
import { initUnitState } from '../../modules/unit';
import { initButtonState } from '../../modules/buttonModule';
import { Modal, CreateAndUpdate } from '../Common/index';
import ReactQuill from 'react-quill';

const ContentDetail = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [list, setList] = useState<{ [key: string]: any }>([]);
  const [selectedList, setSelectedList] = useState<{ [key: string]: any }>({});

  const [divDisplay, setDivDisplay] = useState<string>('flex');

  const [openModal, setOpenModal] = useState<boolean>(false);

  const selectUnit = useSelector(
    (state: RootState) => state.unit.selectedUnitId,
  );
  const selectMenu = useSelector(
    (state: RootState) => state.unit.selectedMenuId,
  );
  const floatingState = useSelector(
    (state: RootState) => state.floatingButtonModule.clickState,
  );
  const sideBarOpen = useSelector((state: RootState) => state.navBar.open);

  const selectButton = useSelector((state: RootState) => state.buttonModule);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [contentMode, setContentMode] = useState<boolean>(false);

  const [callback, setCallback] = useState<boolean>(false);

  const setTest = (bool: boolean) => {
    setCallback(bool);
  };

  const callbackfunc = (prop: string) => {
    setOpenModal(false);
    if (prop == 'ok') {
      if (selectButton.type == 'create' || selectButton.type == 'update') {
        setContentMode(true);
      } else if (selectButton.type == 'remove') {
        //삭제하는곳~

        Axios.delete('/api/unit/title', {
          data: {
            selectedList: selectButton.selectedList,
          },
        })
          .then((res) => {
            console.log('성공 :: ', res);
          })
          .catch((err) => {
            console.log('실패 :: ', err);
          });
      } else if (selectButton.type == 'onoff') {
        //TODO HWI setCallback 으로 리렌더링 해보려고 했는데 잘 안됨. 업데이트 성공 하고나서 sidebar 리렌더링 되도록 고칠것
        Axios.put(
          `/api/unit/title/list/${
            JSON.parse(JSON.stringify(selectButton.selectedList))._id
          }`,
          {
            useYN:
              JSON.parse(JSON.stringify(selectButton.selectedList)).useYN == 'Y'
                ? 'N'
                : 'Y',
            selectedList: selectButton.selectedList,
          },
        )
          .then((res) => {
            console.log('성공 :: ', res);
            setTest(true);
          })
          .catch((err) => {
            console.log('실패 :: ', err);
            setTest(false);
          });
      }
    } else {
      dispatch(initButtonState());
    }
  };

  useEffect(() => {
    if (floatingState) {
      setContentMode(false);
    }
  }, [floatingState]);

  //callback, setCallback 이건 onoff 할때 리렌더링 하려고했는데 잘 안됨 일단 빼둠
  useEffect(() => {
    Axios.get(`/api/unit/title/list/${selectUnit}`).then((res) => {
      setList(res.data.data[0]);
    });
  }, [callback]);

  useEffect(() => {
    // Axios.get(`/api/unit/title/list/${selectUnit}`).then((res) => {
    //   setList(res.data.data[0]);
    // });

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      //페이지 나갈떄 state 초기화 위해서 dependency없는 useEffect (최초 한번만 실행하는거)의 return 값으로 만들어둔 state초기화 모듈을 호출한다.
      //이는 useEffect가 componentDidMount와 componentWillUnmount가 합쳐져 있기 때문이다.
      dispatch(initNavState());
      dispatch(initUnitState());
      dispatch(initButtonState());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectMenu) {
      Axios.get(`/api/unit/title/detail/${selectMenu}`).then((res) => {
        setSelectedList(res.data.data);
      });
    }
  }, [selectMenu]);

  useEffect(() => {
    if (selectButton.type) {
      setOpenModal(true);
    }
  }, [selectButton]);

  useEffect(() => {
    if (sideBarOpen) {
      setDivDisplay('flex');
    } else {
      setDivDisplay('');
    }
  }, [sideBarOpen]);

  return (
    <div style={{ display: 'flex' }}>
      {openModal && selectButton ? (
        <Modal
          props={{
            callback: { callbackfunc },
          }}
        />
      ) : null}
      {window.innerWidth < 768 ? (
        Object.keys(list).length != 0 ? (
          <SwipeableTemporaryDrawer {...list} />
        ) : null
      ) : Object.keys(list).length != 0 ? (
        <SideBar {...list} />
      ) : null}

      {contentMode ? (
        <CreateAndUpdate
          props={{
            title: selectedList.title,
            content: selectedList.content.detail_content,
          }}
        />
      ) : Object.keys(selectedList).length != 0 ? (
        <div style={{ overflow: 'auto', height: window.innerHeight - 80 }}>
          <h1 style={{ margin: '50px 100px 30px 100px' }}>
            {selectedList.title}
          </h1>
          <h3 style={{ margin: '0px 100px 0px 100px' }}>
            {selectedList.content ? (
              selectedList.content.detail_content ? (
                <ReactQuill
                  readOnly
                  className="post_quill"
                  value={selectedList.content.detail_content}
                ></ReactQuill>
              ) : null
            ) : null}
          </h3>
        </div>
      ) : (
        <div>
          <h1 style={{ margin: '50px 100px 30px 100px' }}>{list.title}</h1>
          <h2 style={{ margin: '0px 100px 0px 100px' }}>{list.content}</h2>
        </div>
      )}
    </div>
  );
};

export default ContentDetail;
