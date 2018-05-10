import * as React from 'react';
import { compose } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, StyledComponentProps } from 'material-ui/styles';
import { ReduxState, ReduxAction } from 'store';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from 'components'
import routes from 'routes';

interface Props extends StyledComponentProps {
    values: ReduxState
    actions: ActionDispatcher
    history: PropTypes.historyContext
}

const styles = theme => ({
    root: {
        width: '100vw',
    },
    contentRoot: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh'
    },
    content: {
        flex: 1,
    },
    toolbar: theme.mixins.toolbar, // for content margin
});

export class App extends React.Component<Props, {}> {
    
    render() {
        const { classes, history } = this.props;

        const onClickTitle = () => {
            history.push('/');
        }

        return (
            <div className={classes.root}>
                <Header
                    title={"Tamate"}
                    onClickTitle={onClickTitle}
                />
                <div className={classes.contentRoot}>
                    <div className={classes.toolbar} />
                    <div className={classes.content}>
                        <Switch>
                            {routes.map((route) => {
                                return (
                                    <Route exact path={route.path} component={route.component} key={route.path} />
                                );
                            })}
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(
        (state: ReduxState) => ({values: state}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(App)