import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { Colors, ColorType } from 'themes';
import { normalize } from 'utils/size';
import Label from '../text/label';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FontSize } from 'utils/types';

interface RoundIconProps {
  onPress?: () => void;
  text?: string;
  name: string;
  size?: 'mini' | 'small' | 'medium' | 'big';
  textSize?: FontSize;
  textColor?: ColorType;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  iconColor?: ColorType;
  iconComponent?: any;
}

type ConditionalViewType = any; // Carol - not sure how to declare the dynamic type here
type ConditionalIconType = any; // Carol - not sure how to declare the dynamic type here

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

const RoundIcon: FC<RoundIconProps> = ({
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
  const ConditionalView: ConditionalViewType = onPress ? TouchableOpacity : View;
  const containerSize: number = size ? sizes[size].container : sizes['medium'].container;
  const iconSize: number = size ? sizes[size].icon : sizes['medium'].icon;
  const Icon: ConditionalIconType = iconComponent || MaterialIcons;


  return (
    <ConditionalView
      onPress={onPress}
      style={[styles.container, { width: containerSize }, containerStyle]}>
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
      {typeof text !== 'undefined' && text !== null && (
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

export default RoundIcon;
