import {Action} from 'redux';
import { delay } from 'redux-saga';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

/********/
/* Model
/********/
export interface Project {
    id: number
    name: string
    description: string
    thumbnailUri: string
    favorite: boolean
}

/****************/
/* ActionCreator
/****************/
enum ActionTypes {
    FETCH_REQUIRE = 'fetch/project/require',
    FETCH_SUCCESS = 'fetch/project/success',
    FETCH_FAIL = 'fetch/project/fail',
    CREATE_REQUIRE = 'create/project/require',
    CREATE_SUCCESS = 'create/project/success',
    CREATE_FAIL = 'create/project/fail',
    UPDATE_REQUIRE = 'update/project/require',
    UPDATE_SUCCESS = 'update/project/success',
    UPDATE_FAIL = 'update/project/fail',
    DELETE_REQUIRE = 'delete/project/require',
    DELETE_SUCCESS = 'delete/project/success',
    DELETE_FAIL = 'delete/project/fail',
}

interface FetchRequireAction extends Action {
    type: ActionTypes.FETCH_REQUIRE
    projectIds: Array<number>
}

interface FetchSuccessAction extends Action {
    type: ActionTypes.FETCH_SUCCESS
    projects: Array<Project>
}

interface FetchFailAction extends Action {
    type: ActionTypes.FETCH_FAIL
    message: string
}

interface CreateRequireAction extends Action {
    type: ActionTypes.CREATE_REQUIRE
    name: string
    description: string
}

interface CreateSuccessAction extends Action {
    type: ActionTypes.CREATE_SUCCESS
    project: Project
}

interface CreateFailAction extends Action {
    type: ActionTypes.CREATE_FAIL
    message: string
}

export const fetchRequire = (projectIds: Array<number>): FetchRequireAction => ({
    type: ActionTypes.FETCH_REQUIRE,
    projectIds: projectIds,
})

export const fetchSuccess = (projects: Array<Project>): FetchSuccessAction => ({
    type: ActionTypes.FETCH_SUCCESS,
    projects: projects
})

export const fetchFail = (message: string): FetchFailAction => ({
    type: ActionTypes.FETCH_FAIL,
    message: message
})

export const createRequire = (name: string, description: string): CreateRequireAction => ({
    type: ActionTypes.CREATE_REQUIRE,
    name: name,
    description: description
})

export const createSuccess = (project: Project): CreateSuccessAction => ({
    type: ActionTypes.CREATE_SUCCESS,
    project: project
})

export const createFail = (message: string): CreateFailAction => ({
    type: ActionTypes.CREATE_FAIL,
    message: message
})

/**********/
/* Reducer
/**********/
export interface State {
    projects: Array<Project>
}

export type Actions = 
        FetchRequireAction | 
        FetchSuccessAction | 
        FetchFailAction | 
        CreateRequireAction | 
        CreateSuccessAction |
        CreateFailAction 

const initialState: State = {projects: []}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.FETCH_REQUIRE:
            return state;
        case ActionTypes.FETCH_SUCCESS:
            return {projects: action.projects};
        case ActionTypes.FETCH_FAIL:
            return state;
        case ActionTypes.CREATE_REQUIRE:
            return state;
        case ActionTypes.CREATE_SUCCESS:
            state.projects.push(action.project); // TODO: 並び替え
            return {projects: state.projects};
        case ActionTypes.CREATE_FAIL:
            return state;
        default:
            return state
    }
}

/**********/
/* Saga
/**********/
function* fetchProjects(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/api/project/list', {
            method: 'GET',
        });
        if (response.status === 200) {
            const projects = yield call([response, response.json]);
            yield put(fetchSuccess(projects));
        } else {
            yield put(fetchFail(response.message))
        }
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* createProject(action) {
    try {
        const obj = {
            name: action.name,
            description: action.description,
        }
        const response = yield call(fetch, 'http://localhost:8090/api/project/add', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const project = yield call([response, response.json]);
            yield put(createSuccess(project));
        } else {
            yield put(createFail(response.message));
        }
    } catch (e) {
        yield put(createFail(e.message));
    }
}

export const Saga = [
    takeEvery(ActionTypes.FETCH_REQUIRE, fetchProjects),
    takeEvery(ActionTypes.CREATE_REQUIRE, createProject),
]
