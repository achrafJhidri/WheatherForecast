import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { ChevronRight, ChevronLeft } from "react-native-feather";

const Intl = require("react-native-intl");
const imageUrl = "http://openweathermap.org/img/wn/";

const ItemEvolution = ({ item }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={styles.text}>{item.id}</Text>
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri: imageUrl + item.icon + ".png",
      }}
    />
    <Text style={styles.text}>{Math.round(item.temp)}°C</Text>
  </View>
);

export const Evolutions = ({ data, timezone }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const res = data.slice(0, 24).map((element) => {
        var obj = {};
        obj.id = new Date((element.dt + timezone) * 1000)
          .toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
          .substring(0, 5);
        obj.icon = element.weather[0].icon;
        obj.temp = element.temp;

        return obj;
      });
      setWeathers(res);
    }
  }, [data]);

  const weatherToShow = () => {
    return weathers;
  };

  const onForward = () => {
    if (startIndex + 5 <= weathers.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const onBack = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  if (weathers.length > 0)
    return (
      <View style={{ margin: 15 }}>
        <FlatList
            horizontal={true}
            data={weatherToShow()}
            renderItem={ItemEvolution}
            keyExtractor={(item) => item.id}
          />
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => onBack()}>
            <ChevronLeft
              stroke={startIndex > 0 ? "white" : "grey"}
              width={42}
              height={42}
            />
          </TouchableWithoutFeedback>
          

          <TouchableWithoutFeedback onPress={() => onForward()}>
            <ChevronRight
              stroke={startIndex + 4 < weathers.length ? "white" : "grey"}
              width={42}
              height={42}
            />
          </TouchableWithoutFeedback>
        </View> */}
      </View>
    );
  else
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  text: { color: "orange" },
});
