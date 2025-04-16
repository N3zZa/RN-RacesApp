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
import {useAppDispatch, useAppSelector} from '../hooks/redux';
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
        /* navigating with the params transfer driver ID */
        navigation.navigate('DriverDetails', {driverId: item.driverId})
      }>
      <View style={styles.tableRow}>
        <Text style={styles.cell}>{item.givenName}</Text>
        <Text style={styles.cell}>{item.familyName}</Text>
        <Text style={styles.cell}>{item.nationality}</Text>
      </View>
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
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Surname</Text>
        <Text style={styles.headerCell}>Nationality</Text>
      </View>
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
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  pageText: {fontSize: 16},
});
