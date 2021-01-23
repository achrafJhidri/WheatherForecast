import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { Button, Icon } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const FacebookIcon = (props) => (
  <Icon name='facebook' {...props} />
  );

export const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);

    <LoginButton/>

  <SafeAreaView style={{flex : 1}}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
    </ApplicationProvider>
    </SafeAreaView>
