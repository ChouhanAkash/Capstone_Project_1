import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import { useRoute, useNavigation } from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { myColors } from '../../utils/themes/Colors';
  
  const Payment = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const total = route.params?.total || 0;
  
    const handlePayment = (method) => {
      Alert.alert('Payment Successful', `Paid ₹${total} via ${method}`);
      navigation.navigate('Home');
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose a Payment Method</Text>
  
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePayment('UPI')}
        >
          <Ionicons name="logo-google" size={24} color={myColors.violet} />
          <Text style={styles.cardText}>UPI (Google Pay / PhonePe / Paytm)</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePayment('Debit Card')}
        >
          <Ionicons name="card" size={24} color={myColors.violet} />
          <Text style={styles.cardText}>Debit / Credit Card</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.card}
          onPress={() => handlePayment('Cash on Delivery')}
        >
          <Ionicons name="cash" size={24} color={myColors.violet} />
          <Text style={styles.cardText}>Cash on Delivery</Text>
        </TouchableOpacity>
  
        <Text style={styles.total}>Total Amount: ₹{total}</Text>
      </ScrollView>
    );
  };
  
  export default Payment;
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
      flexGrow: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: myColors.black,
    },
    card: {
      borderWidth: 1,
      borderColor: myColors.grey,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      backgroundColor: '#f9f9f9',
    },
    cardText: {
      fontSize: 16,
      color: myColors.black,
    },
    total: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      textAlign: 'center',
      color: myColors.violet,
    },
  });
  