import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {createBrowserHistory} from 'history';

import {createStore} from 'store';
import Saga from 'saga';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import bluegrey from 'material-ui/colors/bluegrey';

import Root from 'containers/root';

const theme = createMuiTheme({
    palette: createPalette({
        primary: bluegrey,
        error: bluegrey,
    }),
});

const history = createBrowserHistory();

class Index extends React.Component {
    render() {
        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(
            applyMiddleware(sagaMiddleware),
        )
        sagaMiddleware.run(Saga);
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route path='/' component={Root} />
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.querySelector('.app')
);