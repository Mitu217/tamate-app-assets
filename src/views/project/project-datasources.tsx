import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { ReduxState, ReduxAction } from 'store';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { Grid } from 'material-ui';

import { ProjectDrawer, DatasourceCard, SchemaList } from 'components';
import { fetchRequest as requestDatasourceFetch } from 'modules/datasource';
import { fetchRequest as requestSchemaFetch } from 'modules/schema';

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
        height: '100%' as '100%',
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
        position: 'relative' as 'relative',
        display: 'flex',
        width: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.match
    history: PropTypes.historyContext
}

interface State {
    datasourceId: number
}

export class ProjectDatasources extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            datasourceId: 0,
        }
    }

    componentDidMount() {
        const projectId = this.props.match.params.id;
        this.props.actions.fetchDatasources(projectId);
    }

    handleClickDrawerItem = (route: string) => {
        const projectId = this.props.match.params.id;
        this.props.history.push('/' + projectId + route);
    };

    handleSelectDatasource = (datasourceId: number) => {
        this.setState({
            ...this.state,
            datasourceId: datasourceId,
        })
        this.props.actions.fetchSchemas(datasourceId);
    };

    handleMoveToNewDatasource = () => {
        const projectId = this.props.match.params.id;
        this.props.history.push('/' + projectId + '/datasources/new');
    }

    handleSelectSchema = (schemaId: number) => {
        console.log(schemaId);
    }

    // TODO: Header, Drawerはlayouts以下に移動予定
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ProjectDrawer
                    onClickItem={this.handleClickDrawerItem}
                />
                <main className={classes.content}>
                    <div>
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <DatasourceCard
                                datasources={this.props.values.datasource.datasources}
                                onClickListItem={this.handleSelectDatasource}
                                onClickNewButton={this.handleMoveToNewDatasource}
                            />
                        </Grid>
                        <Grid item xs={9}>
                        {(() => {
                            if (this.state.datasourceId === 0) {
                                return (
                                    <div>
                                    </div>
                                )
                            } else {
                                return(
                                    <SchemaList
                                        schemas={this.props.values.schema.schemas}
                                        dense={false}
                                        onClick={this.handleSelectSchema}
                                    />
                                );
                            }
                        })()}
                        </Grid>
                    </Grid>
                    </div>
                </main>
            </div>
        );
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public fetchDatasources(projectId: string) {
        this.dispatch(requestDatasourceFetch(projectId));
    }
    public fetchSchemas(datasourceId: number) {
        this.dispatch(requestSchemaFetch(datasourceId));
    }
}

export default compose(
    withStyles(styles),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(ProjectDatasources)