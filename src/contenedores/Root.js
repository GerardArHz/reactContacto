import React, { Component } from 'react'; 
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '../App';

class Root extends Component {
  render() {

    const { store } = this.props;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
