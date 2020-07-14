import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {reducer} from './reducer';
import {Provider} from 'react-redux';
import {App} from './components/app/app.jsx';

const store = createStore(reducer);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />,
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
