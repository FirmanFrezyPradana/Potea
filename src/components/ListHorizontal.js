import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Heart, Receipt21} from 'iconsax-react-native';
import {fontType, colors} from '../assets/theme';
import {useNavigation} from '@react-navigation/native';
const ItemHorizontal = ({item, variant, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={itemHorizontal.cardItem}
      onPress={() => navigation.navigate('FlowerDetail', {flowerId: item.id})}>
      <View style={itemHorizontal.cardContent}>
        <View style={itemHorizontal.cardInfo}>
          <View style={itemHorizontal.cardIcon}>
            <TouchableOpacity onPress={onPress}>
              <Heart style={{color: '#01B763'}} variant={variant} size={24} />
            </TouchableOpacity>
          </View>
          <Image style={itemHorizontal.cardImage} source={item.image} />
          <Text style={itemHorizontal.cardTitle}>{item.title}</Text>
          <Text style={itemHorizontal.cardPrice}>Rp.{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListHorizontal = ({data}) => {
  const [like, setLike] = useState([]);
  const toggleLike = itemId => {
    if (like.includes(itemId)) {
      setLike(like.filter(id => id !== itemId));
    } else {
      setLike([...like, itemId]);
    }
  };
  const renderItem = ({item}) => {
    variant = like.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ItemHorizontal
        item={item}
        variant={variant}
        onPress={() => toggleLike(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default ListHorizontal;

const itemHorizontal = StyleSheet.create({
  cardImage: {
    height: 240,
    width: 240,
    objectFit: 'contain',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
  },
  cardItem: {
    width: '240',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240,
    height: 320,
  },

  cardInfo: {
    height: '100%',
    gap: 10,
    maxWidth: '100%',
  },
  cardTitle: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: colors.black(),
  },
  cardPrice: {
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#01B763',
  },
  cardIcon: {
    borderColor: colors.white(),
    borderRadius: 5,
    padding: 10,
    right: 10,
    position: 'absolute',
    zIndex: 1,
  },
});
