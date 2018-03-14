import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import {State} from 'modules/tab'
import {select} from 'modules/tab'
import {ReduxState, ReduxAction} from 'store';

import Dashboard from 'components/dashboard';

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
                <p>フレンズに投票するページです</p>
            </div>
        )

        return (
            <main className={classes['content']}>
                <div className={classes['toolbar']} />
                <Route exact path='/' component={Dashboard} />
                <Route path='/about' component={Dashboard} />
                <Route path='/projects' component={Dashboard} />
                <Route path='/tables' component={Dashboard} />
                <Dashboard />
            </main>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}

    public onSelect(selectedId: number) {
        this.dispatch(select(selectedId))
    }
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state.tab}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Content)
