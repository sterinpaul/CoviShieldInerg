import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CovidData } from '../types/index';

interface CovidState {
  data: CovidData[];
  currentData: CovidData[];
  selectedState: string;
  loading: boolean;
  error: string | null;
}

const initialState: CovidState = {
  data: [],
  currentData:[],
  selectedState: 'All States',
  loading: false,
  error: null,
};

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {
    setCovidData: (state, action: PayloadAction<CovidData[]>) => {
      state.data = action.payload;
    },
    setCurrentCovidData: (state, action: PayloadAction<CovidData[]>) => {
      state.currentData = action.payload;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCovidData, setCurrentCovidData, setSelectedState, setLoading, setError } = covidSlice.actions;
export default covidSlice.reducer;