import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initUnitState, selectUnitTitle } from '../modules/unit';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Buttons from '../containers/ButtonContainer';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import zIndex from '@mui/material/styles/zIndex';
import Axios, { AxiosRequestConfig } from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Carousel = ({ props }: any) => {
  console.log('home props :: ', props);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [dragging, setDragging] = useState<boolean>(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, []);

  const handleAfterChange = useCallback((i: number) => {
    setDragging(false);
  }, []);

  //슬라이더 옵션 설정
  let settings = (type: string) => {
    return {
      dots: type === 'banner' ? true : false,
      infinite: type === 'banner' ? true : false,
      speed: type === 'banner' ? 600 : 300,
      // autoplay: type === 'banner' ? true : false,
      autoplaySpeed: 4000,
      arrows: type === 'banner' ? false : true,
      slidesToShow: type === 'banner' ? 1 : 5,
      slidesToScroll: type === 'banner' ? 1 : 5,
      pauseOnFocus: false,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,
      draggable: true,
      touchThreshold: 100,
      beforeChange: handleBeforeChange,
      afterChange: handleAfterChange,
      responsive:
        type === 'banner'
          ? []
          : [
              // 반응형 웹 구현 옵션
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
              {
                breakpoint: 960, //화면 사이즈 960px
                settings: {
                  //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ],
    };
  };

  //슬라이더 컴포넌트 동적 생성
  const parentsList = () => {
    let parentsHtml = [];
    for (let i in props) {
      if (props[i]) {
        parentsHtml.push(
          <div key={props[i][0]._id + i}>
            {props[i][0].category === 'banner' ? null : (
              <div className="contens_title">{props[i][0].category}</div>
            )}
            <Slider {...settings(props[i][0].category)}>
              {childList(i as unknown as number)}
            </Slider>
          </div>,
        );
      }
    }
    return parentsHtml;
  };

  const likeUpdate = (id: string, checked: boolean) => {
    if (checked) {
    } else {
    }
    Axios.post(`/api/user/subinfo/${'63cbe99f9d23e7598cbc7cd5'}`, {
      id: id,
      like: checked,
    })
      .then((res) => {
        console.log('성공 :: ', res);
      })
      .catch((err) => {
        console.log('실패 :: ', err);
      });
  };

  //슬라이더 컴포넌트 하위의 목록들 동적 생성
  const childList = (idx: number) => {
    let childHtml = [];

    for (let j in props[idx]) {
      if (props[idx][j].menu_level == 1) {
        childHtml.push(
          <ImageListItem
            key={props[idx][j]._id}
            className={idx == 0 ? 'banners' : 'list'}
            onClick={(e) => {
              if (!dragging) {
                if (Object(e.target).type == 'checkbox') {
                  likeUpdate(
                    props[idx][j]._id,
                    Object(e.target).parentElement.className.indexOf(
                      'Mui-checked',
                    ) === -1,
                  );
                } else {
                  dispatch(selectUnitTitle(props[idx][j]._id));
                  navigate('/contents');
                }
              }
            }}
          >
            <div style={{ width: '99%', position: 'relative' }}>
              <img
                style={{ width: 'inherit' }}
                src={`${
                  props[idx][j].title_image_path
                    ? props[idx][j].title_image_path
                    : 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                }`}
                srcSet={`${
                  props[idx][j].title_image_path
                    ? props[idx][j].title_image_path
                    : 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                }`}
                alt={props[idx][j].title}
                loading="lazy"
              />
              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                <Checkbox
                  {...label}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              </div>
            </div>
            <ImageListItemBar
              title={
                <span>
                  {idx == 0 ? (
                    <Buttons
                      getTypeArr={['create', 'update', 'remove', 'onoff']}
                    />
                  ) : (
                    props[idx][j].title
                  )}
                </span>
              }
              subtitle={<span>{idx == 0 ? '' : props[idx][j].content}</span>}
              position="below"
            />
          </ImageListItem>,
        );
        //TODO HWI 위에 Buttons 컴포넌트 운영자일경우만 보이도록 수정해야함
        // childHtml.push(
        //   <div key={props[idx][j]._id}>
        //     {/* <Link to="/contents"> */}
        //     <button
        //       className={idx == 0 ? 'banners' : 'list'}
        //   onClick={(e) => {
        //     if (!dragging) {
        //       // dispatch(initUnitState());
        //       dispatch(selectUnitTitle(props[idx][j]._id));
        //       navigate('/contents');
        //     }
        //   }}
        //     >
        //       <img
        //         src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format`}
        //         srcSet={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=248&fit=crop&auto=format&dpr=2 2x`}
        //         alt={props[idx][j].title}
        //         loading="lazy"
        //       />
        //       {props[idx][j].title}
        //     </button>
        //     {/* </Link> */}
        //   </div>,
        // );
      }
    }
    return childHtml;
  };

  return <>{parentsList()}</>;
};

export default Carousel;
