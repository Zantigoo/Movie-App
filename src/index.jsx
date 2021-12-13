import React from 'react';
import Container from 'react-bootstrap/Container';
import ReactDOM from 'react-dom';

//Component Import
import MainView from './components/main-view/main-view';


//CSS Import
import './index.scss';

class FlixrApp extends React.Component {
    render() {
        return (
          <Container>
            <MainView />
          </Container>
        );
      }
};

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(FlixrApp), container);

