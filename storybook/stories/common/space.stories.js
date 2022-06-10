import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {text, object, number, boolean} from '@storybook/addon-knobs';
import {Space, Label} from 'components';
import {View} from 'react-native';
import {normalize} from 'utils/size';
import {Colors} from 'themes';

storiesOf('Space', module)
  .addDecorator(getStory => (
    <View style={{flex: 1, padding: normalize(10)}}>
      <Label text="Space" color="white" size="l" align="center" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        {getStory()}
      </View>
    </View>
  ))
  .add('with vertical', () => (
    <>
      <View style={{borderWidth: 1}}>
        <Label text={'Label above space'} />
        <Space vertical={number('Space1 - vertical', normalize(50))} />
        <Label text={'Label below space'} />
      </View>
      <Space />
      <View style={{borderWidth: 1}}>
        <Label text={'Label above space'} />
        <Space vertical={number('Space2 - vertical', normalize(100))} />
        <Label text={'Label below space'} />
      </View>
    </>
  ))
  .add('with horizontal', () => (
    <>
      <View style={{flexDirection: 'row', borderWidth: 1}}>
        <Label text={'Label before space'} />
        <Space horizontal={number('Space1 - horizontal', normalize(100))} />
        <Label text={'Label after space'} />
      </View>
      <Space />
      <View style={{flexDirection: 'row', borderWidth: 1}}>
        <Label text={'Label before space'} />
        <Space horizontal={number('Space2 - horizontal', normalize(80))} />
        <Label text={'Label after space'} />
      </View>
      <Space />
      <View style={{flexDirection: 'row', borderWidth: 1}}>
        <Label text={'Label before space'} />
        <Space horizontal={number('Space3 - horizontal', normalize(120))} />
        <Label text={'Label after space'} />
      </View>
    </>
  ))
  .add('with backgroundColor', () => (
    <>
      <View style={{borderWidth: 1, width: '100%'}}>
        <Label text={'Label above space'} align="center" />
        <Space
          vertical={number('Space1 - vertical', normalize(50))}
          backgroundColor={text('Space1 - backgroundColor', Colors.primary)}
        />
        <Label text={'Label below space'} align="center" />
      </View>
      <Space />
      <View style={{borderWidth: 1, width: '100%'}}>
        <Label text={'Label above space'} align="center" />
        <Space
          vertical={number('Space2 - vertical', normalize(100))}
          backgroundColor={text('Space2 - backgroundColor', Colors.accent)}
        />
        <Label text={'Label below space'} align="center" />
      </View>
    </>
  ));
