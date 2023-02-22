import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {AddItemForm} from "../Lessons/Lesson_8/AddItemForm";
import {action} from "@storybook/addon-actions";
import {Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,

    argTypes: {
        onClick: {
            description: 'Button clicked inside form'
        },
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
};

const Template1: ComponentStory<typeof AddItemForm> = (args) =>  {
    console.log('AddItemForm')
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(true)

    const onClickAddItemToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            args.addItem(trimmedTitle)
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


export const AddItemFormStoryError = Template1.bind({});


AddItemFormStoryError.args = {
    addItem: action('Error')
};