export interface CovidData {
  id: string;
  state: string;
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
  latitude: number;
  longitude: number;
}

export interface RootState {
  covid: {
    data: CovidData[];
    currentData: CovidData[];
    selectedState: string;
    loading: boolean;
    error: string | null;
  };
}