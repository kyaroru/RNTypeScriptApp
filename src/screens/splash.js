import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet, StatusBar, View} from 'react-native';
import {Colors} from 'themes';
import {normalize} from 'utils/size';
import {Label, Space} from 'components';

class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <Label
          size="xxl"
          variant="bold"
          color="white"
          text="React Native ACN Test"
        />
        <Space vertical={normalize(10)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Splash.propTypes = {};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Splash);
