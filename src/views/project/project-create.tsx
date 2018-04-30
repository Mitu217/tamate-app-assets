import * as React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import { Paper } from 'material-ui';
import { ProjectEditForm } from 'components';
import { createRequest as requestCreateProject } from 'modules/project';

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    history: PropTypes.historyContext
    match: PropTypes.match
}

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
        position: 'relative' as 'relative',
        display: 'flex',
        width: '100%' as '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    form: {
        padding: theme.spacing.unit * 3,
    }
});

export class ProjectCreate extends React.Component<Props, {}> {

    onSubmit(projectName: string, description: string) {
        this.props.actions.createdProject(projectName, description);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <Paper className={classes.form}>
                        <ProjectEditForm onSubmit={this.onSubmit.bind(this)} />
                    </Paper>
                </main>
            </div>
        );
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public createdProject(projectName: string, description: string) {
        this.dispatch(requestCreateProject(projectName, description));
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(ProjectCreate)