import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {normalize, getScreenWidth} from 'utils/size';
import RoundIcon from './round-icon';

const IconModules = props => {
  const {icons, onIconPress} = props;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(20),
        width: (getScreenWidth() - normalize(32)) * 2 - normalize(60),
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {icons.map((i, index) => (
          <RoundIcon
            key={i.label}
            name={i.icon}
            text={i.label}
            textColor="white"
            iconColor={i.color}
            onPress={() => onIconPress(i.label)}
            containerStyle={{
              marginRight: normalize(16),
              marginBottom: normalize(16),
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

IconModules.propTypes = {
  icons: PropTypes.array,
};

IconModules.defaultProps = {
  icons: [],
};

export default IconModules;
