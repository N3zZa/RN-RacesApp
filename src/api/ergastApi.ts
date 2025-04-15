import axios from 'axios';

const BASE_URL = 'https://ergast.com/api/f1';

export const fetchDrivers = async (page: number) => {
  const limit = 30;
  const offset = (page - 1) * limit;
  const response = await axios.get(`${BASE_URL}/drivers.json`, {
    params: {limit, offset},
  });
  return response.data.MRData;
};

export const fetchDriverDetails = async (driverId: string) => {
  const response = await axios.get(`${BASE_URL}/drivers/${driverId}.json`);
  return response.data.MRData.DriverTable.Drivers[0];
};

export const fetchDriverRaces = async (driverId: string) => {
  const response = await axios.get(
    `${BASE_URL}/drivers/${driverId}/results.json`,
  );
  return response.data.MRData.RaceTable.Races;
};
