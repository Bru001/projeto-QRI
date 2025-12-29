import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface Props {
  color?: string;
  size?: number;
  dotSize?: number;
}

export const Loading: React.FC<Props> = ({
  color = '#007AFF',
  size = 40,
  dotSize = 8,
}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const dots = 10;
  
  // Criar animações para cada ponto
  const dotAnimations = useRef(
    [...Array(dots)].map((_, i) => {
      const startValue = (i * 0.8) / dots;
      return new Animated.Value(startValue);
    })
  ).current;

  useEffect(() => {
    // Animação principal de rotação
    const rotateAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Animações dos pontos
    const pointAnimations = dotAnimations.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 1600,
            easing: Easing.bezier(0.2, 0.0, 0.8, 1.0),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1600,
            easing: Easing.bezier(0.2, 0.0, 0.8, 1.0),
            useNativeDriver: true,
          }),
        ])
      );
    });

    rotateAnimation.start();
    pointAnimations.forEach((anim, i) => {
      setTimeout(() => {
        anim.start();
      }, i * 160);
    });

    return () => {
      rotateAnimation.stop();
      pointAnimations.forEach(anim => anim.stop());
    };
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View 
        style={[
          styles.spinner,
          { 
            transform: [{ rotate: rotateInterpolate }],
            width: size,
            height: size,
          }
        ]}
      >
        {dotAnimations.map((anim, i) => {
          const angle = (i * 360) / dots;
          
          const scale = anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.4, 1.0, 0.4],
          });

          const opacity = anim.interpolate({
            inputRange: [0, 0.3, 0.7, 1],
            outputRange: [0.2, 0.9, 0.9, 0.2],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: color,
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize / 2,
                  transform: [
                    { rotate: `${angle}deg` },
                    { translateY: -size / 2 + dotSize / 2 },
                    { scale },
                  ],
                  opacity,
                },
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
  },
});