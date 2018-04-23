import { fork, takeEvery, takeLatest, join, put } from 'redux-saga/effects';
import {
    ActionTypes,
    initSuccess,
    initFail,
} from 'modules/app'
import { listRequest as requestProjectList } from 'modules/project';

/**********/
/* Saga
/**********/
function* initialize(action) {
    try {
        const task = yield fork(requestProjectList, [])
        const result = yield join(task)
        yield put(initSuccess());
    } catch (e) {
        yield put(initFail());
    }
}

export const Saga = [
    takeEvery(ActionTypes.INIT_REQUEST, initialize),
]
