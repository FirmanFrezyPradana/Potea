import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fontType, colors} from '../assets/theme';
import {Heart, Star1} from 'iconsax-react-native';
const ItemSmallVertikal = ({item, variant, onPress, widthItem}) => {
  return (
    <View style={{...itemVertikal.cardItem,  width : widthItem-40}}>
      <View style={itemVertikal.cardContent}>
        <View style={itemVertikal.cardInfo}>
          <View style={itemVertikal.cardIcon}>
            <TouchableOpacity onPress={onPress}>
              <Heart style={{color: '#01B763'}} variant={variant} size={24} />
            </TouchableOpacity>
          </View>
          <Image style={itemVertikal.cardImage} source={item.image} />
          <Text style={itemVertikal.cardTitle}>{item.title}</Text>
          <View style={itemVertikal.cardRating}>
            <Star1 style={{color: '#01B763'}} variant="Linear" size="24" />
            <Text>4.5 </Text>
            <Text>44 sold</Text>
          </View>
          <Text style={itemVertikal.cardPrice}>Rp.{item.price}</Text>
        </View>
      </View>
    </View>
  );
};
export default ItemSmallVertikal;

const itemVertikal = StyleSheet.create({

  cardRating: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    fontSize: 15,
  },
  cardIcon: {
    borderColor: colors.white(),
    borderRadius: 5,
    padding: 10,
    right: 10,
    position: 'absolute',
    zIndex: 1,
  },
  cardPrice: {
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#01B763',
  },
  cardImage: {
    maxHeight: 170,
    maxWidth: 150,
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
});
