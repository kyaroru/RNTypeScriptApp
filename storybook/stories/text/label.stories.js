import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {text, object, number, boolean} from '@storybook/addon-knobs';
import {Button, Label} from 'components';
import {View} from 'react-native';
import {normalize} from 'utils/size';

storiesOf('Label', module)
  .addDecorator(getStory => (
    <View style={{flex: 1, padding: normalize(10)}}>
      <Label text="Label" color="white" size="l" align="center" />
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
  .add('with text', () => (
    <>
      <Label text={text('Label1 - text', 'Label with text 1')} />
      <Label text={text('Label2 - text', 'Label with text 2')} />
      <Label text={text('Label3 - text', 'Label with text 3')} />
      <Label text={text('Label4 - text', 'Label with text 4')} />
    </>
  ))
  .add('with size', () => (
    <>
      <Label
        text={text('Label - text', 'Label with size - xxs')}
        size={text('Label - size', 'xxs')}
      />
      <Label
        text={text('Label1 - text', 'Label with size - xs')}
        size={text('Label1 - size', 'xs')}
      />
      <Label
        text={text('Label2 - text', 'Label with size - s')}
        size={text('Label2 - size', 's')}
      />
      <Label
        text={text('Label3 - text', 'Label with size - m')}
        size={text('Label3 - size', 'm')}
      />
      <Label
        text={text('Label4 - text', 'Label with size - ml')}
        size={text('Label4 - size', 'ml')}
      />
      <Label
        text={text('Label5 - text', 'Label with size - l')}
        size={text('Label5 - size', 'l')}
      />
      <Label
        text={text('Label6 - text', 'Label with size - xl')}
        size={text('Label6 - size', 'xl')}
      />
      <Label
        text={text('Label7 - text', 'Label with size - xxl')}
        size={text('Label7 - size', 'xxl')}
      />
      <Label
        text={text('Label8 - text', 'Label with size - xxxl')}
        size={text('Label8 - size', 'xxxl')}
      />
    </>
  ))
  .add('with color', () => (
    <>
      <Label
        text={text('Label1 - text', 'Label - Primary')}
        color={text('Label1 - color', 'primary')}
      />
      <Label
        text={text('Label2 - text', 'Label - Accent')}
        color={text('Label2 - color', 'accent')}
      />
      <Label
        text={text('Label3 - text', 'Label - Divider')}
        color={text('Label3 - color', 'divider')}
      />
      <Label
        text={text('Label4 - text', 'Label - disabled')}
        color={text('Label4 - color', 'disabledButton')}
      />
    </>
  ))
  .add('with variant', () => (
    <>
      <Label
        text={text('Label1 - text', 'Label with variant - Light')}
        variant={text('Label1 - variant', 'light')}
      />
      <Label
        text={text('Label2 - text', 'Label with variant - Regular')}
        variant={text('Label2 - variant', 'regular')}
      />
      <Label
        text={text('Label3 - text', 'Label with variant - Bold')}
        variant={text('Label3 - variant', 'bold')}
      />
    </>
  ));
