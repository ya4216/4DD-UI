import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

type AuthProps = {
    getInfo ? : () => void;
}

export const getUserInfo = ({getInfo}: AuthProps) => {
    return (
        <>
            <IconButton color="primary" aria-label="button create" component="label" onClick={getInfo}>
                <NoteAddIcon />
            </IconButton>
        </>
    );
}