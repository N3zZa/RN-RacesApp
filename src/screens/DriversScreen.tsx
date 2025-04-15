import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {loadDrivers, setPage} from '../redux/driversSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import {Driver} from '../types/driver';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Drivers'>;

export const DriversScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {list, currentPage, total, loading, error} = useAppSelector(
    state => state.drivers,
  );

  useEffect(() => {
    dispatch(loadDrivers(currentPage));
  }, [currentPage, dispatch]);

  const handleNext = () => {
    if (currentPage * 30 < total) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const renderItem = ({item}: {item: Driver}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DriverDetails', {driverId: item.driverId})
      }
      style={styles.driverItem}>
      <Text
        style={
          styles.driverName
        }>{`${item.givenName} ${item.familyName}`}</Text>
    </TouchableOpacity>
  );

  if (error !== null) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList<Driver>
          data={list}
          keyExtractor={item => item.driverId}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
      <View style={styles.pagination}>
        <Button
          title="Prev"
          onPress={handlePrev}
          disabled={currentPage === 1 || loading}
        />
        <Text style={styles.pageText}>Page {currentPage}</Text>
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentPage * 30 >= total || loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  listContent: {paddingBottom: 20},
  driverItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  driverName: {fontSize: 16},
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  pageText: {fontSize: 16},
});
