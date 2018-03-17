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

const styles = theme => ({
});

interface Props {
    columns: Array<string>
    classes?: PropTypes.classesContext
    numSelected?: PropTypes.number
}

function onSelectAllClick() {
    console.log('onSelectAllClick');
}

function createSortHandler(id: string) {
    console.log('createSortHandler')
}

function createColumnLabels(columnNames: Array<string>) {
    return columnNames.map((columnName) => {
        return {
            id: columnName,
            numeric: false,
            disablePadding: false,
            label: columnName,
        }
    }) 
}

type ClassNames = keyof typeof styles

const TableHeader = withStyles(styles, {withTheme: true})<Props>(
    (props: Props & WithStyles<ClassNames>) => {
        const numSelected = props.numSelected
        const columns = props.columns
        const rowCount = 4;
        const orderBy = 'id';
        const order = 'asc';

        const columnLabels = createColumnLabels(columns);
        return (
            <TableHead>
                <TableRow>
                {columnLabels.map(columnLabel => {
                    return (
                    <TableCell
                        key={columnLabel.id}
                        numeric={columnLabel.numeric}
                        padding={columnLabel.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === columnLabel.id ? order : false}
                    >
                        <Tooltip
                        title="Sort"
                        placement={columnLabel.numeric ? 'bottom-end' : 'bottom-start'}
                        enterDelay={300}
                        >
                        <TableSortLabel
                            active={orderBy === columnLabel.id}
                            direction={order}
                            onClick={createSortHandler.bind(this, columnLabel.id)}
                        >
                            {columnLabel.label}
                        </TableSortLabel>
                        </Tooltip>
                    </TableCell>
                    );
                }, this)}
                </TableRow>
            </TableHead>
        );
    }
);

export default TableHeader;