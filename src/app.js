import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from 'navigator/app';
import configureStore from 'store/configureStore';

const App = () => {
  const {store} = configureStore();
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
