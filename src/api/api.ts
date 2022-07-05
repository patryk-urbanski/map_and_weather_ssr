import { SUBDIRECTORY_ID } from '../constants';
import { CookieUtils } from '../utils/utils';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

const weatherAPIURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}`;
const storageAPIURL = `https://crudcrud.com/api/${process.env.STORAGE_API_KEY}`;

export const fetchWeatherAndLocation = (location: string) => {
  return fetch(`${weatherAPIURL}&q=${location}`, {
    method: 'get',
    headers,
  })
    .then((response) => response.json())
    .catch((error) => {
      return error;
    });
};

export const updateLocations = (location: string) => {
  const subDirectoryId = CookieUtils.readCookie(SUBDIRECTORY_ID);

  if (!subDirectoryId) {
    throw 'Ups! Something went wrong, please reload the page';
  }

  const URL = `${storageAPIURL}/${subDirectoryId}`;

  return fetch(URL, {
    method: 'post',
    headers,
    body: JSON.stringify({ name: location }),
  })
    .then((response) => response.json())
    .catch((error) => {
      return error;
    });
};

export const fetchLocations = (serverCookie?: string) => {
  const subDirectoryId = serverCookie || CookieUtils.readCookie(SUBDIRECTORY_ID);

  if (!subDirectoryId) {
    throw 'Ups! Something went wrong, please reload the page';
  }

  const URL = `${storageAPIURL}/${subDirectoryId}`;

  return fetch(URL, {
    method: 'get',
    headers,
  })
    .then((response) => response.json())
    .catch((error) => {
      return error;
    });
};
