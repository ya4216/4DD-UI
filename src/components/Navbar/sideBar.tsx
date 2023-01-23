import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { selectUnit } from '../../modules/unit';
import { setOpenSave } from '../../modules/navBar';
import { useDispatch } from 'react-redux';
import TreeItem, {
  treeItemClasses,
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/lab/TreeItem';
import { Button, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useRef } from 'react';
import Buttons from '../../containers/ButtonContainer';
import clsx from 'clsx';

import { selectMenuInfo } from '../../modules/buttonModule';

let drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@CustomContent@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@CustomContent@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@StyledTreeItem nodeId={String(cnt)} labelText={v.title} labelIcon={PendingIcon}@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@StyledTreeItem nodeId={String(cnt)} labelText={v.title} labelIcon={PendingIcon}@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../modules';
// import { initNavState, setOpenSave } from '../../modules/navBar';

// const sideBarOpen = useSelector((state: RootState) => state.navBar.open);

const PersistentDrawerLeft = (menuList: { [key: string]: any }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    dispatch(setOpenSave(true));
    drawerWidth = 300;
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(setOpenSave(false));
    drawerWidth = 0;
  };

  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? expandedArr : []));
  };

  let cnt = 0;

  let expandedArr: any[] = [];

  const selectMenu = (id: string) => {
    dispatch(selectUnit(id));
  };

  React.useEffect(() => {
    drawerWidth = 300;
    setExpanded(expandedArr);
    return () => {
      dispatch(setOpenSave(true));
    };
  }, []);

  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const inputRef = useRef<any[]>([]);

  const labelAndIcon = (value: any, cnt: number) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
          <Button onClick={() => dispatch(selectMenuInfo(value))}>
            {value.title}
          </Button>
        </Typography>
        <Typography component="div">
          <TreeView
            color="inherit"
            aria-label="controlled"
            defaultCollapseIcon={<MoreHorizIcon />}
            defaultExpandIcon={<MoreHorizIcon />}
            onClick={() => dispatch(selectMenuInfo(value))}
          >
            <TreeItem nodeId="1-1">
              <TreeItem
                nodeId="1-2"
                label={
                  <Buttons
                    getTypeArr={['create', 'update', 'remove', 'onoff']}
                  />
                }
              />
            </TreeItem>
          </TreeView>
        </Typography>
      </Box>
    );
  };

  //--------------------- StyledTreeItem 지금 안쓰고있음 ---------------------
  //--------------------- StyledTreeItem 지금 안쓰고있음 ---------------------

  // <StyledTreeItem nodeId={String(cnt)} labelText={v.title} labelIcon={PendingIcon}>
  //   {childTree(v.childMenu)}
  // </StyledTreeItem>

  // <StyledTreeItem nodeId={String(cnt)} labelText={v.title} labelIcon={PendingIcon} onClick={() => selectMenu(v._id)}/>

  //--------------------- StyledTreeItem 지금 안쓰고있음 ---------------------
  //--------------------- StyledTreeItem 지금 안쓰고있음 ---------------------

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@ 아래 childTree 함수 안에 실험중 >>> ... 버튼 누르면 선택 요소 밑에 버튼 메뉴 나와야함 @@@@@@@@@@@@@@@@@@@@@@@@@
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  const childTree = (list: { [key: string]: any }) => {
    let innerHtml: JSX.Element[] = [];
    let userId = localStorage.user ? JSON.parse(localStorage.user).id : '';

    list.map((v: { [key: string]: any }, i: number) => {
      cnt++;

      // if (v.useYN == 'Y') {
      if (v.childMenu.length > 0) {
        if (v.useYN == 'N' && userId != '6371e3df99561093efe09cfd') {
          return false;
        }
        expandedArr.push(String(cnt));
        innerHtml.push(
          <div key={cnt}>
            <TreeItem
              ContentComponent={CustomContent}
              ref={(el) => (inputRef.current[cnt] = el)}
              nodeId={String(cnt)}
              label={labelAndIcon(v, cnt)}
              disabled={v.useYN == 'Y' ? false : true}
            >
              {childTree(v.childMenu)}
            </TreeItem>
          </div>,
        );
      } else {
        if (v.useYN == 'N' && userId != '6371e3df99561093efe09cfd') {
          return false;
        }
        innerHtml.push(
          <div key={cnt} onClick={() => selectMenu(v._id)}>
            <TreeItem
              ContentComponent={CustomContent}
              nodeId={String(cnt)}
              label={labelAndIcon(v, cnt)}
              disabled={v.useYN == 'Y' ? false : true}
            />
          </div>,
        );
      }
      // }
    });
    return innerHtml;
  };

  const list = () => {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
        <Box sx={{ textAlign: 'right' }}>
          <input type="text" />
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? '펼치기' : '접기'}
          </Button>
          <br />
          <Buttons getTypeArr={['create', 'update', 'remove', 'onoff']} />
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
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <ChevronRightIcon />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: '0px 0 25px 0px rgb(0 0 0 / 15%)',
          },
          zIndex: 99,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar sx={{ height: '80px' }} />
        <Box sx={{ overflow: 'auto' }}>
          <DrawerHeader>
            <Typography
              sx={{ p: 2, fontWeight: 'bold', position: 'fixed', left: 0 }}
            >
              {menuList.category} &gt; {menuList.title}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <>
            {menuList.childMenu.length > 0 ? (
              list()
            ) : (
              <div>과정이 없습니다.</div>
            )}
          </>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PersistentDrawerLeft;
