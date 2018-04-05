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

    /* Header */
    header: {
        width: '100%',
        height: '160px',
        margin: '16px 0 40px 0',
        overflow: 'hidden' as 'hidden',
    },
    headerThumbnail: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '140px',
        width: '140px',
        margin: '10px 40px 10px 20px',
        boxShadow: '2px 2px 4px gray',
        float: 'left',
    },
    headerName: {
        margin: '40px 0 0 0',
    }
});

interface Props {
    project: Project
    classes?: PropTypes.classesContext
}

interface LocalState {
    openDialog: boolean
    inputName: '',
    inputDescription: '',
}

class ProjectShow extends React.Component<Props, LocalState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openDialog: false,
            inputName: '',
            inputDescription: '',
        };
    }
    
    render() {
        const classes = this.props.classes;
        const project = this.props.project;
        
        if (!project) {
            // wait fetching.
            return (
                <div></div>
            )
        }

        const thumbnailStyle = {backgroundImage: 'url(' + project.thumbnailUri + ')'}
       
        // FIXME プロジェクトの最新アクションログを表示する
        const activities = (
            <div>
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
            </div>
        )

        let content = (<div></div>);
        if (project) {
            content = (
                <main className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.headerThumbnail} style={thumbnailStyle}/>
                        <div className={classes.headerContent}>
                            <Typography className={classes.headerName} variant='display1' component='h1'>
                                {project.name}
                            </Typography>
                        </div>
                    </div>
                </main>
            )
        }
    
        return (
            <div>
                {content}
            </div>
        )    
    }
}

export default withStyles(styles)(ProjectShow)
