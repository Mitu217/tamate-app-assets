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
    SAVE = 'project/save',
    FETCH_REQUIRE = 'fetch/project/require',
    FETCH_SUCCESS = 'fetch/project/success',
    FETCH_FAIL = 'fetch/project/fail',
}

interface SaveAction extends Action {
    type: ActionTypes.SAVE
    projects: Array<Project>
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

export const save = (projects: Array<Project>): SaveAction => ({
    type: ActionTypes.SAVE,
    projects: projects,
})

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

/**********/
/* Reducer
/**********/
export interface State {
    projects: Array<Project>
}

export type Actions = SaveAction | FetchRequireAction | FetchSuccessAction | FetchFailAction

const initialState: State = {projects: []}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.SAVE:
            return {projects: action.projects}
        case ActionTypes.FETCH_REQUIRE:
            return state
        case ActionTypes.FETCH_SUCCESS:
            return {projects: action.projects}
        case ActionTypes.FETCH_FAIL:
            return state
        default:
            return state
    }
}

/**********/
/* Saga
/**********/
function* fetchProjects(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/api/projects', {
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

export const Saga = [
    takeEvery(ActionTypes.FETCH_REQUIRE, fetchProjects),
]
