import * as React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { ReduxState, ReduxAction } from 'store';
import { withStyles, StyledComponentProps } from 'material-ui/styles';

import {
    Button,
} from 'material-ui';
import {
    Add,
} from 'material-ui-icons';

const styles = (theme: any) => ({
    fab: {
        position: 'absolute' as 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

interface Props extends StyledComponentProps {
    onClick: PropTypes.func
}


const PlusFab = (props: Props) => {
    const { classes } = props;
    return (
        <Button variant="fab" className={classes.fab} color="primary" onClick={props.onClick.bind(this)}>
            <Add />
        </Button>
    );
}

export default withStyles(styles, { withTheme: true })<Props>(PlusFab)
