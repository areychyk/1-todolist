import {FilterValuesType, TodoListType} from '../Lesson_8_App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type TodoListActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

const initialState: Array<TodoListType>= []

export const todolistsReducer = (state: Array<TodoListType>=initialState, action: TodoListActionsType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todoListId, title: action.title, filter: "all"}, ...state ]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
           return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId:v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}





































//
//
//
// import {todolistsAPI, TodolistType} from '../api/todolists-api'
// import {Dispatch} from "redux";
//
//
//
// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     id: string
// }
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     title: string
//     todolistId: string
// }
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: string
//     title: string
// }
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER',
//     id: string
//     filter: FilterValuesType
// }
//
// type ActionsType = RemoveTodolistActionType | AddTodolistActionType
//     | ChangeTodolistTitleActionType
//     | ChangeTodolistFilterActionType
//     | GetTodolistType
//
// const initialState: Array<TodolistDomainType> = [
//     /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
//     {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
// ]
//
// export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistDomainType = TodolistType & {
//     filter: FilterValuesType
// }
//
// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//
//
//         case 'REMOVE-TODOLIST': {
//             return state.filter(tl => tl.id !== action.id)
//         }
//         case 'ADD-TODOLIST': {
//             return [{
//                 id: action.todolistId,
//                 title: action.title,
//                 filter: 'all',
//                 addedDate: '',
//                 order: 0
//             }, ...state]
//         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             const todolist = state.find(tl => tl.id === action.id);
//             if (todolist) {
//                 // если нашёлся - изменим ему заголовок
//                 todolist.title = action.title;
//             }
//             return [...state]
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             const todolist = state.find(tl => tl.id === action.id);
//             if (todolist) {
//                 // если нашёлся - изменим ему заголовок
//                 todolist.filter = action.filter;
//             }
//             return [...state]
//         }
//
//         case "SET_TODO-LIST": {
//             return action.todolist.map(tl => ({...tl, filter: 'all'}))
//         }
//         default:
//             return state;
//     }
// }
//
//
// export type GetTodolistType = ReturnType<typeof getTodolistAC>
//
//
// export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId}
// }
// export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
//     return {type: 'ADD-TODOLIST',  title, todolistId}
// }
// export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
// }
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
//
// }
//
// export const getTodolistAC = (todolist: TodolistType[]) => {
//     return {type: 'SET_TODO-LIST', todolist} as const
// }
//
//
// //thunk
//
// export const getTodoThunkTC = () => (dispatch: Dispatch) => {
//     todolistsAPI.getTodolists().then((res) => {
//
//         dispatch(getTodolistAC(res.data))
//
//     })
//
// }
//
//
// export const removeTodoThunkTC = (todolistId: string) => (dispatch: Dispatch) => {
//     todolistsAPI.deleteTodolist(todolistId).then((res) => {
//
//         dispatch(removeTodolistAC(todolistId))
//
//     })
//
// }
//
// export const createTodoThunkTC = (title: string) => (dispatch: Dispatch) => {
//     todolistsAPI.createTodolist(title).then((res) => {
//         const item = res.data.data.item
//         dispatch(addTodolistAC(item.title,item.id))
//
//     })
//
// }
//
//
// export const updateTodolistTitleThunkTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
//
//
//
//     todolistsAPI.updateTodolist(todoId, title)
//         .then((res) => {
//
//             dispatch(changeTodolistTitleAC(todoId,title))
//
//         })
// }
//
//
//
//
//
