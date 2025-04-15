import React, {useEffect} from 'react';
import AppWrapper from '../../components/AppWrapper';
import {Image, StatusBar, View} from 'react-native';
import {myColors} from '../../utils/themes/Colors';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      (async () => {
        try {
          const value = await AsyncStorage.getItem('key');
          console.log('AsyncStorage key value:', value);
          if (value) {
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        } catch (error) {
          console.log('Storage Error:', error);
        }
      })();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AppWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <StatusBar hidden />
        <Image
          style={{width: responsiveScreenWidth(100), height: 100}}
          source={{
            uri: 'https://cdn.soft112.com/trexo-slider-ios/00/00/0H/WH/00000HWHXJ/pad_screenshot_8U4B7T5K9Z.png',
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default Splash;
