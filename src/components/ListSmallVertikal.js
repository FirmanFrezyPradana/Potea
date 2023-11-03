import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../assets/theme';
import {Heart, Star1} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const ItemSmallVertikal = ({item, variant, onPress, widthItem}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{width: widthItem - 40}}
      onPress={() => navigation.navigate('FlowerDetail', {flowerId: item.id})}>
      <View style={itemVertikal.cardContent}>
        <View style={itemVertikal.cardInfo}>
          <View style={itemVertikal.cardIcon}>
            <TouchableOpacity onPress={onPress}>
              <Heart style={{color: '#01B763'}} variant={variant} size={24} />
            </TouchableOpacity>
          </View>
          <View style={itemVertikal.containerContent}>
            <Image style={itemVertikal.cardImage} source={item.image} />
            <Text style={itemVertikal.cardTitle}>{item.title}</Text>
            <View style={itemVertikal.cardRating}>
              <Star1 style={{color: '#01B763'}} variant="Linear" size="24" />
              <Text style={{color: '#000000', fontSize: 16}}>{item.star}</Text>
              <Text style={itemVertikal.soldText}>{item.sold} sold</Text>
            </View>
            <Text style={itemVertikal.cardPrice}>Rp.{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemSmallVertikal;

const itemVertikal = StyleSheet.create({
  containerContent: {
    justifyContent: 'space-evenly',
  },
  cardRating: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    fontSize: 15,
  },
  cardIcon: {
    padding: 8,
    right: 15,
    top: 10,
    position: 'absolute',
    zIndex: 1,
  },
  cardPrice: {
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#01B763',
  },
  cardImage: {
    maxHeight: 170,
    maxWidth: 160,
    objectFit: 'contain',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: colors.black(),
  },
  soldText: {
    borderWidth: 1,
    borderColor: '#01B763',
    padding: 4,
    borderRadius: 8,
    color: '#01B763',
  },
});
