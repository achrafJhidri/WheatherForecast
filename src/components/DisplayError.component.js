import React from "react";
import { Text, Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const DisplayError = ({ message = "Une erreur s'est produite" }) => (
  <Layout style={styles.container}>
    <Text style={styles.errorText}>{message}</Text>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
   // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  icon: {
    height: 50,
  },

  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});
