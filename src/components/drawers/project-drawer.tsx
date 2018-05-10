import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReduxState, ReduxAction } from 'store';
import {
    withStyles,
    StyledComponentProps,
} from 'material-ui/styles';
import {
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from 'material-ui';

import {routes as ProjectRoutes} from 'routes/project';

const styles = theme => ({
    drawerPaper: {
        position: 'relative' as 'relative',
        height: '100%' as '100%',
        width: 240,
    },
    drawerPaperClose: {
        overflowX: 'hidden' as 'hidden',
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    }
});

interface Props extends StyledComponentProps {
    onClickItem: PropTypes.func,
}

const ProjectDrawer = (props: Props) => {
    const { classes } = props;

    // 画面の幅でレスポンシブにする
    const open = false;

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <List>
                {ProjectRoutes.map(route => {
                    return (
                        <ListItem button onClick={props.onClickItem.bind(this, route.path)} key={route.path} >
                            <ListItemIcon>
                                <route.icon />
                            </ListItemIcon>
                            <ListItemText primary={route.primary} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default withStyles(styles, { withTheme: true })<Props>(ProjectDrawer)
