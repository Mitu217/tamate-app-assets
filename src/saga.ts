import { Action } from 'redux';
import { all} from 'redux-saga/effects';
import { Saga as ProjectSaga } from 'modules/saga/project';
import { Saga as SchemaSaga } from 'modules/saga/schema';
import { Saga as ConfigSaga } from 'modules/config';

export default function* Saga() {
    yield all([
      ...ProjectSaga,
      ...SchemaSaga,
      ...ConfigSaga,
    ])
}
