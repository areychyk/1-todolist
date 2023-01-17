import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onKeyDownSetLocalTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }
    return (
        editMode
            ? <TextField
                variant="standard"
                onBlur={offEditMode}
                autoFocus
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownSetLocalTitleHandler}/>

            : <span
                onDoubleClick={onEditMode}
                className={props.classes}
            >
                {props.title}
        </span>
    );
};

