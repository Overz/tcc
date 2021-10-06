import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import useCachedResources from './src/hooks/useCachedResources';
import {
  getNotificationPermissions,
  getUserLocation,
  getUserPersonalStorage,
} from './src/hooks';

import { App } from './src';

export default function Index() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    getUserLocation();
    getUserPersonalStorage();
    getNotificationPermissions();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return <App />;
}
