
import axios from 'axios'



const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY':'b45e6fbf-0e93-4502-a0b4-aff308e92526',
    },
})


// const settings = {
//     withCredentials: true,
//     headers: {
//         // Не забываем заменить API-KEY на собственный
//         'API-KEY':'b45e6fbf-0e93-4502-a0b4-aff308e92526',
//     },
// }


export type TodolistType =  {
    addedDate:string
    id:string
    order:number
    title:string
}

// export type CreateTodolistResponseType={
//     resultCode: number
//     messages: string[],
//     fieldsErrors: string[]
//     data: { item:  TodolistType[] }
//
// }
// export type UpdateTodolistResponseType={
//     resultCode: number
//     messages: string[],
//     fieldsErrors: string[]
//     data: {}
//
// }
//
// export type DeleteTodolistResponseType={
//     resultCode: number
//     messages: string[],
//     fieldsErrors: string[]
//     data: {}
//
// }

export type TodolistResponseType<T={}>={
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T

}


export enum TaskStatuses {
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3

}

export enum TodoTaskPriorities {
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}


export type TaskType={
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTasksType={
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}




export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {

      return  instance.put<TodolistResponseType>(`todo-lists/${todolistId}`, { title: title })
    },

    getTodolist() {
        return instance.get<TodolistType[]>(`todo-lists/`)
    },

    createTodolist( title: string) {
       return  instance.post<TodolistResponseType<{item:  TodolistType}>>(`todo-lists/`, { title: title })
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${todolistId}`)
    },


}


export const taskAPI = {


    getTasks(todolistId: string) {
        return instance.get<TodolistResponseType<{item:  TaskType}>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title: string) {
        return  instance.post<TodolistResponseType<{item:  TaskType}>>(`todo-lists/${todolistId}/tasks`, { title: title })
    },
    updateTask(todolistId: string, taskId: string,title: string) {

        return  instance.put<TodolistResponseType<{item:  TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: title })
    },
    deleteTask(todolistId: string, taskId: string) {

        return  instance.delete<TodolistResponseType<{item:  TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },




}
