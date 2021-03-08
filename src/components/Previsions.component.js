import React from "react";
import { View, Text, Image } from "react-native";
import { List } from "@ui-kitten/components";
import { useEffect, useState } from "react/cjs/react.development";
import { ArrowDown, ArrowUp, Droplet, Umbrella } from "react-native-feather";
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
  <View style={{ flexDirection: "row", alignItems: 'center' }}>
    <Text style={{ flex: 1, color: "black" }}>{item.id}</Text>
    <View style={{ flex: 1 }}>
       <Image
      style={{ width: 35, height: 35 }}
      source={{
        uri: imageUrl + item.icon + ".png",
      }}
    />
    </View>
    <View style={{ flex: 2 }}>
      <View style={{ flexDirection: "row", justifyContent:'space-between' }}>
        <View style={{ flexDirection: "row" }}>
          <Umbrella stroke="black" />
          <Text>{item.humidity}% </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ArrowDown stroke="black" />
          <Text>{Math.round(item.min)}°C</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ArrowUp stroke="black" />
          <Text>{Math.round(item.max)}°C</Text>
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
        //console.log(element);
        var obj = {};
        obj.id = days[new Date((element.dt+timezone) * 1000).getDay()];
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
      <View>
        <Text category="h6">Prévisions 7 jours</Text>
        <List
          data={previsions}
          renderItem={renderPrevision}
          keyExtractor={(day) => day.id}
        />
      </View>
    );
  else return <Text>Loading</Text>;
};