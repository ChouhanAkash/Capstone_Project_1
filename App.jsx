import 'react-native-gesture-handler'; // <-- must be at the top
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import StackRoutes from './src/routes/StackRoutes';
import { Provider } from 'react-redux';
import { Store } from './src/redux/Store';
// index.js or App.js


const Stack = createStackNavigator();


const App = () => {
  
    return (
  <Provider store={Store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
         <StackRoutes/>
        </NavigationContainer>
      </GestureHandlerRootView>
      </Provider>
    );
    
  
}

export default App