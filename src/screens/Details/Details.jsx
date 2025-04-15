import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import AppWrapper from '../../components/AppWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { myColors } from '../../utils/themes/Colors';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProduct,
  decrementQuantity,
  incrementQuantity,
} from '../../redux/CartSlice';

const Details = ({route}) => {
  const product = route?.params?.product;
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cart);
  return (
    <AppWrapper>
      <StatusBar backgroundColor={myColors.white} barStyle="dark-content" />
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppBody data={product} cartData={cartStore} />
      </ScrollView>
      <AppFooter data={product} cartData={cartStore} />
    </AppWrapper>
  );
};

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={25} color={myColors.black} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="search-outline" size={25} color={myColors.black} />
      </TouchableOpacity>
    </View>
  );
};

const AppBody = ({data, cartData}) => {
  const dispatch = useDispatch();
  const [isOpened, setisOpened] = useState(false);

  const handleAddToCart = () => {
    dispatch(addProduct(data));
  };
  const handleDescription = () => {
    setisOpened(!isOpened);
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(data));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(data));
  };

  const isInCart = cartData.find(product => product.name == data.name);

  return (
    <View style={styles.bodyContainer}>
      <Image
        resizeMode="cover"
        style={styles.productImage}
        source={{
          uri: data.image,
        }}
      />
      <View style={styles.productInfoContainer}>
        <Text style={styles.productTitle}>{data.name}</Text>
        <View style={styles.seeAllContainer}>
          <Text
            style={styles.seeAllText}>{`See all ${data.name} Products`}</Text>
          <Ionicons name="chevron-forward-outline" size={17} color="red" />
        </View>
        <Text style={styles.productWeight}>{data.grams} grams</Text>
        <View style={styles.priceContainer}>
          <View style={styles.priceDetails}>
            <Text style={styles.productPrice}>₹ {data.discounted_price}</Text>
            <Text style={styles.originalPrice}>₹ {data.price}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {data.discount_percentage}% OFF
              </Text>
            </View>
          </View>

          {isInCart ? (
            <View style={styles.quantityContainer}>
              <AntDesign
                name="plussquare"
                onPress={handleIncrement}
                size={25}
                color={myColors.white}
              />
              <Text style={styles.quntity}>{isInCart.quantity}</Text>
              <AntDesign
                name="minussquare"
                onPress={handleDecrement}
                size={25}
                color={myColors.white}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleAddToCart}
              style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.productDescriptionContainer}>
        <Text style={styles.productDescriptionTitle}>Product Description</Text>
        <Ionicons
          onPress={handleDescription}
          name="chevron-down-outline"
          size={20}
          color="red"
        />
      </View>
      {isOpened && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descText}>{data?.description}</Text>
        </View>
      )}
    </View>
  );
};

const AppFooter = ({data, cartData}) => {
  const navigation=useNavigation()
  const isInCart = cartData.find(product => product.name == data.name);
  return (
    <View style={{backgroundColor: '#E3E3E3'}}>
      {isInCart && (
        <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.btnCart}>
          <Text style={styles.cart}>View Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bodyContainer: {
    backgroundColor: '#E3E3E3',
    flex: 1,
  },
  productImage: {
    height: 300,
    backgroundColor: '#E3E3E3',
  },
  productInfoContainer: {
    padding: 15,
    gap: 5,
    backgroundColor: myColors.white,
  },
  productTitle: {
    fontSize: 16.5,
    color: myColors.black,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14.5,
    color: 'red',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  productWeight: {
    fontSize: 14,
    color: myColors.grey,
    fontWeight: '400',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
  },
  priceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  productPrice: {
    fontSize: 19,
    color: myColors.black,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  originalPrice: {
    fontSize: 16,
    color: myColors.grey,
    fontWeight: '400',
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  discountText: {
    fontSize: 14,
    color: myColors.white,
    fontWeight: '500',
    letterSpacing: 0,
  },
  addButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: {
    color: myColors.white,
    fontWeight: '600',
  },
  productDescriptionContainer: {
    padding: 15,
    marginTop: 9,
    backgroundColor: myColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productDescriptionTitle: {
    fontSize: 16,
    color: myColors.black,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'red',
  },
  quntity: {
    fontSize: 16,
    color: myColors.white,

    paddingHorizontal: 5,
  },
  descText: {
    fontSize: 13,
    color: myColors.black,
    lineHeight: 24,
  },
  descriptionContainer: {
    padding: 15,
    marginTop: 9,
    backgroundColor: myColors.white,
  },
  btnCart: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    bottom: 10,
    marginHorizontal: 10,
  },
  cart: {
    color: myColors.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Details;