import * as React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { ReduxState, ReduxAction } from 'store';

// Material-UI
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {
    AppBar, 
    Typography,
    Toolbar,
} from 'material-ui';

const styles = theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute' as 'absolute',
        width: '100%' as '100%',
    },
});

interface Props extends StyledComponentProps {
    title: string
    onClickTitle: PropTypes.func
}

const Header = (props: Props) => {
    const { title, onClickTitle } = props;
    return (
        <AppBar className={props.classes.root} >
            <Toolbar>
                <Typography variant="title" color="inherit" onClick={onClickTitle.bind(this)} >
                    { title }
                </Typography>
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
