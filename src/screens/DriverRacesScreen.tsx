import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {loadDriverRaces} from '../redux/driversSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';

type DriverRacesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DriverRaces'
>;

export const DriverRacesScreen: React.FC<DriverRacesScreenProps> = ({
  route,
}) => {
  const {driverId} = route.params;
  const dispatch = useAppDispatch();
  const {races, loading} = useAppSelector(state => state.drivers);

  useEffect(() => {
    dispatch(loadDriverRaces(driverId));
  }, []);
  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={races}
          keyExtractor={item => item.round + item.season + item.date}
          renderItem={({item}) => (
            <View>
              <Text>{item.raceName}</Text>
              <Text>
                {item.Circuit.circuitName} - {item.date}
              </Text>
            </View>
          )}
        />
      )}
    </>
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
