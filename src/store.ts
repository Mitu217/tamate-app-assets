import {createStore as reduxCreateStore, combineReducers, GenericStoreEnhancer, Action} from 'redux';
import tab, {State as TabState, Actions as TabActions} from 'modules/tab';
import drawer, {State as DrawerState, Actions as DrawerActions} from 'modules/menu-drawer';
import project, {State as ProjectState, Actions as ProjectActions} from 'modules/project';
import row, {State as RowState, Actions as RowActions} from 'modules/row';

export type ReduxState = {
    tab: TabState
    drawer: DrawerState
    project: ProjectState
    row: RowState
}
  
export type ReduxAction = TabActions | DrawerActions | ProjectActions | Action

export function createStore(middleware: GenericStoreEnhancer) {
    const reducer = combineReducers({
        tab,
        drawer,
        project,
        row,
    })
    return reduxCreateStore(reducer, middleware)
}