import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import registerServiceWorker from './registerServiceWorker';

import Router from './routes';
import store, {history} from './store';

import './styles/index.css';

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router />
        </ConnectedRouter>
    </Provider>,
    target
);

registerServiceWorker();
