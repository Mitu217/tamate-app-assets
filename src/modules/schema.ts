import {Action} from 'redux';

/********/
/* Model
/********/
export interface Column {
    name: string
    type: string
    not_null: boolean
    auto_increment: boolean
}

export interface Schema {
    id: number
    projectId: number
    name: string
    primaryKey: string
    columns: Array<Column>
}

/****************/
/* ActionCreator
/****************/
export enum ActionTypes {
    FETCH_REQUEST = 'fetch/schema/request',
    FETCH_SUCCESS = 'fetch/schema/success',
    FETCH_FAIL = 'fetch/schema/fail',
    CREATE_REQUEST = 'create/schema/request',
    CREATE_SUCCESS = 'create/schema/success',
    CREATE_FAIL = 'create/schema/fail',
    UPDATE_REQUEST = 'update/schema/request',
    UPDATE_SUCCESS = 'update/schema/success',
    UPDATE_FAIL = 'update/schema/fail',
    DELETE_REQUEST = 'delete/schema/request',
    DELETE_SUCCESS = 'delete/schema/success',
    DELETE_FAIL = 'delete/schema/fail',
}


interface FetchRequestAction extends Action {
    type: ActionTypes.FETCH_REQUEST
    datasourceId: number
}

interface FetchSuccessAction extends Action {
    type: ActionTypes.FETCH_SUCCESS
    schemas: Array<Schema>
}

interface FetchFailAction extends Action {
    type: ActionTypes.FETCH_FAIL
    message: string
}

interface CreateRequestAction extends Action {
    type: ActionTypes.CREATE_REQUEST
    projectId: number
    name: string
    primaryKey: string
    columns: Array<Column>
}

interface CreateSuccessAction extends Action {
    type: ActionTypes.CREATE_SUCCESS
    schema: Schema
}

interface CreateFailAction extends Action {
    type: ActionTypes.CREATE_FAIL
    message: string
}

interface UpdateRequestAction extends Action {
    type: ActionTypes.UPDATE_REQUEST
    id: number
    projectId: number
    name: string
    primaryKey: string
    columns: Array<Column>
}

interface UpdateSuccessAction extends Action {
    type: ActionTypes.UPDATE_SUCCESS
    schema: Schema
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

export const fetchRequest = (datasourceId: number): FetchRequestAction => ({
    type: ActionTypes.FETCH_REQUEST,
    datasourceId: datasourceId,
})

export const fetchSuccess = (schemas: Array<Schema>): FetchSuccessAction => ({
    type: ActionTypes.FETCH_SUCCESS,
    schemas: schemas,
})

export const fetchFail = (message: string): FetchFailAction => ({
    type: ActionTypes.FETCH_FAIL,
    message: message,
})

export const createRequest = (projectId: number, name: string, primaryKey: string, columns: Array<Column>): CreateRequestAction => ({
    type: ActionTypes.CREATE_REQUEST,
    projectId: projectId,
    name: name,
    primaryKey: primaryKey,
    columns: columns,
})

export const createSuccess = (schema: Schema): CreateSuccessAction => ({
    type: ActionTypes.CREATE_SUCCESS,
    schema: schema,
})

export const createFail = (message: string): CreateFailAction => ({
    type: ActionTypes.CREATE_FAIL,
    message: message,
})

export const updateRequest = (id: number, projectId: number, name: string, primaryKey: string, columns: Array<Column>): UpdateRequestAction => ({
    type: ActionTypes.UPDATE_REQUEST,
    id: id,
    projectId: projectId,
    name: name,
    primaryKey: primaryKey,
    columns: columns,
})

export const updateSuccess = (schema: Schema): UpdateSuccessAction => ({
    type: ActionTypes.UPDATE_SUCCESS,
    schema: schema,
})

export const updateFail = (message: string): UpdateFailAction => ({
    type: ActionTypes.UPDATE_FAIL,
    message: message,
})

export const deleteRequest = (schemaId: number): DeleteRequestAction => ({
    type: ActionTypes.DELETE_REQUEST,
    id: schemaId,
})

export const deleteSuccess = (schemaId: number): DeleteSuccessAction => ({
    type: ActionTypes.DELETE_SUCCESS,
    id: schemaId,
})

export const deleteFail = (message: string): DeleteFailAction => ({
    type: ActionTypes.DELETE_FAIL,
    message: message,
})

/**********/
/* Reducer
/**********/
export interface State {
    schemas: Array<Schema>
}

const initialState: State = {
    schemas: [],
}

export type Actions =
                FetchRequestAction |
                FetchSuccessAction |
                FetchFailAction |
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
    var nextSchemas = state.schemas;

    switch (action.type) {

        case ActionTypes.FETCH_SUCCESS:
            nextSchemas = action.schemas;
            return {
                ...state,
                schemas: nextSchemas,
            };

        case ActionTypes.CREATE_SUCCESS:
            nextSchemas.push(action.schema);
            return {
                ...state,
                schemas: nextSchemas,
            };

        case ActionTypes.UPDATE_SUCCESS:
            for (var i=0; i<nextSchemas.length; i++) {
                if (nextSchemas[i].id === action.schema.id) {
                    nextSchemas[i] = action.schema;
                    break;
                }
            }
            return {
                ...state,
                schemas: nextSchemas,
            }

        case ActionTypes.DELETE_SUCCESS:
            for (var i=0; i<nextSchemas.length; i++) {
                if (nextSchemas[i].id === action.id) {
                    nextSchemas.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                schemas: nextSchemas,
            }

        default:
            return state
    }
}