import {View, Text} from 'react-native';
import React from 'react';
import {myColors} from '../utils/themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
const HomeTitles = ({title, subtitle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18, fontWeight: '700', color: myColors.black}}>
        {title}
      </Text>
      <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
      <Text style={{fontSize: 15, color: '#FC0965',fontWeight:'600'}}>{subtitle}</Text>
      <Ionicons name='chevron-forward-outline' size={22} color={'#FC0965'}/>
      </View>
    </View>
  );
};

export default HomeTitles;
