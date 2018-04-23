import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router'
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store'
import { CircularProgress } from 'material-ui/Progress';
import MenuAppBar from 'components/menu-app-bar'
import MenuDrawer from 'components/menu-drawer'
import Content from 'containers/content'

import {
    initRequest as requestInitApp,
} from 'modules/app'

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
}

const styles = {
    app: {},
}

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
                    <Route path='*' component={MenuAppBar} />
                </Switch>
                <Switch>
                    <Route path='*' component={MenuDrawer} />
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
