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


/* const Header = (fav) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={{ alignSelf: "flex-start" }}>
      <Text category="h6">{fav.city}</Text>
      <Text category="s1">{fav.weather}</Text>
    </View>

    <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
      <ArrowDown stroke="black" />
      <Text>{fav.down}°C</Text>
      <ArrowUp stroke="black" />
      <Text>{fav.up}°C</Text>
    </View>
  </View>
);

const ItemEvolution = (item) => (
  <View style={{ alignItems: "center" }}>
    <Text>{item.time}</Text>
    <Droplet stroke="black" />
    <Text>15°C</Text>
  </View>
); */

 const FavCard = ({ forecast, favCities, dispatch }) => {
  /* //const [hours, setHours] = useState([{id:"1", time:""}, {id:"2", time:""}, {id:"3", time:""}, {id:"4", time:""}])

  useEffect(()=> {
    /* const temp = [];
    for(var i = 0; i < 4 ; i++) {
      temp[i].time = ((new Date().getHours()+4*(i+1))%24);
    }
    console.log(temp)
    setHours(temp); 
   
  }, [])
  return (
  <React.Fragment>
    <Layout style={styles.topContainer} level="1">
      <Card style={styles.card} header={() => Header(data)}>
       {/* <FlatList
          data={hours}
          renderItem={({item})=> ItemEvolution(item)}
          keyExtractor={(item) => item.id}
        />  }
        

      </Card>
    </Layout>
  </React.Fragment> 
       );*/
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

  return (
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
        <TouchableWithoutFeedback onPress={() => toggleFav()}>
          <Star
            fill={isFav() ? "black" : "white"}
            stroke="black"
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
});
