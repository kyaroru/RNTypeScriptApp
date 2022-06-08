import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, StyleSheet} from 'react-native';
import {Colors} from 'themes';
import {normalize, getScreenWidth} from 'utils/size';
import Card from '../card';
import Label from '../text/label';
import Space from './space';
import FastImage from 'react-native-fast-image';

const FeaturedItems = props => {
  const {title, items, type, onPress} = props;
  const imageWidth = (getScreenWidth() - normalize(32) - normalize(40)) / 3;
  return (
    <Card style={styles.card} roundedCorner={normalize(15)} onPress={onPress}>
      <View style={{marginHorizontal: normalize(10)}}>
        <Label text={title} variant="bold" />
      </View>
      <Space vertical={normalize(10)} />
      <View style={{flexDirection: 'row'}}>
        {items.map(i => (
          <View style={{marginLeft: normalize(10)}} key={i.id}>
            <FastImage
              source={{uri: i.image}}
              style={{
                width: imageWidth,
                height: imageWidth,
                borderRadius: normalize(10),
              }}
            />
            <Space vertical={normalize(10)} />
            {type === 'sales' && (
              <View>
                <Label text={i.price} color="accent" variant="bold" />
                <Label
                  text={i.originalPrice}
                  style={{textDecorationLine: 'line-through'}}
                  size="s"
                  color="gray"
                />
              </View>
            )}
            {type === 'ranking' && (
              <View>
                <Label
                  text={i.rank}
                  color="icon6"
                  variant="bold"
                  size="ml"
                  align="center"
                />
                <Label
                  text={i.sold}
                  color="icon6"
                  variant="bold"
                  align="center"
                />
                <Label text={i.category} size="s" color="gray" align="center" />
              </View>
            )}
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingVertical: normalize(10),
  },
});

FeaturedItems.propTypes = {
  icons: PropTypes.array,
};

FeaturedItems.defaultProps = {
  icons: [],
};

export default FeaturedItems;
