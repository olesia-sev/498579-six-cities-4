import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer/reducer';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {createAPI} from './api';
import {App} from './components/app/app.jsx';

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
