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

export class SchemaDetail extends React.Component<Props, {}> {
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
        const schemas = this.props.values.schema.schemas;
        
        let columns = Object.keys(schemas[0].Columns[0]);
        const values =  schemas[0].Columns;

        return (
            <Paper className={classes.root}>
                <TableToolbar numSelected={0}/>
                <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                    <TableHeader columns={columns}/>
                    <TableBody>
                    {values.map(value => {
                        return (
                        <TableRow
                            hover
                            onClick={event => this.handleClick(event, value.Name)}
                            role="checkbox"
                            tabIndex={-1}
                            key={value.Name}
                        >
                            <TableCell>{value.Name}</TableCell>
                            <TableCell>{value.Type}</TableCell>
                            <TableCell>{value.NotNull ? '✔' : ''}</TableCell>
                            <TableCell>{value.AutoIncrement ? '✔' : ''}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
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
)(SchemaDetail)
