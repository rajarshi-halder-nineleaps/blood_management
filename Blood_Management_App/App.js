import React from 'react';
import Config from './src/config';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Config />
      </PaperProvider>
    </Provider>
  );
};

export default App;
