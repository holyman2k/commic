require("jquery");
require('bootstrap');
require('./css/main.less');

import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'

render(<App />, document.getElementById('app'));