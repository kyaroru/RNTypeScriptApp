import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Font} from 'themes';

const DEFAULT_FONT_SIZE = 'm';
const DEFAULT_FONT_VARIANT = 'regular';
const DEFAULT_FONT_COLOR = 'primaryText';

const Label = props => {
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
          {color: Colors[color]},
          {...Font[size][variant]},
          align && {textAlign: align},
          style,
        ]}
        {...otherProps}>
        {text}
      </Text>
    </View>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf([
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
  variant: PropTypes.oneOf(['light', 'regular', 'bold']),
  style: Text.propTypes.style,
  align: PropTypes.string,
  containerStyle: PropTypes.any,
};

Label.defaultProps = {
  color: DEFAULT_FONT_COLOR,
  size: DEFAULT_FONT_SIZE,
  variant: DEFAULT_FONT_VARIANT,
  style: null,
  align: null,
  containerStyle: null,
  onPress: null,
};

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
