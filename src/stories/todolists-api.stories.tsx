


import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todoist-api";


export default {
    title: 'API'
}

// const setting={
// withCredentials:true,
//     headers:{
//     'API-KEY':'b45e6fbf-0e93-4502-a0b4-aff308e92526'
//     }
// }

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
// axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', setting)
//     .then((resolve)=>{
//         setState(resolve.data)
//
//     })

        todolistAPI.getTodolist().then((resolve)=>{

            setState(resolve.data)

        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}




export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title='CreateNewTodolist';
        todolistAPI.createTodolist(title)
            .then((resolve)=> {
                setState(resolve.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='78989423-5109-48dd-8edc-10383ae03912'
        todolistAPI.deleteTodolist(todolistId)
            .then((resolve)=> {
                setState(resolve.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='f933a8a1-fda3-4941-a511-0b4e4bbaf99a'
        const title='NewName';
        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}` ,{title:'editableName'},  setting)
        //     .then((resolve)=> {
        //         setState(resolve.data)
        //     })

        todolistAPI.updateTodolist(todolistId,title).then((resolve)=>{
            setState(resolve.data)

        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}





export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='f933a8a1-fda3-4941-a511-0b4e4bbaf99a'
        taskAPI.getTasks(todolistId).then((resolve)=>{

            setState(resolve.data)

        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}



export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='5dae6933-24a8-49a6-8f2e-8d419a1b26e5'
        const title='NewTask';
        taskAPI.createTask(todolistId,title)
            .then((resolve)=> {
                setState(resolve.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='f933a8a1-fda3-4941-a511-0b4e4bbaf99a'
        const taskId='2e9cb652-dffb-4c3e-b3b9-9c54e7c0a254'
        const title='NewEditableNameTask';
        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}` ,{title:'editableName'},  setting)
        //     .then((resolve)=> {
        //         setState(resolve.data)
        //     })

        taskAPI.updateTask(todolistId,taskId,title).then((resolve)=>{
            setState(resolve.data)

        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='f933a8a1-fda3-4941-a511-0b4e4bbaf99a'
        const taskId='7177c8af-177e-4d8e-921c-37de137b67ea'

        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}` ,{title:'editableName'},  setting)
        //     .then((resolve)=> {
        //         setState(resolve.data)
        //     })

        taskAPI.deleteTask(todolistId,taskId).then((resolve)=>{
            setState(resolve.data)

        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

