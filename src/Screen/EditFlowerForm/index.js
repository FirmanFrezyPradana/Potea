import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ArrowLeft, Tree} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from '../../assets/theme';
import axios from 'axios';

const EditFlowerForm = ({route}) => {
  const {FlowerId} = route.params;
  const dataCategory = [
    {id: 1, name: 'Monstera'},
    {id: 2, name: 'Aloe'},
    {id: 3, name: 'Palm'},
    {id: 4, name: 'Yucca'},
    {id: 5, name: 'cactus'},
    {id: 6, name: 'Sansevieria'},
    {id: 7, name: 'Palm'},
  ];
  const [FlowerData, setFlowerData] = useState({
    title: '',
    category: {},
    price: '',
    totalStar: 0,
    totalSold: 0,
    description: '',
  });

  const handleChange = (key, value) => {
    setFlowerData({
      ...FlowerData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getFlowerById();
  }, [FlowerId]);

  const getFlowerById = async () => {
    try {
      const response = await axios.get(
        `https://65656c68eb8bb4b70ef185f2.mockapi.io/wocoapp/Flower/${FlowerId}`,
      );
      setFlowerData({
        title: response.data.title,
        price: response.data.price,
        category: {
          id: response.data.category.id,
          name: response.data.category.name,
        },
        description: response.data.description,
      });
      setImage(response.data.image);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `https://65656c68eb8bb4b70ef185f2.mockapi.io/wocoapp/Flower/${FlowerId}`,
          {
            title: FlowerData.title,
            category: FlowerData.category,
            price: FlowerData.price,
            image,
            totalStar: FlowerData.totalStar,
            totalSold: FlowerData.totalSold,
            description: FlowerData.description,
          },
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
      navigation.navigate('Cart');
    } catch (e) {
      console.log(e);
    }
  };
  console.log(FlowerId);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.black()} variant="Linear" size={24} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Tree size="32" color={colors.green()} variant="Broken" />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <Text style={styles.title}>Title</Text>
        <View style={textInput.borderDashed}>
          <TextInput
            value={FlowerData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
          />
        </View>
        <Text style={styles.title}>Price</Text>
        <View style={textInput.borderDashed}>
          <TextInput
            value={FlowerData.price}
            onChangeText={text => handleChange('price', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.title}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.title}>Image</Text>
        <View style={[textInput.borderDashed]}>
          <TextInput
            value={image}
            onChangeText={text => setImage(text)}
            placeholderTextColor={colors.grey(0.6)}
            style={textInput.title}
          />
        </View>
        <Text style={styles.title}>Category</Text>
        <View style={{}}>
          <View style={category.container}>
            {dataCategory.map((item, index) => {
              const bgColor =
                item.id === FlowerData.category.id
                  ? colors.green()
                  : colors.grey(0.08);
              const color =
                item.id === FlowerData.category.id
                  ? colors.white()
                  : colors.grey();
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    handleChange('category', {id: item.id, name: item.name})
                  }
                  style={[category.item, {backgroundColor: bgColor}]}>
                  <Text style={[category.name, {color: color}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <Text style={styles.title}>Description</Text>
        <View style={[textInput.borderDashed, {minHeight: 250}]}>
          <TextInput
            value={FlowerData.description}
            onChangeText={text => handleChange('description', text)}
            placeholderTextColor={colors.grey(0.6)}
            multiline
            style={textInput.content}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.green()} />
        </View>
      )}
    </View>
  );
};

export default EditFlowerForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.grey(),
  },
  bottomBar: {
    backgroundColor: colors.white(),
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 20,
    shadowColor: colors.black(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.green(),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black(0.4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const textInput = StyleSheet.create({
  borderDashed: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    borderColor: colors.green(0.4),
  },
  title: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    padding: 0,
  },
  description: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    padding: 0,
  },
});
const category = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.6),
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
  },
});
