import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { assets } from '../definitions/assets';




export const FavoritsScreen = ({ navigation }) => {


  const navigateBack = () => {
    navigation.goBack();
  };
  const search = () => {
    navigation.navigate("Search")
  };

  const accessoryRight = () => (
    <TopNavigationAction icon={assets.icons.addIcon} onPress={search   }/>
  );
  const accessoryLeft = () => (
    <TopNavigationAction icon={assets.icons.backIcon} onPress={navigateBack   }/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Select a city' alignment='center' accessoryLeft={accessoryLeft} accessoryRight={accessoryRight}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      </Layout>
    </SafeAreaView>
  );
};