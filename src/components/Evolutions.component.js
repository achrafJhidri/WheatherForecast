import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { Button, Icon } from "@ui-kitten/components";

const Intl = require("react-native-intl");
const imageUrl = "http://openweathermap.org/img/wn/";

const rightArrow = (props) => (
  <Icon {...props} width={48} height={48} name="arrow-ios-forward-outline" />
);

const leftArrow = (props) => (
  <Icon {...props} width={48} height={48} name="arrow-ios-back-outline" />
);

const ItemEvolution = ({ item }) => (
  <View style={{ alignItems: "center" }}>
    <Text style={{ color: "white" }}>{item.id}</Text>
    <Image
      style={{ width: 50, height: 50 }}
      source={{
        uri: imageUrl + item.icon + ".png",
      }}
    />
    <Text style={{ color: "white" }}>{Math.round(item.temp)}°C</Text>
  </View>
);

export const Evolutions = ({ data, timezone }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [weathers, setWeathers] = useState([]);
  //const [_timezone, setTimezone] = useState("UTC");

  useEffect(() => {
    if (Array.isArray(data)) {
      const res = data.slice(0, 24).map((element) => {
        var obj = {};
        obj.id = new Date((element.dt+timezone) * 1000)
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
    return weathers.slice(startIndex, startIndex + 4);
  };

  const onForward = async () => {
    if (startIndex + 5 <= weathers.length) {
      await setStartIndex(startIndex + 1);
    }
  };

  const displayLeftArrow = () => {
    if (startIndex === 0)
      return (
        <Button
          appearance="ghost"
          size="tiny"
          onPress={onBack}
          accessoryLeft={leftArrow}
        />
      );
  };

  const displayRightArrow = () => {
    if (startIndex + 4 == weathers.length)
      return (
        <Button
          appearance="ghost"
          size="tiny"
          onPress={onForward}
          accessoryLeft={rightArrow}
        />
      );
  };

  const onBack = () => {
    setStartIndex(startIndex - 1);
  };

  if (weathers.length > 0)
    return (
      <View>
        <Text category="h6">Evolution 24h</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //alignSelf: "center",
          }}
        >
         {/*  {displayLeftArrow} */}
          <Button
            appearance="ghost"
            size="tiny"
            onPress={onBack}
            accessoryLeft={leftArrow}
            disabled={startIndex === 0}

          />
          <FlatList
            horizontal
            data={weatherToShow()}
            renderItem={ItemEvolution}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              justifyContent: "space-between",
              flex: 1,
            }}
          />
          <Button
            appearance="ghost"
            size="tiny"
            onPress={onForward}
            accessoryLeft={rightArrow}
            disabled={startIndex + 4  == weathers.length}

          />
          {/*   {displayRightArrow} */}
        </View>
      </View>
    );
  else
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
};
