import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {normalize, getScreenWidth} from 'utils/size';
import {formatCurrency, getRandomInt} from 'utils/number';
import Card from '../card';
import Label from '../text/label';
import FastImage from 'react-native-fast-image';
import {Colors} from 'themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Space from './space';
import {TouchableOpacity} from 'react-native-gesture-handler';

const imageWidth = normalize(100);

const CartItem = props => {
  const {
    item: {image, title, price},
    quantity,
    onAddPress,
    onMinusPress,
    selected,
    onSelect,
    id,
    hideRadioButton,
  } = props;
  const isSelected = hideRadioButton ? false : selected.indexOf(id) > -1;

  return (
    <Card
      roundedCorner={0}
      style={{
        backgroundColor: Colors.white,
        marginBottom: hideRadioButton ? 0 : normalize(15),
        flexDirection: 'row',
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(10),
      }}>
      {!hideRadioButton && (
        <TouchableOpacity
          style={{
            height: imageWidth,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: normalize(8),
          }}
          onPress={onSelect}>
          {isSelected ? (
            <View
              style={{
                width: normalize(20),
                height: normalize(20),
                borderRadius: normalize(20) / 2,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name={'check'}
                size={normalize(15)}
                color={Colors.white}
              />
            </View>
          ) : (
            <View
              style={{
                width: normalize(20),
                height: normalize(20),
                borderWidth: 1,
                borderRadius: normalize(20) / 2,
                borderColor: Colors.gray,
              }}
            />
          )}
        </TouchableOpacity>
      )}
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          borderRadius: normalize(10),
          overflow: 'hidden',
          backgroundColor: Colors.nearWhite,
        }}>
        <FastImage
          source={{uri: image}}
          style={{
            width: imageWidth,
            height: imageWidth,
            borderRadius: normalize(10),
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          paddingHorizontal: normalize(10),
          flex: 1,
          marginVertical: normalize(10),
        }}>
        <Label text={title} numberOfLines={2} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 'auto',
            justifyContent: 'space-between',
          }}>
          <Label
            text={`RM ${formatCurrency(price)}`}
            numberOfLines={2}
            color={hideRadioButton ? 'primaryText' : 'accent'}
            variant="bold"
          />
          {hideRadioButton ? (
            <View>
              <Label text={`Qty: ${quantity}`} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                disabled={quantity === 1}
                onPress={onMinusPress}
                style={{
                  width: normalize(30),
                  height: normalize(25),
                  backgroundColor: Colors.nearWhite,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: normalize(5),
                }}>
                <MaterialIcons
                  name="remove"
                  size={normalize(15)}
                  color={
                    quantity === 1 ? Colors.disabledButton : Colors.primaryText
                  }
                />
              </TouchableOpacity>
              <Label text={`${quantity}`} />
              <TouchableOpacity
                onPress={onAddPress}
                style={{
                  width: normalize(30),
                  height: normalize(25),
                  backgroundColor: Colors.nearWhite,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: normalize(5),
                }}>
                <MaterialIcons
                  name="add"
                  size={normalize(15)}
                  color={Colors.primaryText}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

CartItem.propTypes = {
  style: PropTypes.any,
  roundedCorner: PropTypes.number,
  children: PropTypes.node,
};

CartItem.defaultProps = {
  style: null,
  roundedCorner: normalize(15),
  children: null,
};

export default CartItem;
