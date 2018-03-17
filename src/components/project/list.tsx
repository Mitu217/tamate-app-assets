import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Project} from 'modules/project';
import {withStyles, WithStyles} from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';

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
});

interface Props {
    projects: Array<Project>
    onClickItem: PropTypes.func
    classes?: PropTypes.classesContext
}

const ProjectList = (props: Props) => {
    const classes = props.classes
    const projects = props.projects
    return (
        <GridList cols={3} cellHeight={'auto'} className={classes.gridList} spacing={0}>
            {projects.map(project => (
                <GridListTile className={classes.card} key={project.id} onClick={props.onClickItem.bind(this, '/projects/' + project.id)}>
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

export default withStyles(styles)<Props>(ProjectList)
