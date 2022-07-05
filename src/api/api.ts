import useSWR from 'swr';

import { ILocation } from '../components/molecules/location-list/location-list';
import { SUBDIRECTORY_ID } from '../constants';
import { CookieUtils } from '../utils/cookie-utils';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

const key = 'bbd18bad27aa40d9b8b91915220507';
const weatherAPIURL = `http://api.weatherapi.com/v1/current.json?key=${key}`;

const url = 'https://crudcrud.com/api/1eade97e039b4d10b87174f12ee29b9e';

interface IUseGetLocationsResponse {
  locations: ILocation[];
  isLoading: boolean;
  error: any;
  mutate: () => void;
}

export const fetchWeather = (location: string) => {
  return fetch(`${weatherAPIURL}&q=${location}`, {
    method: 'get',
    headers,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

export const updateLocations = (location: string) => {
  const subDirectoryId = CookieUtils.readCookie(SUBDIRECTORY_ID);

  if (!subDirectoryId) {
    throw 'Ups! Something went wrong, please reload the page';
  }

  const URL = `${url}/locations/${subDirectoryId}`;

  return fetch(URL, {
    method: 'post',
    headers,
    body: JSON.stringify({ name: location }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

// export const useGetLocations = (subDirectoryId: string): IUseGetLocationsResponse => {
//   const { data, error, mutate } = useSWR(`${url}/locations/${subDirectoryId}`);

//   return {
//     locations: data,
//     isLoading: !data && !error,
//     error,
//     mutate,
//   };
// };