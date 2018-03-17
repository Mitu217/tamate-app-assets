import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {State} from 'modules/tab';
import {ReduxState, ReduxAction} from 'store';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';


interface Props {
    values: ReduxState
    actions: ActionDispatcher
    classes: PropTypes.classesContext
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
});

export class Dashboard extends React.Component<Props, {}> {

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    render() {
        const classes = this.props.classes;
        const projects = this.props.values.project.projects;

        // ダッシュボードではお気に入りされたプロジェクトのみ表示する
        const favoriteProject = projects.filter(project => {
            return project.favorite;
        })

        return (
            <GridList cols={3} cellHeight={'auto'} className={classes.gridList} spacing={0}>
                {favoriteProject.map(project => (
                    <GridListTile className={classes.card} key={project.id} onClick={this.handleChangeLocation.bind(this, '/projects/' + project.id)}>
                        <Card className={classes.cardInner}>
                            <CardMedia
                                className={classes.media}
                                image={project.thumbnailUri}
                                title='Contemplative Reptile'
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
)(Dashboard)
