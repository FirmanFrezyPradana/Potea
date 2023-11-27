import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  LogoutCurve,
  Setting2,
  Tree,
  AddSquare,
} from 'iconsax-react-native';
import React from 'react';
import {fontType, colors} from '../../assets/theme';
import {ProfileData} from '../../../data';

import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Tree size="32" color={colors.green()} variant="Broken" />
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <Setting2 color={colors.black()} variant="Linear" size={24} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 10,
          paddingVertical: 20,
        }}>
        <View style={{gap: 15, alignItems: 'center'}}>
          <Image style={styles.image} source={ProfileData.image} />
          <View style={{gap: 5, alignItems: 'center'}}>
            <Text style={profile.name}>{ProfileData.name}</Text>
            <Text style={profile.info}>
              Member since {ProfileData.createdAt}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.boxProfile}>
            <View style={styles.itemProfile}>
              <Text>Name :</Text>
              <Text>{ProfileData.name}</Text>
            </View>
            <View style={styles.itemProfile}>
              <Text>Username :</Text>
              <Text>{ProfileData.username}</Text>
            </View>
            <View style={styles.itemProfile}>
              <Text>Tanggal Lahir :</Text>
              <Text>{ProfileData.tanggalLahir}</Text>
            </View>
            <View style={styles.itemProfile}>
              <Text>Email :</Text>
              <Text>{ProfileData.email}</Text>
            </View>
            <View style={styles.itemProfile}>
              <Text>Telepon :</Text>
              <Text>{ProfileData.telephone}</Text>
            </View>
          </View>
        </View>
        <View style={{gap: 5, alignItems: 'center'}}>
          <TouchableOpacity style={profile.buttonLogout}>
            <LogoutCurve size="25" color={colors.white()} variant="Broken" />
            <Text style={profile.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('AddFlower')}>
        <AddSquare color={colors.white()} variant="Linear" size={20} />
      </TouchableOpacity>
    </View>
  );
};
export default Profile;

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

  floatingButton: {
    backgroundColor: colors.green(),
    padding: 15,
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 50,
    shadowColor: colors.blue(),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
const profile = StyleSheet.create({
  pic: {
    width: 48,
    height: 48,
  },
  name: {
    color: colors.black(),
    fontSize: 20,
    fontFamily: fontType['Pjs-Bold'],
    textTransform: 'capitalize',
  },
  info: {
    fontSize: 12,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(),
  },
  buttonLogout: {
    paddingHorizontal: 30,
    paddingVertical: 14,
    backgroundColor: colors.green(),
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.white(),
  },
});
