import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
require('./sass.scss');
if (process.env.BROWSER) {
  require('./sass.scss');
}

ReactDOM.render(<App />, document.getElementById('app'));
