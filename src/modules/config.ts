import { Action } from 'redux';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

/********/
/* Model
/********/
export interface Config {
    id: number
    configType: string
}

export interface SQLConfig extends Config {
    driverName: string
    dsn: string
    databaseName: string
    tableName: string
}

export interface SpreadSheetsConfig extends Config {

}

/****************/
/* ActionCreator
/****************/
enum ActionTypes {
    FETCH_REQUIRE = 'fetch/config/require',
    FETCH_SUCCESS = 'fetch/config/success',
    FETCH_FAIL = 'fetch/config/fail',
    CREATE_REQUIRE = 'create/config/require',
    CREATE_SUCCESS = 'create/config/success',
    CREATE_FAIL = 'create/config/fail',
    UPDATE_REQUIRE = 'update/config/require',
    UPDATE_SUCCESS = 'update/config/success',
    UPDATE_FAIL = 'update/config/fail',
    DELETE_REQUIRE = 'delete/config/require',
    DELETE_SUCCESS = 'delete/config/success',
    DELETE_FAIL = 'delete/config/fail',
}

interface FetchRequireAction extends Action {
    type: ActionTypes.FETCH_REQUIRE
    projectId: number
}

interface FetchSuccessAction extends Action {
    type: ActionTypes.FETCH_SUCCESS
    configs: Array<Config>
}

interface FetchFailAction extends Action {
    type: ActionTypes.FETCH_FAIL
    message: string
}

interface CreateRequireAction extends Action {
    type: ActionTypes.CREATE_REQUIRE
    projectId: number
    config: Config
}

interface CreateSuccessAction extends Action {
    type: ActionTypes.CREATE_SUCCESS
    config: Config
}

interface CreateFailAction extends Action {
    type: ActionTypes.CREATE_FAIL
    message: string
}

export const fetchRequire = (projectId: number): FetchRequireAction => ({
    type: ActionTypes.FETCH_REQUIRE,
    projectId: projectId,
})

export const fetchSuccess = (configs: Array<Config>): FetchSuccessAction => ({
    type: ActionTypes.FETCH_SUCCESS,
    configs: configs
})

export const fetchFail = (message: string): FetchFailAction => ({
    type: ActionTypes.FETCH_FAIL,
    message: message
})

export const createRequire = (projectId: number, config: Config): CreateRequireAction => ({
    type: ActionTypes.CREATE_REQUIRE,
    projectId: projectId,
    config: config,
})

export const createSuccess = (config: Config): CreateSuccessAction => ({
    type: ActionTypes.CREATE_SUCCESS,
    config: config
})

export const createFail = (message: string): CreateFailAction => ({
    type: ActionTypes.CREATE_FAIL,
    message: message
})

/**********/
/* Reducer
/**********/
export interface State {
    configs: Array<Config>
}

export type Actions =
        FetchRequireAction |
        FetchSuccessAction |
        FetchFailAction |
        CreateRequireAction |
        CreateSuccessAction |
        CreateFailAction

const initialState: State = {
    configs: []
}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        default:
            return state
    }
}

/*******/
/* Saga
/*******/
function* fetchConfigs(action) {
    try {
        const url = new URL('http://localhost:8090/api/configs');
        const params = {
            projectId: action.projectId,
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const response = yield call(fetch, url.toString(), {method: 'GET',});
        if (response.status === 200) {
            const configs = yield call([response, response.json]);
            console.log(configs);
            yield put(fetchSuccess(configs));
        } else {
            yield put(fetchFail(response.message))
        }
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* createConfig(action) {
    try {
        const obj = {
            projectId: action.projectId,
            config: action.config,
        }
        const response = yield call(fetch, 'http://localhost:8090/api/config/create', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const config = yield call([response, response.json]);
            yield put(createSuccess(config));
        } else {
            yield put(createFail(response.message));
        }
    } catch (e) {
        yield put(createFail(e.message));
    }
}

function* deleteConfig(action) {

}

function* updateConfig(action) {

}

export const Saga = [
    takeLatest(ActionTypes.FETCH_REQUIRE, fetchConfigs),
    takeLatest(ActionTypes.CREATE_REQUIRE, createConfig),
    takeLatest(ActionTypes.UPDATE_REQUIRE, updateConfig),
    takeLatest(ActionTypes.DELETE_REQUIRE, deleteConfig),
]