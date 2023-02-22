import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {TasksStateType} from "../Lessons/Lesson_8/Lesson_8_App_Redux";

import {ReduxStoreProviderDecorator} from "../Lessons/Lesson_8/store/ReduxStoreProviderDecorator";
import {TaskWithRedux} from "../Lessons/Lesson_8/TaskWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Lessons/Lesson_8/store/store";


export default {
    title: 'TODOLIST/App',
    component: TaskWithRedux,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof TaskWithRedux>;

const TaskCopy=()=>{
    const task = useSelector<AppRootStateType, any>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux todoListId={'todolistId1'} task={task}/>
}

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskCopy/> ;





