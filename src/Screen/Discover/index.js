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
  Dimensions,
} from 'react-native';
import {fontType, colors} from '../../assets/theme';
import {
  Notification,
  SearchNormal,
  Heart,
  Filter,
  StarSlash,
  Star1,
} from 'iconsax-react-native';
import {FlowerList, CategoryFlowerList} from '../../../data';
import {ListHorizontal} from '../../components';
import ItemSmallVertikal from '../../components/ListSmallVertikal';
const widthScreen = Dimensions.get('window').width;
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
const ListSmallFlower = () => {
  const verticalData = FlowerList.slice();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={itemVertikal.cardContainer}>
        {verticalData.map((item, index) => (
          <ItemSmallVertikal
            item={item}
            key={index}
            widthItem={widthScreen / 2}
          />
        ))}
      </View>
    </ScrollView>
  );
};
export default function Discover() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* sizeBox diubah ketinggia */}
        <View style={styles.sizeBox} />
        <View style={styles.box}>
          <View style={styles.boxSearch}>
            <SearchNormal size={24} color="#BDBDBD" />
            <TextInput size={14} style={{left: 10}} placeholder="Search" />
          </View>
          <Filter size={24} color="#01B763" />
        </View>
        <View style={styles.specialOffer}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#212121'}}>
            Recent Search
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
    justifyContent: 'center',
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
const styles = StyleSheet.create({
  ListFlower: {
    paddingVertical: 10,
    gap: 10,
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
    paddingHorizontal: 15,
  },
});
