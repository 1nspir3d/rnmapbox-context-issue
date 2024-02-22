import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {
  createContext,
  useRef,
  useContext,
  ReactNode,
  MutableRefObject,
} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

type TMapContext = React.MutableRefObject<{
  heading: SharedValue<number>;
  cameraRef: MutableRefObject<MapboxGL.Camera | null>;
}>;
export const MapContext = createContext<TMapContext | null>(null);

export const MapContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const heading = useSharedValue(0);
  const valueRef: TMapContext = useRef({
    heading,
    cameraRef: React.createRef(),
  });

  return <MapContext.Provider value={valueRef}>{children}</MapContext.Provider>;
};

const useMapContext = (): TMapContext => {
  const context = useContext(MapContext);

  if (context === null) {
    throw new Error('Should be used inside MapContextProvider');
  }
  return context;
};

export const useSetMapCamera = (): ((
  camera: MutableRefObject<MapboxGL.Camera | null>,
) => void) => {
  const mapContext = useMapContext();

  return React.useCallback(
    (camera: MutableRefObject<MapboxGL.Camera | null>) => {
      console.log('setCamera: ', camera !== null);
      console.log(
        'current camera ref in context: ',
        mapContext.current.cameraRef.current,
      );
      mapContext.current.cameraRef = camera;
      console.log(
        'map camera ref after setCameraCall: ',
        mapContext.current.cameraRef.current,
      );
    },
    [mapContext],
  );
};

export const useSetCompassHeading = (): ((value: number) => void) => {
  const mapContext = useMapContext();
  const prevUpdate = useRef<number>(-1);

  return React.useCallback(
    (value: number) => {
      const now = Date.now();
      mapContext.current.heading.value = value;
      prevUpdate.current = now;
    },
    [mapContext],
  );
};
