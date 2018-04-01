import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';
import ProjectList from 'components/project/list';
import ProjectShow from 'components/project/show';
import {fetch as fetchProjects} from 'modules/project'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

export class Project extends React.Component<Props, {}> {

    componentDidMount() {
        console.log(this.props.actions);
        this.props.actions.fetchAllProjects()
    }

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

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
            <ProjectList projects={projects} onClickItem={this.handleChangeLocation}/>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public fetchAllProjects() {
        this.dispatch(fetchProjects([]))
    }
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(Project)
