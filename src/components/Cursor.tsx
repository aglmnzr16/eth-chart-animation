import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Path, getYForX} from 'react-native-redash';

const CURSOR = 50;
const styles = StyleSheet.create({
  cursor: {
    width: CURSOR,
    height: CURSOR,
    borderRadius: CURSOR / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursorBody: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'black',
  },
});

interface CursorProps {
  data: SharedValue<{path: Path}>;
  y: SharedValue<number>
}

const Cursor = ({data,y}: CursorProps) => {
  const active = useSharedValue(false);
  const x = useSharedValue(0);
  const onGestureEvent = Gesture.Pan()
    .onStart(() => {
      active.value = true;
    })
    .onChange(event => {
      x.value = event.x;
      y.value = getYForX(data.value.path, x.value)!
    })
    .onEnd(() => {
      active.value = false;
    });

  const style = useAnimatedStyle(() => {
    console.log('Y X', getYForX(data.value.path, x.value));
    console.log('ACTIVe', withTiming(active.value ? 1 : 0));
    console.log('WITHOUT TIMING', active.value ? 1 : 0);

    const translateX = x.value - CURSOR / 2;
    const translateY = y.value - CURSOR / 2;

    return {
      transform: [{translateX}, {translateY}],
      opacity: withTiming(active.value ? 1 : 0),
    };
  });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.cursor, style]}>
            <View style={styles.cursorBody} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Cursor;
