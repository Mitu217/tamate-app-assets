import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
// Projects
import {ReduxState, ReduxAction} from 'store';
// Material-UI
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
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

import {TableToolbar, TableHeader} from 'components/row-data';


interface Props {
    values: ReduxState
    actions: ActionDispatcher
    classes: PropTypes.classesContext
    match: PropTypes.matchContext
    history: PropTypes.historyContext
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

export class TableData extends React.Component<Props, {}> {
    isSelected(id) {
        return false
    }

    handleClick(event, id) {
        console.log('handleClick');
    }

    handleChangePage() {
        console.log('handleChangePage');
    }

    handleChangeRecordsPerPage() {
        console.log('handleChangeRecordsPerPage');
    }

    render() {
        const classes = this.props.classes;
        const rows = this.props.values.row.rows;
        const values = rows[0].values;

        const page = 0;
        const recordPerPage = 25;

        return (
            <Paper className={classes.root}>
                <TableToolbar numSelected={0}/>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHeader columns={rows[0].columns}/>
                    <TableBody>
                    {values.slice(page * recordPerPage, page * recordPerPage + recordPerPage).map(value => {
                        const isSelected = this.isSelected(value[0]);
                        return (
                        <TableRow
                            hover
                            onClick={event => this.handleClick(event, value[0])}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={value[0]}
                            selected={isSelected}
                        >
                            <TableCell>{value[0]}</TableCell>
                            <TableCell>{value[1]}</TableCell>
                            <TableCell>{value[2]}</TableCell>
                            <TableCell>{value[3]}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        colSpan={6}
                        count={values.length}
                        rowsPerPage={recordPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRecordsPerPage}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
                </div>
            </Paper>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(TableData)
