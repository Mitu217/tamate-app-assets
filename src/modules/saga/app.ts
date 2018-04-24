import { fork, takeEvery, takeLatest, join, put, call, take } from 'redux-saga/effects';
import {
    ActionTypes,
    initSuccess,
    initFail,
} from 'modules/app'
import {
    listRequest as requestProjectList
} from 'modules/project';
import {
    listRequest as requestSchemaList
} from 'modules/schema';
import {
    listRequest as requestDatasourceList
} from 'modules/datasource';
import { delay } from 'redux-saga';

/**********/
/* Saga
/**********/
function* initialize(action) {
    try {
        // TODO: ひとまず何も考えずに全部持ってくる
        yield put(requestProjectList());
        yield put(requestSchemaList());
        yield put(requestDatasourceList());
        // TODO: 削除
        yield call(delay, 1000);
        yield put(initSuccess());
    } catch (e) {
        yield put(initFail());
    }
}

export const Saga = [
    takeLatest(ActionTypes.INIT_REQUEST, initialize),
]
