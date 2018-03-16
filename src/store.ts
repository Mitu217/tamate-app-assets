import {createStore as reduxCreateStore, combineReducers, GenericStoreEnhancer, Action} from 'redux'
import tab, {State as TabState, Actions as TabActions} from 'modules/tab'
import drawer, {State as DrawerState, Actions as DrawerActions} from 'modules/menu-drawer'
import project, {State as ProjectState, Actions as ProjectActions} from 'modules/project'

export type ReduxState = {
    tab: TabState
    drawer: DrawerState
    project: ProjectState
}
  
export type ReduxAction = TabActions | DrawerActions | ProjectActions | Action

export function createStore(middleware: GenericStoreEnhancer) {
    const reducer = combineReducers({
        tab,
        drawer,
        project,
    })
    return reduxCreateStore(reducer, middleware)
}