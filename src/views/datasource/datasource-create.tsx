import * as React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import { Paper } from 'material-ui';
import { DatasourceEditForm } from 'components';
import { createRequest as requestCreateDatasource, Config, SQLConfig } from 'modules/datasource';

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    history: PropTypes.historyContext
    match: PropTypes.match
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
    form: {
        padding: theme.spacing.unit * 3,
    }
});

export class DatasourceCreate extends React.Component<Props, {}> {

    onSubmit(datasourceName: string, type: string, config: Config) {
        const projectId = this.props.match.params.id;
        this.props.actions.createDatasource(projectId, datasourceName, type, config);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <Paper className={classes.form}>
                        <DatasourceEditForm onSubmit={this.onSubmit.bind(this)} />
                    </Paper>
                </main>
            </div>
        );
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public createDatasource(projectId: string, datasourceName: string, type: string, config: Config) {
        this.dispatch(requestCreateDatasource(projectId, datasourceName, type, config));
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(DatasourceCreate)