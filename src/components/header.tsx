import * as React from 'react'
import {compose} from 'redux'
import {connect, Dispatch} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
// Material-UI
import {withStyles, WithStyles} from 'material-ui/styles'

export interface Props {
    image: string
}

const styles = {
    header: {
        width: '100%',
        height: '200px',
        margin: '16px 0 40px 0',
        overflowY: 'hidden' as 'hidden',
    },
    headerThumbnail: {
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
}

type ClassNames = keyof typeof styles

const Header = withStyles(styles)<Props>(
    (props: Props & WithStyles<ClassNames>) => {
        const classes = props.classes
        const thumbnailStyle = {backgroundImage: 'url(' + props.image + ')'}
        return (
            <div className={classes.header}>
                <div className={classes.headerThumbnail} style={thumbnailStyle}/>
                <div className={classes.headerContent}/>
            </div>
        )
    }
)

/*
export class Header extends React.Component<Props, {}> {

    render() {
        const classes = this.props.classes
        const image = this.props.image
        return (
            
        )
    }
}
*/
export default Header
