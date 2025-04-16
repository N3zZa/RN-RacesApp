import React, {useEffect} from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {loadDriverDetails} from '../redux/driversSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type DriverDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverDetails'
>;

// Driver details screen
export const DriverDetailsScreen: React.FC<DriverDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {driverId} = route.params;
  const dispatch = useAppDispatch();
  const driver = useAppSelector(state => state.drivers.selectedDriver);

  // calling loadDriverDetails using driverId
  useEffect(() => {
    dispatch(loadDriverDetails(driverId));
  }, []);

  return (
    <View style={styles.container}>
      {!driver ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.name}>
            {driver.givenName} {driver.familyName}
          </Text>
          <Text style={styles.label}>
            Nationality: <Text style={styles.value}>{driver.nationality}</Text>
          </Text>
          <Text style={styles.label}>
            Date of Birth:{' '}
            <Text style={styles.value}>{driver.dateOfBirth}</Text>
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="View Races"
              /* navigating with the params transfer driver ID */
              onPress={() => navigation.navigate('DriverRaces', {driverId})}
              color="#007AFF"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#222',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  value: {
    fontWeight: '600',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '60%',
  },
});
