import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Text, Vibration, Platform, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop, RadialGradient, Filter, FeGaussianBlur } from 'react-native-svg';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const [rotation, setRotation] = useState(0);
  const [value, setValue] = useState(0);
  const [isLightOn, setIsLightOn] = useState(false);
  const lastAngle = useRef(0);
  const lastValue = useRef(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const brightnessAnimation = useRef(new Animated.Value(0)).current;

  // Efecto de brillo cuando se llega a los límites
  useEffect(() => {
    if (value === 0 || value === 100) {
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [value]);

  const calculateValue = (angle) => {
    let newValue = Math.round((angle * 100) / 360);
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    return newValue;
  };

  const updateShakeEffect = (newValue) => {
    const intensity = newValue / 100;
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: intensity * 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -intensity * 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (newValue > 0) {
        updateShakeEffect(newValue);
      }
    });
  };

  const updateBrightnessEffect = (newValue) => {
    Animated.timing(brightnessAnimation, {
      toValue: newValue / 100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const centerX = 75;
      const centerY = 75;
      const angle = Math.atan2(locationY - centerY, locationX - centerX) * (180 / Math.PI);
      const normalizedAngle = (angle + 90 + 360) % 360;
      lastAngle.current = normalizedAngle;
      setRotation(normalizedAngle);
      const newValue = calculateValue(normalizedAngle);
      setValue(newValue);
      
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        Vibration.vibrate(50);
      }
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const centerX = 75;
      const centerY = 75;
      const angle = Math.atan2(locationY - centerY, locationX - centerX) * (180 / Math.PI);
      const normalizedAngle = (angle + 90 + 360) % 360;
      
      let angleDiff = normalizedAngle - lastAngle.current;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      
      let newRotation = rotation + angleDiff;
      newRotation = (newRotation + 360) % 360;
      
      const newValue = calculateValue(newRotation);
      
      if ((newValue > value && newValue <= 100) || 
          (newValue < value && newValue >= 0) ||
          (newValue === value)) {
        setRotation(newRotation);
        
        if (newValue !== value) {
          setValue(newValue);
          updateShakeEffect(newValue);
          updateBrightnessEffect(newValue);
          
          if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else {
            Vibration.vibrate(50);
          }
        }
      }
      
      lastAngle.current = normalizedAngle;
    },
    onPanResponderRelease: () => {
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        Vibration.vibrate(50);
      }
    },
  });

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Vibration.vibrate(20);
    }
  };

  const backgroundStyle = {
    transform: [
      { translateX: shakeAnimation },
      { scale: brightnessAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.05]
      })}
    ],
    opacity: brightnessAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 1]
    })
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundContainer, backgroundStyle]}>
        <ImageBackground 
          source={require('../assets/allerodi-asset.jpg')} 
          style={styles.backgroundImage}
        >
          <View style={styles.purpleOverlay}>
            <View style={styles.overlay}>
              <View style={styles.controlContainer} {...panResponder.panHandlers}>
                <Svg width={150} height={150} style={styles.svg}>
                  <Defs>
                    {/* Filtro de desenfoque para sombras */}
                    <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <FeGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    </Filter>

                    {/* Gradiente para el borde exterior con efecto de luz */}
                    <LinearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
                      <Stop offset="0" stopColor="#ccc" stopOpacity="1" />
                      <Stop offset="0.2" stopColor="#999" stopOpacity="1" />
                      <Stop offset="0.5" stopColor="#666" stopOpacity="1" />
                      <Stop offset="0.8" stopColor="#999" stopOpacity="1" />
                      <Stop offset="1" stopColor="#ccc" stopOpacity="1" />
                    </LinearGradient>
                    
                    {/* Gradiente para el fondo del control con efecto de luz */}
                    <RadialGradient id="mainGrad" cx="0.3" cy="0.3" r="0.8" fx="0.3" fy="0.3">
                      <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
                      <Stop offset="0.3" stopColor="#f8f8f8" stopOpacity="1" />
                      <Stop offset="0.6" stopColor="#f0f0f0" stopOpacity="1" />
                      <Stop offset="1" stopColor="#e0e0e0" stopOpacity="1" />
                    </RadialGradient>

                    {/* Gradiente para la flecha con efecto de luz */}
                    <LinearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="1">
                      <Stop offset="0" stopColor="#ffaaaa" stopOpacity="1" />
                      <Stop offset="0.5" stopColor="#ff4444" stopOpacity="1" />
                      <Stop offset="1" stopColor="#cc0000" stopOpacity="1" />
                    </LinearGradient>

                    {/* Gradiente para el brillo superior izquierdo */}
                    <RadialGradient id="highlightGrad" cx="0.3" cy="0.3" r="0.8" fx="0.3" fy="0.3">
                      <Stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                      <Stop offset="0.5" stopColor="#ffffff" stopOpacity="0.3" />
                      <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </RadialGradient>
                    
                    {/* Gradiente para la sombra inferior derecha */}
                    <RadialGradient id="shadowGrad" cx="0.7" cy="0.7" r="0.8" fx="0.7" fy="0.7">
                      <Stop offset="0" stopColor="#000000" stopOpacity="0.2" />
                      <Stop offset="0.5" stopColor="#000000" stopOpacity="0.1" />
                      <Stop offset="1" stopColor="#000000" stopOpacity="0" />
                    </RadialGradient>

                    {/* Gradiente para el efecto de brillo en los límites */}
                    <RadialGradient id="limitGrad" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                      <Stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
                      <Stop offset="0.5" stopColor="#ffffff" stopOpacity="0.4" />
                      <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </RadialGradient>
                  </Defs>
                  
                  {/* Sombra principal con desenfoque */}
                  <Circle
                    cx={78}
                    cy={78}
                    r={52}
                    fill="#00000040"
                    filter="url(#shadow)"
                  />
                  
                  {/* Borde exterior con gradiente */}
                  <Circle
                    cx={75}
                    cy={75}
                    r={50}
                    stroke="url(#borderGrad)"
                    strokeWidth={4}
                    fill="none"
                  />
                  
                  {/* Círculo principal con gradiente radial */}
                  <Circle
                    cx={75}
                    cy={75}
                    r={46}
                    fill="url(#mainGrad)"
                  />
                  
                  {/* Efecto de sombra inferior derecha */}
                  <Circle
                    cx={75}
                    cy={75}
                    r={46}
                    fill="url(#shadowGrad)"
                  />
                  
                  {/* Efecto de profundidad en el borde interior */}
                  <Circle
                    cx={75}
                    cy={75}
                    r={46}
                    stroke="#00000010"
                    strokeWidth={2}
                    fill="none"
                  />
                  
                  {/* Efecto de brillo en los límites */}
                  {value === 0 || value === 100 ? (
                    <Circle
                      cx={75}
                      cy={75}
                      r={46}
                      fill="url(#limitGrad)"
                      opacity={glowAnim}
                    />
                  ) : null}
                  
                  {/* Marcas de grados con efecto 3D */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const x1 = 75 + 43 * Math.cos(angle);
                    const y1 = 75 + 43 * Math.sin(angle);
                    const x2 = 75 + 48 * Math.cos(angle);
                    const y2 = 75 + 48 * Math.sin(angle);
                    return (
                      <Path
                        key={i}
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        stroke="#666"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    );
                  })}
                  
                  {/* Sombra de la flecha con desenfoque */}
                  <Path
                    d="M 75 25 L 72 40 L 78 40 Z"
                    fill="#00000060"
                    filter="url(#shadow)"
                    transform={`rotate(${rotation}, 75, 75)`}
                  />
                  
                  {/* Flecha con gradiente */}
                  <Path
                    d="M 75 25 L 72 40 L 78 40 Z"
                    fill="url(#arrowGrad)"
                    transform={`rotate(${rotation}, 75, 75)`}
                  />
                  
                  {/* Efecto de brillo en la parte superior izquierda */}
                  <Circle
                    cx={75}
                    cy={75}
                    r={46}
                    fill="url(#highlightGrad)"
                    opacity={0.7}
                  />
                  
                  {/* Efecto de brillo adicional en la esquina superior izquierda */}
                  <Circle
                    cx={60}
                    cy={60}
                    r={20}
                    fill="url(#highlightGrad)"
                    opacity={0.5}
                  />
                </Svg>
                <View style={styles.valueContainer}>
                  <View style={styles.valueInnerContainer}>
                    <Text style={styles.valueText}>{value}</Text>
                  </View>
                </View>
              </View>

              {/* Production Style Button */}
              <TouchableOpacity
                style={styles.lightButton}
                onPress={toggleLight}
                activeOpacity={0.7}
              >
                <Svg width={50} height={50} style={styles.lightSvg}>
                  <Defs>
                    {/* Gradiente principal para el botón */}
                    <LinearGradient id="buttonGrad" x1="0" y1="0" x2="1" y2="1">
                      <Stop offset="0" stopColor={isLightOn ? "#4ade80" : "#22c55e"} stopOpacity="1" />
                      <Stop offset="0.3" stopColor={isLightOn ? "#22c55e" : "#16a34a"} stopOpacity="1" />
                      <Stop offset="0.7" stopColor={isLightOn ? "#16a34a" : "#15803d"} stopOpacity="1" />
                      <Stop offset="1" stopColor={isLightOn ? "#15803d" : "#14532d"} stopOpacity="1" />
                    </LinearGradient>

                    {/* Gradiente para el borde superior */}
                    <LinearGradient id="buttonTopBorder" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor={isLightOn ? "#86efac" : "#4ade80"} stopOpacity="1" />
                      <Stop offset="0.5" stopColor={isLightOn ? "#4ade80" : "#22c55e"} stopOpacity="1" />
                      <Stop offset="1" stopColor={isLightOn ? "#22c55e" : "#16a34a"} stopOpacity="1" />
                    </LinearGradient>

                    {/* Gradiente para el borde inferior */}
                    <LinearGradient id="buttonBottomBorder" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor={isLightOn ? "#16a34a" : "#15803d"} stopOpacity="1" />
                      <Stop offset="0.5" stopColor={isLightOn ? "#15803d" : "#14532d"} stopOpacity="1" />
                      <Stop offset="1" stopColor={isLightOn ? "#14532d" : "#052e16"} stopOpacity="1" />
                    </LinearGradient>

                    {/* Gradiente para el brillo superior */}
                    <LinearGradient id="buttonShine" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#ffffff" stopOpacity={isLightOn ? "0.4" : "0.2"} />
                      <Stop offset="0.3" stopColor="#ffffff" stopOpacity="0" />
                      <Stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                    </LinearGradient>

                    {/* Filtro de desenfoque para la sombra */}
                    <Filter id="buttonShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <FeGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    </Filter>

                    {/* Filtro para el brillo del LED */}
                    <Filter id="ledGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <FeGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </Filter>
                  </Defs>

                  {/* Sombra del botón */}
                  <Circle
                    cx={25}
                    cy={25}
                    r={20}
                    fill="#00000060"
                    filter="url(#buttonShadow)"
                  />

                  {/* Base del botón (parte inferior) */}
                  <Circle
                    cx={25}
                    cy={27}
                    r={20}
                    fill="url(#buttonBottomBorder)"
                  />

                  {/* Cuerpo principal del botón */}
                  <Circle
                    cx={25}
                    cy={23}
                    r={20}
                    fill="url(#buttonGrad)"
                    stroke="url(#buttonTopBorder)"
                    strokeWidth={2}
                  />

                  {/* Efecto de brillo superior */}
                  <Circle
                    cx={25}
                    cy={23}
                    r={18}
                    fill="url(#buttonShine)"
                  />

                  {/* LED indicador */}
                  <Circle
                    cx={25}
                    cy={13}
                    r={4}
                    fill={isLightOn ? "#ffffff" : "#15803d"}
                    filter="url(#ledGlow)"
                  />

                  {/* Efecto de luz cuando está encendido */}
                  {isLightOn && (
                    <Circle
                      cx={25}
                      cy={23}
                      r={25}
                      fill="#4ade80"
                      opacity="0.2"
                    />
                  )}
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  purpleOverlay: {
    flex: 1,
    backgroundColor: 'rgba(147, 51, 234, 0.3)',
  },
  controlContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  svg: {
    position: 'absolute',
  },
  valueContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  valueInnerContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lightButton: {
    position: 'absolute',
    bottom: 85,
    right: 190,
    width: 60,
    height: 60,
    zIndex: 1000,
  },
  lightSvg: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
}); 