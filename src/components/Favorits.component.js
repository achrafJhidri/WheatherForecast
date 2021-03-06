import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { assets } from "../definitions/assets";
import { FavCard } from "./FavoriteCard.component";
import listFav from "../helper/fakeFav";

export const FavoritsScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const search = () => {
    navigation.navigate("Search");
  };

  const accessoryRight = () => (
    <TopNavigationAction icon={assets.icons.addIcon} onPress={search} />
  );
  const accessoryLeft = () => (
    <TopNavigationAction icon={assets.icons.backIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Select a city"
        alignment="center"
        accessoryLeft={accessoryLeft}
        accessoryRight={accessoryRight}
      />
      <Layout
        style={{ flex: 1, justifyContent: "center" }}
      >
        <FlatList
          data={listFav}
          renderItem={({item})=> <FavCard data={item}/>}
          keyExtractor={(item) => item.id}
        />
      </Layout>
    </SafeAreaView>
  );
};
