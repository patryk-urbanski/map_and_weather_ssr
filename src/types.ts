export interface ILocationData {
  name: string;
  country: string;
  lon: number;
  lat: number;
}

export interface IWeatherData {
  location: ILocationData;
}
