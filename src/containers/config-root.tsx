import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';

import ConfigList from 'components/config/list';
import {
    Config,
} from 'modules/config'

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

export class ConfigRoot extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.actions.fetchAllConfigs()
    }

    handleChangeLocation = (uri: string) => {
        this.props.history.push(uri);
    };

    submitUpdateOrCreateConfig = (config: Config) => {
        this.props.actions.updateOrCreateConfig(config);
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
    public fetchAllConfigs() {
        //this.dispatch(fetchProjectsRequire([]));
    }
    public deleteConfig(id: number) {
        //this.dispatch(deleteProjectRequire(id));
    }
    public updateOrCreateConfig(config: Config) {
        //this.dispatch(updateProjectRequire(project))
    }
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(ConfigRoot)
