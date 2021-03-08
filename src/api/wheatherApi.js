const ApiKey = "17e330397fee8a55928ef4dcba378607";
const oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall";
const currentWheather = "https://api.openweathermap.org/data/2.5/weather?";

import { getAddressByCoordinates } from "./geoLocation";

export const getFullWheather = async({longitude, latitude}) => {
  try {
    return getWheatherByCoords(longitude, latitude, "");
  } catch (error) {
    throw error;
  }
}

export const getSampleWheather  = async({longitude, latitude}) => {
  try {
    return getWheatherByCoords(longitude, latitude, "&exclude=minutely,hourly");
  } catch (error) {
    throw error;
  }
}



export const getWheatherByCoords = async ( longitude, latitude, exclude  ) => {

  try {
    const location = await getAddressByCoordinates({
      longitude: longitude,
      latitude: latitude,
    });
    const response = await fetch(
      oneCallUrl +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        exclude +
        "&lang=fr&units=metric&appid=" +
        ApiKey
    );
    const json = await response.json();
    const city = location[0].city !== null ? location[0].city : location[0].subregion === null ? location[0].region : location[0].subregion ;
    const fullnameCity = city + ", "+ location[0].country;
    json.city = {id:fullnameCity, lon: longitude, lat: latitude}
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
