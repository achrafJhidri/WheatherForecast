import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { assets } from "../definitions/assets";
import { getActualLocation } from "../api/geoLocation";
import { getData, removeValue, storeData } from "../storage/storage";
import { DisplayError } from "./DisplayError.component";

import { getWheatherByCoords } from "../api/wheatherApi";

export const HomeScreen = ({ route, navigation }) => {
  const [error, setError] = useState({ isError: false, message: null });
  const [storedLocations, setStoredLocations] = useState([]);
  const [displayedLocation, setDisplayedLocation] = useState(null);
  const [forecast, setForecast] = useState({});

  const navigateToFavorits = () => {
    navigation.navigate("Favorits");
  };
  const addToFavoritPlaces = () => {
    let result = [displayedLocation, ...storedLocations];
    storeData("localisations", JSON.stringify(result));
    setStoredLocations(result);
  };

  useEffect(() => {
    if (route.params) {
      setError({ isError: false, message: "" });
      const location = route.params.coordinates;
      setDisplayedLocation(location); //this will trigger wheather api Call
    } else {
      getActualLocation()
        .then((location) => {
          setDisplayedLocation(location); //this will trigger wheather api Call
        })
        .catch(async (error) => {
          await getStoredLocation();
        });
    }
  }, [route.params]);

  useEffect(() => {
    getWheatherByCoords(displayedLocation)
      .then((result) => {
        setForecast(result);
      })
      .catch((error) => {
      });
  }, [displayedLocation]);

  useEffect(() => {
    if (storedLocations.length > 0) {
      setError({ isError: false, message: "" });
      setDisplayedLocation(storedLocations[0]);
    }
  }, [storedLocations]);


  const getStoredLocation = async () => {
    await getData("localisations")
      .then((tab) => {
        let result = JSON.parse(tab);
        setStoredLocations(result);
      })
      .catch((error) => {
        handleError(
          "location is not available  & no saved location => redirection in 3s"
        );
      });
  };

  const handleError = (message) => {
    setError({
      isError: true,
      message,
    });
    setTimeout(() => {
      navigation.navigate("Search");
    }, 3000);
  };
  const SearchIcon = () => (
    <React.Fragment>
      <TopNavigationAction
        icon={assets.icons.favoriteIcon}
        onPress={addToFavoritPlaces}
      />
      <TopNavigationAction
        icon={assets.icons.searchIcon}
        onPress={navigateToFavorits}
      />
      <TopNavigationAction
        icon={assets.icons.pinOutline}
        onPress={deleteStored}
      />
    </React.Fragment>
  );
  const deleteStored = () => {
    removeValue("localisations");
  };
  const displayWheather = () => {
    return <Text> {JSON.stringify(forecast)}</Text>;
  };
  const renderError = () => {
    if (error.isError) return <DisplayError message={error.message} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Wheather forcast"
        alignment="center"
        accessoryRight={SearchIcon}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {error.isError ? renderError() : displayWheather()}
      </Layout>
    </SafeAreaView>
  );
};
