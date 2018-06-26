import React from 'react';
import ReactDOM from 'react-dom';
import { sortBy } from 'lodash';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( < App / > , document.getElementById('root'));



registerServiceWorker();

if (module.hot) {
    module.hot.accept();
}