import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReduxState, ReduxAction} from 'store';
import SchemaList from 'components/schema/list';
import SchemaShow from 'components/schema/show';

interface Props {
    values: ReduxState
    actions: ActionDispatcher
    match: PropTypes.matchContext
    history: PropTypes.historyContext
}

export class Schema extends React.Component<Props, {}> {

    handleClickSchemaItem = (id: number) => {
        const projectId = this.props.match.params.projectId;
        const uri = (projectId ? '/projects/' + projectId : '') + '/schemas/' + id;
        this.props.history.push(uri);
    }

    render() {
        const schemas = this.props.values.schema.schemas

        const matchSchemaId = this.props.match.params.id
        if (matchSchemaId) {
            const schema = schemas.find(schema => {
                return schema.id == matchSchemaId;
            })
            return (
                <SchemaShow schema={schema}/>
            )
        }

        return (
            <SchemaList schemas={schemas} onClickItem={this.handleClickSchemaItem}/>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default connect(
    (state: ReduxState) => ({values: state}),
    (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
)(Schema)
