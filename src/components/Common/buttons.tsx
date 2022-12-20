import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

type ButtonProps = {
    create ? : () => void;
    update ? : () => void;
    remove ? : () => void;
    onOff ? : () => void;
    on ? : boolean;
}

export const createButton = ({create}: ButtonProps) => {
    return (
        <>
            <IconButton color="primary" aria-label="button create" component="label" onClick={create}>
                <NoteAddIcon />
            </IconButton>
        </>
    );
}

export const updateButton = ({update}:ButtonProps) => {
    return (
        <>
            <IconButton color="primary" aria-label="button update" component="label" onClick={update}>
                <EditIcon />
            </IconButton>
        </>
    );
}

export const removeButton = ({remove}:ButtonProps) => {
    return (
        <>
            <IconButton color="primary" aria-label="button remove" component="label" onClick={remove}>
                <DeleteForeverIcon />
            </IconButton>
        </>
    );
}

export const onOffButton = ({onOff, on}:ButtonProps) => {
    return (
        <>
            <IconButton color="primary" aria-label="button onOff" component="label" onClick={onOff}>
                {
                    on ? (<ToggleOnIcon />):(<ToggleOffIcon />)
                }
            </IconButton>
        </>
    );
}