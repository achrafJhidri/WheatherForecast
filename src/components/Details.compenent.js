import React from "react";
import { Layout, Divider } from "@ui-kitten/components";
import { StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { Evolutions } from "./Evolutions.component";
import { PrecipitationGraph } from "./PrecipitationsGraph.components";
import { Previsions } from "./Previsions.component";
import { useEffect, useState } from "react/cjs/react.development";
import Header from "./FavoriteCard.component";

const helper = require("../helper/getImage");

export const Details = ({ data }) => {

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!data) setIsLoading(true);
    else 
    setIsLoading(false)
  }, [data]);

  if (isLoading) return <ActivityIndicator size="large" color="orange" />;
  else 
  return (
    <Layout style={styles.container}>
      <ImageBackground source={helper.getImage(data)} style={styles.image}>
        <Header forecast={data} />
        <Divider />

        <PrecipitationGraph
          data={data.minutely}
          timezone={data.timezone_offset}
        />

        <Evolutions
          data={data.hourly}
          timezone={data.timezone_offset}
        />

        <Previsions data={data.daily} timezone={data.timezone_offset} />
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
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    flexGrow: 1,
    margin: 2,
    width: "100%",
  },

  icon: {
    width: 32,
    height: 32,
  },
  errorText: {
    fontSize: 16,
  },
});
