import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CovidData } from '../types/index';

interface CovidState {
  data: CovidData[];
  currentData: CovidData[];
  selectedState: string;
}

const initialState: CovidState = {
  data: [],
  currentData:[],
  selectedState: 'All States',
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
    }
  },
});

export const { setCovidData, setCurrentCovidData, setSelectedState } = covidSlice.actions;
export default covidSlice.reducer;