import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import ProjectCard from 'components/cards/project-card';

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    history: PropTypes.historyContext
}

const styles = theme => ({
    projects: {

    },
});

export class Dashboard extends React.Component<Props, {}> {

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    handleMoveToProject = (projectId: string) => {
        this.handleChangeLocation('/' + projectId);
    };

    handleMoveToNewProject = () => {
        this.props.history.push('/project/new');
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.projects}>
                <ProjectCard
                    projects={this.props.values.project.projects}
                    onClickNewProjectButton={this.handleMoveToNewProject}
                    onClickProjectListItem={this.handleMoveToProject}
                />
            </div>
        );
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Dashboard)