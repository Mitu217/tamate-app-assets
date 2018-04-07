import { Saga as ProjectSaga } from 'modules/project';
import { Saga as ConfigSaga } from 'modules/config';
import { all } from 'redux-saga/effects';

export default function* Saga() {
    yield all([
      ...ProjectSaga,
      ...ConfigSaga,
    ])
}