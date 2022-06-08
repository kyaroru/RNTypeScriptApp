import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Colors} from 'themes';
import {normalize} from 'utils/size';

interface SpaceProps {
  vertical?: number | string;
  horizontal?: number | string;
  backgroundColor: string,
}

const defaultProps: SpaceProps = {
  vertical: normalize(10),
  horizontal: '100%',
  backgroundColor: Colors.transparent,
}

const Space : FC<SpaceProps> = props => {
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

Space.defaultProps = defaultProps;

export default Space;
