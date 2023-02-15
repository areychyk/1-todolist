import React, {Reducer, useCallback, useEffect, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

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

function Lesson_8_App_Redux() {
    console.log('App')




    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))


    },[dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {

        dispatch(addTaskAC(title, todoListId))


    },[])
    const changeTaskStatus =useCallback( (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))

    },[dispatch])
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    },[dispatch])


    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(todoListId, filter))

    },[dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, title))

    },[dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        let actions = RemoveTodolistAC(todoListId)
        dispatch(actions)


    },[dispatch])
    const addTodoList = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)


    },[dispatch])


    // const getFilteredTasksForRender = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    //     switch (filter) {
    //         case "active":
    //             return tasks.filter(t => !t.isDone)
    //         case "completed":
    //             return tasks.filter(t => t.isDone)
    //         default:
    //             return tasks
    //     }
    // }

    const todolistItem = todoLists.map(tl => {
        // const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Grid item key={tl.id}>
                <Paper elevation={24} sx={{p: "15px"}} key={tl.id}>
                    <Lesson_8_TodoList key={tl.id}
                                       todoListId={tl.id}
                                       filter={tl.filter}
                                       title={tl.title}
                                       // tasks={filteredTasksForRender}
                                       tasks={tasks[tl.id]}

                                       removeTodoList={removeTodoList}
                                       addTask={addTask}
                                       removeTask={removeTask}
                                       changeTaskStatus={changeTaskStatus}
                                       changeTaskTitle={changeTaskTitle}
                                       changeTodoListTitle={changeTodoListTitle}

                                       changeTodoListFilter={changeTodoListFilter}

                    />
                </Paper>
            </Grid>
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
                    sx={{p: "15px 0"}}
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

export default Lesson_8_App_Redux;
