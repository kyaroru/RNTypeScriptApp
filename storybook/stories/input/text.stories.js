import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {text, object, number, boolean} from '@storybook/addon-knobs';
import {TextInput, Label, Space, Button} from 'components';
import {View} from 'react-native';
import {normalize} from 'utils/size';
import {alertWithTitle} from 'utils/alert';

storiesOf('TextInput', module)
  .addDecorator(getStory => (
    <View style={{flex: 1, padding: normalize(10)}}>
      <Label text="TextInput" color="white" size="l" align="center" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        {getStory()}
      </View>
    </View>
  ))
  .add('with placeholder', () => (
    <>
      <TextInput
        inputStyle={object('TextInput1 - inputStyle', {
          paddingHorizontal: normalize(10),
        })}
        placeholder={text('TextInput1 - placeholder', 'TextInput with label 1')}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text('TextInput2 - placeholder', 'TextInput with label 2')}
        inputStyle={object('TextInput2 - inputStyle', {
          paddingHorizontal: normalize(10),
        })}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text('TextInput3 - placeholder', 'TextInput with label 3')}
        inputStyle={object('TextInput3 - inputStyle', {
          paddingHorizontal: normalize(10),
        })}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text('TextInput4 - placeholder', 'TextInput with label 4')}
        inputStyle={object('TextInput4 - inputStyle', {
          paddingHorizontal: normalize(10),
        })}
      />
    </>
  ))
  .add('with iconLeft', () => (
    <>
      <TextInput
        placeholder={text(
          'TextInput1 - placeholder',
          'TextInput with iconLeft 1',
        )}
        iconLeft={text('TextInput1 - iconLeft', 'search')}
        inputStyle={object('TextInput1 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text(
          'TextInput2 - placeholder',
          'TextInput with iconLeft 2',
        )}
        iconLeft={text('TextInput2 - iconLeft', 'add')}
        inputStyle={object('TextInput2 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text(
          'TextInput3 - placeholder',
          'TextInput with iconLeft 3',
        )}
        iconLeft={text('TextInput3 - iconLeft', 'email')}
        inputStyle={object('TextInput3 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text(
          'TextInput4 - placeholder',
          'TextInput with iconLeft 4',
        )}
        iconLeft={text('TextInput4 - iconLeft', 'settings')}
        inputStyle={object('TextInput4 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
      />
    </>
  ))
  .add('with itemRight', () => (
    <>
      <TextInput
        placeholder={text(
          'TextInput1 - placeholder',
          'TextInput with itemRight 1',
        )}
        inputStyle={object('TextInput1 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
        itemRight={<Button mini text="Buy" color="icon1" />}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text(
          'TextInput2 - placeholder',
          'TextInput with itemRight 2',
        )}
        inputStyle={object('TextInput2 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
        itemRight={<Button mini text="Add" color="icon3" />}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text(
          'TextInput3 - placeholder',
          'TextInput with itemRight 3',
        )}
        inputStyle={object('TextInput3 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
        itemRight={<Button mini text="Submit" color="icon5" />}
      />
      <Space vertical={normalize(10)} />
      <TextInput
        placeholder={text(
          'TextInput4 - placeholder',
          'TextInput with itemRight 4',
        )}
        inputStyle={object('TextInput4 - inputStyle', {
          paddingHorizontal: normalize(5),
        })}
        itemRight={<Button mini text="Search" color="icon7" />}
      />
    </>
  ));
