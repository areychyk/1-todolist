import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

import AddIcon from '@mui/icons-material/Add';
import {Box, Button, ButtonGroup, IconButton, TextField} from "@mui/material";

type AddItemFormPropsType={
    addItem:(title:string)=>void
}


export const AddItemForm: FC<AddItemFormPropsType>= (props) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onClickAddItemToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)

    }

    const onKeyDownAddItemToTodoListHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItemToTodoListHandler()

        //const errorMessageStyles = {color: "hotpink", marginTop: "0", marginBottom: "0"}
        //const errorInputClasses = error ? "inputError" : undefined
        //const errorMessage = error && <p style={errorMessageStyles}>Please, enter item title</p>
        return (
            <div>

                <TextField
                    variant="filled"
                    label="Enter Title"
                    value={title}
                    size={'small'}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddItemToTodoListHandler}
                    // className={errorInputClasses}

                    error={error}
                    helperText={error && 'Please, enter item title'}
                />
                <Button

                    onClick={onClickAddItemToTodoListHandler}
                    variant="contained"
                    size={'small'}
                    color={'primary'}
                    startIcon={<AddIcon />}>Add</Button >
                {/*{errorMessage}*/}

            </div>
        );
    };

