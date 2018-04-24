import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import ProjectList from 'components/project-list';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { cardHeader, card } from 'assets/styles/card';

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    history: PropTypes.historyContext
}

const styles = theme => ({
    card: {
        ...card,
        maxWidth: 360,
        margin: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
    },
    cardHeader: {
      flex: "none",
      ...cardHeader,
      //...defaultFont,
      background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
      //...primaryBoxShadow
    },
});

export class Dashboard extends React.Component<Props, {}> {

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    handleClickProjectItem = (projectId: number) => {
        const url = '/' + projectId
        this.handleChangeLocation(url);
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.projects}>
                <Card className={classes.card}>
                    <CardHeader
                        classes={{
                            root: classes.cardHeader,
                            //title: classes.cardTitle,
                            //content: classes.cardHeaderContent
                        }}
                        title="Projects"
                    >
                    </CardHeader>
                    <CardContent>
                        <ProjectList
                            projects = { this.props.values.project.projects }
                            dense = { true }
                            onClick = { this.handleClickProjectItem }
                        />
                    </CardContent>
                </Card>
            </div>
        );
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