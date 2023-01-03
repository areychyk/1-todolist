import React, {useEffect, useState} from 'react';
import './App.css';

import {v1} from "uuid";
import Lesson_5_TodoList, {TaskType} from "./Lesson_5_TodoList";

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

function Lesson_5_App() {
    const todoListId_1: string = v1()
    const todoListId_2: string = v1()
    const todoListId_3: string = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
        {id: todoListId_3, title: "What to ?", filter: "all"},
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
        [todoListId_3]: [
            {id: v1(), title: "s", isDone: true},
            {id: v1(), title: "on s", isDone: true},
        ],
    })

    const todoListTitle: string = "What to learn"

    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML & CSS", isDone: true},
    //     {id: v1(), title: "ES6 & TS", isDone: true},
    //     {id: v1(), title: "REACT", isDone: false},
    // ])

    const [filter, setFilter] = useState<FilterValuesType>("all")


    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate=tasks[todoListId]
        // const updateTasks = tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks={...tasks}
        // copyTasks[todoListId]=updateTasks
        // setTasks(copyTasks)
        //одно и тоже
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})


        // setTasks(tasks.filter(t => t.id !== taskId)) // асинхронно, 5-10 ms
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const tasksForUpdate=tasks[todoListId]
        // const updateTasks = [newTask, ...tasksForUpdate]
        // const copyTasks={...tasks}
        // copyTasks[todoListId]=updateTasks
        // setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        // setFilter(filter)
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    const removeTodoList=(todoListId: string)=>{
        setTodoLists(todoLists.filter(tl=>tl.id !==todoListId))
        delete tasks[todoListId]

    }


    const getFilteredTasksForRender = (tasks:TaskType[], filter:FilterValuesType): TaskType[]=> {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }



    const todolistItem = todoLists.map(tl=>{
        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return(
            <Lesson_5_TodoList key={tl.id}
                      todoListId={tl.id}
                      filter={tl.filter}
                      title={tl.title}
                      tasks={filteredTasksForRender}

                      removeTodoList={removeTodoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTodoListFilter={changeTodoListFilter}

            />
        )


    })

    return (
        <div className="App">
            {todolistItem}
        </div>
    );
}

export default Lesson_5_App;
