import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Datasource} from 'modules/datasource';
// Material-UI
import classNames from 'classnames';
import {withStyles, StyledComponentProps} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';

import TableToolbar from 'components/table/table-toolbar';
import TableHeader from 'components/table/table-header';


interface Props extends StyledComponentProps {
    datasource: Datasource
}

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit,
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

const DatasourceShow = (props: Props) => {
    const classes = props.classes
    const datasource = props.datasource

    let columnNames = datasource.row.columnNames.map(columnName => {
        return columnName;
    });
    const values =  datasource.row.values;

    const dense = false;
    const secondary = true;

    return (
        <div>
            <Paper className={classes.root}>
                <TableToolbar numSelected={0}/>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHeader columns={columnNames}/>
                    <TableBody>
                    {values.map((value, index) => {
                        return (
                            <TableRow
                                hover
                                onClick={event => this.handleClick(event, index)}
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                            >
                            {columnNames.map((_, index) => {
                                return (
                                    <TableCell>{value[index]}</TableCell>
                                );
                            })}
                            </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </div>
            </Paper>
        </div>
    )
}

export default withStyles(styles)<Props>(DatasourceShow)
