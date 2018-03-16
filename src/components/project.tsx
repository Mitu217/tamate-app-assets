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
// Custom-UI
import Header from 'components/header'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    classes: PropTypes.classesContext
    match: PropTypes.matchContext
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

    header: {
        width: '100%',
        height: '200px',
        margin: '16px 0 40px 0',
        overflowY: 'hidden' as 'hidden',
    },
    headerThumbnail: {
        backgroundImage: `url($image)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '180px',
        width: '180px',
        margin: '10px',
        boxShadow: '2px 2px 4px gray',
    },
    headerContent: {
        width: '100%',
        height: '100%',
    },
});

export class Project extends React.Component<Props, {}> {

    handleLocationChangePath = (path: string) => {
        
    };

    render() {
        const classes = this.props.classes
        const projects = this.props.values.project.projects

        if (this.props.match.params.id) {
            const projectId = this.props.match.params.id
            const project = projects[projectId-1]
            return (
                <div>
                    <Header image={project.thumbnailUri} />
                </div>
            )
        }

        return (
            <GridList cols={3} cellHeight={'auto'} className={classes.gridList} spacing={0}>
                {projects.map(project => (
                    <GridListTile className={classes.card} key={project.id} onClick={() => this.handleLocationChangePath('/projects/' + project.id)}>
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
