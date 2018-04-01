import {Action} from 'redux';
import { delay } from 'redux-saga';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

/********/
/* Model
/********/
export interface Project {
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
    FETCH = 'fetch/project',
}

interface SaveAction extends Action {
    type: ActionTypes.SAVE
    projects: Array<Project>
}

interface FetchAction extends Action {
    type: ActionTypes.FETCH
    projectIds: Array<number>
}

export const save = (projects: Array<Project>): SaveAction => ({
    type: ActionTypes.SAVE,
    projects: projects,
})

export const fetch = (projectIds: Array<number>): FetchAction => ({
    type: ActionTypes.FETCH,
    projectIds: projectIds,
})

/**********/
/* Reducer
/**********/
export interface State {
    projects: Array<Project>
}

export type Actions = SaveAction | FetchAction

const initialState: State = {projects: []}

export default function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.SAVE:
            return {projects: action.projects}
        default:
            return state
    }
}


/**********/
/* Saga
/**********/
function* fetchProjects(action) {
    console.log("fetch /api/projects");
    try {
        const projects = [
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
        ];
        console.log("success /api/projects");

        yield call(delay, 1000);
        yield put(save(projects));
    } catch (e) {
        console.log("failed /api/projects");

        yield put({type: "PROJECT_FETCH_FAILED", message: e.message})
    }
}

export const Saga = [
    takeEvery(ActionTypes.FETCH, fetchProjects),
]
