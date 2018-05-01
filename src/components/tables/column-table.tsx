import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from 'material-ui';
import { Column } from 'modules/schema';

interface Props extends StyledComponentProps {
    columns: Array<Column>
}

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const ColumnTable = (props: Props) => {
    const { classes, columns } = props;
    return (
        <div className={props.classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>NotNull</TableCell>
                    <TableCell>AutoIncrement</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {columns.map(column => {
                    return (
                        <TableRow key={column.name}>
                            <TableCell>{column.name}</TableCell>
                            <TableCell>{column.type}</TableCell>
                            <TableCell>{column.not_null ? 'true' : 'false'}</TableCell>
                            <TableCell>{column.auto_increment ? 'true' : 'false'}</TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })<Props>(ColumnTable)