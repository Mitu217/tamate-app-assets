import {Action} from 'redux';

/*****************/
/* ActionCreator */
/*****************/
enum ActionTypes {
    SELECT = 'tab/select',
}

interface SelectAction extends Action {
    type: ActionTypes.SELECT
    selectedId: number
}
export const select = (id: number): SelectAction => ({
    type: ActionTypes.SELECT,
    selectedId: id
})

/***********/
/* Reducer */
/***********/
export interface State {
    selectedId: number
}

export type Actions = SelectAction

const initialState: State = {selectedId: 0}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.SELECT:
            return {selectedId: state.selectedId}
        default:
            return state
    }
}