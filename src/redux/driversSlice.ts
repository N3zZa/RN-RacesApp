import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchDrivers,
  fetchDriverDetails,
  fetchDriverRaces,
} from '../api/ergastApi';
import {Driver} from '../types/driver';
import {Race} from '../types/race';


/* interface for initialState of the slice */
interface DriversState {
  list: Driver[];
  total: number;
  currentPage: number;
  loading: boolean;
  selectedDriver: Driver | null;
  races: Race[];
  error: string | null;
}

/* initialState of driverSlice */
const initialState: DriversState = {
  list: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
  selectedDriver: null,
  races: [],
};

/* function that load drivets on the main page(drivers page) */
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

/* function that load driver details */
export const loadDriverDetails = createAsyncThunk(
  'drivers/loadDriverDetails',
  fetchDriverDetails,
);
/* function that load races of the driver */
export const loadDriverRaces = createAsyncThunk(
  'drivers/loadDriverRaces',
  fetchDriverRaces,
);

/* redux slice */
export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    /* reducer which changes the page depending on the transmitted page */
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      /* loadDrivers async processing */
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
      /* loadDriverDetails async processing*/
      .addCase(loadDriverDetails.pending, state => {
        state.selectedDriver = null;
      })
      .addCase(loadDriverDetails.fulfilled, (state, action) => {
        state.selectedDriver = action.payload;
      })
      .addCase(loadDriverDetails.rejected, state => {
        state.error = 'Error getting details data';
      })
      /* loadDriverRaces async processing */
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

export const {setPage} =
  driversSlice.actions;

export const driversReducer = driversSlice.reducer;
