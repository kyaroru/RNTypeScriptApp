import React from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from 'themes';
import {normalize, getScreenWidth} from 'utils/size';
import Label from '../text/label';

class Button extends React.Component {
  renderButtonContent = () => {
    const {isLoading, text, textStyle} = this.props;
    if (isLoading) {
      return (
        <Label
          color="white"
          size="s"
          style={[textStyle]}
          text="Loading..."
          align="center"
        />
      );
    }

    return (
      <Label
        color="white"
        size="s"
        style={[textStyle]}
        text={text}
        align="center"
      />
    );
  };

  render() {
    const {
      onPress,
      iconLeft,
      iconLeftStyle,
      iconRight,
      iconRightStyle,
      containerStyle,
      style,
      disabled,
      isLoading,
      text,
      small,
      mini,
      color,
    } = this.props;

    return (
      <TouchableOpacity onPress={onPress} disabled={isLoading || disabled}>
        <View
          style={[
            styles.container,
            small && styles.small,
            mini && styles.mini,
            containerStyle,
          ]}>
          <View
            style={[
              styles.button,
              small && styles.smallButton,
              mini && styles.miniButton,
              color && {backgroundColor: Colors[color]},
              style,
            ]}>
            {iconLeft && (
              <View style={[styles.icon, iconLeftStyle]}>{iconLeft}</View>
            )}
            {text && (
              <View style={styles.textContainer}>
                {this.renderButtonContent()}
              </View>
            )}
            {iconRight && (
              <View style={[styles.icon, iconRightStyle]}>{iconRight}</View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    margin: normalize(10),
    borderRadius: normalize(20),
  },
  small: {
    borderRadius: normalize(10),
    margin: normalize(0),
  },
  mini: {
    borderRadius: normalize(10),
    margin: normalize(0),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(20),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(12),
    backgroundColor: 'transparent',
  },
  smallButton: {
    borderRadius: normalize(10),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(6),
  },
  miniButton: {
    ...Platform.select({
      android: {
        borderRadius: normalize(12),
        paddingHorizontal: normalize(7),
        paddingVertical: normalize(5),
      },
      ios: {
        borderRadius: normalize(10),
        paddingHorizontal: normalize(7),
        paddingVertical: normalize(3),
      },
    }),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  iconLeft: PropTypes.element,
  iconLeftStyle: PropTypes.any,
  iconRight: PropTypes.element,
  iconRightStyle: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  color: PropTypes.string,
};

Button.defaultProps = {
  text: null,
  onPress: () => null,
  iconLeft: null,
  iconLeftStyle: null,
  iconRight: null,
  iconRightStyle: null,
  style: null,
  textStyle: null,
  disabled: false,
  isLoading: false,
  color: null,
};

export default Button;
