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
} from 'material-ui';
import { Schema } from 'modules/schema';

const styles = theme => ({
    card: {
        ...card,
        display: 'block',
        width: 'calc(100% - ' + (theme.spacing.unit * 4) + 'px)',
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
    schemas: Schema[]
    onClickListItem: PropTypes.func
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
                    title='Schemas'
                >
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)<Props>(ProjectCard)