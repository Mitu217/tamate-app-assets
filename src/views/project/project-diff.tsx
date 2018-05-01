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
    Grid,
    Card,
    CardHeader,
    CardContent,
    FormControl,
    InputLabel,
    Input,
    MenuItem,
    Select,
    Paper,
} from 'material-ui';
import {
    card,
    cardHeader,
} from 'assets/styles/card';
import { ProjectDrawer, ColumnTable, RowTable } from 'components';
import { fetchRequest as requestDatasourceFetch } from 'modules/datasource';
import { fetchRequest as requestSchemaFetch } from 'modules/schema';
import { diffRequest as requestTableDiff } from 'modules/table';

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
    form: {
        display: 'flex',
        flexFlow: 'column',
    },
});

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.match
    history: PropTypes.historyContext
}

interface State {
    leftDatasourceId: number
    leftSchemaName: string
    rightDatasourceId: number
    rightSchemaName: string
}

export class ProjectDiff extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            leftDatasourceId: 0,
            leftSchemaName: '',
            rightDatasourceId: 0,
            rightSchemaName: '',
        }
    }

    componentDidMount() {
        const projectId = this.props.match.params.id
        this.props.actions.fetchDatasources(projectId);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            if (nextState.leftDatasourceId !== 0
                && nextState.rightDatasourceId !== 0
                && nextState.leftSchemaName !== ''
                && nextState.rightSchemaName !== ''
            ) {
                this.props.actions.diff(nextState.leftDatasourceId, nextState.leftSchemaName, nextState.rightDatasourceId, nextState.rightSchemaName);
            }
        }
    }

    handleClickDrawerItem = (route: string) => {
        const projectId = this.props.match.params.id
        this.props.history.push('/' + projectId + route);
    };

    render() {
        const { classes } = this.props;
        const { datasources } = this.props.values.datasource;
        const { schemas } = this.props.values.schema;
        const { add, mod, del } = this.props.values.table;

        const onChangeLeftDatasource = (e: any) => {
            const datasourceId = e.target.value;
            this.setState({
                ...this.state,
                leftDatasourceId: datasourceId,
            });
            this.props.actions.fetchSchemas(datasourceId);
        }

        const onChangeLeftSchemaName = (e: any) => {
            this.setState({
                ...this.state,
                leftSchemaName: e.target.value,
            });
        }

        const onChangeRightDatasource = (e: any) => {
            const datasourceId = e.target.value;
            this.setState({
                ...this.state,
                rightDatasourceId: datasourceId,
            });
            this.props.actions.fetchSchemas(datasourceId);
        }

        const onChangeRightSchemaName = (e: any) => {
            this.setState({
                ...this.state,
                rightSchemaName: e.target.value,
            });
        }

        return (
            <div className={classes.root}>
                <ProjectDrawer
                    onClickItem={this.handleClickDrawerItem}
                />
                <main className={classes.content}>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <form className={classes.form} autoComplete="off">
                                        <FormControl className={classes.formControl} margin="normal">
                                            <InputLabel shrink>Datasource</InputLabel>
                                            <Select
                                                value={this.state.leftDatasourceId}
                                                onChange={onChangeLeftDatasource.bind(this)}
                                                input={<Input name="datasource" id="datasource" />}
                                                autoWidth
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                {datasources.map(datasource => {
                                                    return(
                                                        <MenuItem value={datasource.id} key={datasource.id}>{datasource.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                        {(() => {
                                            if (this.state.leftDatasourceId !== 0) {
                                                return (
                                                    <FormControl className={classes.formControl} margin="normal">
                                                        <InputLabel shrink>Schema</InputLabel>
                                                        <Select
                                                            value={this.state.leftSchemaName}
                                                            onChange={onChangeLeftSchemaName.bind(this)}
                                                            input={<Input name="schema" id="schema" />}
                                                            autoWidth
                                                        >
                                                            <MenuItem value="">
                                                            <em>None</em>
                                                            </MenuItem>
                                                            {schemas.map(schema => {
                                                                return(
                                                                    <MenuItem value={schema.name} key={schema.name}>{schema.name}</MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                );
                                            }
                                        })()}
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <form className={classes.form} autoComplete="off">
                                        <FormControl className={classes.formControl} margin="normal">
                                            <InputLabel shrink>Datasource</InputLabel>
                                            <Select
                                                value={this.state.rightDatasourceId}
                                                onChange={onChangeRightDatasource.bind(this)}
                                                input={<Input name="datasource" id="datasource" />}
                                                autoWidth
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                {datasources.map(datasource => {
                                                    return(
                                                        <MenuItem value={datasource.id} key={datasource.id}>{datasource.name}</MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                        {(() => {
                                            if (this.state.rightDatasourceId !== 0) {
                                                return (
                                                    <FormControl className={classes.formControl} margin="normal">
                                                        <InputLabel shrink>Schema</InputLabel>
                                                        <Select
                                                            value={this.state.rightSchemaName}
                                                            onChange={onChangeRightSchemaName.bind(this)}
                                                            input={<Input name="schema" id="schema" />}
                                                            autoWidth
                                                        >
                                                            <MenuItem value="">
                                                            <em>None</em>
                                                            </MenuItem>
                                                            {schemas.map(schema => {
                                                                return(
                                                                    <MenuItem value={schema.name} key={schema.name}>{schema.name}</MenuItem>
                                                                );
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                );
                                            }
                                        })()}
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>

                        {(() => {
                            if (add.Values.length > 0) {
                                const schema = schemas.find(schema => {
                                    return schema.name === this.state.leftSchemaName;
                                });
                                return (
                                    <Grid item xs={12}>
                                        <Paper>
                                            <RowTable
                                                columns={schema.columns}
                                                rows={add}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            }
                        })()}

                        {(() => {
                            if (mod.Values.length > 0) {
                                const schema = schemas.find(schema => {
                                    return schema.name === this.state.leftSchemaName;
                                });
                                return (
                                    <Grid item xs={12}>
                                        <Paper>
                                            <RowTable
                                                columns={schema.columns}
                                                rows={mod}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            }
                        })()}

                        {(() => {
                            if (del.Values.length > 0) {
                                const schema = schemas.find(schema => {
                                    return schema.name === this.state.leftSchemaName;
                                });
                                return (
                                    <Grid item xs={12}>
                                        <Paper>
                                            <RowTable
                                                columns={schema.columns}
                                                rows={del}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            }
                        })()}

                    </Grid>
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
    public diff(leftDatasourceId: number, leftSchemaName: string, rightDatasourceId: number, rightSchemaName: string) {
        this.dispatch(requestTableDiff(leftDatasourceId, leftSchemaName, rightDatasourceId, rightSchemaName));
    }
}

export default compose(
    withStyles(styles),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(ProjectDiff)