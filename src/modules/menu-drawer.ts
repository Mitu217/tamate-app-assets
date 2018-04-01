import {Action} from 'redux';

/****************/
/* ActionCreator
/****************/
enum ActionTypes {
    TOGGLE = 'drawer/toggle',
}

interface ToggleAction extends Action {
    type: ActionTypes.TOGGLE
    open: boolean
}
export const toggle = (open: boolean): ToggleAction => ({
    type: ActionTypes.TOGGLE,
    open: open,
})

/**********/
/* Reducer
/**********/
export interface State {
    open: boolean
}

export type Actions = ToggleAction

const initialState: State = {open: false}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.TOGGLE:
            return {open: action.open}
        default:
            return state
    }
}