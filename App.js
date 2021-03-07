import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import Store from "./src/store/config";

import { SafeAreaView, StatusBar } from "react-native";
import { AppNavigator } from "./src/navigation/navigation.component";

export default () => (
  <>
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={Store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigator />
        </ApplicationProvider>
      </Provider>
    </SafeAreaView>
    <StatusBar />
  </>
);
