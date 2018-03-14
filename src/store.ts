import {createStore as reduxCreateStore, combineReducers, GenericStoreEnhancer, Action} from 'redux'
import router, {State as RouterState, Actions as RouterActions} from 'modules/router'
import tab, {State as TabState, Actions as TabActions} from 'modules/tab'
import drawer, {State as DrawerState, Actions as DrawerActions} from 'modules/menu-drawer'

export type ReduxState = {
    router: RouterState,
    tab: TabState,
    drawer: DrawerState,
}
  
export type ReduxAction = RouterActions | TabActions | DrawerActions | Action

export function createStore(middleware: GenericStoreEnhancer) {
    const reducer = combineReducers({
        router,
        tab,
        drawer,
    })
    return reduxCreateStore(reducer, middleware)
}