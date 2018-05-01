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
import { Rows } from 'modules/table';
import { Column } from 'modules/schema';

interface Props extends StyledComponentProps {
    columns: Array<Column>
    rows: Rows
}

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const RowTable = (props: Props) => {
    const { classes, columns, rows } = props;
    return (
        <div className={props.classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    {columns.map(column => {
                        return (
                            <TableCell key={column.name}>{column.name}</TableCell>
                        );
                    })}
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.Values.map((value, index) => {
                    return (
                        <TableRow key={'row-' + index}>
                            {value.map((cell, index) => {
                                return (
                                    <TableCell key={'cell-' + index}>{cell}</TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })<Props>(RowTable)