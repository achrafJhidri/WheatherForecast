import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Input, Layout, TopNavigationAction } from "@ui-kitten/components";

import { assets } from "../definitions/assets";

import { getLocationByName, getActualLocation } from "../api/geoLocation";
import MapView, { Marker } from "react-native-maps";

import { DisplayError } from "./DisplayError.component";

export const SearchScreen = ({ navigation }) => {
  const [entry, setEntry] = useState("");

  const [multiPoints, setMultiPoints] = useState([]);
  const [error, setError] = useState({ isError: false, message: null });
  const mapRef = useRef(null);

  const search = async () => {
    if (entry !== "") {
      //if(loc is activated)
      getLocationByName(entry)
        .then((result) => {
          if (result.length >= 1) {
            let points = [];
            result.forEach((value) => {
              const { latitude, longitude } = value;

              points.push({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.00411,
              });
            });
            setMultiPoints(points);

            mapRef.current.animateToRegion(points[0], 2000);
          } else {
            setError({ isError: true, message: "adresse non trouvée" });
          }
          //else
          // call wheather APi and go directly to Home with the City Name and wheater data
        })
        .catch((error) => {
          setError({ isError: true, message: error.message });
        });
    }
  };

  useEffect(() => {
      //if the localisation and permission is okey
      getActualLocation().then((result) => {
        const { latitude, longitude } = result;

        mapRef.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 2.0522,
            longitudeDelta: 2.0321,
          },
          2000
        );
      })
      .catch (error => {
      // setError({ isError: true, message: error.message });
    })

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
    //if t
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
        />
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
      {renderViewMap()}
      {displaySearch()}
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
