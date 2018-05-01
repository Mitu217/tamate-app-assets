import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ActionTypes,
    fetchShowSuccess,
    fetchShowFail,
    diffSuccess,
    diffFail,
} from 'modules/table'

/**********/
/* Saga
/**********/
function* fetchShowTable(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/tables/show', {
            method: 'GET',
        });
        if (response.status === 200) {
            const rows = yield call([response, response.json]);
            yield put(fetchShowSuccess(rows));
        } else {
            yield put(fetchShowFail(response.message))
        }
    } catch (e) {
        yield put(fetchShowFail(e.message))
    }
}

function* fetchDiffTable(action) {
    try {
        const response = yield call(fetch, 'http://localhost:8090/tables/diff', {
            method: 'POST',
            body: JSON.stringify({
                left_datasource_id: action.leftDatasourceId,
                left_schema_name: action.leftSchemaName,
                right_datasource_id: action.rightDatasourceId,
                right_schema_name: action.rightSchemaName,
            }),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const result = yield call([response, response.json]);
            yield put(diffSuccess(result.add, result.modify, result.delete));
        } else {
            yield put(diffFail(response.message));
        }
    } catch (e) {
        yield put(diffFail(e.message));
    }
}

export const Saga = [
    takeLatest(ActionTypes.SHOW_REQUEST, fetchShowTable),
    takeLatest(ActionTypes.DIFF_REQUEST, fetchDiffTable),
]
