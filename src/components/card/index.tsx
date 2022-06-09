import React, { FC } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { normalize } from 'utils/size';

interface CardProps {
  style?: StyleProp<ViewStyle>;
  roundedCorner?: number;
  onPress?: () => void;
};

const defaultProps: CardProps = {
  roundedCorner: normalize(15),
};

type ConditionalViewType = any; // Carol - not sure how to declare the dynamic type here

const Card: FC<CardProps> = props => {
  const { style, roundedCorner, children, onPress } = props;
  const ConditionalView: ConditionalViewType = onPress ? TouchableOpacity : View;
  return (
    <ConditionalView
      onPress={onPress}
      style={[{ borderRadius: roundedCorner }, style]}>
      {children}
    </ConditionalView>
  );
};

Card.defaultProps = defaultProps;

export default Card;
