//app-reducer.tsx


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'| 'imgLoading'


export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type setAppErrorType = ReturnType<typeof setAppErrorAC>

const initialState = {
    error: null as null | string,
    status: 'idle' as RequestStatusType
}


type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC=(status:RequestStatusType)=>({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC=(error:null|string)=>({type: 'APP/SET-ERROR', error} as const)

type ActionsType = SetAppStatusType |setAppErrorType
