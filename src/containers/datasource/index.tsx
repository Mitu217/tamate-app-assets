import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';
import DatasourceList from 'components/datasource/list';
import DatasourceShow from 'components/datasource/show';
interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

export class Datasource extends React.Component<Props, {}> {

    handleChangeLocation = (configId: number) => {
        const projectId = this.props.match.params.projectId;
        const uri = (projectId ? '/projects/' + projectId : '') + '/datasources/' + configId;
        this.props.history.push(uri);
    };

    render() {
        const datasources = this.props.values.datasource.datasources;
        
        const matchDatasourceId = this.props.match.params.id
        if (matchDatasourceId) {
            const datasource = datasources.find(datasource => {
                return datasource.id == matchDatasourceId;
            })
            return (
                <DatasourceShow datasource={datasource} />
            )
        }

        // configではなく対応するschemaを渡すのが正しいはず
        const configs = this.props.values.config.configs;
        return (
            <DatasourceList configs={configs} onClickItem={this.handleChangeLocation}/>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(Datasource)
