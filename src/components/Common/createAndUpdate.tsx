import * as React from 'react';
import Box from '@mui/material/Box';
import './common.scss';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import Input from '@mui/material/Input';
import {
  initFloatingState,
  setFloatingButton,
} from '../../modules/floatingButtonModule';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SxProps } from '@mui/system';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Buttons from '../../containers/ButtonContainer';
import FloatingButtons from '../../containers/FloatingButtonContainer';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  //   marginTop: theme.spacing(5),
  //   marginLeft: '3%',
  //   marginRight: '3%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow:
    '0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  width: '98%',
}));

// 버튼종류
// 임시저장 (useYN이 N으로 저장됩니다.)
// 취소
// 작성
// item 삭제 or 추가
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

const createAndUpdate = () => {
  const [isSwitch, setIsSwitch] = React.useState(false);
  const [pureContent, setPureContent] = React.useState('');
  const [content, setContent] = React.useState('');
  const { state } = useLocation();
  const getContent = (content: string) => {
    setPureContent(content.replace(/<[^>]*>?/g, ''));
    setContent(content);
  };
  console.log('state : ', state);
  const theme = useTheme();
  const [mouseEnter, setMouseEnter] = React.useState<number>(0);

  const [editor, setEditor] = React.useState<JSX.Element[]>([]);

  const dispatch = useDispatch();

  //TODO HWI 브라우저 이동 감지해서 화면 벗어나면 false로 바꿔줘야함
  React.useEffect(() => {
    dispatch(setFloatingButton(true));

    // FloatingButtons([
    //   {
    //     type: 'cancel',
    //     icon: '<CancelIcon />',
    //   },
    // ]);

    // dispatch(
    //   setFloatingButtonList([
    //     {
    //       type: 'cancel',
    //       icon: '<CancelIcon />',
    //     },
    //   ]),
    // );

    // <Buttons
    //   getTypeArr={[
    //     {
    //       type: 'create',
    //       text: '텍스트 에디터 만들기',
    //       startIcon: 'create',
    //       direction: 'row',
    //       spacing: 2,
    //       variant: 'contained',
    //     },
    //   ]}
    // />

    handleAddTextEditor();

    return () => {
      dispatch(setFloatingButton(false));
      initFloatingState();
    };
  }, []);

  //가운데 버튼들에 각각 마우스올리면 스켈레톤처럼 해당 컴포넌트의 사진(고민)이 자기가 들어갈 위치에 투명하게 깜빡깜빡하면서 대충 보여줌
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
                contents={isSwitch && state.content}
              />
            </Box>

            <Box component="div">
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
            </Box>
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
                  // label="텍스트 블록"
                  multiline
                  rows={5}
                  // defaultValue="내용을 입력하세요."
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
      // Stack direction="row" spacing={5}
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
                // in={mouseEnter === 1 && (index == 1 || index == 2)}
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

    // <Box
    //   component="form"
    //   sx={{
    //     // '& .MuiTextField-root': { m: 5, width: '90%', height: '2rem' },
    //     // width: '100%',
    //     textAlign: 'center',
    //     display: 'flex',
    //     alignItems: 'center',
    //     width: 'fit-content',
    //   }}
    //   // container
    //   justifyContent="flex-start"
    //   alignItems="center"
    // >
    // <Box
    //   component="div"
    //   sx={{
    //     '& > :not(style)': { m: 5, width: '90%', fontSize: '30px' },
    //     width: '100%',
    //     textAlign: 'center',
    //   }}
    //   // noValidate
    // >
    //   <Input
    //     placeholder="컨텐츠 제목을 입력해주세요."
    //     inputProps={ariaLabel}
    //   />
    // </Box>
    //   <Divider
    //     sx={{
    //       width: '92%',
    //     }}
    //     textAlign="center"
    //     variant="middle"
    //     flexItem
    //   >
    //     {/* ADD EDITOR */}
    //   </Divider>
    //   <Stack
    //     direction="column"
    //     justifyContent="flex-start"
    //     alignItems="center"
    //     spacing={5}
    //     sx={{
    //       p: 3,
    //       width: '90%',
    //     }}
    //   >
    //     <EditorComponent />
    //   </Stack>

    //   {/* <TextField
    //     id="standard-multiline-static"
    //     sx={{}}
    //     label="컨텐츠의 제목을 입력해주세요."
    //     multiline
    //     rows={2}
    //     defaultValue=""
    //     variant="standard"
    //   /> */}

    //   {/* <Divider
    //     sx={{ alignItems: 'center', textAlign: 'center', width: '92%' }}
    //   /> */}
    //   <Divider
    //     sx={{
    //       width: '92%',
    //     }}
    //     textAlign="center"
    //     variant="inset"
    //   >
    //     ADD EDITOR
    //   </Divider>
    //   <Stack
    //     direction="column"
    //     justifyContent="flex-start"
    //     alignItems="center"
    //     spacing={5}
    //     sx={{
    //       // bgcolor: '#f9f9f9',

    //       p: 2,
    //       minWidth: 300,
    //     }}
    //   >
    //     <Item
    //       onMouseEnter={handlePopoverOpen}
    //       onMouseLeave={handlePopoverClose}
    //       variant="outlined"
    //       sx={{
    //         width: '92%',
    //         height: '100px',
    //         borderRadius: 5,
    //         p: 3,
    //         m: 5,
    //       }}
    //     >
    //       <AddShoppingCartIcon sx={{ fontSize: '50px', color: '#00000052' }} />
    //       {
    //         <Zoom
    //           key={'primary'}
    //           in={value === 0}
    //           timeout={transitionDuration}
    //           style={{
    //             transitionDelay: `${
    //               value === 0 ? transitionDuration.exit : 0
    //             }ms`,
    //           }}
    //           unmountOnExit
    //         >
    //           <Fab
    //             sx={fabStyle as SxProps}
    //             aria-label={'buttons'}
    //             color={'primary'}
    //           >
    //             <Buttons getTypeArr={['create', 'update', 'remove', 'onoff']} />
    //           </Fab>
    //         </Zoom>
    //       }
    //     </Item>

    //     {/* <Button
    //       onClick={handleClick}
    //       onMouseEnter={handlePopoverOpen}
    //       onMouseLeave={handlePopoverClose}
    //       variant="contained"
    //       sx={{
    //         // TODO HWI hover css 바꿔야함

    //         '& .MuiButtonBase-root:hover': {
    //           textDecoration: 'none',
    //           bgcolor: 'black',
    //           boxShadow:
    //             '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    //         },
    //         width: '98%',
    //         height: '75px',
    //         bgcolor: '#fff',
    //       }}
    //     >
    //       <AddShoppingCartIcon sx={{ fontSize: '50px', color: '#00000052' }} />
    //       {
    //         <Zoom
    //           key={'primary'}
    //           in={value === 0}
    //           timeout={transitionDuration}
    //           style={{
    //             transitionDelay: `${
    //               value === 0 ? transitionDuration.exit : 0
    //             }ms`,
    //           }}
    //           unmountOnExit
    //         >
    //           <Fab
    //             sx={fabStyle as SxProps}
    //             aria-label={'buttons'}
    //             color={'primary'}
    //           >
    //             <Buttons getTypeArr={['create', 'update', 'remove', 'onoff']} />
    //           </Fab>
    //         </Zoom>
    //       }
    //       {fabs.map((fab, index) => (
    //         <Zoom
    //           key={fab.color}
    //           in={value === 0}
    //           timeout={transitionDuration}
    //           style={{
    //             transitionDelay: `${
    //               value === 0 ? transitionDuration.exit : 0
    //             }ms`,
    //           }}
    //           unmountOnExit
    //         >
    //           <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
    //             {fab.icon}
    //           </Fab>
    //         </Zoom>
    //       ))}
    //     </Button> */}
    //   </Stack>
    //   {/* <Accordion
    //     sx={{ alignItems: 'center', textAlign: 'center', width: '98%' }}
    //   >
    //     <AccordionSummary
    //       sx={{ width: '98%' }}
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1a-content"
    //       id="panel1a-header"
    //     >
    //       <Typography>
    //         <AddShoppingCartIcon
    //           sx={{ fontSize: '50px', color: '#00000052' }}
    //         />
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails sx={{ width: '98%' }}>
    //       <Typography>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    //         malesuada lacus ex, sit amet blandit leo lobortis eget.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion> */}
    // </Box>
  );
};

export default createAndUpdate;
