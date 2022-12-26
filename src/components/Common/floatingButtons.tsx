import * as React from 'react';
import Box from '@mui/material/Box';
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
};

type TProps = {
  props: floatProps[];
};

const floatingButtons = ({ onSetFlotingType, type, icon }: floatProps) => {
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

  const getToolTip = () => {
    return (
      <Tooltip
        title={type}
        placement="top"
        arrow
        PopperProps={{
          popperRef,
          anchorEl: {
            getBoundingClientRect: () => {
              return new DOMRect(
                positionRef.current.x,
                areaRef.current!.getBoundingClientRect().y,
                0,
                0,
              );
            },
          },
        }}
      >
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
          {icon}
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab
        color="primary"
        aria-label={type}
        onClick={() => onSetFlotingType(type)}
      >
        {getToolTip()}
      </Fab>
      {/* {props.map((v, i) => {
        return setButton(v.type, v.title, v.icon);
      })}
      <Fab
        color="primary"
        aria-label="cancel"
        onClick={() => handleButtonClick('cancel')}
      >
        {getToolTip()}
      </Fab>
      <Fab
        color="primary"
        aria-label="temporarySave"
        onClick={() => handleButtonClick('temporarySave')}
      >
        {getToolTip()}
      </Fab>
      <Fab
        color="secondary"
        aria-label="save"
        onClick={() => handleButtonClick('save')}
      >
        {getToolTip()}
      </Fab> */}
    </Box>
  );
};

export default floatingButtons;
