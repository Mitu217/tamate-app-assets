import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router'
import PropTypes from 'prop-types';

import {ReduxState, ReduxAction} from 'store'
import {State} from 'modules/tab'
import {select} from 'modules/tab'

import MenuAppBar from 'components/menu-app-bar'
import MenuDrawer from 'components/menu-drawer'
import Content from 'components/content'

// Material-UI
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'

interface Props {
    classes: object
    values: State
    actions: ActionDispatcher
    history: PropTypes.historyContext
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
        position: 'relative' as 'relative',
        display: 'flex',
        width: '100%',
    },
});

export class Root extends React.Component<Props, {}> {
    render() {
        const classes = this.props.classes

        return (
            
            <div className={this.props.classes['root']}>
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

    /*
    public onSelect(selectedId: number) {
        this.dispatch(select(selectedId))
    }
    */
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state.tab}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Root)
