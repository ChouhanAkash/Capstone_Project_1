import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';

const GridCategories = ({data}) => {
  const renderGridCategory = ({item, index}) => {
    return (
      <View
        style={{
          height: 100,
          width: 70,
          backgroundColor: '#FCECFA',
          margin: '1%',
          borderRadius: 10,
        }}>
        <Image
          style={{height: 80, width: 70, alignItems: 'center'}}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojvB3ax7IoevF0iHij2lbV9XyLvcIN75OOw&s',
          }}
        />
        <Text style={{top: 20}}>{item}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, marginTop: 10}}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{height: 40}}></View>}
        numColumns={4}
        scrollEnabled={false}
        renderItem={renderGridCategory}
        ListFooterComponent={() => <View style={{marginBottom: 40}}></View>}
      />
    </View>
  );
};

export default GridCategories;
