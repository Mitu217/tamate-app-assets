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
    LIST_REQUEST = 'list/project/request',
    LIST_SUCCESS = 'list/project/success',
    LIST_FAIL = 'list/project/fail',
    SHOW_REQUEST = 'show/project/request',
    SHOW_SUCCESS = 'show/project/success',
    SHOW_FAIL = 'show/project/fail',
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

interface ListRequestAction extends Action {
    type: ActionTypes.LIST_REQUEST
}

interface ListSuccessAction extends Action {
    type: ActionTypes.LIST_SUCCESS
    projects: Array<Project>
}

interface ListFailAction extends Action {
    type: ActionTypes.LIST_FAIL
    message: string
}

interface ShowRequestAction extends Action {
    type: ActionTypes.SHOW_REQUEST
    projectId: number
}

interface ShowSuccessAction extends Action {
    type: ActionTypes.SHOW_SUCCESS
    project: Project
}

interface ShowFailAction extends Action {
    type: ActionTypes.SHOW_FAIL
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

export const listRequest = (): ListRequestAction => ({
    type: ActionTypes.LIST_REQUEST,
})

export const listSuccess = (projects: Array<Project>): ListSuccessAction => ({
    type: ActionTypes.LIST_SUCCESS,
    projects: projects,
})

export const listFail = (message: string): ListFailAction => ({
    type: ActionTypes.LIST_FAIL,
    message: message,
})

export const showRequest = (projectId: number): ShowRequestAction => ({
    type: ActionTypes.SHOW_REQUEST,
    projectId: projectId,
})

export const showSuccess = (project: Project): ShowSuccessAction => ({
    type: ActionTypes.SHOW_SUCCESS,
    project: project,
})

export const showFail = (message: string): ShowFailAction => ({
    type: ActionTypes.SHOW_FAIL,
    message: message,
})

export const createRequest = (name: string, description: string, thumbnailUri: string): CreateRequestAction => ({
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
        ListRequestAction |
        ListSuccessAction |
        ListFailAction |
        ShowRequestAction |
        ShowSuccessAction |
        ShowFailAction |
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
        case ActionTypes.LIST_SUCCESS:
            nextProjects = action.projects;
            return {
                ...state,
                projects: nextProjects,
            };

        case ActionTypes.SHOW_SUCCESS:
            for (var i=0; i<nextProjects.length; i++) {
                if (nextProjects[i].id === action.project.id) {
                    nextProjects[i] = action.project;
                    break;
                }
            }
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
