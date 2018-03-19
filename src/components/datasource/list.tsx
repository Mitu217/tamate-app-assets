import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles, WithStyles, StyledComponentProps} from 'material-ui/styles';
import { Config, SQLConfig } from 'modules/config';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import Description from 'material-ui-icons/Description';
import Divider from 'material-ui/Divider';
import { Schema } from 'modules/schema';

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
    configs: Array<Config>
    onClickItem: PropTypes.func
}

const DatasourceList = (props: Props) => {
    const classes = props.classes
    const configs = props.configs as Array<SQLConfig>

    // ひとまずSQLのみを想定して実装（あとでConfigType毎にComponentを分離する）

    // Prepare
    let configList: Object = new Object();
    configs.forEach(config => {    
        if (!configList.hasOwnProperty(config.databaseName)) {
            configList[config.databaseName] = new Array<SQLConfig>();
        }
        configList[config.databaseName].push(config);
    });

    const dense = false;
    const secondary = true;

    return (
        <div className={classes.root}>
            <Grid container>
                {Object.keys(configList).map(databaseName => {
                    return (
                        <Grid item xs={12} md={12} key={databaseName}>
                            <Typography variant="title" className={classes.title}>
                                {databaseName}
                            </Typography>
                            <div className={classes.list}>
                            <List dense={dense}>
                                {configList[databaseName].map(config => {
                                    return (
                                        <ListItem button key={config.id} onClick={props.onClickItem.bind(this, config.id)}>
                                            <ListItemIcon>
                                                <Description />
                                            </ListItemIcon>
                                            <ListItemText
                                            primary={config.tableName}
                                            secondary={secondary ? '' : null}
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

export default withStyles(styles)<Props>(DatasourceList)
