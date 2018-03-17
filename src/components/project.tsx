import * as React from 'react'
import {compose} from 'redux'
import {connect, Dispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
// Projects
import {ReduxState, ReduxAction} from 'store'
// Material-UI
import {withStyles} from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
// Custom-UI
import Header from 'components/header'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    classes: PropTypes.classesContext
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

const styles = theme => ({
    card: {
        padding: '16px 8px !important'
    },
    cardInner: {
        margin: 4,
    },
    media: {
        height: 180,
    },
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
    drawerPaper: {
        position: 'relative' as 'relative',
        width: drawerWidth,
    },
});

const drawerWidth = 240

export class Project extends React.Component<Props, {}> {

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    render() {
        const classes = this.props.classes
        const projects = this.props.values.project.projects

        if (this.props.match.params.id) {
            const projectId = this.props.match.params.id
            const project = projects[projectId-1]
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

        return (
            <GridList cols={3} cellHeight={'auto'} className={classes.gridList} spacing={0}>
                {projects.map(project => (
                    <GridListTile className={classes.card} key={project.id} onClick={() => this.handleChangeLocation('/projects/' + project.id)}>
                        <Card className={classes.cardInner}>
                            <CardMedia
                                className={classes.media}
                                image={project.thumbnailUri}
                            />
                            <CardContent>
                                <Typography variant='headline' component='h2'>
                                    {project.name}
                                </Typography>
                                <Typography component='p'>
                                    {project.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                        </CardActions>
                    </Card>
                </GridListTile>
                ))}
            </GridList>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Project)
