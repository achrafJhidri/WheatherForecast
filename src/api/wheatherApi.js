const ApiKey = "17e330397fee8a55928ef4dcba378607";
const oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall";
const currentWheather = "https://api.openweathermap.org/data/2.5/weather?";

import { getAddressByCoordinates } from "./geoLocation";
export const getWheatherByCoords = async ({ longitude, latitude }) => {
  const location = await getAddressByCoordinates({
    longitude: longitude,
    latitude: latitude,
  });
  try {
    const response = await fetch(
      oneCallUrl +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&lang=fr&units=metric&appid=" +
        ApiKey
    );
    const json = await response.json();
    json.city = location[0].city;
    return json;
  } catch (error) {
    throw error;
  }

};

export const getWheatherByCityName = async (cityName) => {
  return fetchFunction(currentWheather + `q=${cityName}&appid=${ApiKey}`);
};

fetchFunction = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};
