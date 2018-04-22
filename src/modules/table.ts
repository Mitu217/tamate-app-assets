import {Action} from 'redux';

/********/
/* Model
/********/
export interface Rows {
    //TODO
}

export interface Table {
    //TODO
}

/****************/
/* ActionCreator
/****************/
export enum ActionTypes {
    SHOW_REQUEST = 'show/table/request',
    SHOW_SUCCESS = 'show/table/success',
    SHOW_FAIL = 'show/table/fail',
    DIFF_REQUEST = 'diff/table/request',
    DIFF_SUCCESS = 'diff/table/success',
    DIFF_FAIL = 'diff/table/fail',
}


interface FetchShowRequestAction extends Action {
    type: ActionTypes.SHOW_REQUEST
    id: number
}

interface FetchShowSuccessAction extends Action {
    type: ActionTypes.SHOW_SUCCESS
    rows: Rows
}

interface FetchShowFailAction extends Action {
    type: ActionTypes.SHOW_FAIL
    message: string
}

interface DiffRequestAction extends Action {
    type: ActionTypes.DIFF_REQUEST
    leftDatasourceId: number
    rightDatasourceId: number
}

interface DiffSuccessAction extends Action {
    type: ActionTypes.DIFF_SUCCESS
    add: Rows
    modify: Rows
    delete: Rows
}

interface DiffFailAction extends Action {
    type: ActionTypes.DIFF_FAIL
    message: string
}

export const fetchShowRequest = (datasourceId: number): FetchShowRequestAction => ({
    type: ActionTypes.SHOW_REQUEST,
    id: datasourceId,
})

export const fetchShowSuccess = (rows: Rows): FetchShowSuccessAction => ({
    type: ActionTypes.SHOW_SUCCESS,
    rows: rows,
})

export const fetchShowFail = (message: string): FetchShowFailAction => ({
    type: ActionTypes.SHOW_FAIL,
    message: message,
})

export const diffRequest = (leftDatasourceId: number, rightDatasourceId: number): DiffRequestAction => ({
    type: ActionTypes.DIFF_REQUEST,
    leftDatasourceId: leftDatasourceId,
    rightDatasourceId: rightDatasourceId,
})

export const diffSuccess = (add: Rows, mod: Rows, del: Rows): DiffSuccessAction => ({
    type: ActionTypes.DIFF_SUCCESS,
    add: add,
    modify: mod,
    delete: del,
})

export const diffFail = (message: string): DiffFailAction => ({
    type: ActionTypes.DIFF_FAIL,
    message: message,
})

/**********/
/* Reducer
/**********/
export interface State {
}

const initialState: State = {
}

export type Actions =
                FetchShowRequestAction |
                FetchShowSuccessAction |
                FetchShowFailAction |
                DiffRequestAction |
                DiffSuccessAction |
                DiffFailAction

export default function reducer(state: State = initialState, action: Actions): State {
    return state
}