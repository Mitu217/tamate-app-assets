import {Action} from 'redux';

/********/
/* Model
/********/
interface Column {
    Name: string
    Type: string
    NotNull: boolean
    AutoIncrement: boolean
}

interface Table {
    Name: string
    PrimaryKey: string
    UniqueKey: Array<Array<string>>
    IndexKey: Array<Array<string>>
}

export interface Schema {
    DatabaseName: string
    Description: string
    Table: Table
    Columns: Array<Column>
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
    DatabaseName: 'Sample',
    Description: 'サンプルテーブルです',
    Table: {
        Name: 'Sample',
        PrimaryKey: 'id',
        UniqueKey: [],
        IndexKey: [],
    },
    Columns: [
        {
            Name: 'id',
            Type: 'int',
            NotNull: true,
            AutoIncrement: true,
        },
        {
            Name: 'name',
            Type: 'varchar',
            NotNull: true,
            AutoIncrement: false,
        },
        {
            Name: 'age',
            Type: 'int',
            NotNull: true,
            AutoIncrement: false,
        },
        {
            Name: 'created_at',
            Type: 'datetime',
            NotNull: true,
            AutoIncrement: false,
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