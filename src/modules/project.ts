import {Action} from 'redux';

/********/
/* Model
/********/
interface Project {
    id: number
    name: string
    description: string
    thumbnailUri: string
    favorite: boolean
}

/****************/
/* ActionCreator
/****************/
enum ActionTypes {
    SAVE = 'project/save',
}

interface SaveAction extends Action {
    type: ActionTypes.SAVE
    projects: Array<Project>
}

export const save = (projects: Array<Project>): SaveAction => ({
    type: ActionTypes.SAVE,
    projects: projects,
})

/**********/
/* Reducer
/**********/
export interface State {
    projects: Array<Project>
}

export type Actions = SaveAction

// FIXME: APIサーバ側が完成したら空にして読み込むようにする
const initialState: State = {projects: [
    {
        id: 1,
        name: 'dummy project1',
        description: 'Dummyなプロジェクトです',
        thumbnailUri: 'https://www.aniplexplus.com/res/g5b92h?w=510&h=510',
        favorite: true,
    },
    {
        id: 2,
        name: 'dummy project2',
        description: 'Dummyなプロジェクトです',
        thumbnailUri: 'https://images-na.ssl-images-amazon.com/images/I/717qF7gjJAL._SL1110_.jpg',
        favorite: false,
    },
]}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.SAVE:
            return {projects: action.projects}
        default:
            return state
    }
}