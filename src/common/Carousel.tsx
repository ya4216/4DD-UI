import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

//TS에서는 props를 사용할때 타입을 지정해줘야한다. props : any 로 해도 되지만 그러면 TS를 사용하는 의미가 없다.
interface IProps {
    list : string[],
    option : string,
    title : string
};

//슬릭 슬라이드
const Carousel = (props: IProps) => {
    //슬릭 슬라이드 다음
    const SampleNextArrow = () => {
        return (
          <div style={{ position: 'absolute', top: -20, right: 5 }}>
                오른쪽
            </div>
        );
      }
      
    //슬릭 슬라이드 이전
    const SamplePrevArrow = () => {
        return (
            <div style={{ position: 'absolute', top: -20, left: 5 }}>
                왼쪽
            </div>
        );
    }

    const [dragging, setDragging] = useState<boolean>(false);
    // const handleBeforeChange = useCallback(() => {   
    //     setDragging(true);  
    // }, []); 
    const handleAfterChange = useCallback((i: number) => { 
        setDragging(false);  
    }, []);
    
    const handleBeforeChange = useCallback(() => {
        setDragging(true);
    }, []);

    //슬라이드 옵션 세팅값
    let settings = {
        dots: props.option == 'banners' ? true : false,
        infinite: props.option == 'banners' ? true : false,
        speed: props.option == 'banners' ? 600 : 300,
        autoplay : props.option == 'banners' ? true : false,
        autoplaySpeed : 4000,
        arrows : props.option == 'banners' ? false : true,
        slidesToShow: props.option == 'banners' ? 1 : 5,
        slidesToScroll: props.option == 'banners' ? 1 : 5,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
        draggable : true, 	//드래그 가능 여부
        // touchThreshold : 100,
        // beforeChange: handleBeforeChange,
        // afterChange: handleAfterChange,
        responsive: props.option == 'banners' ? [] : [ // 반응형 웹 구현 옵션
        {  
            breakpoint: 960, //화면 사이즈 960px
            settings: {
            //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
            slidesToShow:3,
            slidesToScroll: 3
            } 
        },
        { 
            breakpoint: 768, //화면 사이즈 768px
            settings: {	
            //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
            slidesToShow:2,
            slidesToScroll: 2
            } 
        },
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        }
        ]
    };

    //동적 목록 태그 생성
    function tagList(){
        let htmlArr = [];
        const clName = String(props.option);

        for (var i = 0; i < props.list.length; i++) {
            htmlArr.push(
                <div key={i}>
                    <Link to="/contents">
                        <button className={clName}>
                            {props.list[i]}
                        </button>
                    </Link>
                </div>
            )
        }
        return htmlArr;
    }

    return (
        <div>
            <div className="contens_title">{props.title}</div>
            
            <Slider {...settings}>
                { tagList() }
            </Slider>
        </div>
    );
}

export default Carousel;