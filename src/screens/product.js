import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Colors} from 'themes';
import {Label, Space, TextInput, Button} from 'components';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {normalize} from 'utils/size';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {alertWithTitle} from 'utils/alert';
import {formatCurrency} from 'utils/number';
import {v1 as uuid} from 'uuid';
import Actions from 'actions';
import Selectors from 'selectors';

const dummyText = 'Due to time constraint, this is not implemented';
const SHIPPING_FEES = 10;

class Product extends Component {
  addToCart = () => {
    const {route, cartItems} = this.props;
    const {item} = route.params;
    const found = cartItems?.find(x => x.item.id === item.id);
    if (found) {
      const newCartItem = {
        ...found,
        quantity: found.quantity + 1,
      };
      this.props.updateCartItem(found.id, newCartItem, found);
      alertWithTitle(
        'Success',
        `[${item.title.slice(0, 10)}...] has been updated in cart`,
      );
    } else {
      this.props.addCartItem({id: uuid(), item, quantity: 1});
      alertWithTitle(
        'Success',
        `[${item.title.slice(0, 10)}...] has been added to cart`,
      );
    }
  };

  buyNow = () => {
    const {route, navigation} = this.props;
    const {item} = route.params;
    navigation.navigate('Receipt', {
      items: [{item, quantity: 1}],
      shipping: SHIPPING_FEES,
    });
  };

  renderSearch = () => {
    const {navigation} = this.props;
    const dummyText = 'Due to time constraint, this is not implemented';

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingLeft: normalize(16),
          }}>
          <MaterialIcons
            name="chevron-left"
            size={normalize(30)}
            color={Colors.gray}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TextInput
            containerStyle={{marginHorizontal: 0}}
            inputContainerStyle={{borderColor: Colors.gray, borderWidth: 1}}
            iconLeft="search"
            iconColor={Colors.gray}
            placeholder="Search for anything"
            onChangeText={this.onChangeText}
            editable={false}
            onPress={() => navigation.push('Products')}
          />
        </View>
        <Space horizontal={normalize(10)} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', {screenType: 'modal'})}
          style={{
            paddingRight: normalize(16),
          }}>
          <MaterialIcons
            name="shopping-cart"
            size={normalize(30)}
            color={Colors.gray}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderItemDetails = () => {
    const {route} = this.props;
    const {item} = route.params;
    return (
      <ScrollView>
        <FastImage
          source={{uri: item.image}}
          style={{
            width: '100%',
            height: normalize(300),
            backgroundColor: Colors.nearWhite,
          }}
          resizeMode="contain"
        />
        <Space vertical={normalize(10)} />
        <View style={{marginHorizontal: normalize(10)}}>
          <Label
            variant="bold"
            text={`RM ${formatCurrency(item.price)}`}
            color="accent"
            size="xl"
          />
          <Space horizontal={normalize(10)} />
          <Label variant="bold" text={item.title} size="l" />
          <Space horizontal={normalize(10)} />
          <Label text={item.description} />
        </View>
        <Space vertical={normalize(10)} />
      </ScrollView>
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
        }}>
        <TouchableOpacity
          onPress={() => alertWithTitle('Store', dummyText)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: normalize(16),
          }}>
          <MaterialIcons
            name="local-mall"
            color={Colors.accent}
            size={normalize(20)}
          />
          <Label text="Store" size="m" />
        </TouchableOpacity>
        <Space horizontal={normalize(10)} />
        <TouchableOpacity
          onPress={() => alertWithTitle('Chat', dummyText)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: normalize(10),
          }}>
          <MaterialIcons
            name="chat-bubble-outline"
            color={Colors.gray}
            size={normalize(20)}
          />
          <Label text="Chat" size="m" />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Button
            color="icon6"
            text="Buy Now"
            onPress={this.buyNow}
            containerStyle={{marginHorizontal: 0}}
          />
        </View>
        <Space horizontal={normalize(10)} />
        <View style={{flex: 1}}>
          <Button
            color="accent"
            text="Add to Cart"
            onPress={this.addToCart}
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
        <Space horizontal={normalize(10)} />
        {this.renderSearch()}
        <Space horizontal={normalize(10)} />
        {this.renderItemDetails()}
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

Product.defaultProps = {};

const mapStateToProps = store => ({
  cartItems: Selectors.getCartItems(store),
});

const mapDispatchToProps = {
  addCartItem: Actions.addCartItem,
  updateCartItem: Actions.updateCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
