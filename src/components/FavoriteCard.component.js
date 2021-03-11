import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import { Cloud, Star, Umbrella, Wind } from "react-native-feather";
import { TouchableOpacity } from "react-native-gesture-handler";

const FavCard = ({ forecast, favCities, dispatch }) => {
  const toggleFav = () => {
    const city = forecast.city;
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
    <View style={styles.container}>
      <View>
        <TouchableOpacity /* onPress={() => onDetails()} */>
          <View style={styles.subContainer}>
            <Text category="h6" style={styles.text}>
              {forecast.city.id}
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Text category="s1" style={styles.text}>
              {forecast.current.weather[0].description},{" "}
              {Math.round(forecast.current.temp)}
              °C
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconText}>
              <Wind stroke="orange" />
              <Text style={styles.text}>
                {Math.round(forecast.current.wind_speed)}km/h
              </Text>
            </View>
            <View style={styles.iconText}>
              <Umbrella stroke="orange" />
              <Text style={styles.text}>{forecast.current.humidity}% </Text>
            </View>
            <View style={styles.iconText}>
              <Cloud stroke="orange" />
              <Text style={styles.text}>
                {Math.round(forecast.current.clouds)}%{" "}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => toggleFav()}>
          <Star
            fill={isFav() ? "orange" : "white"}
            stroke="white"
            width={42}
            height={42}
          />
        </TouchableOpacity>
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
  container: {
    flexDirection: "row",
    margin: 15,
  },
  subContainer: {
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 20,
  },
  text: {
    color: "white",
  },
  iconText: {
    flexDirection: "row",
    marginRight: 15,
  },
});
