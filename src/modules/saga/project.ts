import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ActionTypes,
    listSuccess,
    listFail,
    showSuccess,
    showFail,
    createSuccess,
    createFail,
    updateSuccess,
    updateFail,
    deleteSuccess,
    deleteFail,
} from 'modules/project'

/**********/
/* Saga
/**********/
function* fetchListProject(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/projects/list', {
            method: 'GET',
        });
        if (response.status === 200) {
            const result = yield call([response, response.json]);
            yield put(listSuccess(result.projects));
        } else {
            yield put(listFail(response.message))
        }
    } catch (e) {
        yield put(listFail(e.message))
    }
}

function* fetchShowProject(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/projects/show', {
            method: 'GET',
        });
        if (response.status === 200) {
            const project = yield call([response, response.json]);
            yield put(showSuccess(project));
        } else {
            yield put(showFail(response.message))
        }
    } catch (e) {
        yield put(showFail(e.message))
    }
}

function* fetchCreateProject(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/projects/create', {
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
            const project = yield call([response, response.json]);
            yield put(createSuccess(project));
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
        const response = yield call(fetch, 'http://localhost:8090/projects/update', {
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
        const response = yield call(fetch, 'http://localhost:8090/projects/delete', {
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
    takeLatest(ActionTypes.LIST_REQUEST, fetchListProject),
    takeLatest(ActionTypes.SHOW_REQUEST, fetchShowProject),
    takeLatest(ActionTypes.CREATE_REQUEST, fetchCreateProject),
    takeLatest(ActionTypes.UPDATE_REQUEST, fetchUpdateProject),
    takeLatest(ActionTypes.DELETE_REQUEST, fetchDeleteProject),
]
