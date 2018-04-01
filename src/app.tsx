import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {createBrowserHistory} from 'history'

import {createStore} from 'store'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import bluegrey from 'material-ui/colors/bluegrey';

import Root from 'components/root';

const theme = createMuiTheme({
    palette: createPalette({
        primary: bluegrey,
        error: bluegrey,
    }),
});

const history = createBrowserHistory();

class Application extends React.Component {
    render() {
        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(
            // sagaMiddleware: redix-saga
            // TODO: ページ遷移と同時にAPIを発火するMiddlewareも作れるらしい
            applyMiddleware(sagaMiddleware),
        )
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
    <Application />,
    document.querySelector('.app')
);