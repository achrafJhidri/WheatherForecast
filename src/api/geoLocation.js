import * as Location from "expo-location";

export const getActualLocation = async () => {
  try {
    checkPermission();
    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  } catch (error) {
    throw error;
  }
};

export const getLocationByName = async (address) => {
  try {
    checkPermission();

    let location = await Location.geocodeAsync(address);
    return location;
  } catch (error) {
    throw error;
  }
};

const checkPermission = async () => {
  
  await hasLocalisationEnabled();

  let { status } = await Location.requestPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }
};

const hasLocalisationEnabled = async () => {

  let localisationEnabled = await Location.hasServicesEnabledAsync();

  if (!localisationEnabled)
    throw new Error("Permission to access location was denied");
};

export const getAddressByCoordinates = async (location ) => {
  try {
    checkPermission();

    let adderss = await Location.reverseGeocodeAsync(location)
    return adderss;
  } catch (error) {
    throw error;
  }
};