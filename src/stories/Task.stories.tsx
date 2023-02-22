import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Lessons/Lesson_8/Task";



export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        todoListId: 'todolist1',
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),


    }


} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    tasks: {id: 'e32232', title: 'Js', isDone: false},
};


export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    tasks: {id: '12121', title: 'React', isDone: true},

};


const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTasks] = useState({id: '12121', title: 'React', isDone: true})

    const changeTaskStatus = () => {
        setTasks({...task, isDone: !task.isDone})
    }

    const changeTaskTitle = (taskId: string, title: string) => {
        setTasks({...task, title: title})

    }

    return <Task

        tasks={task}
        todoListId={'11213123'}
        removeTask={args.removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
    />
};


export const TaskCheckedStory = Template1.bind({});


