import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


import { SafeAreaView, StatusBar } from 'react-native';
import {AppNavigator} from './src/navigation/navigation.component'


export default () => (
  <>
  <SafeAreaView style={{flex : 1}}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <AppNavigator/>
    </ApplicationProvider>
  </SafeAreaView>
  <StatusBar/>
  </>
);