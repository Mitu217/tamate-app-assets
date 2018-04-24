import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import {
    List,
    ListItem,
    ListItemText,
} from 'material-ui';

import { Schema } from 'modules/schema';

interface Props extends StyledComponentProps {
    schemas: Array<Schema>
    dense: boolean
    onClick: PropTypes.func
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const ProjectList = (props: Props) => {
    return (
        <div className={props.classes.root}>
            <List dense={props.dense}>
                {props.schemas.map((schema: Schema) => {
                    return (
                        <ListItem key={schema.id} onClick={props.onClick.bind(this, schema.id)}>
                            <ListItemText primary={schema.name} secondary={schema.projectId}/>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export default withStyles(styles)<Props>(ProjectList)