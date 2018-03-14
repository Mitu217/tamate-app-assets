import {Action} from 'redux'
import {} from 'react-router'

/****************/
/* ActionCreator
/****************/
enum ActionTypes {
    LOCATION_CHANGE = 'router/location-change',
}

interface LocationChangeAction extends Action {
    type: ActionTypes.LOCATION_CHANGE
    payload: {}
}
export const locationChange = (payload: object): LocationChangeAction => ({
    type: ActionTypes.LOCATION_CHANGE,
    payload: payload,
})

/**********/
/* Reducer
/**********/
export interface State {
    payload: {}
}

export type Actions = LocationChangeAction

const initialState: State = {
    payload: {
        pathname: '',
        hash: '',
        search: '',
    }
}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.LOCATION_CHANGE:
            console.log(action);
            return {payload: action.payload}
        default:
            return state
    }
}