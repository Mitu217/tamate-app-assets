import {createStore as reduxCreateStore, combineReducers, GenericStoreEnhancer} from 'redux';
import app, {State as AppState, Actions as AppActions} from 'modules/app';
import tab, {State as TabState, Actions as TabActions} from 'modules/tab';
import drawer, {State as DrawerState, Actions as DrawerActions} from 'modules/menu-drawer';
import project, {State as ProjectState, Actions as ProjectActions} from 'modules/project';
import datasource, {State as DatasourceState, Actions as DatasourceActions} from 'modules/datasource';
import schema, {State as SchemaState, Actions as SchemaActions} from 'modules/schema';

export type ReduxState = {
    app: AppState
    tab: TabState
    drawer: DrawerState
    project: ProjectState
    datasource: DatasourceState
    schema: SchemaState
}

export type ReduxAction =
                AppActions |
                TabActions |
                DrawerActions |
                ProjectActions |
                SchemaActions |
                DatasourceActions

export function createStore(middleware: GenericStoreEnhancer) {
    const reducer = combineReducers({
        app,
        tab,
        drawer,
        project,
        datasource,
        schema,
    })
    return reduxCreateStore(reducer, middleware)
}