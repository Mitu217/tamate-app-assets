import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router'
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store'
import { CircularProgress } from 'material-ui/Progress';
import Header from 'components/header'
import Content from 'containers/content'

import {
    initRequest as requestInitApp,
} from 'modules/app'

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
}

const styles = theme => ({
    app: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
        position: 'relative' as 'relative',
        display: 'flex' as 'flex',
        height: '100vh' as '100vh',
        width: '100vw' as '100vw',
    },
});

export class App extends React.Component<Props, {}> {

    componentDidMount() {
        // Request initialize application.
        this.props.actions.requestInitApp();
    }

    render() {
        if (!this.props.values.app.isInit) {
            return (
                <div>
                    <CircularProgress className={this.props.classes.progress} color="secondary" />
                </div>
            )
        }
        return (
            <div className={this.props.classes.app}>
                <Switch>
                    <Route path='*' component={Header} />
                </Switch>
                <Switch>
                    <Route path='/' component={Content} />
                </Switch>
            </div>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public requestInitApp() {
        this.dispatch(requestInitApp());
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(App)
