import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {text, object, number, boolean} from '@storybook/addon-knobs';
import {Button} from 'components';
import {View} from 'react-native';

storiesOf('Button', module)
  .addDecorator(getStory => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      }}>
      {getStory()}
    </View>
  ))
  .add('with label', () => (
    <>
      <Button text={text('button1 - text', 'Button with label 1')} />
      <Button text={text('button2 - text', 'Button with label 2')} />
      <Button text={text('button3 - text', 'Button with label 3')} />
      <Button text={text('button4 - text', 'Button with label 4')} />
    </>
  ))
  .add('with color', () => (
    <>
      <Button
        text={text('button1 - text', 'Button - Primary')}
        color="primary"
      />
      <Button text={text('button2 - text', 'Button - Accent')} color="accent" />
      <Button
        text={text('button3 - text', 'Button - Divider')}
        color="divider"
      />
      <Button
        text={text('button4 - text', 'Button - disabled')}
        color="disabledButton"
      />
    </>
  ));
