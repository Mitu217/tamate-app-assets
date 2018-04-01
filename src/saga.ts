import {Saga as ProjectSaga} from 'modules/project';
import {all} from 'redux-saga/effects';

export default function* Saga() {
    yield all([
      ...ProjectSaga,
    ])
}