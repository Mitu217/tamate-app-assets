import { Action } from 'redux';

/********/
/* Model
/********/
export interface Project {
    id: number
    name: string
    description: string
    thumbnailUri: string
}

/****************/
/* ActionCreator
/****************/
export enum ActionTypes {
    FETCH_REQUEST = 'fetch/project/request',
    FETCH_SUCCESS = 'fetch/project/success',
    FETCH_FAIL = 'fetch/project/fail',
    CREATE_REQUEST = 'create/project/request',
    CREATE_SUCCESS = 'create/project/success',
    CREATE_FAIL = 'create/project/fail',
    UPDATE_REQUEST = 'update/project/request',
    UPDATE_SUCCESS = 'update/project/success',
    UPDATE_FAIL = 'update/project/fail',
    DELETE_REQUEST = 'delete/project/request',
    DELETE_SUCCESS = 'delete/project/success',
    DELETE_FAIL = 'delete/project/fail',
}

interface FetchRequestAction extends Action {
    type: ActionTypes.FETCH_REQUEST
}

interface FetchSuccessAction extends Action {
    type: ActionTypes.FETCH_SUCCESS
    projects: Array<Project>
}

interface FetchFailAction extends Action {
    type: ActionTypes.FETCH_FAIL
    message: string
}

interface CreateRequestAction extends Action {
    type: ActionTypes.CREATE_REQUEST
    name: string
    description: string
    thumbnailUri: string
}

interface CreateSuccessAction extends Action {
    type: ActionTypes.CREATE_SUCCESS
    project: Project
}

interface CreateFailAction extends Action {
    type: ActionTypes.CREATE_FAIL
    message: string
}

interface UpdateRequestAction extends Action {
    type: ActionTypes.UPDATE_REQUEST
    id: number
    name: string
    description: string
    thumbnailUri: string
}

interface UpdateSuccessAction extends Action {
    type: ActionTypes.UPDATE_SUCCESS
    project: Project
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

export const fetchRequest = (): FetchRequestAction => ({
    type: ActionTypes.FETCH_REQUEST,
})

export const fetchSuccess = (projects: Array<Project>): FetchSuccessAction => ({
    type: ActionTypes.FETCH_SUCCESS,
    projects: projects,
})

export const fetchFail = (message: string): FetchFailAction => ({
    type: ActionTypes.FETCH_FAIL,
    message: message,
})

export const createRequest = (name: string, description: string, thumbnailUri: string = ""): CreateRequestAction => ({
    type: ActionTypes.CREATE_REQUEST,
    name: name,
    description: description,
    thumbnailUri: thumbnailUri,
})

export const createSuccess = (project: Project): CreateSuccessAction => ({
    type: ActionTypes.CREATE_SUCCESS,
    project: project,
})

export const createFail = (message: string): CreateFailAction => ({
    type: ActionTypes.CREATE_FAIL,
    message: message,
})

export const updateRequest = (projectId: number, name: string, description: string, thumbnailUri: string): UpdateRequestAction => ({
    type: ActionTypes.UPDATE_REQUEST,
    id: projectId,
    name: name,
    description: description,
    thumbnailUri: thumbnailUri,
})

export const updateSuccess = (project: Project): UpdateSuccessAction => ({
    type: ActionTypes.UPDATE_SUCCESS,
    project: project,
})

export const updateFail = (message: string): UpdateFailAction => ({
    type: ActionTypes.UPDATE_FAIL,
    message: message,
})

export const deleteRequest = (projectId: number): DeleteRequestAction => ({
    type: ActionTypes.DELETE_REQUEST,
    id: projectId,
})

export const deleteSuccess = (projectId: number): DeleteSuccessAction => ({
    type: ActionTypes.DELETE_SUCCESS,
    id: projectId,
})

export const deleteFail = (message: string): DeleteFailAction => ({
    type: ActionTypes.DELETE_FAIL,
    message: message,
})

/**********/
/* Reducer
/**********/
export interface State {
    projects: Array<Project>
}

const initialState = {
    projects: []
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
    var nextProjects = state.projects;

    switch (action.type) {
        case ActionTypes.FETCH_SUCCESS:
            nextProjects = action.projects;
            return {
                ...state,
                projects: nextProjects,
            };

        case ActionTypes.CREATE_SUCCESS:
            nextProjects.push(action.project);
            return {
                ...state,
                projects: nextProjects,
            };

        case ActionTypes.UPDATE_SUCCESS:
            for (var i=0; i<nextProjects.length; i++) {
                if (nextProjects[i].id === action.project.id) {
                    nextProjects[i] = action.project;
                    break;
                }
            }
            return {
                ...state,
                projects: nextProjects,
            }

        case ActionTypes.DELETE_SUCCESS:
            for (var i=0; i<nextProjects.length; i++) {
                if (nextProjects[i].id === action.id) {
                    nextProjects.splice(i, 1);
                    break;
                }
            }
            return {
                ...state,
                projects: nextProjects,
            }

        default:
            return state
    }
}
