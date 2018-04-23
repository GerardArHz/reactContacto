import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './contenedores/Root';
import configureStore from './store/configureStore';

import 'bootstrap/dist/css/bootstrap.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#233d7b',
    disabledColor: '#757575'
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Root store={store}/>
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
