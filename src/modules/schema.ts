import {Action} from 'redux';

/********/
/* Model
/********/
interface Column {
    name: string
    type: string
    notNull: boolean
    autoIncrement: boolean
}

interface Table {
    name: string
    description: string
    primaryKey: string
    uniqueKey: Array<Array<string>>
    indexKey: Array<Array<string>>
}

export interface Schema {
    id: number
    databaseName: string
    table: Table
    columns: Array<Column>
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
    schemas: Array<Schema>
}

export type Actions = Action

// FIXME: APIサーバ側が完成したら空にして読み込むようにする
const schema: Schema = {
    id: 1,
    databaseName: 'Sample',
    table: {
        name: 'Sample',
        description: 'サンプルテーブルです',
        primaryKey: 'id',
        uniqueKey: [],
        indexKey: [],
    },
    columns: [
        {
            name: 'id',
            type: 'int',
            notNull: true,
            autoIncrement: true,
        },
        {
            name: 'name',
            type: 'varchar',
            notNull: true,
            autoIncrement: false,
        },
        {
            name: 'age',
            type: 'int',
            notNull: true,
            autoIncrement: false,
        },
        {
            name: 'created_at',
            type: 'datetime',
            notNull: true,
            autoIncrement: false,
        },
    ]
}

const initialState: State = {
    schemas: [schema],
}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        default:
            return state
    }
}