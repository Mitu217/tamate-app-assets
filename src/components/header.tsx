import * as React from 'react'
import {compose} from 'redux'
import {connect, Dispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
// Material-UI
import {withStyles, WithStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'

export interface Props {
    image?: string
    name?: string
}

const styles = {
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
    headerContent: {
        
    },
    headerName: {
        margin: '40px 0 0 0',
    }
}

type ClassNames = keyof typeof styles

const Header = withStyles(styles)<Props>(
    (props: Props & WithStyles<ClassNames>) => {
        const classes = props.classes
        const thumbnailStyle = {backgroundImage: 'url(' + props.image + ')'}
        return (
            <div className={classes.header}>
                <div className={classes.headerThumbnail} style={thumbnailStyle}/>
                <div className={classes.headerContent}>
                    <Typography className={classes.headerName} variant='display1' component='h1'>
                        {props.name}
                    </Typography>
                </div>
            </div>
        )
    }
)

export default Header
