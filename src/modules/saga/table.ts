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
        const obj = {
            leftDatasourceId: action.leftDatasourceId,
            rightDatasourceId: action.rightDatasourceId
        }
        const response = yield call(fetch, 'http://localhost:8090/tables/diff', {
            method: 'POST',
            body: Object.keys(obj).reduce((o,key)=>(o.set(key, obj[key]), o), new FormData()),
            headers: {
                'Accept': 'application/json'
            },
        });
        if (response.status === 200) {
            const diffRows = yield call([response, response.json]);
            yield put(diffSuccess(diffRows.add, diffRows.modify, diffRows.delete));
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
