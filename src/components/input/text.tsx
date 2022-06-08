import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StyleProp, TextStyle, ViewStyle, TextInputProps
} from 'react-native';
import React, { Component, FC } from 'react';
import { Colors } from 'themes';
import Label from '../text/label';
import { normalize } from 'utils/size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MyTextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<ViewStyle>;
  value?: string;
  error?: string;
  iconLeft?: string;
  iconSize?: number;
  iconLeftColor?: string;
  iconColor?: string;
  iconComponent?: any;
  onChangeText?: () => void;
  itemRight?: FC;
  onPress?: () => void;
  placeholder?: string;
};

const defaultProps: MyTextInputProps = {
  value: undefined
}

type ConditionalViewType = any; // Carol - not sure how to declare the dynamic type here
type ConditionalIconType = any; // Carol - not sure how to declare the dynamic type here

class TextInput extends Component<MyTextInputProps & TextInputProps, any> {
  public static defaultProps = defaultProps;

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
      placeholder,
      ...otherProps
    } = this.props;
    const ConditionalIcon: ConditionalIconType = iconComponent || MaterialIcons;
    const ConditionalView: ConditionalViewType = onPress ? TouchableOpacity : View;
    return (
      <ConditionalView
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {iconLeft && (
            <View>
              <ConditionalIcon
                name={iconLeft || 'search'}
                size={iconSize || normalize(25)}
                color={iconLeftColor || iconColor}
              />
            </View>
          )}
          {onPress && placeholder ? (
            <View
              style={[
                styles.input,
                inputStyle,
              ]}>
              <Label text={placeholder} color="inputPlaceholder" />
            </View>
          ) : (
            <RNTextInput
              onChangeText={onChangeText}
              value={value}
              style={[styles.input, { color: Colors.primaryText }, inputStyle]}
              placeholderTextColor={Colors.inputPlaceholder}
              {...otherProps}
            />
          )}
          {!!itemRight && itemRight}
        </View>

        {error && (
          <Label
            size="s"
            color={'icon1'}
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
    color: Colors.primaryText,
    justifyContent: 'center',
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

export default TextInput;
