import React, {useEffect, useState} from 'react';
import './App.css'

import {v1} from "uuid";
import {TaskType} from "./Lesson_7_TodoList";
import {AddItemForm} from "./AddItemForm";
import Lesson_7_TodoList from "./Lesson_7_TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete
// CRUD

// Interface

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>

}

function Lesson_7_App() {
    const todoListId_1: string = v1()
    const todoListId_2: string = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},

    ])


    const [tasks, setTasks] = useState<TasksStateType>({
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

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})


    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }


        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {

        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})

    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: title} : t)})

    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))

    }


    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]

    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }

        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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
            <Lesson_7_TodoList key={tl.id}
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

export default Lesson_7_App;
