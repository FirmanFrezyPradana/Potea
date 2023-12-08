import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {SearchNormal1, Tree} from 'iconsax-react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {fontType, colors} from '../../assets/theme';
import ItemMyCart from '../../components/ListMyCart';
import firestore from '@react-native-firebase/firestore';

const ListSmallMyCart = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [FlowerData, setFlowerData] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('flower')
      .onSnapshot(querySnapshot => {
        const flowers = [];
        querySnapshot.forEach(documentSnapshot => {
          flowers.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setFlowerData(flowers);
        setLoading(false);
      });
    return () => subscriber();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('flower')
        .onSnapshot(querySnapshot => {
          const flowers = [];
          querySnapshot.forEach(documentSnapshot => {
            flowers.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setFlowerData(flowers);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.listBlog}>
        <View style={styles.listCard}>
          <View style={{paddingVertical: 10, gap: 10}}>
            {loading ? (
              <ActivityIndicator size={'large'} color={colors.blue()} />
            ) : (
              FlowerData.map((item, index) => (
                <ItemMyCart item={item} key={index} />
              ))
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const MyCart = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Tree size="32" color={colors.green()} variant="Broken" />
          <Text style={styles.headerText}>My Cart</Text>
        </View>
        <SearchNormal1 color={colors.black()} variant="Linear" size={24} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
        }}>
        <ListSmallMyCart />
      </ScrollView>
    </View>
  );
};
export default MyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerText: {
    color: colors.black(),
    fontFamily: fontType['Pjs-ExtraBold'],
    fontSize: 23,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.black(),
  },
  boxProfile: {
    height: 300,
    backgroundColor: '#F5F5F5',
    borderWidth: 0,
    flexDirection: 'column',
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    textAlign: '',
  },
  itemProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
});
