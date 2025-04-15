import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import AppWrapper from '../../components/AppWrapper';
import { myColors } from '../../utils/themes/Colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import EncryptedStorage from 'react-native-encrypted-storage'; 
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './LoginStyles';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirm, setConfirm] = useState(null);
  const [showOTPInput, setShowOTPInput] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    GoogleSignin.configure();
    autoRedirectIfLoggedIn();
  }, []);

  const autoRedirectIfLoggedIn = async () => {
    const user = await EncryptedStorage.getItem('key');
    if (user) {
      navigation.replace('Home');
    }
  };

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const sendOTP = async () => {
    if (!phone) return Alert.alert('Please enter phone number');
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    try {
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);
      setConfirm(confirmation);
      setShowOTPInput(true);
      Alert.alert('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Failed to send OTP.');
    }
  };

  const verifyOTP = async () => {
    const code = otp.join('');
    if (!code || !confirm) return Alert.alert('Please enter the OTP');
    try {
      await confirm.confirm(code);
      await EncryptedStorage.setItem(
        'key',
        JSON.stringify({
          type: 'phone',
          phone,
          name: '',
          email: '',
        })
      );
      navigation.replace('Home');
    } catch (error) {
      console.error('Invalid OTP:', error);
      Alert.alert('Invalid OTP');
    }
  };

  return (
    <AppWrapper>
      <StatusBar backgroundColor='black' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn.soft112.com/trexo-slider-ios/00/00/0H/WH/00000HWHXJ/pad_screenshot_8U4B7T5K9Z.png',
            }}
          />
          <Text style={styles.deliveryText}>10 minutes Delivery</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter Phone Number"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
            style={styles.phoneInput}
          />

          <TouchableOpacity onPress={sendOTP} style={styles.sendOtpBtn}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>

          {showOTPInput && (
            <>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    value={digit}
                    onChangeText={(text) => handleOTPChange(text, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={(ref) => (otpRefs.current[index] = ref)}
                    style={styles.otpInput}
                  />
                ))}
              </View>

              <TouchableOpacity onPress={verifyOTP} style={styles.verifyBtn}>
                <Text style={styles.btnText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity
            onPress={async () => {
              try {
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();
                if (userInfo) {
                  await EncryptedStorage.setItem(
                    'key',
                    JSON.stringify({
                      type: 'google',
                      phone: userInfo.user?.phoneNumber || '',
                      name: userInfo.user?.name || '',
                      email: userInfo.user?.email || '',
                    })
                  );
                  navigation.replace('Home');
                }
              } catch (error) {
                console.error(error);
              }
            }}
            activeOpacity={0.8}
            style={styles.googleBtn}
          >
            <AntDesign name="google" size={20} color={myColors.violet} />
            <Text style={styles.googleBtnText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default Login;


