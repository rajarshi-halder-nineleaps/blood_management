import React from 'react';
import Config from './src/config';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Config />
    </Provider>
  );
};

export default App;
