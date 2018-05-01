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
} from 'modules/datasource'

/**********/
/* Saga
/**********/
function* fetchDatasource(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/datasources', {
            method: 'GET',
        });
        if (response.status === 200) {
            const result = yield call([response, response.json]);
            yield put(fetchSuccess(result.datasources));
        } else {
            yield put(fetchFail(response.message))
        }
    } catch (e) {
        yield put(fetchFail(e.message))
    }
}

function* fetchCreateDatasource(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/datasources/create?type=' + action.sourceType, {
            method: 'POST',
            body: JSON.stringify({
                project_id: Number(action.projectId),
                name: action.name,
                config: {
                    driver_name: action.config.driverName,
                    dsn: action.config.dsn,
                },
            }),
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
    takeLatest(ActionTypes.FETCH_REQUEST, fetchDatasource),
    takeLatest(ActionTypes.CREATE_REQUEST, fetchCreateDatasource),
    takeLatest(ActionTypes.UPDATE_REQUEST, fetchUpdateDatasource),
    takeLatest(ActionTypes.DELETE_REQUEST, fetchDeleteDatasource),
]
