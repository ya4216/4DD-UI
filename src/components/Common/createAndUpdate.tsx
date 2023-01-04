import * as React from 'react';
import Box from '@mui/material/Box';
import './common.scss';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import Input from '@mui/material/Input';
import {
  initFloatingState,
  setFloatingButton,
} from '../../modules/floatingButtonModule';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import EditorComponent from '../Utils/index';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import { SxProps } from '@mui/system';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Buttons from '../../containers/ButtonContainer';
import { TextField } from '@mui/material';
import { RootState } from '../../modules';
import Axios from 'axios';
import { initButtonState } from '../../modules/buttonModule';

const fabStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  boxShadow: 'unset',
  width: 0,
  height: 0,
  top: '19px',
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const createAndUpdate = ({ props }: any) => {
  const [content, setContent] = React.useState('');

  const getContent = (content: string) => {
    setContent(content);
  };

  const flotingButtonType = useSelector(
    (state: RootState) => state.floatingButtonModule.clickState,
  );

  const selectedMenu = useSelector(
    (state: RootState) => state.buttonModule.selectedList,
  );

  const editorType = useSelector((state: RootState) => state.buttonModule.type);

  const theme = useTheme();
  const [mouseEnter, setMouseEnter] = React.useState<number>(0);

  const [editor, setEditor] = React.useState<JSX.Element[]>([]);

  const dispatch = useDispatch();

  const [title, setTitle] = React.useState('');

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //TODO HWI 브라우저 이동 감지해서 화면 벗어나면 false로 바꿔줘야함
  React.useEffect(() => {
    dispatch(
      setFloatingButton({
        on: true,
        props: [
          {
            type: 'cancel',
            icon: 'cancel',
            confirmType: 'tooltip',
            tooltipButtonType: 'type1',
            confirmMessage: '취소하시겠습니까?',
          },
          {
            type: 'create',
            icon: 'moreTime',
            confirmType: 'tooltip',
            tooltipButtonType: 'type1',
            confirmMessage: '작성 중인 문서를 임시저장하시겠습니까?',
          },
          {
            type: 'save',
            icon: 'save',
            confirmType: 'tooltip',
            tooltipButtonType: 'type1',
            confirmMessage: '저장하시겠습니까?',
          },
        ],
      }),
    );

    //화면 초기 에디터 설정
    handleAddTextEditor();

    return () => {
      dispatch(initFloatingState());
      dispatch(initButtonState());
    };
  }, []);

  React.useEffect(() => {
    if (flotingButtonType && editorType === 'create') {
      let SaveProp = {
        title: title,
        detail_content: content,
        useYN: 'Y',
        category: selectedMenu.category,
        category_number: selectedMenu.category_number,
        menu_level: selectedMenu.level,
        menu_id: selectedMenu.parents_menu_id,
        parents_menu_id:
          selectedMenu.parents_menu_id.replace(/[0-9]/g, '') +
          String(++selectedMenu.parents_menu_id.match(/\d+/g)[0]).padStart(
            3,
            '0',
          ),
      };

      if (flotingButtonType == 'create') {
        SaveProp.useYN = 'N';
      }

      Axios.post(`/api/unit/detail/`, SaveProp)
        .then((res) => {
          console.log('저장 성공..! ::: ', res);
        })
        .catch((err) => {
          console.log('저장 실패..! ::: ', err);
        });
    } else if (flotingButtonType && editorType === 'update') {
      let SaveProp = {
        title: title || props.title,
        detail_content: content,
        useYN: 'Y',
        parent_id: selectedMenu._id,
      };

      if (flotingButtonType == 'create') {
        SaveProp.useYN = 'N';
      }

      Axios.put(`/api/unit/detail/${selectedMenu.content}`, SaveProp)
        .then((res) => {
          console.log('수정 성공..! ::: ', res);
        })
        .catch((err) => {
          console.log('수정 실패..! ::: ', err);
        });
    }
  }, [flotingButtonType]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMouseEnter(1);
  };

  const handlePopoverClose = () => {
    setMouseEnter(0);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleAddTextEditor = () => {
    let innerHtml: JSX.Element[] = [];
    // TODO HWI editorComponent 반응형 css 수정할것
    // TODO HWI editor 박스 버튼들 넣은거 깨짐 css 수정할것
    innerHtml.push(
      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
          maxWidth: 'none',
          boxShadow:
            '0px 3px 10px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 2px 4px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs
            zeroMinWidth
            sx={{
              position: 'relative',
              minHeight: 400,
              maxHeight: 500,
              // display: 'flex',
              '& .MuiButtonBase-root': {
                display: 'block',
              },
              '& .MuiAccordionSummary-expandIconWrapper': {
                display: 'block',
                textAlign: 'center',
              },
            }}
            // flex-direction="column"
          >
            <Box component="div" className="editor_container">
              <EditorComponent
                getContent={getContent}
                contents={editorType === 'update' ? props.content : ''}
              />
            </Box>

            {/* <Box component="div">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                ></AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <Fab
                      sx={fabs[1].sx}
                      aria-label={fabs[1].label}
                      color={fabs[1].color}
                    >
                      {fabs[1].icon}
                    </Fab>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box> */}
          </Grid>
        </Grid>
      </StyledPaper>,
    );

    setEditor([...editor.concat(innerHtml)]);
  };

  const handleAddTextEditorPopoverOpen = () => {
    console.log('텍스트 에디터 왔냐');
  };

  const handleAddTextEditorPopoverClose = () => {
    console.log('텍스트 에디터 갔냐');
  };

  const handleAddTextBox = () => {
    let innerHtml: JSX.Element[] = [];

    innerHtml.push(
      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
          maxWidth: 'none',
          boxShadow:
            '0px 3px 10px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 2px 4px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs zeroMinWidth>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={5}
                  placeholder="내용을 입력하세요."
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>,
    );

    setEditor([...editor.concat(innerHtml)]);
  };

  //TODO HWI getTypeArr 옵션들 필수아니게 바꿀것
  const fabs = [
    {
      sx: fabStyle as SxProps,
      icon: (
        <AddShoppingCartIcon sx={{ fontSize: '50px', color: '#00000052' }} />
      ),
      label: 'Add',
      color: 'primary' as 'primary',
    },
    {
      sx: fabStyle as SxProps,
      icon: (
        <>
          <Button
            sx={{ minWidth: 'max-content' }}
            onClick={handleAddTextEditor}
            onMouseEnter={handleAddTextEditorPopoverOpen}
            onMouseLeave={handleAddTextEditorPopoverClose}
          >
            <Buttons
              getTypeArr={[
                {
                  type: 'create',
                  text: '텍스트 에디터 만들기',
                  startIcon: 'create',
                  direction: 'row',
                  spacing: 2,
                  variant: 'contained',
                },
              ]}
            />
          </Button>
          <Button
            sx={{ minWidth: 'max-content' }}
            onClick={handleAddTextBox}
            onMouseEnter={handleAddTextEditorPopoverOpen}
            onMouseLeave={handleAddTextEditorPopoverClose}
          >
            <Buttons
              getTypeArr={[
                {
                  type: 'create',
                  text: '텍스트 입력 박스 만들기',
                  startIcon: 'create',
                  direction: 'row',
                  spacing: 2,
                  variant: 'contained',
                },
              ]}
            />
          </Button>
          <Buttons
            getTypeArr={[
              {
                type: 'create',
                text: '코드 에디터 (준비중)',
                startIcon: 'create',
                direction: 'row',
                spacing: 2,
                variant: 'outlined',
              },
            ]}
          />
          <Buttons
            getTypeArr={[
              {
                type: 'create',
                text: '코드 블럭 (준비중)',
                startIcon: 'create',
                direction: 'row',
                spacing: 2,
                variant: 'outlined',
              },
            ]}
          />
        </>
      ),
      label: 'Add',
      color: 'secondary' as 'secondary',
    },
  ];

  return (
    <Box
      component="form"
      sx={{
        overflow: 'auto',
        height: '857px',

        bgcolor: '#fbfbfb66',
        flexGrow: 1,
        px: 3,
      }}
    >
      <StyledPaper
        sx={{
          my: 3,
          mx: 'auto',
          p: 2,
          maxWidth: 'none',
          boxShadow:
            '0px 3px 10px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 2px 4px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs zeroMinWidth>
            <Box
              sx={{
                '& > :not(style)': { m: 3, width: '90%', fontSize: '30px' },
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Input
                placeholder="컨텐츠 제목을 입력하세요."
                aria-label="title"
                id="standard-adornment-weight"
                onChange={onChangeTitle}
                startAdornment={
                  <InputAdornment
                    sx={{ fontSize: '25px', color: 'rgb(171 171 171)' }}
                    position="start"
                  >
                    제목 :{' '}
                  </InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                defaultValue={editorType === 'update' ? props.title : null}
              />
            </Box>
            {/* noWrap */}
          </Grid>
        </Grid>
      </StyledPaper>

      {editor}

      <StyledPaper
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          // p: 5,
          maxWidth: 'none',
          textAlign: 'center',
          alignItems: 'center',
          boxShadow:
            '0px 3px 10px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 2px 4px 0px rgb(0 0 0 / 12%)',
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs
            zeroMinWidth
            sx={{
              position: 'relative',
              minHeight: 60,
            }}
          >
            {fabs.map((fab, index) => (
              <Zoom
                key={index}
                in={mouseEnter === index}
                timeout={transitionDuration}
                style={{
                  transitionDelay: `${
                    mouseEnter === index ? transitionDuration.exit : 0
                  }ms`,
                }}
              >
                <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                  {fab.icon}
                </Fab>
              </Zoom>
            ))}
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default createAndUpdate;
