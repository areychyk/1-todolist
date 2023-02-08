import React, {Reducer, useEffect, useReducer, useState} from 'react';
import './App.css'

import {v1} from "uuid";
import Lesson_8_TodoList, {TaskType} from "./Lesson_8_TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC, ChangeTodolistTitleAC,
    RemoveTodolistAC,
    TodoListActionsType,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete
// CRUD

// Interface

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>

}

function Lesson_8_App_UseReducer() {

    const todoListId_1: string = v1();
    const todoListId_2: string = v1();


    const [todoLists, dispatchTodoList] = useReducer<Reducer<Array<TodoListType>, TodoListActionsType>>(todolistsReducer,[
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},

    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "on orange", isDone: true},
        ],

    })


    const removeTask = (taskId: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskId,todoListId))




    }
    const addTask = (title: string, todoListId: string) => {

        dispatchTasks(addTaskAC(title,todoListId))


    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId,isDone,todoListId))

    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId,title,todoListId))
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchTodoList(ChangeTodolistFilterAC(todoListId,filter))

    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchTodoList(ChangeTodolistTitleAC(todoListId,title))

    }
    const removeTodoList = (todoListId: string) => {
        let actions =RemoveTodolistAC(todoListId)
        dispatchTodoList(actions)
        dispatchTasks(actions)

    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title)
        dispatchTodoList(action)
        dispatchTasks(action)

    }


    const getFilteredTasksForRender = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todolistItem = todoLists.map(tl => {
        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (

            <Grid item>
            <Paper elevation={24}
                   sx={{p:"15px"}}
            >
            <Lesson_8_TodoList key={tl.id}
                               todoListId={tl.id}
                               filter={tl.filter}
                               title={tl.title}
                               tasks={filteredTasksForRender}

                               removeTodoList={removeTodoList}
                               addTask={addTask}
                               removeTask={removeTask}
                               changeTaskStatus={changeTaskStatus}
                               changeTaskTitle={changeTaskTitle}
                               changeTodoListTitle={changeTodoListTitle}

                               changeTodoListFilter={changeTodoListFilter}

            /></Paper></Grid>
        )


    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    sx={{p:"15px 0"}}
                >
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={6}>
                    {todolistItem}
                </Grid>
            </Container>
        </div>
    );
}

export default Lesson_8_App_UseReducer;
