import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Colors} from 'themes';
import {normalize} from 'utils/size';

const Space = props => {
  let {vertical, horizontal, backgroundColor} = props;
  if (!vertical) {
    vertical = '100%';
  }
  if (!horizontal) {
    horizontal = '100%';
  }
  if (!backgroundColor) {
    backgroundColor = Colors.transparent;
  }
  return (
    <View
      style={{
        width: horizontal,
        height: vertical,
        backgroundColor,
      }}
    />
  );
};

Space.propTypes = {
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  horizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
};

Space.defaultProps = {
  vertical: normalize(10),
  horizontal: '100%',
  backgroundColor: Colors.transparent,
};

export default Space;
