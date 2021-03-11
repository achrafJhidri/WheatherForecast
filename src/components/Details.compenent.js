import React from "react";
import {

  Layout,

  Divider,
} from "@ui-kitten/components";
import {
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";


import { Evolutions } from "./Evolutions.component";

import { PrecipitationGraph } from "./PrecipitationsGraph.components";
import { Previsions } from "./Previsions.component";
import { useEffect, useState } from "react/cjs/react.development";
import Header from "./FavoriteCard.component";


export const Details = ({ data }) => {
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    async function setter() {
      if (data) setForecast(data);
      setIsLoading(false);
    }
    setter();
   
  }, [data]);

 
  if (isLoading) return <ActivityIndicator size="large" color="orange" />;
  return (
    <Layout style={styles.container}>
      <ImageBackground
        source={require("../../assets/night.jpg")}
        style={styles.image}
      >
        {/* <Card
          style={styles.card}
          header={(props) => <Header forecast={data} />}
        > */}

        <Header forecast={data} />
        <Divider />

        <PrecipitationGraph
          data={forecast.minutely}
          timezone={forecast.timezone_offset}
        />

        <Evolutions
          data={forecast.hourly}
          timezone={forecast.timezone_offset}
        />

        <Previsions data={forecast.daily} timezone={forecast.timezone_offset} />
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 2,
    borderRadius: 10,
    margin: 0,
    flexGrow: 1,
    width: "100%",
    //alignSelf:"stretch"
  },
  image: {
    //flex: 1,
    //resizeMode: "cover",
    width: "100%",
    height: "100%",
    // opacity:.2
    //justifyContent: "center",
  },
  card: {
    flexGrow: 1,
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
