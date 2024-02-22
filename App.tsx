/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import Map from './src/Map';
import {MapContextProvider} from './src/useMap';
import {CompassButton} from './src/CompassButton';

function App(): JSX.Element {
  return (
    <MapContextProvider>
      <View style={StyleSheet.absoluteFill}>
        <Map />
        <View style={styles.bottomLeftContainer} key="bottomLeftOverlay">
          <CompassButton />
        </View>
      </View>
    </MapContextProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bottomLeftContainer: {
    paddingBottom: 40 + 4,
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'column',
    padding: 4,
  },
});

export default App;
