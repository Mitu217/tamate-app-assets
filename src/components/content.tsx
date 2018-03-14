import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import {State} from 'modules/tab'
import {ReduxState, ReduxAction} from 'store';

import Dashboard from 'components/dashboard';
import Project from 'components/project';
import TableData from 'components/table-data';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

interface Props {
    classes: object;
    values: State;
    actions: ActionDispatcher;
}

const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    toolbar: theme.mixins.toolbar,
});

export class Content extends React.Component<Props, {}> {
    render() {
        const classes = this.props.classes

        const About = () => (
            <div>
                <h2>About</h2>
            </div>
        )

        return (
            <main className={classes['content']}>
                <div className={classes['toolbar']} />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path='/projects' component={Project} />
                    <Route path='/projects/:id' component={Project} />
                    <Route path='/profile' />
                    <Route path='/settings' />
                </Switch>
            </main>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default withRouter(
    compose(
        withStyles(styles, { name: 'Content' }),
        connect(
            (state: ReduxState) => ({values: state.tab}),
            (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
        )
    )(Content)
)
