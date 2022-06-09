import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from 'navigator/app';
import configureStore from 'store/configureStore';
import StorybookUIRoot from '../storybook';
import {View} from 'react-native';

const isStorybookOn = false; // change to true to toggle on storybook

const App = () => {
  const {store} = configureStore();
  const ConditionalView = isStorybookOn ? StorybookUIRoot : View;
  return (
    <ConditionalView style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ConditionalView>
  );
};

export default App;
