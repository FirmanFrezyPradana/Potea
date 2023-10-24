import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import {fontType, colors} from './src/assets/theme';
import {
  Notification,
  SearchNormal,
  Heart,
  Filter,
  StarSlash,
  Star1,
} from 'iconsax-react-native';
import {FlowerList, CategoryFlowerList} from './data';
import {ListHorizontal} from './src/components';
import ItemSmallVertikal from './src/components/ListSmallVertikal';
const widthScreen = Dimensions.get("window").width;
const ItemCategory = ({item, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{...category.title, color}}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};
const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.green() : colors.grey();
    const backgroundColor =
      item.id === selected ? colors.green() : colors.white;
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
        backgroundColor={backgroundColor}
      />
    );
  };
  return (
    <FlatList
      data={CategoryFlowerList}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const ListFlower = () => {
  const horizontalData = FlowerList.slice(0, 4);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.ListFlower}>
        <ListHorizontal data={horizontalData} />
      </View>
    </ScrollView>
  );
};
const ListSmallFlower = () => {
  const verticalData = FlowerList.slice();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={itemVertikal.cardContainer}>
        {verticalData.map((item, index) => (
          <ItemSmallVertikal item={item} key={index} widthItem={widthScreen/2} />
        ))}
        {/* <ListVertikal data={verticalData} /> */}
      </View>
    </ScrollView>
  );
};
export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.sizeBox} />
        <View style={styles.header}>
          <View style={styles.HeaderImgandprofile}>
            <Image
              style={styles.image}
              source={require('./src/assets/images/img_profile.png')}
            />
            <View style={styles.Profile}>
              <Text>Good Morning 👋</Text>
              <Text style={{fontWeight: 'bold'}}>FIRMAN FREZY PRADANA</Text>
            </View>
          </View>
          <View style={styles.headericon}>
            <Notification color={colors.black()} variant="Linear" size={28} />
            <Heart color={colors.black()} variant="Linear" size={28} />
          </View>
        </View>
        <View style={styles.sizeBox} />
        <View style={styles.box}>
          <View style={styles.boxSearch}>
            <SearchNormal size={24} color="#BDBDBD" />
            <TextInput size={14} style={{left: 10}} placeholder="Search" />
          </View>
          <Filter size={24} color="#01B763" />
        </View>
        <View style={styles.sizeBox} />
        <View style={styles.specialOffer}>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#212121'}}>
            Special Offers
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#01B763'}}>
            See All
          </Text>
        </View>
        <View style={styles.sizeBox} />
        <ListFlower />
        <View style={styles.sizeBox} />

        <View style={styles.specialOffer}>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#212121'}}>
            Most Popular
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#01B763'}}>
            See All
          </Text>
        </View>
        <View style={category.listCategory}>
          <FlatListCategory />
        </View>
        <ListSmallFlower />
      </View>
    </ScrollView>
  );
}
const itemVertikal = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent:'center'
  },
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
  cardPricePopular: {
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#01B763',
  },
  cardImagePopular: {
    height: 170,
    width: 170,
    objectFit: 'contain',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
  },
  cardTitlePopular: {
    marginTop: 10,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: colors.black(),
  },
});
const category = StyleSheet.create({
  listCategory: {
    paddingVertical: 24,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#01B763',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    color: '#01B763',
  },
});
const itemHorizontal = StyleSheet.create({
  contentVertical: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  cardTitlePopular: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: colors.black(),
  },
  cardPricePopular: {
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#01B763',
  },
  cardImagePopular: {
    height: 170,
    width: 170,
    objectFit: 'contain',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
  },
  cardContentPopular: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 182,
    height: 240,
  },
  cardInfoPopular: {
    height: '100%',
    maxWidth: '100%',
  },
  cardIconPopular: {
    borderColor: colors.white(),
    borderRadius: 5,
    paddingHorizontal: 3,
    paddingVertical: 5,
    right: 10,
    position: 'absolute',
    zIndex: 1,
  },
  cardItem: {
    width: '100%',
  },
  cardImage: {
    height: 240,
    width: 240,
    objectFit: 'contain',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
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
    fontSize: 24,
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
const styles = StyleSheet.create({
  ListFlower: {
    paddingVertical: 10,
    gap: 10,
  },
  specialOffer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    height: 56,
    backgroundColor: '#F5F5F5',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  boxSearch: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    Color: '#BDBDBD',
  },
  sizeBox: {
    height: 24,
  },
  container: {
    paddingHorizontal: 12,
  },
  image: {
    width: 48,
    height: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  HeaderImgandprofile: {
    fontFamily: fontType['Pjs-SemiBold'],
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
  },
  headericon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Profile: {
    marginLeft: 16,
  },
});
