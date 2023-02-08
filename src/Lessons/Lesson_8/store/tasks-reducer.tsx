import {TasksStateType} from "../Lesson_8_App";
import {v1} from "uuid";
import {TaskType} from "../Lesson_8_TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTasksAT = ReturnType<typeof removeTaskAC>
export type AddTasksAT = ReturnType<typeof addTaskAC>
export type ChangeTasksStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTasksTitleAT = ReturnType<typeof changeTaskTitleAC>


type ActionType = RemoveTasksAT
    | AddTasksAT
    | ChangeTasksStatusAT
    | ChangeTasksTitleAT
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState:TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':

            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy

        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', title, todoListId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId} as const
}
