import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {State} from 'modules/router'
import {locationChange} from 'modules/router'
import {ReduxState, ReduxAction} from 'store';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';


interface Props {
    classes: object
    values: State
    actions: ActionDispatcher
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

export class TableData extends React.Component<Props, {}> {

    handleLocationChangePath = (path: string) => {
        this.props.actions.onLocationChangePath(path)
    };

    render() {
        console.log(this.props)
        const classes = this.props.classes
        const tileData = [
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
        return (
            <GridList cols={3} cellHeight={'auto'} className={classes['gridList']} spacing={0}>
                {tileData.map(tile => (
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

    public onLocationChangePath(path: string) {        
        this.dispatch(locationChange({pathName: path}))
    }
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state.router}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(TableData)
