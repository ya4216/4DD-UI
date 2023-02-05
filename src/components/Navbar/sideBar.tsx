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
import { selectUnit } from '../../modules/unit';
import { setOpenSave } from '../../modules/navBar';
import { useDispatch } from 'react-redux';
import TreeItem, { useTreeItem, TreeItemContentProps } from '@mui/lab/TreeItem';
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

const PersistentDrawerLeft = (menuList: { [key: string]: any }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  let cnt = 0;
  let expandedArr: any[] = [];
  const inputRef = useRef<any[]>([]);

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

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? expandedArr : []));
  };

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

  const childTree = (list: { [key: string]: any }) => {
    let innerHtml: JSX.Element[] = [];
    let userId = localStorage.user ? JSON.parse(localStorage.user).id : '';

    list.map((v: { [key: string]: any }, i: number) => {
      cnt++;

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
        <Toolbar sx={{ height: '70px' }} />
        <Box sx={{ overflow: 'auto' }}>
          <DrawerHeader>
            <Typography
              sx={{ p: 2, fontWeight: 'bold', position: 'fixed', left: 0 }}
            >
              {menuList ? menuList.category : null} &gt;{' '}
              {menuList ? menuList.title : null}
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
            {menuList ? (
              menuList.childMenu && menuList.childMenu.length > 0 ? (
                list()
              ) : (
                <div>과정이 없습니다.</div>
              )
            ) : null}
          </>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PersistentDrawerLeft;
