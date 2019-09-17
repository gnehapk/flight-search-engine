import 'bpk-stylesheets';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/App';

// setting the baseUrl for all the API calls
axios.defaults.baseURL = 'http://localhost:4000/';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
