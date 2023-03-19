import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { customType } from '../../common/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  border: 'none',
  borderRadius: '10px',
};

/**
 *
 * @param {title? : string, content? : JSX.Element[], _id? : string, type? : string, callback : callbackfunc}
 * @returns element, callback
 * props에 title, content가 필수 파라미터가 아니지만, 없을경우 state에 뭐라도 있어야 사용 가능 현재 buttonModule state만 체크하지만
 * 추후 모든 state 가져와서 특정 조건에 따라 사용가능하도록 수정 예정 TODO HWI
 */
const NestedModal = ({ props }: customType.defaultIProps) => {
  const selectButton = useSelector((state: RootState) => state.buttonModule);

  const [open, setOpen] = React.useState(true);

  const okHandleClose = () => {
    setOpen(false);
    props.callback.callbackfunc(props._id ? props : 'ok');
  };

  const cancelHandleClose = () => {
    setOpen(false);
    props.callback.callbackfunc('cancel');
  };

  const getText = () => {
    let innerHtml: JSX.Element[] = [];

    if (props.content) {
      innerHtml.push(<>{props.content}</>);
    } else if (selectButton.type) {
      switch (selectButton.type) {
        case 'create':
          innerHtml.push(
            <>
              선택된 &#39;
              {JSON.parse(JSON.stringify(selectButton.selectedList)).title}&#39;
              <br />의 하위에 새 항목을 추가합니다.
              <br />
              계속 진행하시겠습니까?
            </>,
          );
          break;
        case 'update':
          innerHtml.push(
            <>
              선택된 &#39;
              {JSON.parse(JSON.stringify(selectButton.selectedList)).title}&#39;
              <br />
              항목의 내용을 수정합니다.
              <br />
              계속 진행하시겠습니까?
            </>,
          );
          break;
        case 'remove':
          innerHtml.push(
            <>
              선택된 &#39;
              {JSON.parse(JSON.stringify(selectButton.selectedList)).title}&#39; 항목과
              <br />그 하위 내용이 모두 '완전 삭제' 됩니다.
              <br />
              삭제가 확실하지 않을 경우 'OFF' 상태로 변경하는 것이 좋습니다.
              <br />
              계속 진행하시겠습니까?
            </>,
          );
          break;
        case 'onoff':
          if (selectButton.on) {
            innerHtml.push(
              <>
                선택된 &#39;
                {JSON.parse(JSON.stringify(selectButton.selectedList)).title}
                &#39; 항목과
                <br />그 하위 내용이 모두 'OFF'상태로 전환 되며,
                <br />
                'OFF' 상태의 항목은 일반 유저 계정에는 보이지 않습니다.
                <br />
                계속 진행하시겠습니까?
              </>,
            );
          } else {
            innerHtml.push(
              <>
                선택된 &#39;
                {JSON.parse(JSON.stringify(selectButton.selectedList)).title}
                &#39; 항목과
                <br />그 하위 내용이 모두 'ON'상태로 전환 됩니다.
                <br />
                계속 진행하시겠습니까?
              </>,
            );
          }
          break;
        default:
          innerHtml.push(<>오류!!</>);
          break;
      }
    } else {
      innerHtml.push(<>오류!!</>);
    }

    return innerHtml;
  };

  return (
    <div>
      <Modal className="modal__popup" open={open} onClose={cancelHandleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 600 }}>
          <h2 id="parent-modal-title">{props.title ? props.title : selectButton.type ? selectButton.type : ''}</h2>
          <p id="parent-modal-description">{getText()}</p>
          <Button onClick={okHandleClose}>확인</Button>
          <Button onClick={cancelHandleClose}>취소</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default NestedModal;
