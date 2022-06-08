import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Cart,
  Dashboard,
  Splash,
  Products,
  Product,
  Receipt,
} from 'screens';
import NavigationService from './navigation-service';
import {Label} from 'components';
import {connect} from 'react-redux';
import Selectors from 'selectors';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {normalize} from 'utils/size';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

class AppNavigator extends Component {
  tabs = () => (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'CartTab') {
            iconName = 'shopping-cart';
          } else if (route.name === 'DashboardTab') {
            iconName = 'account-circle';
          }

          return (
            <Icons
              name={iconName}
              size={size}
              color={color}
              style={{marginTop: normalize(3)}}
            />
          );
        },
        tabBarLabel: ({color}) => {
          let label = '';
          if (route.name === 'HomeTab') {
            label = 'Landing';
          } else if (route.name === 'CartTab') {
            label = 'Cart';
          } else if (route.name === 'DashboardTab') {
            label = 'Dashboard';
          }
          return (
            <Label
              text={label}
              size="s"
              style={{
                color,
                marginBottom: Platform.OS === 'android' ? normalize(5) : 0,
              }}
            />
          );
        },
      })}>
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="CartTab" component={Cart} />
      <Tab.Screen name="DashboardTab" component={Dashboard} />
    </Tab.Navigator>
  );

  render() {
    return (
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {this.props.isStoreRehydrated ? (
            <>
              <RootStack.Screen name="Tabs" component={this.tabs} />
              <RootStack.Screen name="Products" component={Products} />
              <RootStack.Screen name="Product" component={Product} />
              <RootStack.Screen name="Cart" component={Cart} />
              <RootStack.Screen name="Receipt" component={Receipt} />
            </>
          ) : (
            <>
              <RootStack.Screen name="Splash" component={Splash} />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = store => ({
  isStoreRehydrated: Selectors.isStoreRehydrated(store),
});

export default connect(mapStateToProps)(AppNavigator);
