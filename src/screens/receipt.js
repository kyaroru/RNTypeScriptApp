import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Colors} from 'themes';
import {Label, Space, Button, CartItem, Card} from 'components';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTotalPrice, getRandomInt, formatCurrency} from 'utils/number';
import {normalize} from 'utils/size';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Actions from 'actions';
import Selectors from 'selectors';
import {alertWithTitle} from 'utils/alert';

const dummyText = 'Due to time constraint, this is not implemented';

class Receipt extends Component {
  componentDidMount() {
    this.props.route.params?.items?.map(cartItem => {
      this.props.removeCartItem(cartItem.id);
    });
  }

  generatePdf = () => {
    alertWithTitle('Error', dummyText);
  };

  onDonePress = () => {
    this.props.navigation.popToTop();
  };

  renderUserDetails = () => {
    const {profile} = this.props;
    const user = profile?.results?.[0];
    return (
      <Card
        roundedCorner={0}
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: normalize(16),
          paddingVertical: normalize(10),
        }}>
        <Label
          text={`${user?.name?.title}. ${user?.name.first} ${user?.name?.last}`}
          variant="bold"
        />
        <Label text={`${user?.cell}`} />
        <Label
          text={`${user?.location?.street?.number} ${user?.location?.street?.name} `}
        />
        <Label
          text={`${user?.location?.city} ${user?.location?.state},  ${user?.location?.postcode}`}
        />
      </Card>
    );
  };

  renderCartItems = () => {
    const sortedCartItems = this.props.route?.params?.items;

    return sortedCartItems.map(x => {
      return (
        <CartItem
          key={x.id}
          id={x.id}
          item={x.item}
          quantity={x.quantity}
          onAddPress={() => this.onAddPress(x)}
          onMinusPress={() => this.onMinusPress(x)}
          onSelect={() => this.onSelect(x)}
          hideRadioButton
        />
      );
    });
  };

  renderFieldValue = (label, value, isBold = false) => {
    return (
      <View
        style={{
          marginHorizontal: normalize(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
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

  renderOrder = () => {
    const orderNo = getRandomInt(12345678, 98765432);
    return (
      <Card
        roundedCorner={0}
        style={{backgroundColor: Colors.white, paddingVertical: normalize(10)}}>
        <View>
          {this.renderFieldValue('Order No', `${orderNo}`, true)}
          {this.renderFieldValue(
            'Placed on',
            moment().format('DD MMM YYYY HH:mm:ss'),
          )}
        </View>
      </Card>
    );
  };

  renderTotal = () => {
    const {route} = this.props;
    const subtotal =
      route.params.items.length > 0 ? getTotalPrice(route.params.items) : 0;
    return (
      <Card
        roundedCorner={0}
        style={{backgroundColor: Colors.white, paddingVertical: normalize(10)}}>
        <View>
          {this.renderFieldValue('Subtotal', `RM ${formatCurrency(subtotal)}`)}
          {this.renderFieldValue(
            'Shipping Fee',
            `RM ${formatCurrency(route.params.shipping)}`,
          )}
          {this.renderFieldValue(
            'Total',
            `RM ${formatCurrency(subtotal + route.params.shipping)}`,
            true,
          )}
        </View>
      </Card>
    );
  };

  renderFooter = () => {
    return (
      <View
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.divider,
          backgroundColor: Colors.white,
          justifyContent: 'flex-end',
        }}>
        <Space horizontal={normalize(10)} />
        <View>
          <Button
            color="secondaryText"
            text="Invoice"
            onPress={this.generatePdf}
            containerStyle={{marginHorizontal: 0}}
          />
        </View>
        <Space horizontal={normalize(16)} />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <TouchableOpacity
          onPress={this.onDonePress}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <MaterialIcons
            name="done"
            color={Colors.primaryText}
            size={normalize(30)}
            style={{paddingHorizontal: normalize(16)}}
          />
        </TouchableOpacity>
        <Label size="xxl" variant="bold" text="Receipt" align="center" />
        <ScrollView style={{backgroundColor: Colors.nearWhite}}>
          {this.renderUserDetails()}
          <Space vertical={normalize(10)} />
          {this.renderCartItems()}
          <Space vertical={normalize(10)} />
          {this.renderOrder()}
          <Space vertical={normalize(10)} />
          {this.renderTotal()}
          <Space vertical={normalize(10)} />
        </ScrollView>
        {this.renderFooter()}
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

Receipt.defaultProps = {};

const mapStateToProps = store => ({
  profile: Selectors.getProfile(store),
});

const mapDispatchToProps = {
  removeCartItem: Actions.removeCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
