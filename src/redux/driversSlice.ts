import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchDrivers,
  fetchDriverDetails,
  fetchDriverRaces,
} from '../api/ergastApi';
import {Driver} from '../types/driver';
import {Race} from '../types/race';

interface DriversState {
  list: Driver[];
  total: number;
  currentPage: number;
  loading: boolean;
  selectedDriver: Driver | null;
  races: Race[];
  error: string | null;
}

const initialState: DriversState = {
  list: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
  selectedDriver: null,
  races: [],
};

export const loadDrivers = createAsyncThunk(
  'drivers/loadDrivers',
  async (page: number) => {
    const data = await fetchDrivers(page);

    return {
      drivers: data.DriverTable.Drivers,
      total: parseInt(data.total),
    };
  },
);

export const loadDriverDetails = createAsyncThunk(
  'drivers/loadDriverDetails',
  fetchDriverDetails,
);
export const loadDriverRaces = createAsyncThunk(
  'drivers/loadDriverRaces',
  fetchDriverRaces,
);

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSelectedDriver(state, action: PayloadAction<Driver | null>) {
      state.selectedDriver = action.payload;
    },
    setRaces(state, action: PayloadAction<Race[]>) {
      state.races = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadDrivers.pending, state => {
        state.loading = true;
      })
      .addCase(loadDrivers.fulfilled, (state, action) => {
        state.list = action.payload.drivers;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(loadDrivers.rejected, state => {
        state.error = 'Error getting drivers';
        state.loading = false;
      })
      /*  */
      .addCase(loadDriverDetails.pending, state => {
        state.loading = true;
        state.selectedDriver = null;
      })
      .addCase(loadDriverDetails.fulfilled, (state, action) => {
        state.selectedDriver = action.payload;
        state.loading = false;
      })
      .addCase(loadDriverDetails.rejected, state => {
        state.error = 'Error getting details data';
        state.loading = false;
      })
      /*  */
      .addCase(loadDriverRaces.pending, state => {
        state.loading = true;
        state.races = [];
      })
      .addCase(loadDriverRaces.fulfilled, (state, action) => {
        state.races = action.payload;
        state.loading = false;
      })
      .addCase(loadDriverRaces.rejected, state => {
        state.error = 'Error getting races data';
        state.loading = false;
      });
  },
});

export const {setLoading, setSelectedDriver, setRaces, setPage} =
  driversSlice.actions;

export const driversReducer = driversSlice.reducer;
