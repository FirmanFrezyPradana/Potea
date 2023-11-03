import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Trash, Add, Minus} from 'iconsax-react-native';
import React, { useState } from 'react';
import {fontType, colors} from '../assets/theme';

const ItemMyCart = ({item}) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <View style={styles.cardItem}>
      <Image style={styles.cardImage} source={item.image} />
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{gap: 5, flex: 1}}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>Rp. {item.price}</Text>
          </View>
          <Trash size={30} style={styles.iconTrsh} variant="Linear" />
        </View>
        <View style={styles.cardPlus}>
          <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
            <Minus size={25} variant="Linear" color={colors.green()} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: 10,
              color: colors.green(),
            }}>
            {quantity}
          </Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Add size={25} variant="Linear" color={colors.green()} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemMyCart;
const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  iconTrsh: {
    color: colors.grey(),
    top: 55,
  },
  cardItem: {
    backgroundColor: colors.blue(0.03),
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardPrice: {
    fontSize: 15,
    color: '#01B763',
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.6),
  },
  cardImage: {
    margin: 10,
    width: 94,
    height: 94,
    borderRadius: 20,
    resizeMode: 'cover',
    backgroundColor: colors.grey(0.1),
  },
  cardPlus: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: 90,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});
