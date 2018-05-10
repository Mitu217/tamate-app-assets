import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ActionTypes,
    fetchSuccess,
    fetchFail,
    createSuccess,
    createFail,
    updateSuccess,
    updateFail,
    deleteSuccess,
    deleteFail,
} from 'modules/project'
import Constantiate from 'constantiate';

/**********/
/* Saga
/**********/
function* fetchProjects(action) {
    try {
        const response = yield call(fetch, Constantiate.HOST + '/projects', {
            method: 'GET',
        });
        if (response.status === 200) {
            const result = yield call([response, response.json]);
            yield put(fetchSuccess(result.projects));
        } else {
            yield put(fetchFail(response.message))
        }
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* createProject(action) {
    try {
        const response = yield call(fetch, Constantiate.HOST + '/projects/create', {
            method: 'POST',
            body: JSON.stringify({
                name: action.name,
                description: action.description,
                thumbnailUri: action.thumbnailUri,
            }),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const result = yield call([response, response.json]);
            yield put(createSuccess(result.project));
        } else {
            yield put(createFail(response.message));
        }
    } catch (e) {
        yield put(createFail(e.message));
    }
}

function* fetchUpdateProject(action) {
    try {
        const obj = {
            id: action.id,
            name: action.name,
            description: action.description,
            thumbnailUri: action.thumbnailUri,
        }
        const response = yield call(fetch, Constantiate.HOST + '/projects/update', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const project = yield call([response, response.json]);
            yield put(deleteSuccess(project));
        } else {
            yield put(deleteFail(response.message));
        }
    } catch (e) {
        yield put(deleteFail(e.message));
    }
}

function* fetchDeleteProject(action) {
    try {
        const obj = {
            id: action.id,
        }
        const response = yield call(fetch, Constantiate.HOST + '/projects/delete', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            yield put(deleteSuccess(obj.id));
        } else {
            yield put(deleteFail(response.message));
        }
    } catch (e) {
        yield put(deleteFail(e.message));
    }
}

export const Saga = [
    takeLatest(ActionTypes.FETCH_REQUEST, fetchProjects),
    takeLatest(ActionTypes.CREATE_REQUEST, createProject),
    takeLatest(ActionTypes.UPDATE_REQUEST, fetchUpdateProject),
    takeLatest(ActionTypes.DELETE_REQUEST, fetchDeleteProject),
]
