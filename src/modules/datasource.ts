import {Action} from 'redux';

/********/
/* Model
/********/
interface Row {
    columnNames: Array<string>
    values: Array<Array<string>>
}

export interface Datasource {
    id: number
    schemaId: number
    row: Row
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
    datasources: Array<Datasource>
}

export type Actions = Action

// FIXME: APIサーバ側が完成したら空にして読み込むようにする
const row: Row = {
    columnNames: [
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

const datasource: Datasource = {
    id: 1,
    schemaId: 1,
    row: row,
}

const initialState: State = {
    datasources: [datasource],
}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        default:
            return state
    }
}