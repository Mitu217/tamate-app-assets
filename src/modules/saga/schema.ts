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
} from 'modules/schema'

/**********/
/* Saga
/**********/
function* fetchListSchema(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/schemas/list', {
            method: 'GET',
        });
        if (response.status === 200) {
            const schemas = yield call([response, response.json]);
            yield put(fetchListSuccess(schemas));
        } else {
            yield put(fetchListFail(response.message))
        }
    } catch (e) {
        yield put(fetchListFail(e.message))
    }
}

function* fetchShowSchema(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/schemas/show', {
            method: 'GET',
        });
        if (response.status === 200) {
            const schema = yield call([response, response.json]);
            yield put(fetchShowSuccess(schema));
        } else {
            yield put(fetchShowFail(response.message))
        }
    } catch (e) {
        yield put(fetchShowFail(e.message))
    }
}

function* fetchCreateSchema(action) {
    try {
        const obj = {
            projectId: action.projectId,
            name: action.name,
            primaryKey: action.primaryKey,
            columns: action.columns,
        }
        const response = yield call(fetch, 'http://localhost:8090/schemas/create', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const schema = yield call([response, response.json]);
            yield put(createSuccess(schema));
        } else {
            yield put(createFail(response.message));
        }
    } catch (e) {
        yield put(createFail(e.message));
    }
}

function* fetchUpdateSchema(action) {
    try {
        const obj = {
            id: action.id,
            projectId: action.projectId,
            name: action.name,
            primaryKey: action.primaryKey,
            columns: action.columns,
        }
        const response = yield call(fetch, 'http://localhost:8090/schemas/update', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const schema = yield call([response, response.json]);
            yield put(deleteSuccess(schema));
        } else {
            yield put(deleteFail(response.message));
        }
    } catch (e) {
        yield put(deleteFail(e.message));
    }
}

function* fetchDeleteSchema(action) {
    try {
        const obj = {
            id: action.id,
        }
        const response = yield call(fetch, 'http://localhost:8090/schemas/delete', {
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
    takeLatest(ActionTypes.LIST_REQUEST, fetchListSchema),
    takeLatest(ActionTypes.SHOW_REQUEST, fetchShowSchema),
    takeLatest(ActionTypes.CREATE_REQUEST, fetchCreateSchema),
    takeLatest(ActionTypes.UPDATE_REQUEST, fetchUpdateSchema),
    takeLatest(ActionTypes.DELETE_REQUEST, fetchDeleteSchema),
]
