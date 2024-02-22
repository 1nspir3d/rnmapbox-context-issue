import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {useEffect, useRef} from 'react';
import {useSetMapCamera} from './useMap';

const boundingBoxSize = {
  x: 1,
  y: 1,
};

const Camera = (): JSX.Element => {
  const cameraRef = useRef<MapboxGL.Camera | null>(null);

  const setMapCamera = useSetMapCamera();

  useEffect(() => {
    setMapCamera(cameraRef);
  }, [cameraRef, setMapCamera]);

  useEffect(() => {
    const {x, y} = boundingBoxSize;
    cameraRef.current?.setCamera({
      animationDuration: 0,
      heading: 1, // camera rotation
      bounds: {
        ne: [x / 2, y / 2],
        sw: [-x / 2, -y / 2],
      },
      pitch: 0,
      centerCoordinate: [49.839, 24.0191].reverse(),
      zoomLevel: 5,
    });
  }, []);

  return <MapboxGL.Camera ref={cameraRef} animationDuration={1000} />;
};

export default Camera;
