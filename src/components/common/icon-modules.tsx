import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { normalize, getScreenWidth } from 'utils/size';
import RoundIcon from './round-icon';
import { IconProps } from 'utils/types';
import { ColorType } from 'themes';

interface IconModulesProps {
  icons: Array<IconProps>;
  onIconPress?: (label: string) => void;
}

const defaultProps: IconModulesProps = {
  icons: [],
};

const IconModules: FC<IconModulesProps> = props => {
  const { icons, onIconPress } = props;
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
        {icons.map((i) => (
          <RoundIcon
            key={i.label}
            name={i.icon}
            text={i.label}
            textColor="white"
            textSize="xs"
            iconColor={i.color as ColorType}
            onPress={() => {
              if (onIconPress) {
                onIconPress(i.label);
              }
            }}
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

IconModules.defaultProps = defaultProps;

export default IconModules;
