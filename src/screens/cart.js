import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Colors} from 'themes';
import {Label, NavBar, CartItem, Button, Space} from 'components';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Selectors from 'selectors';
import Actions from 'actions';
import {alertWithTitle, confirmationWithTitle} from 'utils/alert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {normalize} from 'utils/size';
import {getTotalPrice, formatCurrency} from 'utils/number';
import {ScrollView} from 'react-native-gesture-handler';

const SHIPPING_FEES = 10;

class Cart extends Component {
  state = {
    selected: [],
    isAllSelected: false,
  };

  removeItem = () => {
    const {selected} = this.state;
    if (selected.length === 0) {
      alertWithTitle('Error', 'Please select item to remove');
    } else {
      confirmationWithTitle(
        'Confirm to delete?',
        'Are you sure you want to delete this item from cart?',
        () => {
          selected.map(id => {
            this.onSelect({id});
            this.props.removeCartItem(id);
          });
        },
      );
    }
  };

  checkout = () => {
    const {cartItems} = this.props;
    const {selected} = this.state;
    if (selected.length === 0) {
      alertWithTitle('Error', 'Please select item!');
    } else {
      const selectedItems = selected.map(id => {
        const found = cartItems.find(x => x.id === id);
        return found;
      });
      const subtotal =
        selectedItems.length > 0 ? getTotalPrice(selectedItems) : 0;
      this.props.navigation.navigate('Receipt', {
        items: selectedItems,
        subtotal,
        shipping: SHIPPING_FEES,
      });
    }
  };

  onAllPress = () => {
    if (this.state.selected.length === this.props.cartItems.length) {
      this.setState({isAllSelected: false, selected: []});
    } else {
      const selectedIds = this.props.cartItems.map(x => x.id);
      this.setState({isAllSelected: true, selected: selectedIds});
    }
  };

  onSelect = cartItem => {
    const index = this.state.selected.findIndex(id => id === cartItem.id);
    if (index >= 0) {
      const selectedIds = [...this.state.selected];
      selectedIds.splice(index, 1);
      this.setState({
        isAllSelected: selectedIds.length === this.props.cartItems.length,
        selected: selectedIds,
      });
    } else {
      const selectedIds = [...this.state.selected];
      selectedIds.push(cartItem.id);
      this.setState({
        isAllSelected: selectedIds.length === this.props.cartItems.length,
        selected: selectedIds,
      });
    }
  };

  onAddPress = cartItem => {
    const newCartItem = {
      ...cartItem,
      quantity: cartItem.quantity + 1,
    };
    this.props.updateCartItem(cartItem.id, newCartItem, cartItem);
  };

  onMinusPress = cartItem => {
    const newCartItem = {
      ...cartItem,
      quantity: cartItem.quantity - 1,
    };
    this.props.updateCartItem(cartItem.id, newCartItem, cartItem);
  };

  renderNavBar = () => {
    const {cartItems, route, navigation} = this.props;

    return (
      <NavBar
        withBorder
        title={`My Cart ${cartItems.length > 0 ? `(${cartItems.length})` : ''}`}
        titleColor={Colors.primaryText}
        iconLeft={
          route.params?.screenType === 'modal' ? 'chevron-left' : undefined
        }
        iconColor={Colors.primaryText}
        iconRight={cartItems.length > 0 ? 'delete-outline' : undefined}
        onLeftIconPress={() => navigation.goBack()}
        onRightIconPress={this.removeItem}
      />
    );
  };

  renderCartItems = () => {
    const sortedCartItems = this.props.cartItems.sort((a, b) => {
      return (a.item.title > b.item.title) - (a.item.title < b.item.title);
    });
    return (
      <View style={{flex: 1, backgroundColor: Colors.nearWhite}}>
        <ScrollView>
          {sortedCartItems.map(x => (
            <CartItem
              key={x.id}
              id={x.id}
              item={x.item}
              quantity={x.quantity}
              onAddPress={() => this.onAddPress(x)}
              onMinusPress={() => this.onMinusPress(x)}
              onSelect={() => this.onSelect(x)}
              selected={this.state.selected}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  renderFooter = () => {
    const {cartItems} = this.props;
    const {isAllSelected, selected} = this.state;
    const selectedItems = selected.map(id => {
      const found = cartItems.find(x => x.id === id);
      return found;
    });
    const subtotal =
      selectedItems.length > 0 ? getTotalPrice(selectedItems) : 0;
    return (
      <View
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.divider,
          backgroundColor: Colors.white,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: normalize(8),
          }}
          onPress={this.onAllPress}>
          {isAllSelected ? (
            <View
              style={{
                width: normalize(20),
                height: normalize(20),
                borderRadius: normalize(20) / 2,
                backgroundColor: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name={'check'}
                size={normalize(15)}
                color={Colors.white}
              />
            </View>
          ) : (
            <View
              style={{
                width: normalize(20),
                height: normalize(20),
                borderWidth: 1,
                borderRadius: normalize(20) / 2,
                borderColor: Colors.gray,
              }}
            />
          )}
        </TouchableOpacity>
        <Label text="All" />
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Label text="Total:" />
              <Space horizontal={normalize(5)} />
              <Label
                text={`${formatCurrency(subtotal)}`}
                variant="bold"
                color="accent"
                size="l"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Label
                text="Additional shipping fee "
                size="s"
                color="secondaryText"
              />
              <Label text={`RM ${SHIPPING_FEES}`} size="s" color="accent" />
            </View>
          </View>
        </View>
        <Space horizontal={normalize(10)} />
        <View>
          <Button
            color="accent"
            text={`Check out (${this.state.selected.length})`}
            onPress={this.checkout}
            containerStyle={{marginHorizontal: 0}}
          />
        </View>
        <Space horizontal={normalize(16)} />
      </View>
    );
  };

  renderEmpty = () => {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Label text="There are no items in the cart" color="secondaryText" />
        <Button
          text="Product Listing"
          color="accent"
          onPress={() => navigation.navigate('Products')}
        />
      </View>
    );
  };

  render() {
    const {route, cartItems} = this.props;
    return (
      <SafeAreaView
        style={styles.container}
        edges={
          route.params?.screenType === 'modal' ? ['top', 'bottom'] : ['top']
        }>
        {this.renderNavBar()}
        {cartItems.length === 0 && this.renderEmpty()}
        {cartItems.length > 0 && this.renderCartItems()}
        {cartItems.length > 0 && this.renderFooter()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

Cart.defaultProps = {};

const mapStateToProps = store => ({
  cartItems: Selectors.getCartItems(store),
});

const mapDispatchToProps = {
  removeCartItem: Actions.removeCartItem,
  updateCartItem: Actions.updateCartItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
