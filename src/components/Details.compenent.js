import React from "react";
import { ImageBackground } from "react-native";
import { Text, Layout, Card, List } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import {
  ArrowDown,
  ArrowUp,
  Cloud,
  Droplet,
  Umbrella,
  Wind,
} from "react-native-feather";

import { Evolutions } from "./Evolutions.component";

import { PrecipitationGraph } from "./PrecipitationsGraph.components";
import { Previsions } from "./Previsions.component";

const Header = (data) => (
  <View>
    <Text category="h6">{data.city}</Text>
    <Text category="s2">
      {data.current.weather[0].description}, {Math.round(data.current.temp)}°C
    </Text>
    <View style={{ flexDirection: "row" }}>
      <View style={{ flexDirection: "row" }}>
        <ArrowDown stroke="white" />
        <Text>{Math.round(data.daily[0].temp.min)}°C</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <ArrowUp stroke="white" />
        <Text>{Math.round(data.daily[0].temp.max)}°C</Text>
      </View>
    </View>
    <View style={{ flexDirection: "row" }}>
      <View style={{ flexDirection: "row" }}>
        <Wind stroke="white" />
        <Text>{Math.round(data.current.wind_speed)}km/h</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Umbrella stroke="white" />
        <Text>{data.current.humidity}% </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Cloud stroke="white" />
        <Text>{Math.round(data.current.clouds)}% </Text>
      </View>
    </View>
  </View>
);

export const Details = ({ data }) => {
  if (!data) return <Text>Loading</Text>;
  else {
    return (
      /*  <ImageBackground
        source={require("../../assets/landscape.jpg")}
        style={{ width: "100%", height: "100%", opacity: 0.8 }}
      > */
      <Layout style={styles.container}>
        <Card style={styles.card} header={() => Header(data)}>
          <PrecipitationGraph
            data={data ? data.minutely : undefined}
            timezone={data ? data.timezone_offset : 0}
          />
          <Evolutions
            data={data ? data.hourly : undefined}
            timezone={data ? data.timezone_offset : 0}
          />
          <Previsions
            data={data ? data.daily : undefined}
            timezone={data ? data.timezone_offset : 0}
          />

          {/* <View>
                <Text category="h6">Prévisions 7 jours</Text>
                <List
                   
                    data={DAYS}
                    renderItem={renderPrevision}
                    keyExtractor={day => day.id}
                  />
              </View> */}
        </Card>
      </Layout>
      /*   </ImageBackground> */
    );
  }
};
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
