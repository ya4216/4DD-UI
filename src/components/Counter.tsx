import React from 'react';

type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
};

function Counter({
  count,
  onIncrease,
  onDecrease,
  onIncreaseBy,
}: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled, useTheme } from '@mui/material/styles';
// import Input from '@mui/material/Input';
// import { setFloatingButton } from '../../modules/floatingButtonModule';
// import { useDispatch } from 'react-redux';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import Button from '@mui/material/Button';
// import EditorComponent from '../Utils/index';

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import Zoom from '@mui/material/Zoom';
// import Fab from '@mui/material/Fab';
// import { green } from '@mui/material/colors';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import UpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { SxProps } from '@mui/system';

// import Divider from '@mui/material/Divider';

// import Buttons from '../../containers/ButtonContainer';

// const ariaLabel = { 'aria-label': 'description' };

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   //   marginTop: theme.spacing(5),
//   //   marginLeft: '3%',
//   //   marginRight: '3%',
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   boxShadow:
//     '0px 2px 15px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
//   width: '98%',
// }));

// // 버튼종류
// // 임시저장 (useYN이 N으로 저장됩니다.)
// // 취소
// // 작성
// // item 삭제 or 추가

// const fabStyle = {
//   position: 'absolute',
//   bottom: 16,
//   right: 16,
// };

// const fabGreenStyle = {
//   color: 'common.white',
//   bgcolor: green[500],
//   '&:hover': {
//     bgcolor: green[600],
//   },
// };

// const createAndUpdate = () => {
//   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

//   const theme = useTheme();
//   const [value, setValue] = React.useState(1);

//   const dispatch = useDispatch();

//   //TODO HWI 브라우저 이동 감지해서 화면 벗어나면 false로 바꿔줘야함
//   React.useEffect(() => {
//     dispatch(setFloatingButton(true));
//     return () => {
//       dispatch(setFloatingButton(false));
//     };
//   }, []);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     // setAnchorEl(event.currentTarget);
//   };

//   //마우스올리면 +버튼 왼쪽으로 슬라이딩되고 가운데에 "텍스트에디터 | input박스 | 테이블 | 코드블록 | 코드에디터 | 기타 등등 추가 가능하도록"
//   //가운데 버튼들에 각각 마우스올리면 스켈레톤처럼 해당 컴포넌트의 사진(고민)이 자기가 들어갈 위치에 투명하게 깜빡깜빡하면서 대충 보여줌
//   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
//     console.log('마우스 왔냐');
//     setValue(0);
//     // setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     console.log('마우스 갔냐');
//     setValue(3);
//     // setAnchorEl(null);
//   };

//   const transitionDuration = {
//     enter: theme.transitions.duration.enteringScreen,
//     exit: theme.transitions.duration.leavingScreen,
//   };

//   const handleChange = (event: unknown, newValue: number) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index: number) => {
//     setValue(index);
//   };

//   const open = Boolean(anchorEl);

//   const fabs = [
//     {
//       color: 'primary' as 'primary',
//       sx: fabStyle as SxProps,
//       icon: <AddIcon />,
//       label: 'Add',
//     },
//     {
//       color: 'secondary' as 'secondary',
//       sx: fabStyle as SxProps,
//       icon: <EditIcon />,
//       label: 'Edit',
//     },
//     {
//       color: 'inherit' as 'inherit',
//       sx: { ...fabStyle, ...fabGreenStyle } as SxProps,
//       icon: <UpIcon />,
//       label: 'Expand',
//     },
//   ];

//   return (
//     <Box
//       component="form"
//       sx={{
//         // '& .MuiTextField-root': { m: 5, width: '90%', height: '2rem' },
//         // width: '100%',
//         textAlign: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         width: 'fit-content',
//       }}
//       // container
//       justifyContent="flex-start"
//       alignItems="center"
//     >
//       <Box
//         component="div"
//         sx={{
//           '& > :not(style)': { m: 5, width: '90%', fontSize: '30px' },
//           width: '100%',
//           textAlign: 'center',
//         }}
//         // noValidate
//       >
//         <Input
//           placeholder="컨텐츠 제목을 입력해주세요."
//           inputProps={ariaLabel}
//         />
//       </Box>
//       <Divider
//         sx={{
//           width: '92%',
//         }}
//         textAlign="center"
//         variant="middle"
//         flexItem
//       >
//         {/* ADD EDITOR */}
//       </Divider>
//       <Stack
//         direction="column"
//         justifyContent="flex-start"
//         alignItems="center"
//         spacing={5}
//         sx={{
//           p: 3,
//           width: '90%',
//         }}
//       >
//         <EditorComponent />
//       </Stack>

//       {/* <TextField
//         id="standard-multiline-static"
//         sx={{}}
//         label="컨텐츠의 제목을 입력해주세요."
//         multiline
//         rows={2}
//         defaultValue=""
//         variant="standard"
//       /> */}

//       {/* <Divider
//         sx={{ alignItems: 'center', textAlign: 'center', width: '92%' }}
//       /> */}
//       <Divider
//         sx={{
//           width: '92%',
//         }}
//         textAlign="center"
//         variant="inset"
//       >
//         ADD EDITOR
//       </Divider>
//       <Stack
//         direction="column"
//         justifyContent="flex-start"
//         alignItems="center"
//         spacing={5}
//         sx={{
//           // bgcolor: '#f9f9f9',

//           p: 2,
//           minWidth: 300,
//         }}
//       >
//         <Item
//           onMouseEnter={handlePopoverOpen}
//           onMouseLeave={handlePopoverClose}
//           variant="outlined"
//           sx={{
//             width: '92%',
//             height: '100px',
//             borderRadius: 5,
//             p: 3,
//             m: 5,
//           }}
//         >
//           <AddShoppingCartIcon sx={{ fontSize: '50px', color: '#00000052' }} />
//           {
//             <Zoom
//               key={'primary'}
//               in={value === 0}
//               timeout={transitionDuration}
//               style={{
//                 transitionDelay: `${
//                   value === 0 ? transitionDuration.exit : 0
//                 }ms`,
//               }}
//               unmountOnExit
//             >
//               <Fab
//                 sx={fabStyle as SxProps}
//                 aria-label={'buttons'}
//                 color={'primary'}
//               >
//                 <Buttons getTypeArr={['create', 'update', 'remove', 'onoff']} />
//               </Fab>
//             </Zoom>
//           }
//         </Item>

//         {/* <Button
//           onClick={handleClick}
//           onMouseEnter={handlePopoverOpen}
//           onMouseLeave={handlePopoverClose}
//           variant="contained"
//           sx={{
//             // TODO HWI hover css 바꿔야함

//             '& .MuiButtonBase-root:hover': {
//               textDecoration: 'none',
//               bgcolor: 'black',
//               boxShadow:
//                 '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
//             },
//             width: '98%',
//             height: '75px',
//             bgcolor: '#fff',
//           }}
//         >
//           <AddShoppingCartIcon sx={{ fontSize: '50px', color: '#00000052' }} />
//           {
//             <Zoom
//               key={'primary'}
//               in={value === 0}
//               timeout={transitionDuration}
//               style={{
//                 transitionDelay: `${
//                   value === 0 ? transitionDuration.exit : 0
//                 }ms`,
//               }}
//               unmountOnExit
//             >
//               <Fab
//                 sx={fabStyle as SxProps}
//                 aria-label={'buttons'}
//                 color={'primary'}
//               >
//                 <Buttons getTypeArr={['create', 'update', 'remove', 'onoff']} />
//               </Fab>
//             </Zoom>
//           }
//           {fabs.map((fab, index) => (
//             <Zoom
//               key={fab.color}
//               in={value === 0}
//               timeout={transitionDuration}
//               style={{
//                 transitionDelay: `${
//                   value === 0 ? transitionDuration.exit : 0
//                 }ms`,
//               }}
//               unmountOnExit
//             >
//               <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
//                 {fab.icon}
//               </Fab>
//             </Zoom>
//           ))}
//         </Button> */}
//       </Stack>
//       {/* <Accordion
//         sx={{ alignItems: 'center', textAlign: 'center', width: '98%' }}
//       >
//         <AccordionSummary
//           sx={{ width: '98%' }}
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography>
//             <AddShoppingCartIcon
//               sx={{ fontSize: '50px', color: '#00000052' }}
//             />
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails sx={{ width: '98%' }}>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//           </Typography>
//         </AccordionDetails>
//       </Accordion> */}
//     </Box>
//   );
// };

// export default createAndUpdate;
