import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Input, Layout, TopNavigationAction } from "@ui-kitten/components";
import { assets } from "../definitions/assets";
import { getLocationByName, getActualLocation } from "../api/geoLocation";
import MapView, { Marker } from "react-native-maps";
import { DisplayError } from "./DisplayError.component";
import { getWheatherByCityName } from "../api/wheatherApi";

const latitudeDelta = 0.0922;
const longitudeDelta = 0.00411;
const latitudeDeltaZoomed = 2.0522;
const longitudeDeltaZoomed = 2.0321;

export const SearchScreen = ({ navigation }) => {
  const [error, setError] = useState({ isError: false, message: null });

  const [entry, setEntry] = useState("");
  const [multiPoints, setMultiPoints] = useState([]); //sometimes you'll get more than one result for example Paris in france & Paris in Texas
  const mapRef = useRef(null); 

  const search = async () => {
    if (entry !== "") {
      let points = [];
      await getLocationByName(entry) //this try to resolve the request using Localisation
        .then((result) => {
          if (result.length >= 1) { 
            result.forEach((value) => {
              const { latitude, longitude } = value;
              points.push({
                latitude,
                longitude,
                latitudeDelta,
                longitudeDelta,
              });
            });
          } else {
            setError({ isError: true, message: "adresse non trouvée" });
          }
        })
        .catch(async (error) => { // if Localisation is not enabled or the app doesn't have the permission to use it
          await getWheatherByCityName(entry) //here it's used only to get the coordinates 
                                             //but you can use it to show some info on the marker 
                                             //contact me if you want some help
                                             // or see <Marker> you can put here what ever you want maybe the same listItem you use in favorit</Marker>
            .then((result) => {
              if (result) { //if you save this result inside a variable you can use it inside the markers
                            //and use what you want
                const { lat, lon } = result.coord;
                points.push({
                  latitude: lat,
                  longitude: lon,
                  latitudeDelta,
                  longitudeDelta,
                });
              }
            })
            .catch((error) => {
              setError({ isError: true, message: "adresse non trouvée" });
            });
        });
      setMultiPoints(points);//saving the search result
      mapRef.current.animateToRegion(points[0], 2000); // animate to the first result
    }
  };

  useEffect(() => {
    // if localisation is enabled
    // this will center the map on your location
    // if not it does nothing
    getActualLocation() 
      .then((result) => {
        const { latitude, longitude } = result;

        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: latitudeDeltaZoomed,
            longitudeDelta: longitudeDeltaZoomed,
          },
          2000
        );
      })
      .catch((error) => {
        // do nothing
      });
  }, []);

  const renderSearchIcon = (props) => {
    props = { ...props, onPress: search };
    return assets.icons.searchIcon(props);
  };
  const navigateBack = () => {
    navigation.goBack();
  };

  const goBackAccessory = () => (
    <TopNavigationAction
      style={{}}
      icon={assets.icons.backIcon}
      onPress={navigateBack}
    />
  );
  const displaySearch = () => (
    <Layout style={{ ...styles.rowContainer }}>
      {goBackAccessory()}
      <Input
        style={{ flex: 1, marginTop: 3, borderRadius: 15 }}
        value={entry}
        onChangeText={(text) => setEntry(text)}
        accessoryRight={renderSearchIcon}
        onSubmitEditing={search}
        placeholder="Saisissez l'adresse"
        onFocus={() => setError({ isError: false, message: "" })}
        textAlign="center"
      />
    </Layout>
  );

  const onTouchingTheMap = (e) => {
    navigateToHome(e.nativeEvent.coordinate);
  };

  const navigateToHome = (coordinates) => {
    navigation.navigate("Home", {
      coordinates,
    });
  };

  const setMarkers = () => {
    let tab = [];
    multiPoints.forEach((value, index) => {
      tab.push(
        <Marker
          key={index}
          coordinate={value}
          onPress={() => navigateToHome(value)}
        >
         {/*listItem  */}
        </Marker>
      );
    });
    return tab;
  };
  const renderViewMap = () => (
    <MapView
      ref={mapRef}
      onPress={onTouchingTheMap}
      style={{ ...StyleSheet.absoluteFillObject }}
    >
      {setMarkers()}
    </MapView>
  );

  const renderError = () => {
    if (error.isError) return <DisplayError message={error.message} />;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderViewMap() /*render the map in the background */}
      {displaySearch()/* render  the search Input on the top of the map*/}
      {renderError()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    margin: 20,
  },
});
