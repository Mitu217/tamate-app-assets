import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Switch, Route, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { ReduxState, ReduxAction } from 'store';
import { withStyles, StyledComponentProps } from 'material-ui/styles';

import Dashboard from 'containers/dashboard';
import Project from 'views/projects/project';

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
                    <Route path='/:projectId' component={Project} />
                    <Route path='/:projectId/:route' component={Project} />
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
