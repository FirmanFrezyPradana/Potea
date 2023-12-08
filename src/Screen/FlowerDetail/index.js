import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  Add,
  ArrowLeft,
  Bag2,
  HeartCircle,
  Minus,
  More,
  Share,
  Star1,
} from 'iconsax-react-native';
import {fontType, colors} from '../../assets/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const DetailFlower = ({route}) => {
  const {FlowerId} = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const [selectedFlower, setSelectedFlower] = useState(null);
  const [loading, setLoading] = useState(true);

  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('flower')
      .doc(FlowerId)
      .onSnapshot(documentSnapshot => {
        const flowerData = documentSnapshot.data();
        if (flowerData) {
          console.log('flower data: ', flowerData);
          setSelectedFlower(flowerData);
        } else {
          console.log(`flower with ID ${FlowerId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [FlowerId]);
  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditFlower', {FlowerId});
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('flower')
        .doc(FlowerId)
        .delete()
        .then(() => {
          console.log('Flower deleted!');
        });
      if (selectedFlower?.image) {
        const imageRef = storage().refFromURL(selectedFlower?.image);
        await imageRef.delete();
      }
      console.log('Blog deleted!');
      closeActionSheet();
      setSelectedFlower(null);
      setLoading(false);
      navigation.navigate('Cart');
    } catch (error) {
      console.error(error);
    }
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? colors.blue()
            : colors.grey(0.6),
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.grey(0.6)} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Share color={colors.grey(0.6)} variant="Linear" size={24} />
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color={colors.grey(0.6)}
              variant="Linear"
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 62,
          paddingBottom: 54,
        }}>
        <FastImage
          style={styles.image}
          source={{
            uri: selectedFlower?.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}></FastImage>
        <View
          style={{
            backgroundColor: '#f3f6f4',
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Text style={styles.title}>{selectedFlower?.title}</Text>
            <HeartCircle size="30" color="#01B763" variant="Outline" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              width: 130,
              alignItems: 'center',
            }}>
            <Text style={styles.soldText}>{selectedFlower?.sold} sold</Text>
            <Star1 style={{color: '#01B763'}} variant="Linear" size="24" />
            <Text style={{color: '#000000', fontSize: 16}}>
              {selectedFlower?.star}
            </Text>
          </View>
          <Text
            style={{
              color: colors.black(),
              fontFamily: fontType['Pjs-Bold'],
              fontSize: 20,
            }}>
            Description
          </Text>
          <Text style={styles.description}>{selectedFlower?.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              width: 250,
            }}>
            <Text
              style={{fontSize: 28, color: colors.black(), fontWeight: 'bold'}}>
              Quantity
            </Text>
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
          <View
            style={{
              marginTop: 16,
              marginBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.grey(0.3),
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View>
          <Text>Total Price</Text>
          <Text style={{fontWeight: '800', fontSize: 20}}>
            Rp.{selectedFlower?.price}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: colors.green(),
            paddingHorizontal: 50,
            paddingVertical: 18,
            alignItems: 'center',
            borderRadius: 40,
          }}>
          <Bag2 size="25" color={colors.white()} variant="Bold" />
          <Text
            style={{
              color: colors.white(),
              fontSize: 20,
              fontWeight: '500',
              paddingLeft: 10,
            }}>
            Add To Card
          </Text>
        </TouchableOpacity>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};
export default DetailFlower;

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
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.white(),
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#f3f6f4',
    paddingHorizontal: 24,
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  info: {
    color: colors.grey(0.6),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  category: {
    color: colors.blue(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 12,
  },
  description: {
    color: colors.black(),
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
    textAlign: 'justify',
    letterSpacing: 0.2,
    overflow: 'scroll',
    height: 85,
  },
  title: {
    fontSize: 30,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    textTransform: 'capitalize',
  },
  content: {
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 10,
    lineHeight: 20,
    marginTop: 15,
  },
  soldText: {
    backgroundColor: colors.green(0.1),
    padding: 8,
    borderRadius: 8,
    color: '#01B763',
  },
  cardPlus: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: 100,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#eeeeee',
  },
});
