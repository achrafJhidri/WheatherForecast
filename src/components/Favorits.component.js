import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  Card,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { assets } from "../definitions/assets";
import FavCard from "./FavoriteCard.component";
import listFav from "../helper/fakeFav";
import { connect } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import { getSampleWheather } from "../api/wheatherApi";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import { DisplayError } from "./DisplayError.component";

const FavoritsScreen = ({ navigation, favCities }) => {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [weathers, setWeathers] = useState([]);
  const [isError, setIsError] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(0);

  useEffect(() => {
    refreshWeathers();
  }, [favCities]);

  const refreshWeathers = async () => {
    setIsRefreshing(true);
    setIsError(false);
    let _weathers = [];
    try {
      if (new Date() - lastRefresh >= 3600000 || weathers.length === 0) {
        console.log("1er", weathers.length);
        for (const city of favCities) {
          const location = { longitude: city.lon, latitude: city.lat };
          const forecast = await getSampleWheather(location);
          _weathers.push(forecast);
        }
        setLastRefresh(new Date());
      } else {
        _weathers = [...weathers];
        if (favCities.length > weathers.length) {
          for (const city of favCities) {
            if (weathers.findIndex((w) => w.city.id === city.id) === -1) {
              const location = { longitude: city.lon, latitude: city.lat };
              const forecast = await getSampleWheather(location);
              _weathers.push(forecast);
              break;
            }
          }
        } else {
          for (const weather of weathers) {
            const index = favCities.findIndex(
              (city) => city.id === weather.city.id
            );
            if (index === -1) {
              const indexToRemove = weathers.findIndex(
                (w) => w.city.id === weather.city.id
              );
              _weathers.splice(indexToRemove, 1);
              break;
            }
          }
        }
      }
      setWeathers(_weathers);
    } catch (error) {
      setIsError(true);
      setWeathers([]);
      console.log(error);
    }

    setIsRefreshing(false);
  };
  const navigateBack = () => {
    navigation.goBack();
  };
  const search = () => {
    navigation.navigate("Search");
  };

  const onDetails = async (item) => {
   /*  await new Promise((resolve) => setTimeout(resolve, 1000));

    const index = favCities.findIndex((favCity) => favCity.id === item.city.id);
    if (index !== -1) { */
      const coordinates = {
        latitude: item.lat,
        longitude: item.lon,
      };
      navigation.navigate("Home", { coordinates });
    
  };

  const accessoryRight = () => (
    <TopNavigationAction icon={assets.icons.addIcon} onPress={search} />
  );
  const accessoryLeft = () => (
    <TopNavigationAction icon={assets.icons.backIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Mes favoris"
        alignment="center"
        accessoryLeft={accessoryLeft}
        accessoryRight={accessoryRight}
      />
      {isError ? (
        <DisplayError message="Impossible de récupérer les favoris, vérifiez votre connexion" />
      ) : isRefreshing ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="orange" />
          
        </View>
      ) : (
        <Layout style={{ flex: 1, justifyContent: "center" }}>
          <FlatList
            data={weathers}
            renderItem={({ item }) => (
              <View style={{ margin: 20 /* backgroundColor: 'blue' */ }}>
                <ImageBackground
                  source={require("../../assets/night.jpg")}
                  imageStyle={{ borderRadius: 20 }}
                  style={styles.image}
                >
                  <TouchableOpacity onPress={() => onDetails(item)}>
                    <FavCard forecast={item} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
            keyExtractor={(item) => item.city.id}
          />
        </Layout>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    favCities: state.favCities,
  };
};

export default connect(mapStateToProps)(FavoritsScreen);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    //resizeMode: "cover",
    //width: "100%",
    //height: "100%",
    //backgroundColor:'blue',

    //opacity: 0.5,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
