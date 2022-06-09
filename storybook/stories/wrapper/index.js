import React from 'react';
import {View} from 'react-native';
import {Colors} from 'themes';

const Wrapper = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.gray,
      }}>
      {children}
    </View>
  );
};

export default Wrapper;
