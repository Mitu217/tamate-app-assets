import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';
import ProjectList from 'components/project/list';
import ProjectShow from 'components/project/show';
import {
    fetchRequire as fetchProjectsRequire,
    createRequire as createProjectRequire,
    deleteRequire as deleteProjectRequire,
    updateRequire as updateProjectRequire,
    Project
} from 'modules/project'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

export class ProjectRoot extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.actions.fetchAllProjects()
    }

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    submitCreateProject = (name: string, description: string) => {
        this.props.actions.createProject(name, description);
    }

    submitDeleteProject = (id: number) => {
        this.props.actions.deleteProject(id);
    }

    submitUpdateProject = (project: Project) => {
        this.props.actions.updateProject(project);
    }

    render() {
        const projects = this.props.values.project.projects

        const matchProjectId = this.props.match.params.id
        if (matchProjectId) {
            const project = projects.find(project => {
                return project.id == matchProjectId;
            })
            // TODO: projectが空なら一覧にリダイレクト
            return (
                <ProjectShow
                    project={project}
                    onSubmitDelete={this.submitDeleteProject}
                    onSubmitUpdate={this.submitUpdateProject}
                />
            )
        }

        return (
            <ProjectList
                projects={projects}
                onClickItem={this.handleChangeLocation}
                onSubmit={this.submitCreateProject}
            />
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public fetchAllProjects() {
        this.dispatch(fetchProjectsRequire([]));
    }
    public createProject(name: string, description: string) {
        this.dispatch(createProjectRequire(name, description));
    }
    public deleteProject(id: number) {
        this.dispatch(deleteProjectRequire(id));
    }
    public updateProject(project: Project) {
        this.dispatch(updateProjectRequire(project))
    }
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(ProjectRoot)
