import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {State, toggle} from 'modules/menu-drawer'
import {ReduxState, ReduxAction} from 'store';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

const drawerWidth = 240;

const styles = theme => ({
    content: {
        margin: -8,
    },
    direction: theme.direction,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },

    appInfo: {
        ...theme.mixins.toolbar,
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-start' as 'flex-start',
        paddingLeft: '24px',
        flexDirection: 'column' as 'column',
        justifyContent: 'center' as 'center',
    },
});

interface Props {
    classes: object
    values: State
    actions: ActionDispatcher
    history: PropTypes.historyContext
}

export class MenuDrawer extends React.Component<Props, {}> {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleDrawerToggle() {
        this.props.actions.onToggle(!this.props.values.open)
    };

    handlerChangeMenu(uri: string) {
        this.props.history.push(uri)
    }

    render() {
        const classes = this.props.classes
        const drawer = (
            <div>
                <div className={classes['appInfo']}>
                    <Typography
                        color='textSecondary'
                        variant='title'
                    >
                        tamate
                    </Typography>
                    <Typography
                        color='textSecondary'
                    >
                        v0.1.0
                    </Typography>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={this.handlerChangeMenu.bind(this, '/')}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                    <ListItem button onClick={this.handlerChangeMenu.bind(this, '/settings')}>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
            </div>
        );
        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant='temporary'
                        anchor={classes['direction'] === 'rtl' ? 'right' : 'left'}
                        open={this.props.values.open}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes['drawerPaper'],
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation='css'>
                    <Drawer
                        variant='permanent'
                        open
                        classes={{
                            paper: classes['drawerPaper'],
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
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
)(MenuDrawer)
