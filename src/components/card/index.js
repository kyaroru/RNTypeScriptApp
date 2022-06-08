import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {normalize} from 'utils/size';

const Card = props => {
  const {style, roundedCorner, children, onPress} = props;
  const ConditionalView = onPress ? TouchableOpacity : View;
  return (
    <ConditionalView
      onPress={onPress}
      style={[{borderRadius: roundedCorner}, style]}>
      {children}
    </ConditionalView>
  );
};

Card.propTypes = {
  style: PropTypes.any,
  roundedCorner: PropTypes.number,
  children: PropTypes.node,
};

Card.defaultProps = {
  style: null,
  roundedCorner: normalize(15),
  children: null,
};

export default Card;
