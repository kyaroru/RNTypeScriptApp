import React from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {text, object, number, boolean} from '@storybook/addon-knobs';
import {Label, Card, Space} from 'components';
import {View, Image} from 'react-native';
import {normalize} from 'utils/size';

storiesOf('Card', module)
  .addDecorator(getStory => (
    <View style={{flex: 1, padding: normalize(10)}}>
      <Label text="Card" color="white" size="l" align="center" />
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
  .add('with label', () => (
    <>
      <Card
        style={object('Card1 - style', {
          padding: normalize(10),
        })}>
        <Label text={text('Card1 - text', 'Card with label 1')} />
      </Card>
      <Space vertical={normalize(10)} />
      <Card
        style={object('Card2 - style', {
          padding: normalize(10),
        })}>
        <Label text={text('Card2 - text', 'Card with label 2')} />
      </Card>
      <Space vertical={normalize(10)} />
      <Card
        style={object('Card3 - style', {
          padding: normalize(10),
        })}>
        <Label
          text={text('Card3 - text', 'Card with label 3 long long long text')}
        />
      </Card>
    </>
  ))
  .add('with roundedCorner', () => (
    <>
      <Card
        roundedCorner={number('Card1 - roundedCorner', normalize(5))}
        style={object('Card1 - style', {
          padding: normalize(10),
        })}>
        <Label text={text('Card1 - text', 'Rounded Corner: 5')} />
      </Card>
      <Space vertical={normalize(10)} />
      <Card
        roundedCorner={number('Card2 - roundedCorner', normalize(10))}
        style={object('Card2 - style', {
          padding: normalize(10),
        })}>
        <Label text={text('Card2 - text', 'Rounded Corner: 10')} />
      </Card>
      <Space vertical={normalize(10)} />
      <Card
        roundedCorner={number('Card3 - roundedCorner', normalize(15))}
        style={object('Card3 - style', {
          padding: normalize(10),
        })}>
        <Label text={text('Card3 - text', 'Rounded Corner: 15')} />
      </Card>
      <Space vertical={normalize(10)} />
      <Card
        roundedCorner={number('Card4 - roundedCorner', normalize(20))}
        style={object('Card4 - style', {
          padding: normalize(10),
        })}>
        <Label text={text('Card4 - text', 'Rounded Corner: 20')} />
      </Card>
    </>
  ))
  .add('with multi element', () => (
    <>
      <Card
        style={object('Card1 - style', {
          width: normalize(250),
          overflow: 'hidden',
        })}>
        <Image
          style={{width: '100%', height: 200, roundedCorner: normalize(15)}}
          resizeMode="cover"
          source={object('Card1 - image', {
            uri: 'https://source.unsplash.com/1024x768/?bear',
          })}
        />
        <Label
          text={text('Card1 - text', 'Card 1 with image')}
          align="center"
        />
      </Card>
      <Space vertical={normalize(10)} />
      <Card
        style={object('Card2 - style', {
          width: normalize(250),
          overflow: 'hidden',
        })}>
        <Image
          style={{width: '100%', height: 200, roundedCorner: normalize(15)}}
          resizeMode="cover"
          source={object('Card2 - image', {
            uri: 'https://source.unsplash.com/1024x768/?deer',
          })}
        />
        <Label
          text={text('Card2 - text', 'Card 2 with image')}
          align="center"
        />
      </Card>
    </>
  ));
