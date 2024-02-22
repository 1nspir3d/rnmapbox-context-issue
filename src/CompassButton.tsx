import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {MapContext} from './useMap';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

export const CompassButton = (): JSX.Element => {
  const mapContext = useContext(MapContext);
  const heading = useDerivedValue(() => {
    if (mapContext === null) {
      return 0;
    }
    return mapContext.current.heading.value;
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${360 - heading.value}deg`,
        },
      ],
    };
  });

  const handlePress = React.useCallback(() => {
    mapContext?.current.cameraRef.current?.setCamera({
      heading: 0,
      animationDuration: 200,
      animationMode: 'flyTo',
    });
  }, [mapContext]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.arrowContainer, style]} />
      {/* <View style={[styles.arrowContainer]} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
