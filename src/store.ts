import {createStore as reduxCreateStore, combineReducers, GenericStoreEnhancer, Action} from 'redux';
import tab, {State as TabState, Actions as TabActions} from 'modules/tab';
import drawer, {State as DrawerState, Actions as DrawerActions} from 'modules/menu-drawer';

export type ReduxState = {
    tab: TabState,
    drawer: DrawerState,
}
  
export type ReduxAction = TabActions | DrawerActions | Action

export function createStore(middleware: GenericStoreEnhancer) {
    const reducer = combineReducers({
        tab,
        drawer
    })
    return reduxCreateStore(reducer, middleware)
}