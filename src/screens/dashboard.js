import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Colors} from 'themes';
import {Label, Space} from 'components';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {normalize} from 'utils/size';
import Selectors from 'selectors';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {alertWithTitle} from 'utils/alert';

const dummyText = 'Due to time constraint, this is not implemented';

class Dashboard extends Component {
  renderHeader = () => {
    const {profile} = this.props;
    const user = profile.results?.[0];
    return (
      <View
        style={{
          marginHorizontal: normalize(16),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <FastImage
            source={{uri: user?.picture?.medium}}
            style={{
              width: normalize(50),
              height: normalize(50),
              borderRadius: normalize(25),
            }}
          />
          <Space horizontal={normalize(10)} />
          <View style={{flex: 1}}>
            <Label
              variant="bold"
              size="ml"
              text={`${user?.name?.title}. ${user?.name.first} ${user?.name?.last}`}
            />
            {/* <Label text={`${user?.cell}`} size="s" color="secondaryText" /> */}
          </View>
          <TouchableOpacity
            onPress={() => alertWithTitle('Settings', dummyText)}
            style={{
              width: normalize(30),
              height: normalize(30),
              borderRadius: normalize(15),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.white,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.divider,
            }}>
            <MaterialIcons
              name="settings"
              color={Colors.gray}
              size={normalize(15)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderFieldValue = (label, value, isBold = false) => {
    return (
      <View
        style={{
          marginHorizontal: normalize(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: normalize(15),
          borderBottomColor: Colors.divider,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
        <Label
          text={label}
          color={isBold ? 'primaryText' : 'secondaryText'}
          variant={isBold ? 'bold' : 'regular'}
        />
        <Label
          text={value}
          color={isBold ? 'primaryText' : 'secondaryText'}
          variant={isBold ? 'bold' : 'regular'}
        />
      </View>
    );
  };

  renderAccount = () => {
    const {profile} = this.props;
    const user = profile.results?.[0];
    return (
      <View>
        <Label
          text="Account Info"
          variant="bold"
          style={{marginHorizontal: normalize(16)}}
        />
        {this.renderFieldValue('Username', user?.login?.username)}
        {this.renderFieldValue(
          'Registered on',
          moment(user?.registered?.date).format('YYYY-DD-MM'),
        )}
      </View>
    );
  };

  renderPersonal = () => {
    const {profile} = this.props;
    const user = profile.results?.[0];
    return (
      <View>
        <Label
          text="Personal Info"
          variant="bold"
          style={{marginHorizontal: normalize(16)}}
        />
        {this.renderFieldValue('Gender', user?.gender)}
        {this.renderFieldValue(
          'Birthday',
          moment(user?.dob?.date).format('YYYY-DD-MM'),
        )}
        {this.renderFieldValue(
          'ID',
          `${user?.id?.name || '-'} - ${user?.id?.value || '-'}`,
        )}
      </View>
    );
  };

  renderAddress = () => {
    const {profile} = this.props;
    const user = profile.results?.[0];
    return (
      <View
        style={{
          marginHorizontal: normalize(16),
          borderBottomColor: Colors.divider,
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingVertical: normalize(15),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Label color="secondaryText" text="Address" />
          <View
            style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
            <Label
              color="secondaryText"
              style={{flex: 1}}
              align="right"
              text={`${user?.location?.street?.number} ${user?.location?.street?.name}`}
            />
            <Label
              color="secondaryText"
              style={{flex: 1}}
              align="right"
              numberOfLines={3}
              text={`${user?.location?.city} ${user?.location?.state},  ${user?.location?.postcode}`}
            />
            <Label color="secondaryText" text={`${user?.location?.country}`} />
          </View>
        </View>
      </View>
    );
  };

  renderContact = () => {
    const {profile} = this.props;
    const user = profile.results?.[0];
    return (
      <View>
        <Label
          text="Contact Info"
          variant="bold"
          style={{marginHorizontal: normalize(16)}}
        />
        <Space vertical={normalize(10)} />
        {this.renderFieldValue('Phone', user?.phone)}
        {this.renderFieldValue('Mobile', user?.cell)}
        {this.renderAddress()}
        {this.renderFieldValue('Email', user?.email)}
      </View>
    );
  };

  render() {
    const {profile} = this.props;
    const user = profile.results?.[0];
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {user ? (
          <ScrollView>
            <Space vertical={normalize(10)} />
            {this.renderHeader()}
            <Space vertical={normalize(10)} />
            {this.renderAccount()}
            <Space vertical={normalize(20)} />
            {this.renderPersonal()}
            <Space vertical={normalize(20)} />
            {this.renderContact()}
            <Space vertical={normalize(10)} />
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Label text="Loading Profile..." />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});

Dashboard.defaultProps = {};

const mapStateToProps = store => ({
  profile: Selectors.getProfile(store),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
