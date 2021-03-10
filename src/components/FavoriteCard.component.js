import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Card, Layout, Text } from "@ui-kitten/components";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import {
  ArrowDown,
  ArrowUp,
  Cloud,
  Droplet,
  Star,
  Umbrella,
  Wind,
} from "react-native-feather";




 const FavCard = ({ forecast, favCities, dispatch }) => {
  
  const toggleFav = () => {
    const city  = forecast.city;
    console.log(city);
    if (isFav()) {
      const action = { type: "UNSAVE_CITY", value: city };
      dispatch(action);
    } else {
      const action = { type: "SAVE_CITY", value: city };
      dispatch(action);
    }
  };

  const isFav = () => {
    const index = favCities.findIndex(
      (favCity) => favCity.id === forecast.city.id
    );
    return index !== -1;
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Text category="h6" style={styles.text} >{forecast.city.id}</Text>
        <Text category="s2" style={styles.text} >
          {forecast.current.weather[0].description},{" "}
          {Math.round(forecast.current.temp)}
          °C
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <ArrowDown stroke="white" />
            <Text style={styles.text}>{Math.round(forecast.daily[0].temp.min) }°C</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ArrowUp stroke="white" />
            <Text style={styles.text}>{Math.round(forecast.daily[0].temp.max)}°C</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <Wind stroke="white" />
            <Text style={styles.text}>{Math.round(forecast.current.wind_speed)}km/h</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Umbrella stroke="white" />
            <Text style={styles.text}>{forecast.current.humidity}% </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Cloud stroke="white" />
            <Text style={styles.text}>{Math.round(forecast.current.clouds)}% </Text>
          </View>
        </View>
      </View>
      <View style={{ flex:1, alignItems:'flex-end'}}>
        <TouchableWithoutFeedback onPress={() => toggleFav()}>
          <Star
            fill={isFav() ? "yellow" : "white"}
            stroke="white"
            width={42}
            height={42}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favCities: state.favCities,
  };
};

export default connect(mapStateToProps)(FavCard);
const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "row",
    //justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 20,
  },
  text : {
    color: 'white'
  }
});
