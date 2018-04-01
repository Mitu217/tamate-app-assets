import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
// Projects
import {ReduxState, ReduxAction} from 'store';
// Material-UI
import classNames from 'classnames';
import { withStyles, WithStyles } from 'material-ui/styles';
import { lighten } from 'material-ui/styles/colorManipulator';
import Table, {TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

const styles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
});

interface Props {
    classes?: PropTypes.classesContext
    numSelected?: PropTypes.number
}

type ClassNames = keyof typeof styles

const TableToolbar = withStyles(styles, {withTheme: true})<Props>(
    (props: Props & WithStyles<ClassNames>) => {
        const classes = props.classes
        const numSelected = props.numSelected
        return (
            <Toolbar
                className={
                    classNames(classes.root, {
                        [classes['highlight']]: numSelected > 0,
                    })
                }
            >
                <div className={classes['title']}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                        ) : (
                        <Typography variant="title">ClassData</Typography>
                    )}
                </div>
                <div className={classes['spacer']} />
                <div className={classes['actions']}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                            <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                            <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        );
    }
);

export default TableToolbar;