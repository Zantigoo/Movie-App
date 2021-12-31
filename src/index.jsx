import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

const store = createStore(moviesApp, devToolsEnhancer());

//CSS Import
import './index.scss';

class FlixrApp extends React.Component {
    render() {
        return (
          <Provider store={store}>
              <MainView />
          </Provider>
        );
      }
};

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(FlixrApp), container);

