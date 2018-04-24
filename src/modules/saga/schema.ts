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
            const result = yield call([response, response.json]);
            yield put(listSuccess(result.schemas));
        } else {
            yield put(listFail(response.message))
        }
    } catch (e) {
        yield put(listFail(e.message))
    }
}

function* fetchShowSchema(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/schemas/show', {
            method: 'GET',
        });
        if (response.status === 200) {
            const schema = yield call([response, response.json]);
            yield put(showSuccess(schema));
        } else {
            yield put(showFail(response.message))
        }
    } catch (e) {
        yield put(showFail(e.message))
    }
}

function* fetchCreateSchema(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/schemas/create', {
            method: 'POST',
            body: JSON.stringify({
                "project_id": action.projectId,
                "name": action.name,
                "primary_key": action.primaryKey,
                "columns": JSON.stringify(action.columns), //FIXME: 素の状態で送れるようにしたい
            }),
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
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
