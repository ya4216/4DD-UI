import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import SideBar from '../Navbar/sideBar';
import SwipeableTemporaryDrawer from '../Navbar/drawerNav';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import './interview.scss';
import InterviewCreateAndUpdate from './interviewCreateAndUpdate';
import InterviewContents from './interviewContents';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '../Common/index';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { setPageType } from '../../modules/interviewModule';

const interview = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState<{ [key: string]: any }>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [maxSize, setMaxSize] = useState<boolean>(false);
  // const [pageType, setPageType] = useState<string>('contents');
  const [useModal, setUseModal] = useState<JSX.Element>();
  const interviewModule = useSelector((state: RootState) => state.interviewModule);
  const [values, setValues] = useState({
    main_category: '',
    main_category_code: '',
    middle_category: '',
    middle_category_code: '',
    sub_category: '',
    sub_category_code: '',
    multiple_choice: true,
    interview_contents: '',
    interview_answer: '',
    answer_example: [],
    useYN: 'Y',
  });

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

  const callbackfunc = (prop: string) => {
    setUseModal(<></>);
    if (prop === 'ok') {
      setMaxSize(false);
      if (interviewModule.pageType === 'contents') {
        navigate('/home');
      } else if (interviewModule.pageType === 'create' || interviewModule.pageType === 'update') {
        // setPageType('contents');
        dispatch(setPageType('contents'));
      }
    }
  };

  const buttonControl = (prop: any) => {
    if (prop === 'mini') {
      console.log('애니메이션주면서 밑에 플로팅 동그란 버튼으로 바뀌게 해야함');
    } else if (prop === 'max') {
      setMaxSize(!maxSize);
    } else if (prop === 'close') {
      setUseModal(
        <Modal
          props={{
            content: interviewModule.pageType === 'contents' ? '홈 화면으로 돌아갑니다.' : '작성을 취소하시겠습니까?',
            callback: { callbackfunc },
          }}
        />,
      );
    }
  };

  return (
    <>
      {useModal}
      {window.innerWidth < 768 ? (
        Object.keys(list).length != 0 ? (
          // <SwipeableTemporaryDrawer {...list} />
          <></>
        ) : null
      ) : Object.keys(list).length != 0 ? (
        <SideBar {...list} />
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Paper
          className={maxSize ? 'setMaximumSize' : ''}
          sx={{
            height: window.innerWidth < 768 ? 'calc(100% - 80px)' : 'calc(100% - 90px)',
            width: window.innerWidth < 768 ? '100%' : 'calc(100% - 320px)',
            marginTop: 1,
            position: 'absolute',
            left: window.innerWidth < 768 ? '0px' : '310px',
          }}
          elevation={5}
        >
          <div
            style={{
              zIndex: 999,
              background: 'rgb(88 155 255)',
              // background: '#8fef8f',
              width: '100%',
              height: '35px',
              borderRadius: '5px 5px 0px 0px',
              padding: '5px',
            }}
          >
            <span style={{ margin: '10px', color: 'black', fontSize: '1rem', fontWeight: '500' }}>
              {interviewModule.pageType === 'contents'
                ? '면접질문'
                : interviewModule.pageType === 'create'
                ? '면접질문 작성'
                : interviewModule.pageType === 'update'
                ? '면접질문 수정'
                : '오류'}
            </span>
            <span style={{ right: '7px', position: 'absolute' }}>
              <button className="interview__button__minimization" onClick={() => buttonControl('mini')}>
                <MinimizeIcon style={{ width: '100%', height: '100%' }} />
              </button>
              <button className="interview__button__maximize" onClick={() => buttonControl('max')}>
                {maxSize ? <FilterNoneIcon style={{ width: '100%', height: '100%' }} /> : <CropSquareIcon style={{ width: '100%', height: '100%' }} />}
              </button>
              <button className="interview__button__close" onClick={() => buttonControl('close')}>
                <CloseIcon style={{ width: '100%', height: '100%' }} />
              </button>
            </span>
          </div>
          <div
            style={{
              overflow: 'auto',
              height: '93%',
              padding: '20px 25px 30px 25px',
              // background: 'rgb(249 249 249)',
            }}
          >
            {interviewModule.pageType === 'contents' ? (
              <InterviewContents />
            ) : interviewModule.pageType === 'create' ? (
              <InterviewCreateAndUpdate />
            ) : interviewModule.pageType === 'update' ? (
              <InterviewCreateAndUpdate />
            ) : null}
          </div>
          <Divider style={{ margin: '0px 42px 0px 25px' }} />
          {interviewModule.pageType === 'contents' ? (
            <div className="interview__button__makediv">
              <button
                className="interview__button__make"
                onClick={() => {
                  // setPageType('create');
                  dispatch(setPageType('create'));
                }}
              >
                질문 만들기
              </button>
            </div>
          ) : null}
        </Paper>
      </Box>
    </>
  );
};

export default interview;
