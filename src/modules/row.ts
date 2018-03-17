import {Action} from 'redux';

/********/
/* Model
/********/
interface Row {
    columns: Array<string>
    values: Array<Array<string>>
}

/****************/
/* ActionCreator
/****************/
enum ActionTypes {

}

/*
interface SaveAction extends Action {
    type: ActionTypes.SAVE
    projects: Array<Project>
}

export const save = (projects: Array<Project>): SaveAction => ({
    type: ActionTypes.SAVE,
    projects: projects,
})
*/

/**********/
/* Reducer
/**********/
export interface State {
    rows: Array<Row>
}

export type Actions = Action

// FIXME: APIサーバ側が完成したら空にして読み込むようにする
const row: Row = {
    columns: [
        'id',
        'name',
        'age',
        'created_at',
    ],
    values: [
        [
            '1',
            'hane',
            '16',
            '2018-01-01 00:00:00',
        ],
        [
            '2',
            'tamate',
            '15',
            '2018-01-01 00:00:00',
        ],
        [
            '3',
            'eiko',
            '15',
            '2018-01-01 00:00:00',
        ],
        [
            '4',
            'kamuri',
            '15',
            '2018-01-01 00:00:00',
        ],
    ]
}
const initialState: State = {rows: [
    row
]}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        default:
            return state
    }
}