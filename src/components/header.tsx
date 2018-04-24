import * as React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { ReduxState, ReduxAction } from 'store';

// Material-UI
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute' as 'absolute',
        width: '100vw' as '100vw',
    },
});

interface Props extends StyledComponentProps {

}

const Header = (props: Props) => {
    return (
        <AppBar className={props.classes.root} >
            <Toolbar>

            </Toolbar>
        </AppBar>
    )
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles),
    connect(
        (state: ReduxState) => ({values: state.drawer}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Header)
