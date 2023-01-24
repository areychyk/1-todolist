import {FilterValuesType, TodoListType} from "../Lesson_8_App";
import {v1} from "uuid";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "./constans";




export type removeTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}

export type addTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export type changeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}


export type changeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string

}

type ActionType = removeTodoListAT
    | addTodoListAT
    | changeTodoListTitleAT
    | changeTodoListFilterAT

export const todoListsReducer = (todolist: Array<TodoListType>, action: ActionType): Array<TodoListType> => {

    switch (action.type) {
        case REMOVE_TODOLIST:
            return todolist.filter(tl => tl.id !== action.id)
        case ADD_TODOLIST:
            const newTodoListId = v1();
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "all"
            }

            return [...todolist, newTodoList]
        case CHANGE_TODOLIST_TITLE:
            return todolist.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case CHANGE_TODOLIST_FILTER:
            return todolist.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return todolist
    }


}

export const removeTodoListActionCreator = (id:string):removeTodoListAT => ({
    type:REMOVE_TODOLIST,
    id:id

})