import {Action} from 'redux';

/********/
/* Model
/********/
export interface Config {
    id: number
    configType: string
}

export interface SQLConfig extends Config {
    driverName: string
    dsn: string
    databaseName: string
    tableName: string
}

/****************/
/* ActionCreator
/****************/
enum ActionTypes {
}

/*
interface SaveAction extends Action {
    type: ActionTypes.SAVE
    configs: Array<Config>
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
    configs: Array<Config>
}

export type Actions = Action

// FIXME: APIサーバ側が完成したら空にして読み込むようにする
const config: SQLConfig = {
    id: 1,
    configType: 'sql',
    dsn: 'test',
    driverName: 'mysql',
    databaseName: 'Sample',
    tableName: 'Sample',
};
const initialState: State = {
    configs: [
        config,
    ]
}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        default:
            return state
    }
}