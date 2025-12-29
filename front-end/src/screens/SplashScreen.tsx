import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Animated,
  useWindowDimensions 
} from 'react-native';
import { Loading } from '../components/ui/loading';

export default function SplashScreen({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  // Calcular tamanhos responsivos
  const logoSize = Math.min(width * 0.25, height * 0.25, 120);
  const loadingSize = Math.min(width * 0.12, height * 0.12, 50);
  const titleSize = Math.min(width * 0.07, height * 0.07, 28);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Image
        source={require('../assets/img-logo.png')}
        style={[
          styles.logo, 
          { 
            width: 250, 
            height: 250,
            transform: [{ scale }] 
          }
        ]}
        resizeMode="contain"
      />

      <View style={{ marginTop: height * 0.05 }}>
        <Loading 
          color="#fff" 
          size={loadingSize}
          dotSize={Math.max(loadingSize * 0.2, 8)}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});