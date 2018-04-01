import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Project} from 'modules/project'
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Header from 'components/header';

const styles = theme => ({
    gridList: {
        padding: '16px',
        height: `calc(100vh - 64px - 32px)`,
        width: `calc(100% - 16px)`,
        overflowY: 'scroll' as 'scroll',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

interface Props {
    project: Project
    classes?: PropTypes.classesContext
}

const ProjectShow = (props: Props) => {
    const classes = props.classes;
    const project = props.project;
    return (
        <div>
            <main className={classes.content}>
                <Header image={project.thumbnailUri} name={project.name}/> 
                <Typography variant='body2' component='h2'>
                    Latest Activity > 
                </Typography>
                <Paper>
                    <List>
                        <ListItem>
                            <ListItemText inset primary="Activity1" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText inset primary="Activity2" />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText inset primary="Activity3" />
                        </ListItem>
                    </List>
                </Paper>
            </main>
        </div>
    )
}

export default withStyles(styles)<Props>(ProjectShow)
