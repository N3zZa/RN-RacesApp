import React, {useEffect} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {loadDriverDetails} from '../redux/driversSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type DriverDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverDetails'
>;

export const DriverDetailsScreen: React.FC<DriverDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {driverId} = route.params;
  const dispatch = useAppDispatch();
  const driver = useAppSelector(state => state.drivers.selectedDriver);

  useEffect(() => {
    dispatch(loadDriverDetails(driverId));
  }, []);

  if (!driver) return <Text>Loading...</Text>;

  return (
    <>
      {!driver ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>
            {driver.givenName} {driver.familyName}
          </Text>
          <Text>Nationality: {driver.nationality}</Text>
          <Text>Date of Birth: {driver.dateOfBirth}</Text>
          <Button
            title="View Races"
            onPress={() => navigation.navigate('DriverRaces', {driverId})}
          />
        </View>
      )}
    </>
  );
};
