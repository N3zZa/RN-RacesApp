import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
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
      <View style={styles.card}>
        <Text style={styles.raceName}>{item.raceName}</Text>
        <Text style={styles.raceLocation}>
          Location: {item.Circuit.Location.country},{' '}
          {item.Circuit.Location.locality}
        </Text>
        <Text style={styles.track}>
          {item.Circuit.circuitName} — {item.date}
        </Text>
        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Position: <Text style={styles.bold}>{result.position}</Text>
            </Text>
            <Text style={styles.resultText}>
              Status: <Text style={styles.bold}>{result.status}</Text>
            </Text>
            <Text style={styles.resultText}>
              Points: <Text style={styles.bold}>{result.points}</Text>
            </Text>
            <Text style={styles.resultText}>
              Position text:{' '}
              <Text style={styles.bold}>{result.positionText}</Text>
            </Text>
            <Text style={styles.resultText}>
              Number: <Text style={styles.bold}>{result.number}</Text>
            </Text>
          </View>
        ) : (
          <Text style={styles.noResult}>No result data</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={races}
          keyExtractor={item => item.round + item.season + item.date}
          renderItem={renderRace}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  raceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  raceLocation: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 0,
    color: '#333',
  },
  track: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultContainer: {
    marginTop: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  noResult: {
    fontStyle: 'italic',
    color: '#999',
  },
  bold: {
    fontWeight: '600',
    color: '#000',
  },
});
