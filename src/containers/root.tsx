import * as React from 'react';
import {compose} from 'redux';
import {State} from 'modules/tab'
import {connect, Dispatch} from 'react-redux';
import {select} from 'modules/tab'
import {ReduxState, ReduxAction} from 'store';

import MenuAppBar from 'containers/menu-app-bar';
import MenuDrawer from 'containers/menu-drawer';
import Content from 'containers/content';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

interface Props {
    classes: object;
    values: State;
    actions: ActionDispatcher;
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
                <MenuAppBar />
                <MenuDrawer />
                <Content />
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
