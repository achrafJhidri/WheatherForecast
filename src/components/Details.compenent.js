import React from "react";
import { Text, Layout, Card, List, Icon, Button } from "@ui-kitten/components";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import {
  ArrowDown,
  ArrowUp,
  Cloud,
  Droplet,
  Star,
  Umbrella,
  Wind,
} from "react-native-feather";
import { connect } from "react-redux";
import { assets } from "../definitions/assets";

import { Evolutions } from "./Evolutions.component";

import { PrecipitationGraph } from "./PrecipitationsGraph.components";
import { Previsions } from "./Previsions.component";
import { useEffect, useState } from "react/cjs/react.development";

const Details = ({ data, favCities, dispatch }) => {
  const [forecast, setForecast] = useState(null);

  const Header = () => (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Text category="h6">{forecast.city.id}</Text>
        <Text category="s2">
          {forecast.current.weather[0].description},{" "}
          {Math.round(forecast.current.temp)}
          °C
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <ArrowDown stroke="black" />
            <Text>{Math.round(forecast.daily[0].temp.min)}°C</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <ArrowUp stroke="black" />
            <Text>{Math.round(forecast.daily[0].temp.max)}°C</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <Wind stroke="black" />
            <Text>{Math.round(forecast.current.wind_speed)}km/h</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Umbrella stroke="black" />
            <Text>{forecast.current.humidity}% </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Cloud stroke="black" />
            <Text>{Math.round(forecast.current.clouds)}% </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={()=>toggleFav()}>
          <Star fill={isFav() ? "black" : "white"} stroke="black"  width={42} height={42} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
  
  const toggleFav = () => {
    if (isFav()) {
      const action = { type: "UNSAVE_CITY", value: forecast.city };
      dispatch(action);
    } else {

      const action = { type: "SAVE_CITY", value: forecast.city };
      dispatch(action);
    }
  };

  const isFav = () => {
    const index = favCities.findIndex(
      (favCity) => favCity.id === forecast.city.id
    );
    return index !== -1;
  };

  useEffect(() => {
    if (data) setForecast(data);
  }, [data]);

  

  if (!forecast) return <Text>Loading</Text>;
  else {
    /* console.log(forecast);
    return <Text>Test</Text> */
    return (
      <Layout style={styles.container}>
        <Card style={styles.card} header={(props) =><Header {...props} />}>
          <PrecipitationGraph
            data={forecast.minutely }
            timezone={ forecast.timezone_offset }
          />
          <Evolutions
            data={forecast.hourly}
            timezone={forecast.timezone_offset }
          />
          <Previsions
            data={forecast.daily }
            timezone={forecast.timezone_offset }
          />
        </Card>
      </Layout>
      /*   </ImageBackground> */
    );
  }
};

const mapStateToProps = (state) => {
  return {
    favCities: state.favCities,
  };
};

export default connect(mapStateToProps)(Details);

const styles = StyleSheet.create({
  container: {
    opacity: 0.9,
    //alignItems: 'center',
    //justifyContent: 'center',
    borderRadius: 10,
    margin: 0,
    //paddingHorizontal: 30,
    flex: 1,
    width: "100%",
    //alignSelf:"stretch"
  },
  card: {
    flex: 1,
    margin: 2,
    width: "100%",
    // backgroundColor: "grey",
  },

  icon: {
    width: 32,
    height: 32,
  },
  errorText: {
    fontSize: 16,
    //textAlign:"center"
  },
});
//style={styles.icon}
