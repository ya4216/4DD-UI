import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initUnitState, selectUnitTitle } from '../modules/unit';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Buttons from '../containers/ButtonContainer';

import './common.scss';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Axios from 'axios';
import { RootState } from '../modules';
import { setUserInfo } from '../modules/user';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Carousel = ({ props }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [dragging, setDragging] = useState<boolean>(false);

  const userInfo = useSelector((state: RootState) => state.user.info);
  
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
      autoplay: type === 'banner' ? true : false,
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
      props[i]
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
    Axios.post(`/api/user/subinfo/${userInfo.user_sub_info._id}`, {
      id: id,
      like: checked,
    })
      .then((res) => {
        if (userInfo.user_sub_info) {
          if (userInfo.user_sub_info.likes.indexOf(id) == -1) {
            userInfo.user_sub_info.likes.push(id);
          } else {
            userInfo.user_sub_info.likes.splice(
              userInfo.user_sub_info.likes.indexOf(id),
              1,
            );
          }
        }
        dispatch(setUserInfo(userInfo));
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
          <Card
            sx={{}}
            key={props[idx][j]._id}
            className={(props[idx][0].category !== '좋아요' && idx == 0) ? 'banners' : 'list'}
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
            <CardActionArea>
              <div
                className={
                  idx == 0 ? 'carousel__img__banners' : 'carousel__img__list'
                }
              >
                <CardMedia
                  component="img"
                  // height="140"
                  image={`${
                    props[idx][j].title_image_path
                      ? props[idx][j].title_image_path
                      : `/assets/images/noimage1.jpg`
                  }`}
                  alt={props[idx][j].title}
                />
                {idx == 0 ? null : (
                  <>
                    <div className="carousel__img__list__like">
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={
                          userInfo.user_sub_info
                            ? userInfo.user_sub_info.likes.indexOf(
                                props[idx][j]._id,
                              ) != -1
                              ? true
                              : false
                            : false
                        }
                      />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {idx == 0 ? (
                          userInfo.id == '6371e3df99561093efe09cfd' ? (
                            <Buttons
                              getTypeArr={[
                                'create',
                                'update',
                                'remove',
                                'onoff',
                              ]}
                            />
                          ) : null
                        ) : (
                          props[idx][j].title
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {props[idx][j].title}
                        {/* {idx == 0 ? '' : props[idx][j].content} */}
                      </Typography>
                    </CardContent>
                  </>
                )}
              </div>
            </CardActionArea>
          </Card>,

          // <ImageListItem
          //   key={props[idx][j]._id}
          //   className={
          //     idx == 0
          //       ? 'banners text-shadow-drop-center'
          //       : 'list text-shadow-drop-center'
          //   }
          //   onClick={(e) => {
          //     if (!dragging) {
          //       if (Object(e.target).type == 'checkbox') {
          //         likeUpdate(
          //           props[idx][j]._id,
          //           Object(e.target).parentElement.className.indexOf(
          //             'Mui-checked',
          //           ) === -1,
          //         );
          //       } else {
          //         dispatch(selectUnitTitle(props[idx][j]._id));
          //         navigate('/contents');
          //       }
          //     }
          //   }}
          // >
          //   <div
          //     className={
          //       idx == 0 ? 'carousel__img__banners' : 'carousel__img__list'
          //     }
          //   >
          //     <img
          //       src={`${
          //         props[idx][j].title_image_path
          //           ? props[idx][j].title_image_path
          //           : '../src/image/noimage1.jpg'
          //       }`}
          //       srcSet={`${
          //         props[idx][j].title_image_path
          //           ? props[idx][j].title_image_path
          //           : '../src/image/noimage1.jpg'
          //       }`}
          //       alt={props[idx][j].title}
          //       loading="lazy"
          //     />
          //     {idx == 0 ? null : (
          //       <div className="carousel__img__list__like">
          //         <Checkbox
          //           {...label}
          //           icon={<FavoriteBorder />}
          //           checkedIcon={<Favorite />}
          //           checked={
          //             userInfo.user_sub_info
          //               ? userInfo.user_sub_info.likes.indexOf(
          //                   props[idx][j]._id,
          //                 ) != -1
          //                 ? true
          //                 : false
          //               : false
          //           }
          //         />
          //       </div>
          //     )}
          //   </div>
          //   <ImageListItemBar
          //     title={
          //       <span>
          //         {idx == 0 ? (
          //           userInfo.id == '6371e3df99561093efe09cfd' ? (
          //             <Buttons
          //               getTypeArr={['create', 'update', 'remove', 'onoff']}
          //             />
          //           ) : null
          //         ) : (
          //           props[idx][j].title
          //         )}
          //       </span>
          //     }
          //     subtitle={<span>{idx == 0 ? '' : props[idx][j].content}</span>}
          //     position="below"
          //   />
          // </ImageListItem>,
        );
      }
    }
    return childHtml;
  };

  return <>{parentsList()}</>;
};

export default Carousel;
