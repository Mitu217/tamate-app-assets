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
import {
    Dashboard,
    Description,
    Storage,
    Settings,
    CompareArrows,
} from 'material-ui-icons';

const styles = theme => ({
    drawerPaper: {
        position: 'relative' as 'relative',
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
                <ListItem button onClick={props.onClickItem.bind(this, "")}>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItem>
                <ListItem button onClick={props.onClickItem.bind(this, "schemas")}>
                    <ListItemIcon>
                        <Description />
                    </ListItemIcon>
                    <ListItemText primary="Schemas" />
                </ListItem>
                <ListItem button onClick={props.onClickItem.bind(this, "datasources")}>
                    <ListItemIcon>
                        <Storage />
                    </ListItemIcon>
                    <ListItemText primary="Datasources" />
                </ListItem>
                <ListItem button onClick={props.onClickItem.bind(this, "diff")}>
                    <ListItemIcon>
                        <CompareArrows />
                    </ListItemIcon>
                    <ListItemText primary="Diff" />
                </ListItem>
                <ListItem button onClick={props.onClickItem.bind(this, "settings")}>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default withStyles(styles, { withTheme: true })<Props>(ProjectDrawer)
