import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Label from '../text/label';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { normalize } from 'utils/size';
import { Colors, ColorType } from 'themes';
import { FontSize, FontVariant } from 'utils/types';

interface NavBarProps {
  iconComponent?: any;
  withBorder?: boolean;
  iconLeft?: string;
  iconSize?: number;
  iconLeftColor?: string;
  iconColor?: string;
  onLeftIconPress?: () => void;
  title: string;
  titleSize?: FontSize;
  titleVariant?: FontVariant;
  titleColor?: ColorType;
  iconRight?: string;
  iconRightColor?: string;
  onRightIconPress?: () => void;
}

const defaultProps: NavBarProps = {
  titleColor: 'secondaryText',
  title: '',
};

const NavBar: FC<NavBarProps> = props => {
  const {
    iconComponent,
    withBorder,
    iconLeft,
    iconSize,
    iconLeftColor,
    iconColor,
    onLeftIconPress,
    title,
    titleSize,
    titleVariant,
    titleColor,
    iconRight,
    iconRightColor,
    onRightIconPress,
  } = props;

  const Icon = iconComponent || MaterialIcons;
  return (
    <View
      style={[
        styles.navBar,
        withBorder && {
          borderBottomWidth: 1,
          borderBottomColor: Colors.divider,
        },
      ]}>
      {iconLeft && (
        <TouchableOpacity
          style={styles.iconLeft}
          onPress={onLeftIconPress}>
          <Icon
            name={iconLeft || 'chevron-left'}
            size={iconSize || normalize(25)}
            color={iconLeftColor || iconColor}
          />
        </TouchableOpacity>
      )}
      {title && (
        <Label
          color={titleColor}
          size={titleSize || 'xl'}
          text={title}
          variant={titleVariant || 'bold'}
          style={[
            styles.navTitle,
          ]}
        />
      )}
      {iconRight && (
        <TouchableOpacity
          style={styles.iconRight}
          onPress={onRightIconPress}>
          <Icon
            name={iconRight || 'check'}
            size={iconSize || normalize(25)}
            color={iconRightColor || iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

NavBar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  navBar: {
    height: normalize(50),
    width: '100%',
    paddingVertical: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: normalize(16),
  },
  iconRight: {
    position: 'absolute',
    right: normalize(16),
  },
  navTitle: {
    marginHorizontal: normalize(30),
  },
});

export default NavBar;
