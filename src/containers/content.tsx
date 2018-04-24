import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Switch, Route, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { ReduxState, ReduxAction } from 'store';
import { withStyles, StyledComponentProps } from 'material-ui/styles';

import Dashboard from 'containers/dashboard';
import ProjectOverview from 'views/projects/project-overview';
import ProjectSchemas from 'views/projects/project-schemas';
import ProjectDatasources from 'views/projects/project-datasources';
import ProjectDiff from 'views/projects/project-diff';
import ProjectSettings from 'views/projects/project-settings';

const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    toolbar: theme.mixins.toolbar,
});

interface Props extends StyledComponentProps {
    actions: ActionDispatcher
}

export class Content extends React.Component<Props, {}> {
    render() {
        const classes = this.props.classes
        return (
            <main className={classes.content}>
                <div className={classes['toolbar']} />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/:projectId' component={ProjectOverview} />
                    <Route exact path='/:projectId/schemas' component={ProjectSchemas} />
                    <Route exact path='/:projectId/datasources' component={ProjectDatasources} />
                    <Route exact path='/:projectId/diff' component={ProjectDiff} />
                    <Route exact path='/:projectId/settings' component={ProjectSettings} />
                </Switch>
            </main>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state.tab}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Content)
