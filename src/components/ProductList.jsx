// import {View, Text, Image} from 'react-native';
// import React from 'react';
// import {FlatList} from 'react-native-gesture-handler';
// import {myColors} from '../utils/themes/Colors';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// const ProductList = ({data}) => {
//   const renderProducts = ({item, index}) => {
//     return (
//       <View
//         style={{
//           height: 230,
//           width: 160,
//           borderRadius: 10,
//           borderWidth:2,
//           borderColor:'#E3E3E3'
//         }}>
//         <Image
//           resizeMode="contain"
//           source={{uri: item.image}}
//           style={{
//             flex: 0.55,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             backgroundColor: myColors.white,
//           }}
//         />
//         <View
//           style={{
//             flex: 0.4,
//             paddingHorizontal: 10,
//             paddingTop: 5,
//             gap: 5,
//             backgroundColor: myColors.white,
//           }}>
//           <Text  numberOfLines={1} style={{fontSize:15,color:myColors.black,fontWeight:'500'}}>{item.name}</Text>
//           <Text style={{fontSize:13,color:myColors.black,fontWeight:'400'}}>{item.grams} grams</Text>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}>
//             <View style={{top:-7}}>
//               <Text  style={{color:myColors.black,fontSize:13,textDecorationLine:'line-through'}}>₹ {item.price}</Text>
//               <Text style={{color:'#99267c',fontSize:16,fontWeight:'600'}}>₹ {item.discounted_price}</Text>
//             </View>
//             <AntDesign name="plussquareo" color='#FC0965' size={28} />
//           </View>
//         </View>
//       </View>
//     );
//   };
//   return (
//     <View style={{marginTop: 10}}>
//       <FlatList
//         showsHorizontalScrollIndicator={false}
//         ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
//         horizontal
//         data={data}
//         renderItem={renderProducts}
//       />
//     </View>
//   );
// };

// export default ProductList;


import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useDebugValue} from 'react';
import { myColors } from '../utils/themes/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, removeProduct} from '../redux/CartSlice';
const ProductList = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cart);

  const handleAddToCart = item => {
    dispatch(addProduct(item));
  };

  const handleRemoveFromCart = item => {
    dispatch(removeProduct(item));
  };

  const renderProducts = ({item, index}) => {
    const inStore = cartStore.some(val => val.name == item.name);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {product: item})}
        style={{
          height: 230,
          width: 160,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#E3E3E3',
        }}>
        <Image
          resizeMode="contain"
          source={{uri: item.image}}
          style={{
            flex: 0.55,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: myColors.white,
          }}
        />
        <View
          style={{
            flex: 0.4,
            paddingHorizontal: 10,
            paddingTop: 5,
            gap: 5,
            backgroundColor: myColors.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text
            style={{fontSize: 15, color: myColors.black, fontWeight: '500'}}>
            {item.name}
          </Text>
          <Text
            style={{fontSize: 13, color: myColors.black, fontWeight: '400'}}>
            {item.grams} grams
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: myColors.black,
                  fontSize: 13,
                  textDecorationLine: 'line-through',
                }}>
                ₹ {item.price}
              </Text>
              <Text style={{color: '#99267c', fontSize: 16, fontWeight: '600'}}>
                ₹ {item.discounted_price}
              </Text>
            </View>
            {inStore ? (
              <AntDesign
                name="minussquare"
                onPress={() => handleRemoveFromCart(item)}
                size={28}
                color={'#FC0965'}
              />
            ) : (
              <AntDesign
                name="plussquareo"
                onPress={() => handleAddToCart(item)}
                size={28}
                color={'#FC0965'}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{marginTop: 10}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
        horizontal
        data={data}
        renderItem={renderProducts}
      />
    </View>
  );
};

export default ProductList;
