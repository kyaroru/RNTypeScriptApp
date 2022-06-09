import React from 'react';
import {Platform} from 'react-native';
import Wrapper from './stories/wrapper';
import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';
import './rn-addons';

//wrap all stories in wrapper
addDecorator(getStory => <Wrapper>{getStory()}</Wrapper>);

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  host: Platform.OS === 'android' ? '10.0.2.2' : '0.0.0.0',
  asyncStorage: require('@react-native-community/async-storage').default,
});
// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
// AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
