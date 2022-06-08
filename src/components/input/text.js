import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Colors} from 'themes';
import Label from '../text/label';
import {normalize} from 'utils/size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class TextInput extends Component {
  render() {
    const {
      containerStyle,
      inputContainerStyle,
      inputStyle,
      errorStyle,
      value,
      error,
      iconLeft,
      iconSize,
      iconLeftColor,
      iconColor,
      iconComponent,
      onChangeText,
      itemRight,
      onPress,
      ...otherProps
    } = this.props;
    const Icon = iconComponent || MaterialIcons;
    const ConditionalView = onPress ? TouchableOpacity : View;
    return (
      <ConditionalView
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {iconLeft && (
            <View style={styles.iconLeft}>
              <Icon
                name={iconLeft || 'search'}
                size={iconSize || normalize(25)}
                color={iconLeftColor || iconColor}
              />
            </View>
          )}
          {onPress ? (
            <View
              style={[
                styles.input,
                {color: Colors.primaryText, justifyContent: 'center'},
                inputStyle,
              ]}>
              <Label text={otherProps.placeholder} color="inputPlaceholder" />
            </View>
          ) : (
            <RNTextInput
              onChangeText={onChangeText}
              value={value}
              style={[styles.input, {color: Colors.primaryText}, inputStyle]}
              placeholderTextColor={Colors.inputPlaceholder}
              {...otherProps}
            />
          )}
          {itemRight && itemRight}
        </View>

        {error && (
          <Label
            size="s"
            color={'error'}
            align={'left'}
            style={[errorStyle]}
            text={error}
          />
        )}
      </ConditionalView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(16),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: normalize(15),
    paddingHorizontal: normalize(5),
  },
  input: {
    flex: 1,
    ...Platform.select({
      android: {
        height: normalize(45),
        marginVertical: normalize(-4),
      },
      ios: {
        height: normalize(35),
      },
    }),
  },
  error: {
    paddingTop: normalize(5),
  },
});

TextInput.propTypes = {
  containerStyle: PropTypes.any,
  inputStyle: PropTypes.any,
  errorStyle: PropTypes.any,
};

TextInput.defaultProps = {
  containerStyle: null,
  inputStyle: null,
  errorStyle: null,
};

export default TextInput;
