import { Action } from 'redux';
import { all} from 'redux-saga/effects';
import { Saga as ProjectSaga } from 'modules/saga/project';
import { Saga as SchemaSaga } from 'modules/saga/schema';
import { Saga as DatasourceSaga } from 'modules/saga/datasource';

export default function* Saga() {
    yield all([
      ...ProjectSaga,
      ...SchemaSaga,
      ...DatasourceSaga,
    ])
}
