import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { assets } from "../definitions/assets";
import  FavCard  from "./FavoriteCard.component";
import listFav from "../helper/fakeFav";
import { connect } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import {getSampleWheather} from "../api/wheatherApi";

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
      for(const city of favCities){
        console.log(city);
        const location = {longitude : city.lon, latitude: city.lat};
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
  }
  const navigateBack = () => {
    navigation.goBack();
  };
  const search = () => {
    navigation.navigate("Search");
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
      <Layout style={{ flex: 1, justifyContent: "center" }}>
        <FlatList
          data={weathers}
          renderItem={({ item }) => <FavCard forecast={item} />}
          keyExtractor={(item) => item.city.id}
        />
      </Layout>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    favCities: state.favCities,
  };
};

export default connect(mapStateToProps)(FavoritsScreen);
