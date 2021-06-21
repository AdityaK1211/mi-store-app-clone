import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CategoriesScreen from '../screens/shop/CategoriesScreen';
import CategoryProductsScreen from '../screens/shop/CategoryProductsScreen';
import IndiaScreen from '../screens/shop/IndiaScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import SearchScreen from '../screens/shop/SearchScreen';

import UserAccountScreen from '../screens/user/UserAccountScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AddressScreen from '../screens/user/AddressScreen';
import AddAddressScreen from '../screens/user/AddAddressScreen';

import AuthScreen from '../screens/user/AuthScreen';
import PhoneAuthScreen from '../screens/user/PhoneAuthScreen';
import StartupScreen from '../screens/StartupScreen';

import * as authActions from '../store/actions/auth';

const ProductsNavigator = createStackNavigator({
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
        CategoryProducts: CategoryProductsScreen,
        Search: SearchScreen,
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },      
    }
)

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
    Cart: CartScreen
  },
);

const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryProducts: CategoryProductsScreen,
    ProductDetail: ProductDetailScreen,
  },
);

const AdminNavigator = createStackNavigator(
  {
    UserAccount: UserAccountScreen,
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
    UserOrders: OrdersScreen,
    UserCart: CartScreen,
    UserAddress: AddressScreen,
    AddAddress: AddAddressScreen,
  },
);

const ProductTabNavigator = createBottomTabNavigator({
    Home: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
              return (
                <Ionicons
                  name="home-outline"
                  size={25}
                />
              );
            }
        }
    },
    Categories: {
        screen: CategoriesNavigator,
        navigationOptions: {
            tabBarLabel: 'Categories',
            tabBarIcon: tabInfo => {
              return (
                <Ionicons 
                    name="grid-outline" 
                    size={25} 
                />
              );
            }
        }
    },
    India: {
      screen: IndiaScreen,
      navigationOptions: {
        tabBarLabel: 'Made in India',
        tabBarIcon: tabInfo => {
          return (
            <Ionicons 
                name="bonfire-outline" 
                size={25} 
            />
          );
        }
      } 
    },
    Orders: {
        screen: OrdersNavigator,
        navigationOptions: {
            tabBarLabel: 'Orders',
            tabBarIcon: tabInfo => {
              return (
                <Ionicons 
                    name="cart-outline" 
                    size={25} 
                />
              );
            }
        }
    },
    Account: {
        screen: AdminNavigator,
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: tabInfo => {
              return (
                <Ionicons 
                    name="people-outline" 
                    size={25} 
                />
              );
            }
        }
    },
}, {
  tabBarOptions: {
    style: {
      height: 60,
      alignItems: "center"
    },
    labelStyle: {
      paddingBottom: 5
    }
  }
} 
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    PhoneAuth: PhoneAuthScreen,
  },
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ProductTabNavigator,
  
});

export default createAppContainer(MainNavigator);