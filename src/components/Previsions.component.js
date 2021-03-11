import React from "react";
import { View, Text, Image,  ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import { ArrowDown, ArrowUp,  Umbrella } from "react-native-feather";
import { FlatList } from "react-native-gesture-handler";
const imageUrl = "http://openweathermap.org/img/wn/";

const days = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

const renderPrevision = ({ item }) => (
  <View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, color: "white" }}>{item.id}</Text>
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: 38, height: 38 }}
            source={{
              uri: imageUrl + item.icon + ".png",
            }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Umbrella stroke="orange" />
              <Text  style={styles.text}>{item.humidity}% </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <ArrowDown stroke="orange" />
              <Text style={styles.text}>{Math.round(item.min)}°C</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <ArrowUp stroke="orange" />
              <Text style={styles.text}>{Math.round(item.max)}°C</Text>
            </View>
          </View>
        </View>
      </View>
   
  </View>
);

export const Previsions = ({ data, timezone }) => {
  const [previsions, setPrevisions] = useState([]);
  useEffect(() => {
    if (Array.isArray(data)) {
      if (data.length == 8) data.shift();
      const res = data.map((element) => {
        var obj = {};
        obj.id = days[new Date((element.dt + timezone) * 1000).getDay()];
        obj.icon = element.weather[0].icon;
        obj.humidity = element.humidity;
        obj.min = element.temp.min;
        obj.max = element.temp.max;
        return obj;
      });
      setPrevisions(res);
    }
  }, []);
  if (previsions.length > 0)
    return (
        <View style={{margin:15}} >
          <FlatList
            data={previsions}
            renderItem={renderPrevision}
            keyExtractor={(day) => day.id}
            scrollEnabled={true}
          />
        </View>
    );
  else return <ActivityIndicator size="large" color="orange" />;
};

const styles= StyleSheet.create({
  text: {
    color: "white", 
    marginLeft: 2
  }
})
