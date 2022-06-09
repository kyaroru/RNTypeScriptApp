import React, { FC } from 'react';
import { View } from 'react-native';
import { normalize, getScreenWidth } from 'utils/size';
import { formatCurrency, getRandomInt } from 'utils/number';
import Card from '../card';
import Label from '../text/label';
import FastImage from 'react-native-fast-image';
import { Colors } from 'themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Space from './space';
import { Rating } from 'utils/types';

const imageWidth: number = (getScreenWidth() - normalize(32) - normalize(15)) / 2;

interface Item {
  image?: string;
  title?: string;
  price?: number;
  discount?: string;
  freeShipping?: boolean;
  rating?: Rating;
};

interface ListItemProps {
  item: Item;
  onPress?: () => void;
  index?: number;
};

const ListItem: FC<ListItemProps> = props => {
  const {
    item: {
      image,
      title,
      price,
      discount,
      freeShipping,
      rating,
    },
    onPress,
    index,
  } = props;
  return (
    <Card
      roundedCorner={normalize(15)}
      onPress={onPress}
      style={{
        backgroundColor: Colors.white,
        marginRight: typeof index !== 'undefined' ? index % 2 === 0 ? normalize(15) : 0 : 0,
        marginBottom: normalize(15),
        overflow: 'hidden',
      }}>
      <FastImage
        source={{ uri: image }}
        style={{ width: '100%', height: imageWidth }}
      />
      <View
        style={{
          paddingHorizontal: normalize(10),
          marginVertical: normalize(10),
        }}>
        {title && <Label text={title} numberOfLines={2} />}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Label
            text={`RM ${formatCurrency(price)}`}
            numberOfLines={2}
            color="accent"
            variant="bold"
          />
          <View
            style={{
              backgroundColor: Colors.discountTag,
              marginLeft: normalize(5),
            }}>
            <Label
              text={discount || `-${getRandomInt(10, 50)}%`}
              numberOfLines={2}
              color="accent"
              variant="bold"
              size="xs"
            />
          </View>
        </View>
        {freeShipping ||
          (getRandomInt(0, 2) === 1 && (
            <View>
              <MaterialIcons
                size={normalize(20)}
                name="local-shipping"
                color={Colors.icon16}
              />
            </View>
          ))}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons
            size={normalize(15)}
            name="star"
            color={Colors.icon6}
          />
          <Label size="s" text={`${rating?.rate}`} />
          <Space horizontal={normalize(3)} />
          <Label size="s" text={`(${rating?.count})`} color="secondaryText" />
          <Space horizontal={normalize(3)} />
          <Label size="xs" text={'•'} color="secondaryText" />
          <Space horizontal={normalize(3)} />

          <Label
            size="s"
            text={`${getRandomInt()} Sold`}
            color="secondaryText"
          />
        </View>
      </View>
    </Card>
  );
};

export default ListItem;
