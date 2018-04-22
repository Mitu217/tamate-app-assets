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
function* fetchListDatasource(action) {
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

function* fetchShowDatasource(action) {
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

function* fetchCreateDatasource(action) {
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

function* fetchUpdateDatasource(action) {
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

function* fetchDeleteDatasource(action) {
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
    takeLatest(ActionTypes.LIST_REQUEST, fetchListDatasource),
    takeLatest(ActionTypes.SHOW_REQUEST, fetchShowDatasource),
    takeLatest(ActionTypes.CREATE_REQUEST, fetchCreateDatasource),
    takeLatest(ActionTypes.UPDATE_REQUEST, fetchUpdateDatasource),
    takeLatest(ActionTypes.DELETE_REQUEST, fetchDeleteDatasource),
]
