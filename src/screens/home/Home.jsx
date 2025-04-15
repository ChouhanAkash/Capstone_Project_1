import {
  View,
  Text,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AppWrapper from '../../components/AppWrapper';
import Geolocation from 'react-native-geolocation-service';
import { apiKey } from '../../utils/Keys/Keys';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { myColors } from '../../utils/themes/Colors';
import CustomButton from '../../components/CustomButton';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import HomeTitles from '../../components/HomeTitles';
import ProductList from '../../components/ProductList';
import { categories, products } from '../../utils/mockdata/Groceries';
import GridCategories from '../../components/GridCategories';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
    GoogleSignin.configure();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Trexo App',
          message: 'Trexo App needs access to your location so you can access location-based products.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsLocationModal(false);
        getCurrentLocation();
      } else {
        setIsLocationModal(true);
        console.log('Location permission denied');
        setLoading(false);
      }
    } catch (err) {
      console.warn(err);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          const { latitude, longitude } = position.coords;
          setIsLocationModal(false);
          setUserLocation({ latitude, longitude });

          try {
            const { data } = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            if (data.results && data.results.length > 0) {
              const fetchedAddress = data.results[0].formatted_address;
              setAddress(fetchedAddress);

              const savedData = await EncryptedStorage.getItem('key');
              if (savedData) {
                const parsed = JSON.parse(savedData);
                await EncryptedStorage.setItem('key', JSON.stringify({ ...parsed, address: fetchedAddress }));
              }
            } else {
              setAddress('Address not found');
            }
          } catch (error) {
            console.error(' Geocode API Error:', error);
            setAddress('Error fetching address');
          }
        }
        setLoading(false);
      },
      error => {
        setIsLocationModal(true);
        console.log(' Location Error:', error.code, error.message);
        setAddress('Location not available');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <AppWrapper>
      <AppHeader address={address} loading={loading} search={search} onSearch={handleSearch} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <AppBody filteredProducts={filteredProducts} />
      </ScrollView>
      <AppFooter isLocationModal={isLocationModal} onPress={requestLocationPermission} />
    </AppWrapper>
  );
};

const AppHeader = ({ address, loading, search, onSearch }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={40} />
        </TouchableOpacity>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.deliveryText}>Delivery in 10 minutes</Text>
          {loading ? (
            <Text style={{ color: 'black' }}>Fetching location...</Text>
          ) : (
            <Text numberOfLines={1} style={styles.addressText}>
              {`Home - ${address}`}
            </Text>
          )}
        </View>
        <AntDesign name="solution1" size={35} />
      </View>

      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={25} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="black"
          value={search}
          onChangeText={onSearch}
        />
      </View>
    </View>
  );
};

const AppBody = ({ filteredProducts }) => {
  const banners = [
    'https://thumbs.dreamstime.com/b/supermarket-shopping-cart-groceries-store-aisle-copy-space-banner-concept-grocery-315608951.jpg',
    'https://static.vecteezy.com/system/resources/previews/038/046/770/non_2x/horizontal-sale-banner-template-for-vegetarian-or-organic-product-vector.jpg',
    'https://c8.alamy.com/comp/H1T1N0/grocery-shopping-banner-with-consumer-holding-a-bag-filled-with-vegetables-H1T1N0.jpg',
  ];
  const renderBanners = ({ item }) => {
    return (
      <Image
        resizeMode="contain"
        source={{ uri: item }}
        style={styles.bannerImage}
      />
    );
  };
  return (
    <View style={styles.bodyContainer}>
      <FlatList
        data={banners}
        pagingEnabled
        horizontal
        renderItem={renderBanners}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />
      <HomeTitles title="Your Go-to items" subtitle="See All" />
      <ProductList data={filteredProducts} />
      <HomeTitles title="Explore By Categories" subtitle="See All" />
      <GridCategories data={categories} />
    </View>
  );
};

const AppFooter = ({ onPress, isLocationModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLocationModal}
      onRequestClose={() => { }}>
      <View style={styles.footerModalContainer}>
        <View style={styles.footerModalContent}>
          <View style={styles.locationIconCenter}>
            <Ionicons name="location" size={60} color={myColors.black} />
          </View>
          <Text style={styles.locationTitle}>Location Permission is OFF</Text>
          <Text style={styles.locationDesc}>
            Please enable location permission for better delivery experience
          </Text>
          <CustomButton title="continue" onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    gap: 10,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  headerTextWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  deliveryText: {
    color: myColors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  addressText: {
    color: myColors.grey,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  searchContainer: {
    borderWidth: 1.5,
    marginHorizontal: 15,
    borderColor: myColors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchInput: {
    padding: 10,
    flex: 1,
    color: 'black',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bannerImage: {
    height: 200,
    width: responsiveWidth(90),
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },
  footerModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerModalContent: {
    flex: 0.5,
    backgroundColor: myColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 10,
  },
  locationIconCenter: {
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: myColors.black,
    textAlign: 'center',
  },
  locationDesc: {
    textAlign: 'center',
    color: myColors.black,
    fontSize: 14,
    opacity: 0.8,
    top: -5,
    marginBottom: 10,
  },
  logoutBtn: {
    backgroundColor: 'crimson',
    padding: 12,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});





