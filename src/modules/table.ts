import { Rows } from './table';
import {Action} from 'redux';

/********/
/* Model
/********/
export interface Rows {
    Values: Array<Array<string>>
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
    leftSchemaName: string
    rightDatasourceId: number
    rightSchemaName: string
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

export const diffRequest = (leftDatasourceId: number, leftSchemaName: string, rightDatasourceId: number, rightSchemaName: string): DiffRequestAction => ({
    type: ActionTypes.DIFF_REQUEST,
    leftDatasourceId: leftDatasourceId,
    leftSchemaName: leftSchemaName,
    rightDatasourceId: rightDatasourceId,
    rightSchemaName: rightSchemaName,
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
    add: Rows
    mod: Rows
    del: Rows
}

const initialState: State = {
    add: {
        Values: [],
    },
    mod: {
        Values: [],
    },
    del: {
        Values: [],
    },
}

export type Actions =
                FetchShowRequestAction |
                FetchShowSuccessAction |
                FetchShowFailAction |
                DiffRequestAction |
                DiffSuccessAction |
                DiffFailAction

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.DIFF_SUCCESS:
            var nextAddValues = []
            if (action.add.Values !== null) {
                nextAddValues = action.add.Values
            }
            var nextModifyValues = []
            if (action.modify.Values !== null) {
                nextModifyValues = action.modify.Values
            }
            var nextDeleteValues = []
            if (action.delete.Values !== null) {
                nextDeleteValues = action.delete.Values
            }
            return {
                ...state,
                add: {
                    Values: nextAddValues,
                },
                mod: {
                    Values: nextModifyValues,
                },
                del: {
                    Values: nextDeleteValues,
                },
            };
    }
    return state
}