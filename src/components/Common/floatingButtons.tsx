import * as React from 'react';
import { Box, Button } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import SaveIcon from '@mui/icons-material/Save';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Instance } from '@popperjs/core';

type floatProps = {
  onSetFlotingType: (type: string) => void;
  type: string;
  icon: string;
  confirmType: string;
  tooltipButtonType: string;
  confirmMessage: string;
};

import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { floatingClickState } from '../../modules/floatingButtonModule';
import { useDispatch } from 'react-redux';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

/**
 *
 * @param
 * onSetFlotingType : 리덕스 state 관리용,
 * type : 버튼타입,
 * icon : 버튼아이콘,
 * confirmType : string (디폴트 "none", "tooltip", "modal", "none") 현재 tooltip만 구현, none일 경우 컨펌메시지없이 콜백 호출
 * tooltipButtonType : string ("type1"(예, 아니오) | "type2"(확인, 취소) | ... | "typeN"), tooltip이 true 상태에서만 작동
 * confirmMessage : string
 * 추후 추가예정 callback : () => {} (버튼 기능에 따른 콜백 함수 정의, 필수 파라미터로 없을 경우 버튼은 아무 동작 안함)
 *
 * @returns
 */
const floatingButtons = ({
  onSetFlotingType,
  type,
  icon,
  confirmType,
  tooltipButtonType,
  confirmMessage,
}: floatProps) => {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  const getIcon = () => {
    let innerIcon: JSX.Element[] = [];

    switch (icon) {
      case 'cancel':
        innerIcon.push(<CancelIcon />);
        break;
      case 'add':
        innerIcon.push(<AddIcon />);
        break;
      case 'edit':
        innerIcon.push(<EditIcon />);
        break;
      case 'favorite':
        innerIcon.push(<FavoriteIcon />);
        break;
      case 'navigation':
        innerIcon.push(<NavigationIcon />);
        break;
      case 'save':
        innerIcon.push(<SaveIcon />);
        break;
      case 'queryBuilder':
        innerIcon.push(<QueryBuilderIcon />);
        break;
      case 'moreTime':
        innerIcon.push(<MoreTimeIcon />);
        break;
      default:
        innerIcon.push(<>BUTTON</>);
        break;
    }

    return (
      <Button>
        <Box
          ref={areaRef}
          onMouseMove={handleMouseMove}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 2,
            borderRadius: '50%',
            width: '56px',
            height: '56px',
          }}
        >
          {innerIcon}
        </Box>
      </Button>
    );
  };

  const dispatch = useDispatch();

  const handleYesButton = (event: React.MouseEvent) => {
    dispatch(floatingClickState(type));
  };

  const handleNoButton = (event: React.MouseEvent) => {};

  const getToolTip = () => {
    let yesButton = '예';
    let noButton = '아니오';

    if (tooltipButtonType === 'type2') {
      yesButton = '확인';
      noButton = '취소';
    } else if (tooltipButtonType === 'type3') {
      yesButton = 'Yes';
      noButton = 'No';
    } else if (tooltipButtonType === 'type4') {
      yesButton = 'OK';
      noButton = 'CANCEL';
    }

    return (
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{confirmMessage}</Typography>
            <Button onClick={handleYesButton}>{yesButton}</Button>
            <Button onClick={handleNoButton}>{noButton}</Button>
          </React.Fragment>
        }
      >
        {getIcon()}
      </HtmlTooltip>

      // <Tooltip
      //   // title={type}
      //   title={
      //     <>
      //       취소하시겠습니까?
      //       <br />
      //       <Button>예</Button>
      //       <Button>아니요</Button>
      //     </>
      //   }
      //   placement="top"
      //   arrow
      //   PopperProps={{
      //     popperRef,
      //     anchorEl: {
      //       getBoundingClientRect: () => {
      //         return new DOMRect(
      //           positionRef.current.x,
      //           areaRef.current!.getBoundingClientRect().y,
      //           0,
      //           0,
      //         );
      //       },
      //     },
      //   }}
      // >
      //   <Box
      //     ref={areaRef}
      //     onMouseMove={handleMouseMove}
      //     sx={{
      //       bgcolor: 'primary.main',
      //       color: 'primary.contrastText',
      //       p: 2,
      //       borderRadius: '50%',
      //       width: '56px',
      //       height: '56px',
      //     }}
      //   >
      //     {icon}
      //   </Box>
      // </Tooltip>
    );
  };

  return (
    <Fab
      color="primary"
      aria-label={type}
      onClick={() => onSetFlotingType(type)}
    >
      {confirmType && confirmType == 'tooltip' ? getToolTip() : null}
    </Fab>
  );
};

export default floatingButtons;
