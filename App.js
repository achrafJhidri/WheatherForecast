import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import { Store, Persistor } from "./src/store/config";
import { PersistGate } from "redux-persist/integration/react";

import { SafeAreaView, StatusBar } from "react-native";
import { AppNavigator } from "./src/navigation/navigation.component";

export default () => (
  <>
    <SafeAreaView style={{ flexGrow: 1 }}>
      
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigator />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
    <StatusBar />
  </>
);
