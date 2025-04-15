import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import AppWrapper from '../../components/AppWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { myColors } from '../../utils/themes/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from '../../redux/CartSlice';

const Cart = () => {
  const cartStore = useSelector(state => state.cart);

  return (
    <AppWrapper>
      <SafeAreaView style={styles.safeContainer}>
        <AppHeader data={cartStore} />
        <AppBody data={cartStore} />
        <AppFooter data={cartStore} />
      </SafeAreaView>
    </AppWrapper>
  );
};

const AppHeader = ({ data }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color={myColors.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cart ({data.length})</Text>
    </View>
  );
};

const AppBody = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrement = item => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = item => {
    dispatch(decrementQuantity(item));
  };

  const removeItem = item => {
    dispatch(removeProduct(item));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.firstChild}>
        <Image style={styles.img} source={{ uri: item?.image }} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹ {item?.discounted_price}</Text>
        </View>
        <AntDesign
          onPress={() => removeItem(item)}
          name="close"
          size={24}
          color={myColors.black}
        />
      </View>

      <View style={styles.secondChild}>
        <View style={styles.gramsContainer}>
          <Text style={styles.grams}>{item.grams} gms</Text>
          <AntDesign name="down" size={15} color={myColors.violet} />
        </View>

        <View style={styles.quantityContainer}>
          <AntDesign
            name="plussquare"
            onPress={() => handleIncrement(item)}
            size={25}
            color={myColors.white}
          />
          <Text style={styles.quantity}>{item.quantity}</Text>
          <AntDesign
            name="minussquare"
            onPress={() => handleDecrement(item)}
            size={25}
            color={myColors.white}
          />
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const AppFooter = ({ data }) => {
  const navigation = useNavigation();
  const total = data.reduce(
    (sum, item) => sum + item.discounted_price * item.quantity,
    0
  );

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Payment', { total })}
      >
        <Text style={styles.btnText}>Continue to Payment ₹ {total}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#35035C',
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: myColors.white,
    marginLeft: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
  firstChild: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 10,
    gap: 5,
  },
  name: {
    fontSize: 16,
    color: myColors.black,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: myColors.black,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: myColors.violet,
  },
  quantity: {
    fontSize: 16,
    color: myColors.white,
    paddingHorizontal: 5,
  },
  secondChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#E3E3E3',
    marginTop: 10,
    paddingBottom: 10,
  },
  gramsContainer: {
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  grams: {
    fontSize: 13,
    color: myColors.violet,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  btn: {
    backgroundColor: myColors.Violet,
    padding: 15,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    color: myColors.white,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

