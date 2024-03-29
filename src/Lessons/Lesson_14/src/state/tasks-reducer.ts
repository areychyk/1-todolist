import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, getTodolistAC, GetTodolistType, RemoveTodolistActionType} from './todolists-reducer';
import {
    GetTasksResponse,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistType
    | SetTasksActionType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "SET-TASKS":{
            return {...state, [action.todoId]:action.tasks}
        }

        case "SET_TODO-LIST": {
            let stateCopy = {...state}
            action.todolist.forEach((td) => {
                stateCopy[td.id] = []
            })

            return stateCopy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {

            return {...state,
                [action.todolistId]: [action.task,...state[action.todolistId]]};
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}


//actions
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (task: TaskType, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (todoId: string,tasks: TaskType[]) => {
    return {type: 'SET-TASKS',todoId, tasks} as const
}


type SetTasksActionType = ReturnType<typeof setTasksAC>


//thunk

export const getTasksThunkTC = (todoId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoId)
        .then((res) => {

            dispatch(setTasksAC(todoId,res.data.items))

        })

}

export const removeTasksThunkTC = (todoId: string, taskId:string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoId, taskId)
        .then((res) => {

            dispatch(removeTaskAC(taskId,todoId))

        })

}

export const createTasksThunkTC = (todoId: string, title:string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoId, title)
        .then((res) => {

            dispatch(addTaskAC(res.data.data.item,todoId))

        })

}

export const updateTasksStatusThunkTC = (todoId: string, taskId:string, status:TaskStatuses) => (dispatch: Dispatch, getState:()=>AppRootStateType) => {

    const task = getState().tasks[todoId].find(t=>t.id===taskId)

    if(task){
        const model:UpdateTaskModelType ={
            title:task.title,
            status:status,
            deadline: task.deadline,
            description:task.description,
            priority:task.priority,
            startDate:task.startDate

        }

        todolistsAPI.updateTask(todoId, taskId, model)
            .then((res) => {

                dispatch(changeTaskStatusAC(taskId,status,todoId))

            })
    }



}

export const updateTasksTitleThunkTC = (todoId: string, taskId:string, title: string) => (dispatch: Dispatch, getState:()=>AppRootStateType) => {

    const task = getState().tasks[todoId].find(t=>t.id===taskId)

    if(task){
        const model:UpdateTaskModelType ={
            title,
            status:task.status,
            deadline: task.deadline,
            description:task.description,
            priority:task.priority,
            startDate:task.startDate

        }

        todolistsAPI.updateTask(todoId, taskId, model)
            .then((res) => {

                dispatch(changeTaskTitleAC(taskId,title,todoId))

            })
    }



}
