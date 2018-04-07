import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';

import ConfigList from 'components/config/list';
import {
    fetchRequire as fetchConfigsRequire,
    createRequire as createConfigRequire,
    Config,
} from 'modules/config'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

interface State {
    projectId: number
}

export class ConfigRoot extends React.Component<Props, State> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            projectId: this.props.match.params.projectId,
        };
    }

    componentDidMount() {
        this.props.actions.fetchConfigs(this.state.projectId);
    }

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    submitUpdateOrCreateConfig = ( config: Config) => {
        this.props.actions.updateOrCreateConfig(this.state.projectId, config);
    }

    submitDeleteConfig = (id: number) => {
        this.props.actions.deleteConfig(id);
    }

    render() {
        const configs = this.props.values.config.configs;

        return (
            <ConfigList
                config={configs}
                onSubmitCreate={this.submitUpdateOrCreateConfig}
                onSubmitDelete={this.submitDeleteConfig}
                onSubmitUpdate={this.submitUpdateOrCreateConfig}
            />
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
    public fetchConfigs(projectId: number) {
        this.dispatch(fetchConfigsRequire(projectId));
    }
    public deleteConfig(id: number) {
        //this.dispatch(deleteProjectRequire(id));
    }
    public updateOrCreateConfig(projectId: number, config: Config) {
        if (config.id) {
            //this.dispatch(createConfigRequire(config))
        } else {
            this.dispatch(createConfigRequire(projectId, config))
        }
    }
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(ConfigRoot)
