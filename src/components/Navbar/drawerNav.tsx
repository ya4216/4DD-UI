import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectUnit } from '../../modules/unit';

const drawerBleeding = 20;

interface Props {
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 50,
  height: 5,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 5,
  left: 'calc(50% - 20px)',
}));

//TODO hwi getdata 함수 받아서 클릭할때 내용 바꾸려했는데 잘안됌
//, getData : (value: any) => void 
const SwipeableEdgeDrawer = (menuList : {[key:string]:any}, props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [nodeId, setNodeId] = React.useState('');
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
  const container = window !== undefined ? () => window().document.body : undefined;
  
  const [expanded, setExpanded] = React.useState<string[]>([]);
  // const [expandedArr, setExpandedArr] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? expandedArr : [],
    );
  };

  let cnt = 0;

  let expandedArr : any[] = [];

  //TODO hwi to@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@do

  //expandedArr, cnt 변수 useState로 바꾸고

  //TODO hwi to@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@do

  const selectMenu = (id : string) => {
    dispatch(selectUnit(id));
  }

  React.useEffect(() => {
    setExpanded(expandedArr);
  }, []);

  const childTree = (list : {[key:string]:any}) => {
    let innerHtml: JSX.Element[] = [];

    list.map((v : {[key:string]:any}, i : number) => {
      cnt++;
      innerHtml.push(
        <div key={cnt}>
        {
          (() => {
            if(v.childMenu.length > 0){
              expandedArr.push(String(cnt));

              return (
                <TreeItem nodeId={String(cnt)} label={v.title}>
                  {childTree(v.childMenu)}
                </TreeItem>
              )
            }else{
              return (
                <TreeItem nodeId={String(cnt)} label={v.title} onClick={() => selectMenu(v._id)}/>
              )
            }
          })()
        }
        </div>
      );
    });

    return innerHtml;
  }

  const list = () => {
    return (
      <Box sx={{height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
        <h3>{menuList.category} &gt; {menuList.title}</h3>
        <Box sx={{ textAlign: 'right' }}>
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? '펼치기' : '접기'}
          </Button>
        </Box>
        <TreeView
          aria-label="controlled"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          multiSelect
        >
          {childTree(menuList.childMenu)}
        </TreeView>
      </Box>
    );
  };

  return (
    <>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
          'body' : {
            overflow: 'visible'
          },
          '.MuiBox-root.css-n427rw' : {
            boxShadow: '0px -2px 13px 5px rgb(0 0 0 / 20%)',
            zIndex: '-1'
          }
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 0, display: 'none' }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        disableBackdropTransition={true}
        hideBackdrop={true}
        ModalProps={{
          keepMounted: true,
          disableEnforceFocus: true
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -15,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            left: '25%',
            width: '50%'
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}></Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          { menuList.childMenu.length > 0 ? list() : (<div>과정이 없습니다.</div>) }
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
}

export default SwipeableEdgeDrawer;