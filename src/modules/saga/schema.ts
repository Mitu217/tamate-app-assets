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
} from 'modules/schema'
import Constantiate from 'constantiate';

/**********/
/* Saga
/**********/
function* fetchSchema(action) {
    try {
        const response = yield call(fetch, Constantiate.HOST + '/schemas?dscId=' + action.datasourceId, {
            method: 'GET',
        });
        if (response.status === 200) {
            const result = yield call([response, response.json]);
            yield put(fetchSuccess(result.schemas));
        } else {
            yield put(fetchFail(response.message))
        }
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* fetchCreateSchema(action) {
    try {
        const response = yield call(fetch, Constantiate.HOST + '/schemas/create', {
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
        const response = yield call(fetch, Constantiate.HOST + '/schemas/update', {
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
        const response = yield call(fetch, Constantiate.HOST + '/schemas/delete', {
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
    takeLatest(ActionTypes.FETCH_REQUEST, fetchSchema),
    takeLatest(ActionTypes.CREATE_REQUEST, fetchCreateSchema),
    takeLatest(ActionTypes.UPDATE_REQUEST, fetchUpdateSchema),
    takeLatest(ActionTypes.DELETE_REQUEST, fetchDeleteSchema),
]
