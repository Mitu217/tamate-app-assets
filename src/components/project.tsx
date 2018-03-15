import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {State} from 'modules/tab'
import {ReduxState, ReduxAction} from 'store';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';


interface Props {
    classes: object
    values: State
    actions: ActionDispatcher
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
        overflowY: 'hidden' as 'hidden',
    },
    headerThumbnail: {
        backgroundImage: `url('https://www.aniplexplus.com/res/g5b92h?w=510&h=510')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '180px',
        width: '180px',
        margin: '10px',
        position: 'absolute' as 'absolute',
        top: '64px',
        zIndex: 100,
        boxShadow: '2px 2px 4px gray',
    },
    headerBackgroundImage: {
        backgroundImage: `url('https://www.aniplexplus.com/res/g5b92h?w=510&h=510')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        filter: 'blur(10px)',
        margin: '-10px',  // blurの値と同じ値だけマイナス
    },
});

export class Project extends React.Component<Props, {}> {

    handleLocationChangePath = (path: string) => {
        
    };

    render() {
        const classes = this.props.classes
        const projectData = [
            {
                key: 0,
            },
            {
                key: 1,
            },
            {
                key: 2,
            },
            {
                key: 3,
            },
            {
                key: 4,
            },
            {
                key: 5,
            },
        ]
        if (this.props.match.params.id) {
            const projectId = this.props.match.id
            const project = projectData[projectId]
            return (
                <div>
                    <div className={classes['header']}>
                        <div className={classes['headerThumbnail']}/>
                        <div className={classes['headerBackgroundImage']}/>
                    </div>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={1}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollable
                            scrollButtons="auto"
                        >
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                            <Tab label="Item Four" />
                            <Tab label="Item Five" />
                            <Tab label="Item Six" />
                            <Tab label="Item Seven" />
                        </Tabs>
                    </AppBar>
                </div>
            )
        }

        return (
            <GridList cols={3} cellHeight={'auto'} className={classes['gridList']} spacing={0}>
                {projectData.map(tile => (
                    <GridListTile className={classes['card']} key={tile.key} onClick={() => this.handleLocationChangePath('/projects/' + tile.key)}>
                        <Card className={classes['cardInner']}>
                            <CardMedia
                                className={classes['media']}
                                image='https://www.aniplexplus.com/res/g5b92h?w=510&h=510'
                                title='Contemplative Reptile'
                            />
                            <CardContent>
                                <Typography variant='headline' component='h2'>
                                    Project1
                                </Typography>
                                <Typography component='p'>
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
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
        (state: ReduxState) => ({values: state.tab}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Project)
