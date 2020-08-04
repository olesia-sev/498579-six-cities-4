import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer/reducer';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {ActionCreator, Operation as DataOperation} from "./reducer/data/data";
import {createAPI} from './api';
import {App} from './components/app/app.jsx';

/* const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};*/

const onLoadOffers = () => {
  store.dispatch(ActionCreator.setActiveCity());
};

const api = createAPI(onLoadOffers);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const init = () => {
  store.dispatch(DataOperation.loadOffers())
    .then(() => {
      ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.querySelector(`#root`)
      );
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`[APP ERROR]`, error.message);
    });
};

init();
