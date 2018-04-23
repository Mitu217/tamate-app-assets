import { Action } from 'redux';
import { all} from 'redux-saga/effects';
import { Saga as AppSaga } from 'modules/saga/app';
import { Saga as ProjectSaga } from 'modules/saga/project';
import { Saga as SchemaSaga } from 'modules/saga/schema';
import { Saga as DatasourceSaga } from 'modules/saga/datasource';
import { Saga as TableSaga } from 'modules/saga/table';

export default function* Saga() {
    yield all([
      ...ProjectSaga,
      ...SchemaSaga,
      ...DatasourceSaga,
      ...TableSaga
    ])
}
