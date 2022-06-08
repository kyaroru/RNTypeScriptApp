import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {Colors} from 'themes';
import {normalize} from 'utils/size';
import Label from '../text/label';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const sizes = {
  mini: {
    container: normalize(18),
    icon: normalize(9),
  },
  small: {
    container: normalize(40),
    icon: normalize(20),
  },
  medium: {
    container: normalize(50),
    icon: normalize(35),
  },
  big: {
    container: normalize(60),
    icon: normalize(40),
  },
};

const RoundIcon = ({
  onPress,
  text,
  name,
  size,
  textSize,
  textColor,
  containerStyle,
  iconStyle,
  iconColor,
  iconComponent,
}) => {
  const ConditionalView = onPress ? TouchableOpacity : View;
  const containerSize = sizes[size].container;
  const iconSize = sizes[size].icon;
  const Icon = iconComponent || MaterialIcons;

  return (
    <ConditionalView
      onPress={onPress}
      style={[styles.container, {width: containerSize}, containerStyle]}>
      <View
        style={[
          styles.icon,
          {
            backgroundColor: Colors.white,
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
          },
          iconStyle,
        ]}>
        <Icon name={name} size={iconSize} color={iconColor} />
      </View>
      {text !== null && (
        <Label
          style={styles.text}
          size={textSize}
          text={text}
          color={textColor}
        />
      )}
    </ConditionalView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: normalize(5),
  },
});

RoundIcon.propTypes = {
  elevation: PropTypes.number,
  onPress: PropTypes.func,
  data: PropTypes.object,
  selected: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,
  textSize: PropTypes.oneOf([
    'xxxl',
    'xxl',
    'xl',
    'l',
    'ml',
    'm',
    's',
    'xs',
    'xxs',
  ]),
  size: PropTypes.string,
  containerStyle: PropTypes.any,
  iconComponent: PropTypes.any,
};

RoundIcon.defaultProps = {
  elevation: 5,
  data: null,
  onPress: null,
  selected: false,
  name: 'help',
  text: null,
  textSize: 'xs',
  textColor: null,
  size: 'medium',
  containerStyle: null,
  iconComponent: null,
};

export default RoundIcon;
