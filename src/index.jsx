import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class FlixrApp extends React.Component {
    render() {
        return (
            <div className="flixr">
                <div>How's the Weather Up There?</div>
            </div>
        );
    };
};

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(FlixrApp), container);