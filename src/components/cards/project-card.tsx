import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import { browserHistory } from 'react-router'

import ProjectList from 'components/lists/project-list';

import { cardHeader, card, cardHeaderAction } from 'assets/styles/card';
import { defaultFont } from 'assets/styles/font';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
} from 'material-ui';
import {
    MoreVert,
} from 'material-ui-icons';
import { Project } from 'modules/project';

const styles = theme => ({
    projects: {

    },
    card: {
        ...card,
        display: 'block',
        width: 'calc(100% - ' + (theme.spacing.unit * 4) + 'px)',
        maxWidth: 750,
        minWidth: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
    },
    cardHeader: {
        flex: 'none',
        ...cardHeader,
        ...defaultFont,
        background: 'rgb(226,226,226)',
        //...primaryBoxShadow
    },
    cardTitle: {
        fontSize: '1.3rem',
    },
    cardHeaderAction: {
        ...cardHeaderAction,
        marginTop: '18px',
    },
});

interface Props extends StyledComponentProps {
    projects: Project[]
    onClickNewProjectButton: PropTypes.func
    onClickProjectListItem: PropTypes.func
}

const ProjectCard = (props: Props) => {
    const classes = props.classes;

    return (
        <div className={classes.projects}>
            <Card className={classes.card}>
                <CardHeader
                    classes={{
                        root: classes.cardHeader,
                        title: classes.cardTitle,
                        //content: classes.cardHeaderContent
                    }}
                    title='Projects'
                    action={
                        <div>
                            <Button size='medium' variant='raised' color='secondary' className={classes.cardHeaderAction} onClick={props.onClickNewProjectButton.bind(this)}>
                                New Project
                            </Button>
                        </div>
                    }
                >
                    <div className={classes.cardHeaderTool}>
                        <p>test</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <ProjectList
                        projects = { props.projects }
                        dense = { true }
                        onClick = { props.onClickProjectListItem }
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)<Props>(ProjectCard)