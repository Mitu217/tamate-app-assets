import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Divider,
    Typography,
    Button,
} from 'material-ui';

import {
    ExpandMore
} from 'material-ui-icons';

import { Schema } from 'modules/schema';
import { ColumnTable } from 'components';

interface Props extends StyledComponentProps {
    schemas: Array<Schema>
    dense: boolean
    onClick: PropTypes.func
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  column: {
    flexBasis: '33.33%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

const SchemaList = (props: Props) => {
    const { classes, schemas } = props;
    return (
        <div className={props.classes.root}>
            {schemas.map(schema => {
                return (
                    <ExpansionPanel key={schema.name}>
                        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                            <div className={classes.column}>
                                <Typography className={classes.heading}>{schema.name}</Typography>
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}></Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <div className={classes.column} />
                            <div className={classes.column}>
                                <ColumnTable
                                    columns={schema.columns}
                                />
                            </div>
                            <div className={classes.column} />
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button disabled size="small" color="primary">
                                Edit
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })<Props>(SchemaList)