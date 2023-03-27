import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, Result_Code} from "../../api/todolists-api";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isInitialized:false,
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)

// thunks
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const result = await authAPI.login(data)
        if (result.resultCode === Result_Code.Ok) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result, dispatch)
        }

    } catch (error:any) {
        handleServerNetworkError(error, dispatch)
    }


}


export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const result = await authAPI.logout()
        if (result.resultCode === Result_Code.Ok) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result, dispatch)
        }

    } catch (error:any) {
        handleServerNetworkError(error, dispatch)
    }


}

export const initializeAppTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const result = await authAPI.me()
        if (result.resultCode === Result_Code.Ok) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))

        } else {
            dispatch(setIsInitializedAC(true))
            handleServerAppError(result, dispatch)
        }

    } catch (error:any) {
        handleServerNetworkError(error, dispatch)
    }

}



// types
type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setIsInitializedAC>
