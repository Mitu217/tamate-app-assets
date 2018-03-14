import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {createStore} from 'store';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import bluegrey from 'material-ui/colors/bluegrey';

import Root from 'components/root';

const theme = createMuiTheme({
    palette: createPalette({
        primary: bluegrey,
        error: bluegrey,
    }),
});

class Application extends React.Component {
    render() {
        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(applyMiddleware(
            sagaMiddleware
        ))
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Root />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Application />,
    document.querySelector('.app')
);