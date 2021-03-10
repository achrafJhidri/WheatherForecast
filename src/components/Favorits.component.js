import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
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

const FavoritsScreen = ({ navigation, favCities }) => {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [weathers, setWeathers] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    refreshWeathers();
  }, [favCities]);

  const refreshWeathers = async () => {
    setIsRefreshing(true);
    setIsError(false);
    let weathers = [];
    try {
      for (const city of favCities) {
        const location = { longitude: city.lon, latitude: city.lat };
        const forecast = await getSampleWheather(location);
        weathers.push(forecast);
      }
      setWeathers(weathers);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setWeathers([]);
    }
    setIsRefreshing(false);
  };
  const navigateBack = () => {
    navigation.goBack();
  };
  const search = () => {
    navigation.navigate("Search");
  };

  const onDetails =  async (item) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('ondetail')
      
      const index = favCities.findIndex(
        (favCity) => favCity.id === item.city.id
      );
      console.log(favCities);
      if (index !== -1) {
        const coordinates = {
          latitude: item.lat,
          longitude: item.lon,
        };
        navigation.navigate("Home", { coordinates });
      }
    
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
        title="Select a city"
        alignment="center"
        accessoryLeft={accessoryLeft}
        accessoryRight={accessoryRight}
      />
      {isRefreshing ? (
        <ActivityIndicator size="large" />
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
});
