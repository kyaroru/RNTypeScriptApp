import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {text, object, number, boolean} from '@storybook/addon-knobs';
import {RoundIcon, Label, Space} from 'components';
import {View} from 'react-native';
import {normalize} from 'utils/size';
import {Colors} from 'themes';

storiesOf('RoundIcon', module)
  .addDecorator(getStory => (
    <View style={{flex: 1, padding: normalize(10)}}>
      <Label text="RoundIcon" color="white" size="l" align="center" />
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
  .add('with name', () => (
    <>
      <RoundIcon name={text('RoundIcon1 - name', 'account-balance-wallet')} />
      <Space />
      <RoundIcon name={text('RoundIcon2 - name', 'settings')} />
      <Space />
      <RoundIcon name={text('RoundIcon3 - name', 'search')} />
      <Space />
      <RoundIcon name={text('RoundIcon4 - name', 'delete')} />
    </>
  ))
  .add('with size', () => (
    <>
      <RoundIcon
        name={text('RoundIcon1 - name', 'account-balance-wallet')}
        size={text('RoundIcon1 - size', 'mini')}
      />
      <Space />
      <RoundIcon
        name={text('RoundIcon2 - name', 'settings')}
        size={text('RoundIcon2 - size', 'small')}
      />
      <Space />
      <RoundIcon
        name={text('RoundIcon3 - name', 'search')}
        size={text('RoundIcon3 - size', 'medium')}
      />
      <Space />
      <RoundIcon
        name={text('RoundIcon4 - name', 'delete')}
        size={text('RoundIcon4 - size', 'big')}
      />
    </>
  ))
  .add('with iconColor', () => (
    <>
      <RoundIcon
        name={text('RoundIcon1 - name', 'account-balance-wallet')}
        iconColor={text('RoundIcon1 - iconColor', Colors.icon1)}
      />
      <Space />
      <RoundIcon
        name={text('RoundIcon2 - name', 'settings')}
        iconColor={text('RoundIcon2 - iconColor', Colors.icon3)}
      />
      <Space />
      <RoundIcon
        name={text('RoundIcon3 - name', 'search')}
        iconColor={text('RoundIcon3 - iconColor', Colors.icon5)}
      />
      <Space />
      <RoundIcon
        name={text('RoundIcon4 - name', 'delete')}
        iconColor={text('RoundIcon4 - iconColor', Colors.icon7)}
      />
    </>
  ));
