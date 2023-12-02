import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fontType, colors} from '../assets/theme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
const ItemMyCart = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate('FlowerDetail', {FlowerId: item.id})}>
      <FastImage
        style={styles.pic}
        source={{
          uri: item?.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{gap: 5, flex: 1}}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>Rp. {item.price}</Text>
            <Text style={styles.cardcategory}>{item.category?.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemMyCart;

const styles = StyleSheet.create({
  pic: {width: 100, height: 100, borderRadius: 15},
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
  cardcategory: {
    textAlign: 'center',
    width: 70,
    height: 25,
    borderRadius: 20,
    color: colors.white(),
    backgroundColor: colors.green(),
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
