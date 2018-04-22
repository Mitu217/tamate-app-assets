import {Action} from 'redux';

/********/
/* Model
/********/
export interface Config {}

export interface CSVConfig extends Config {
    path: string
}

export interface SQLConfig extends Config {
    driverName: string
    dsn: string
    tableName: string
}

export interface SpreadSheetConfig extends Config {
    spreadSheetsID: string
	sheetName: string
	range: string
}

export interface Datasource {
    id: number
    projectId: number
    schemaId: number
    name: string
    sourceType: string
    config: Config
}

/****************/
/* ActionCreator
/****************/
export enum ActionTypes {
    LIST_REQUEST = 'list/datasource/request',
    LIST_SUCCESS = 'list/datasource/success',
    LIST_FAIL = 'list/datasource/fail',
    SHOW_REQUEST = 'show/datasource/request',
    SHOW_SUCCESS = 'show/datasource/success',
    SHOW_FAIL = 'show/datasource/fail',
    CREATE_REQUEST = 'create/datasource/request',
    CREATE_SUCCESS = 'create/datasource/success',
    CREATE_FAIL = 'create/datasource/fail',
    UPDATE_REQUEST = 'update/datasource/request',
    UPDATE_SUCCESS = 'update/datasource/success',
    UPDATE_FAIL = 'update/datasource/fail',
    DELETE_REQUEST = 'delete/datasource/request',
    DELETE_SUCCESS = 'delete/datasource/success',
    DELETE_FAIL = 'delete/datasource/fail',
}


interface FetchListRequestAction extends Action {
    type: ActionTypes.LIST_REQUEST
}

interface FetchListSuccessAction extends Action {
    type: ActionTypes.LIST_SUCCESS
    datasources: Array<Datasource>
}

interface FetchListFailAction extends Action {
    type: ActionTypes.LIST_FAIL
    message: string
}

interface FetchShowRequestAction extends Action {
    type: ActionTypes.SHOW_REQUEST
    id: number
}

interface FetchShowSuccessAction extends Action {
    type: ActionTypes.SHOW_SUCCESS
    datasource: Datasource
}

interface FetchShowFailAction extends Action {
    type: ActionTypes.SHOW_FAIL
    message: string
}

interface CreateRequestAction extends Action {
    type: ActionTypes.CREATE_REQUEST
    projectId: number
    schemaId: number
    name: string
    sourceType: string
    config: Config
}

interface CreateSuccessAction extends Action {
    type: ActionTypes.CREATE_SUCCESS
    datasource: Datasource
}

interface CreateFailAction extends Action {
    type: ActionTypes.CREATE_FAIL
    message: string
}

interface UpdateRequestAction extends Action {
    type: ActionTypes.UPDATE_REQUEST
    id: number
    projectId: number
    schemaId: number
    name: string
    sourceType: string
    config: Config
}

interface UpdateSuccessAction extends Action {
    type: ActionTypes.UPDATE_SUCCESS
    datasource: Datasource
}

interface UpdateFailAction extends Action {
    type: ActionTypes.UPDATE_FAIL
    message: string
}

interface DeleteRequestAction extends Action {
    type: ActionTypes.DELETE_REQUEST
    id: number
}

interface DeleteSuccessAction extends Action {
    type: ActionTypes.DELETE_SUCCESS
    id: number
}

interface DeleteFailAction extends Action {
    type: ActionTypes.DELETE_FAIL
    message: string
}

export const fetchListRequest = (): FetchListRequestAction => ({
    type: ActionTypes.LIST_REQUEST,
})

export const fetchListSuccess = (datasources: Array<Datasource>): FetchListSuccessAction => ({
    type: ActionTypes.LIST_SUCCESS,
    datasources: datasources,
})

export const fetchListFail = (message: string): FetchListFailAction => ({
    type: ActionTypes.LIST_FAIL,
    message: message,
})

export const fetchShowRequest = (datasourceId: number): FetchShowRequestAction => ({
    type: ActionTypes.SHOW_REQUEST,
    id: datasourceId,
})

export const fetchShowSuccess = (datasource: Datasource): FetchShowSuccessAction => ({
    type: ActionTypes.SHOW_SUCCESS,
    datasource: datasource,
})

export const fetchShowFail = (message: string): FetchShowFailAction => ({
    type: ActionTypes.SHOW_FAIL,
    message: message,
})

export const createRequest = (projectId: number, schemaId: number, name: string, sourceType: string, config: Config): CreateRequestAction => ({
    type: ActionTypes.CREATE_REQUEST,
    projectId: projectId,
    schemaId: schemaId,
    name: name,
    sourceType: sourceType,
    config: config,
})

export const createSuccess = (datasource: Datasource): CreateSuccessAction => ({
    type: ActionTypes.CREATE_SUCCESS,
    datasource: datasource
})

export const createFail = (message: string): CreateFailAction => ({
    type: ActionTypes.CREATE_FAIL,
    message: message,
})

export const updateRequest = (id: number, projectId: number, schemaId: number, name: string, sourceType: string, config: Config): UpdateRequestAction => ({
    type: ActionTypes.UPDATE_REQUEST,
    id: id,
    projectId: projectId,
    schemaId: schemaId,
    name: name,
    sourceType: sourceType,
    config: config,
})

export const updateSuccess = (datasource: Datasource): UpdateSuccessAction => ({
    type: ActionTypes.UPDATE_SUCCESS,
    datasource: datasource
})

export const updateFail = (message: string): UpdateFailAction => ({
    type: ActionTypes.UPDATE_FAIL,
    message: message,
})

export const deleteRequest = (datasourceId: number): DeleteRequestAction => ({
    type: ActionTypes.DELETE_REQUEST,
    id: datasourceId,
})

export const deleteSuccess = (datasourceId: number): DeleteSuccessAction => ({
    type: ActionTypes.DELETE_SUCCESS,
    id: datasourceId,
})

export const deleteFail = (message: string): DeleteFailAction => ({
    type: ActionTypes.DELETE_FAIL,
    message: message,
})

/**********/
/* Reducer
/**********/
export interface State {
    datasources: Array<Datasource>
}

const initialState: State = {
    datasources: [],
}

export type Actions =
                FetchListRequestAction |
                FetchListSuccessAction |
                FetchListFailAction |
                FetchShowRequestAction |
                FetchShowSuccessAction |
                FetchShowFailAction |
                CreateRequestAction |
                CreateSuccessAction |
                CreateFailAction |
                UpdateRequestAction |
                UpdateSuccessAction |
                UpdateFailAction |
                DeleteRequestAction |
                DeleteSuccessAction |
                DeleteFailAction

export default function reducer(state: State = initialState, action: Actions): State {
    var nextDatasources = state.datasources;

    switch (action.type) {

        case ActionTypes.LIST_SUCCESS:
            return {
                ...state,
                datasources: nextDatasources
            };

        case ActionTypes.SHOW_SUCCESS:
            for (var i=0; i<nextDatasources.length; i++) {
                if (nextDatasources[i].id === action.datasource.id) {
                    nextDatasources[i] = action.datasource;
                    break;
                }
            }
            return {
                ...state,
                datasources: nextDatasources,
            };

        case ActionTypes.CREATE_SUCCESS:
            nextDatasources.push(action.datasource);
            return {
                ...state,
                datasources: nextDatasources,
            };

        case ActionTypes.UPDATE_SUCCESS:
            for (var i=0; i<nextDatasources.length; i++) {
                if (nextDatasources[i].id === action.datasource.id) {
                    nextDatasources[i] = action.datasource;
                    break;
                }
            }
            return {
                ...state,
                datasources: nextDatasources,
            }

        case ActionTypes.DELETE_SUCCESS:
            for (var i=0; i<nextDatasources.length; i++) {
                if (nextDatasources[i].id === action.id) {
                    nextDatasources.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                datasources: nextDatasources,
            }

        default:
            return state
    }
}