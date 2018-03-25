import {createStore as reduxCreateStore, combineReducers, GenericStoreEnhancer, Action} from 'redux';
import tab, {State as TabState, Actions as TabActions} from 'modules/tab';
import drawer, {State as DrawerState, Actions as DrawerActions} from 'modules/menu-drawer';
import project, {State as ProjectState, Actions as ProjectActions} from 'modules/project';
import datasource, {State as DatasourceState, Actions as DatasourceActions} from 'modules/datasource';
import schema, {State as SchemaState, Actions as SchemaActions} from 'modules/schema';
import config, {State as ConfigState, Actions as ConfigActions} from 'modules/config';

export type ReduxState = {
    tab: TabState
    drawer: DrawerState
    project: ProjectState
    datasource: DatasourceState
    schema: SchemaState
    config: ConfigState
}
  
export type ReduxAction = TabActions | DrawerActions | ProjectActions | SchemaActions | DatasourceActions | ConfigActions | Action

export function createStore(middleware: GenericStoreEnhancer) {
    const reducer = combineReducers({
        tab,
        drawer,
        project,
        datasource,
        schema,
        config,
    })
    return reduxCreateStore(reducer, middleware)
}