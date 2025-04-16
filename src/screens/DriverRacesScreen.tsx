import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {loadDriverRaces} from '../redux/driversSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type DriverRacesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverRaces'
>;

// Driver races screen
export const DriverRacesScreen: React.FC<DriverRacesScreenProps> = ({
  route,
}) => {
  const {driverId} = route.params;
  const dispatch = useAppDispatch();
  const {races, loading} = useAppSelector(state => state.drivers);

  // calling loadDriverRaces using driverId
  useEffect(() => {
    dispatch(loadDriverRaces(driverId));
  }, []);

  const renderRace = ({item}: any) => {
    const result = item.Results?.[0];

    return (
      <View style={styles.row}>
        <Text style={[styles.cell]}>{item.season}</Text>
        <Text style={styles.cell}>{item.raceName}</Text>
        <Text style={styles.cell}>{item.Circuit.circuitName}</Text>
        <Text style={styles.cell}>{item.date}</Text>
        <Text style={styles.cell}>{result?.position || '-'}</Text>
        <Text style={styles.cell}>{result?.Constructor.name || '-'}</Text>
      </View>
    );
  };
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Race Results</Text>
      <ScrollView horizontal style={styles.scrollContainer}>
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.cell, styles.headerCell]}>Season</Text>
            <Text style={[styles.cell, styles.headerCell]}>Race</Text>
            <Text style={[styles.cell, styles.headerCell]}>Circuit</Text>
            <Text style={[styles.cell, styles.headerCell]}>Date</Text>
            <Text style={[styles.cell, styles.headerCell]}>Position</Text>
            <Text style={[styles.cell, styles.headerCell]}>Constructor</Text>
          </View>
          <FlatList
            data={races}
            keyExtractor={item => item.round + item.season + item.date}
            renderItem={renderRace}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
  },
  table: {
    minWidth: 420,
    overflow: 'scroll',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    padding: 6,
    fontSize: 12,
    borderRightWidth: 1,
    borderColor: '#ccc',
    width: 85,
  },
  header: {
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    fontWeight: 'bold',
    marginVertical: 'auto',
  },
});
