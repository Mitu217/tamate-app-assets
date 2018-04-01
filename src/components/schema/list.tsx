import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles, WithStyles, StyledComponentProps} from 'material-ui/styles';
import { Schema } from 'modules/schema';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import Description from 'material-ui-icons/Description';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '0 24px',
    },
    list: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '2px 2px 4px gray',
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

interface Props extends StyledComponentProps{
    schemas: Array<Schema>
    onClickItem: PropTypes.func
}

const SchemaList = (props: Props) => {
    const classes = props.classes
    const schemas = props.schemas

    // Prepare
    let schemaList: Object = new Object();
    schemas.forEach(schema => {
        if (!schemaList.hasOwnProperty(schema.databaseName)) {
            schemaList[schema.databaseName] = new Array<Schema>();
        }
        schemaList[schema.databaseName].push(schema);
    });

    const dense = false;
    const secondary = true;

    return (
        <div className={classes.root}>
            <Grid container>
                {Object.keys(schemaList).map(databaseName => {
                    return (
                        <Grid item xs={12} md={12} key={databaseName}>
                            <Typography variant="title" className={classes.title}>
                                {databaseName}
                            </Typography>
                            <div className={classes.list}>
                            <List dense={dense}>
                                {schemaList[databaseName].map(schema => {
                                    return (
                                        <ListItem button key={schema.id} onClick={props.onClickItem.bind(this, schema.id)}>
                                            <ListItemIcon>
                                                <Description />
                                            </ListItemIcon>
                                            <ListItemText
                                            primary={schema.table.name}
                                            secondary={secondary ? schema.table.description : null}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                            </div>
                        </Grid>    
                    );
                })}
            </Grid>
        </div>
    )
}

export default withStyles(styles)<Props>(SchemaList)
