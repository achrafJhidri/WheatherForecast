import React, { useEffect, useState } from "react";
import { ActivityIndicator, View,Text } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { assets } from "../definitions/assets";
import { getActualLocation } from "../api/geoLocation";
import { getData} from "../storage/storage";
import { DisplayError } from "./DisplayError.component";
import { Details } from "./Details.compenent";
import { getFullWheather } from "../api/wheatherApi";
import { connect } from "react-redux";


 const HomeScreen = ({ route, navigation, favCities,dispatch }) => {
  const [error, setError] = useState({ isError: false, message: null });
  const [storedLocations, setStoredLocations] = useState([]); //this is the content you should share in the store
  //so that you have the list of favorit locations to show in FavoritScreen
  const [displayedLocation, setDisplayedLocation] = useState(null);
  const [forecast, setForecast] = useState(null); //the wheatherApi results are here /!\ it's async so use a Spinner


  const navigateToFavorits = () => {
    navigation.navigate("Favorits");
  };

  const navigateToSearch = () => {
    navigation.navigate("Search");
  };

  useEffect(() => {
    if (route.params) {
      //if we come from the SearchScreen
      setError({ isError: false, message: "" });
      const location = route.params.coordinates;
      setDisplayedLocation(location); //this will trigger wheather api Call
    } else {
      // when loading the app
      getActualLocation()
        .then((location) => {
          setDisplayedLocation(location); //this will trigger wheather api Call
        })
        .catch(async (error) => {
          //if the localisation is not authorized
          await getStoredLocation(); //search in the device's storage
        });
    }
  }, [route.params]);

  useEffect(() => {
    getFullWheather(displayedLocation) //this is triggered whenever displayedLocation is set
      // so the page refresh and show the good result
      .then((result) => {
        setForecast(result);
      })
      .catch((error) => {
      });
  }, [displayedLocation]);

  useEffect(() => {
    if (storedLocations.length > 0) {
      setError({ isError: false, message: "" });
      setDisplayedLocation({latitude : storedLocations[0].lat , longitude : storedLocations[0].lon } );
    }
  }, [storedLocations]);

  useEffect(() => {}, [forecast]);

  const getStoredLocation = async () => {
    if(favCities.length > 0){  
        setStoredLocations(favCities);
    }else
    handleError(
      // this will redirect to SearchScreen
      "location is not available  & no saved location => redirection in 3s"
    );
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
        onPress={navigateToFavorits}
      />
      <TopNavigationAction
        icon={assets.icons.searchIcon}
        onPress={navigateToSearch}
      />
    </React.Fragment>
  );

  const displayWheather = () => {
    if (!forecast) return <ActivityIndicator size="large" color="orange" />;
    return <Details data={forecast} />;
  };
  const renderError = () => {
    if (error.isError) return <DisplayError message={error.message} />;
  };

  return (
    <View style={{ flexGrow: 1 }}>
      <TopNavigation
        title="Wheather forcast"
        alignment="center"
        accessoryRight={SearchIcon}
      />
      <Divider />
      <Layout
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        {error.isError ? renderError() : displayWheather()}
      </Layout>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favCities: state.favCities,
  };
};
export default connect(mapStateToProps)(HomeScreen);
