import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';
import ProjectList from 'components/project/list';
import ProjectShow from 'components/project/show';
import {
    fetchRequire as fetchRequireProjects, 
    createRequire as createRequireProject,
} from 'modules/project'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

export class Project extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.actions.fetchAllProjects()
    }

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    handleSubmit = (name: string, description: string) => {
        this.props.actions.createNewProject(name, description);
    }

    render() {
        const projects = this.props.values.project.projects

        const matchProjectId = this.props.match.params.id
        if (matchProjectId) {
            const project = projects.find(project => {
                return project.id == matchProjectId;
            })
            return (
                <ProjectShow project={project}/>
            )
        }

        return (
            <ProjectList projects={projects} onClickItem={this.handleChangeLocation} onSubmit={this.handleSubmit}/>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public fetchAllProjects() {
        this.dispatch(fetchRequireProjects([]));
    }
    public createNewProject(name: string, description: string) {
        this.dispatch(createRequireProject(name, description));
    }
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(Project)
