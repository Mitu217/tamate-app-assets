import { Action } from 'redux';

/****************/
/* ActionCreator
/****************/
export enum ActionTypes {
    LOGIN = 'login/app',
    LOGOUT = 'logout/app',
    INIT_REQUEST = 'init/app/request',
    INIT_SUCCESS = 'init/app/success',
    INIT_FAIL = 'init/app/fail',
}

interface LoginAction extends Action {
    type: ActionTypes.LOGIN
}

interface LogoutAction extends Action {
    type: ActionTypes.LOGOUT
}

interface InitRequestAction extends Action {
    type: ActionTypes.INIT_REQUEST
}

interface InitFailAction extends Action {
    type: ActionTypes.INIT_FAIL
}

interface InitSuccessAction extends Action {
    type: ActionTypes.INIT_SUCCESS
}

export const login = (): LoginAction => ({
    type: ActionTypes.LOGIN,
})

export const logout = (): LogoutAction => ({
    type: ActionTypes.LOGOUT,
})

export const initRequest = (): InitRequestAction => ({
    type: ActionTypes.INIT_REQUEST,
})

export const initFail = (): InitFailAction => ({
    type: ActionTypes.INIT_FAIL,
})

export const initSuccess = (): InitSuccessAction => ({
    type: ActionTypes.INIT_SUCCESS,
})

/**********/
/* Reducer
/**********/
export interface State {
    isAuth: boolean
    isInit: boolean
}

const initialState: State = {
    isAuth: false,
    isInit: false,
    // errors: エラーが発生したらエラーメッセージをここへ溜め込むように TODO:
}

export type Actions =
        LoginAction |
        LogoutAction |
        InitRequestAction |
        InitSuccessAction |
        InitFailAction


export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                isAuth: true,
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                isAuth: false,
            }
        case ActionTypes.INIT_SUCCESS:
            return {
                ...state,
                isInit: true,
            }
        default:
            return state
    }
}
