import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';
import React from 'react';

import Camera from './Camera';

import {StyleSheet} from 'react-native';
import {useSetCompassHeading} from './useMap';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZXRoYXFuaXgiLCJhIjoiY2p4ZzRleXB2MDgyOTNubDk3MGo1dWx2aSJ9.Wiapatml0CXOnOkjNHQb9Q',
);

// edit map logging messages
Logger.setLogCallback((log: {message: string}) => {
  const {message} = log;

  if (
    message.match('Request failed due to a permanent error: Canceled') != null
  ) {
    return true;
  }
  return false;
});

const Map = (): JSX.Element => {
  const setCompassHeading = useSetCompassHeading();
  const handleCompassBearing = React.useCallback(
    (feature: any): void => {
      setCompassHeading(feature.properties.heading);
    },
    [setCompassHeading],
  );
  const handleRegionChange = React.useCallback(
    (feature: any): void => {
      handleCompassBearing(feature);
    },
    [handleCompassBearing],
  );

  return (
    <MapboxGL.MapView
      style={styles.map}
      compassEnabled={false}
      attributionEnabled={false}
      onRegionWillChange={handleCompassBearing}
      onRegionDidChange={handleRegionChange}
      logoEnabled={false}>
      <Camera key="camera" />
    </MapboxGL.MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
