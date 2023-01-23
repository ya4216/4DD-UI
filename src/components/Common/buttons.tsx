import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { ResponsiveStyleValue } from '@mui/system';

type SelectProps = {
  type: string;
  text: string;
  startIcon: string;
  direction:
    | ResponsiveStyleValue<'column' | 'column-reverse' | 'row' | 'row-reverse'>
    | undefined;
  spacing: ResponsiveStyleValue<string | number> | undefined;
  variant: 'text' | 'outlined' | 'contained' | undefined;
};

type ButtonProps = {
  onSetButtonType: (type: string) => void;
  selectType: string | SelectProps;
};

const getIcon = (selectType: string) => {
  switch (selectType) {
    case 'create':
      return <NoteAddIcon />;
    case 'update':
      return <EditIcon />;
    case 'remove':
      return <DeleteForeverIcon />;
    case 'onoff':
      return true ? <ToggleOnIcon /> : <ToggleOffIcon />;
    default:
      return <></>;
  }
};

const getCustomIcon = (selectObject: SelectProps) => {
  return (
    <Stack
      direction={selectObject.direction ? selectObject.direction : 'row'}
      spacing={selectObject.spacing ? selectObject.spacing : 2}
    >
      <Button
        variant={selectObject.variant ? selectObject.variant : 'outlined'}
        startIcon={getIcon(selectObject.startIcon)}
      >
        {selectObject.text}
      </Button>
    </Stack>
  );
};

export const getButton = ({ onSetButtonType, selectType }: ButtonProps) => {
  const setType =
    typeof selectType == 'string'
      ? (selectType as string)
      : (selectType.type as string);

  return (
    <>
      <IconButton
        color="primary"
        aria-label="button create"
        component="label"
        onClick={() => onSetButtonType(setType)}
      >
        {typeof selectType == 'string'
          ? getIcon(selectType)
          : getCustomIcon(selectType)}
      </IconButton>
    </>
  );
};
