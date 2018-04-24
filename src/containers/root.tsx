import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router'
import PropTypes from 'prop-types';

import {ReduxState, ReduxAction} from 'store'

import App from 'containers/app'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
}

export class Root extends React.Component<Props, {}> {

    // TODO:
    // 起動時にユーザー認証状況を確認（ローディング画面も表示する）
    // ユーザー認証が通っていればcontainers/appへ遷移、通っていなければcontainers/authへ遷移

    render() {
        return (
            <Switch>
                <Route path='*' component={App} />
            </Switch>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(Root)
