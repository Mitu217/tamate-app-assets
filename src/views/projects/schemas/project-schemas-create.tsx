import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { ReduxState, ReduxAction } from 'store';
import {
    withStyles, StyledComponentProps
} from 'material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
} from 'material-ui';
import {
    card,
    cardHeader,
} from 'assets/styles/card';

import Header from 'components/header'
import ProjectDrawer from 'components/drawers/project-drawer';
import SchemaForm from 'components/forms/schema-form';
import { Column } from 'modules/schema';

import {
    createRequest as requestCreateSchema,
} from 'modules/schema'

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.match
    history: PropTypes.historyContext
}

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
        position: 'relative' as 'relative',
        display: 'flex',
        width: '100%' as '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

export class ProjectSchemasCreate extends React.Component<Props, {}> {

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    handleClickDrawerItem = (route: string) => {
        const projectId = this.props.match.params.projectId
        this.handleChangeLocation('/' + projectId + '/' + route);
    };

    handleSubmitForm = (name: string, primaryKey: string, columns: Array<Column>) => {
        const projectId = Number(this.props.match.params.projectId)
        this.props.actions.requestCreateSchema(projectId, name, primaryKey, columns)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ProjectDrawer
                    onClickItem={this.handleClickDrawerItem}
                />
                <main className={classes.content}>
                    <SchemaForm onSubmit={this.handleSubmitForm}/>
                </main>
            </div>
        );
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public requestCreateSchema(projectId: number, name: string, primaryKey: string, columns: Array<Column>) {
        this.dispatch(requestCreateSchema(projectId, name, primaryKey, columns));
    }
}

export default compose(
    withStyles(styles),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(ProjectSchemasCreate)