
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/home/Home';
import Details from '../screens/Details/Details';
import Cart from '../screens/cart/Cart';
import Splash from '../screens/splash/Splash';
import Login from '../screens/Login/Login';
import Wishlist from '../screens/wishlist/Wishlist';
import Products from '../screens/products/Products';
import Profile from '../screens/profile/Profile';
import Payment from '../screens/payment/Payment';
const Stack = createStackNavigator();
const StackRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='splash' screenOptions={{headerShown:false}}>
         <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  )
}

export default StackRoutes


