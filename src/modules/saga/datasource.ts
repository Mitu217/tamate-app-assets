import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ActionTypes,
    fetchListSuccess,
    fetchListFail,
    fetchShowSuccess,
    fetchShowFail,
    createSuccess,
    createFail,
    updateSuccess,
    updateFail,
    deleteSuccess,
    deleteFail,
} from 'modules/datasource'

/**********/
/* Saga
/**********/
function* fetchListProject(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/datasources/list', {
            method: 'GET',
        });
        if (response.status === 200) {
            const datasources = yield call([response, response.json]);
            yield put(fetchListSuccess(datasources));
        } else {
            yield put(fetchListFail(response.message))
        }
    } catch (e) {
        yield put(fetchListFail(e.message))
    }
}

function* fetchShowProject(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/datasources/show', {
            method: 'GET',
        });
        if (response.status === 200) {
            const datasource = yield call([response, response.json]);
            yield put(fetchShowSuccess(datasource));
        } else {
            yield put(fetchShowFail(response.message))
        }
    } catch (e) {
        yield put(fetchShowFail(e.message))
    }
}

function* fetchCreateProject(action) {
    try {
        const obj = {
            id: action.id,
            projectId: action.projectId,
            schemaId: action.schemaId,
            name: action.name,
            type: action.sourceType,
            config: action.config,
        }
        const response = yield call(fetch, 'http://localhost:8090/datasources/create', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const datasource = yield call([response, response.json]);
            yield put(createSuccess(datasource));
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
            projectId: action.projectId,
            schemaId: action.schemaId,
            name: action.name,
            type: action.sourceType,
            config: action.config,
        }
        const response = yield call(fetch, 'http://localhost:8090/datasources/update', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const datasource = yield call([response, response.json]);
            yield put(deleteSuccess(datasource));
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
        const response = yield call(fetch, 'http://localhost:8090/datasources/delete', {
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
