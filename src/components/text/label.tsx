import React, { FC } from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors, Font, ColorType } from 'themes';
import { FontSize } from 'utils/types';

const DEFAULT_FONT_SIZE = 'm';
const DEFAULT_FONT_VARIANT = 'regular';
const DEFAULT_FONT_COLOR = 'primaryText';

interface LabelProps {
  color?: ColorType;
  size?: FontSize;
  align?: 'left' | 'right' | 'center';
  text: string;
  style?: StyleProp<TextStyle>;
  variant?: 'light' | 'regular' | 'bold';
  containerStyle?: StyleProp<ViewStyle>;
  flex?: boolean;
  flexShrink?: boolean;
}

const defaultProps: LabelProps = {
  color: DEFAULT_FONT_COLOR,
  size: DEFAULT_FONT_SIZE,
  variant: DEFAULT_FONT_VARIANT,
  text: '',
};

const Label: FC<LabelProps> = props => {
  const {
    color,
    size,
    align,
    text,
    style,
    variant,
    containerStyle,
    flex,
    flexShrink,
    ...otherProps
  } = props;
  return (
    <View
      style={[
        styles.container,
        align && styles[align],
        containerStyle && containerStyle,
      ]}>
      <Text
        style={[
          color && { color: Colors[color] },
          size && variant && { ...Font[size][variant] },
          align && { textAlign: align },
          style,
        ]}
        {...otherProps}>
        {text}
      </Text>
    </View>
  );
};

Label.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  center: {
    // eslint-disable-line
    justifyContent: 'center',
  },
  left: {
    // eslint-disable-line
    justifyContent: 'flex-start',
  },
  right: {
    // eslint-disable-line
    justifyContent: 'flex-end',
  },
});

export default Label;
