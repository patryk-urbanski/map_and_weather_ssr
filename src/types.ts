export interface ILocationData {
  name: string;
  country: string;
  lon: number;
  lat: number;
}

export interface IWeatherData {
  location: ILocationData;
  current: {
    temp_c: number;
  };
}

export interface ILocation {
  _id: string;
  name: string;
}
