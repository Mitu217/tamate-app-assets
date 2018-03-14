import * as React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {connect, Dispatch} from 'react-redux';

import {State, toggle} from 'modules/menu-drawer'
import {ReduxState, ReduxAction} from 'store';

// Material-UI
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        position: 'absolute' as 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
});

interface Props {
    classes: object;
    values: State;
    actions: ActionDispatcher;
}

export class MenuAppBar extends React.Component<Props, {}> {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleDrawerToggle = () => {
        this.props.actions.onToggle(!this.props.values.open)
    };

    render() {
        const classes = this.props.classes
        return (
            <AppBar className={classes['appBar']}>
                <Toolbar>
                    <IconButton 
                        color='inherit' 
                        aria-label='open drawer' 
                        onClick={this.handleDrawerToggle}
                        className={classes['navIconHide']}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}

    public onToggle(open: boolean) {
        this.dispatch(toggle(open))
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
        (state: ReduxState) => ({values: state.drawer}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(MenuAppBar)
