/**
 * TAB: Feedback & Animaciones
 * ActivityIndicator, RefreshControl, StatusBar,
 * Animated (básico), Keyboard (API)
 */
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';

export default function FeedbackComponents() {
  // Animated demos
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  const [isFaded, setIsFaded] = useState<boolean>(false);
  const [isScaled, setIsScaled] = useState<boolean>(false);
  const [isSlided, setIsSlided] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const [keyboardInput, setKeyboardInput] = useState<string>('');

  // Slide animation on mount
  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  }, []);

  const toggleFade = () => {
    Animated.timing(fadeAnim, {
      toValue: isFaded ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setIsFaded(!isFaded));
  };

  const toggleScale = () => {
    Animated.spring(scaleAnim, {
      toValue: isScaled ? 1 : 1.4,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start(() => setIsScaled(!isScaled));
  };

  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.4, duration: 200, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 150, friction: 5 }),
    ]).start();
  };

  const toggleRotate = () => {
    Animated.spring(rotateAnim, {
      toValue: isRotated ? 0 : 1,
      useNativeDriver: true,
    }).start(() => setIsRotated(!isRotated));
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerBadge}>COMPONENTES NATIVOS</Text>
          <Text style={styles.headerTitle}>Feedback</Text>
          <Text style={styles.headerSubtitle}>
            Animated, StatusBar, KeyboardAvoidingView y más
          </Text>
        </View>

        {/* ANIMATED */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionName}>{'Animated API'}</Text>
          <Text style={styles.sectionDesc}>
            Motor de animación nativo de RN. Corre en el hilo nativo (useNativeDriver: true) para 60fps.
            Tipos: timing, spring, decay. Combinaciones: sequence, parallel, stagger.
          </Text>

          {/* Fade */}
          <Text style={styles.animLabel}>Animated.timing → opacity</Text>
          <View style={styles.animRow}>
            <Animated.View style={[styles.animBox, { backgroundColor: '#6366F1', opacity: fadeAnim }]}>
              <Text style={styles.animBoxText}>👁️</Text>
            </Animated.View>
            <TouchableOpacity
              style={[styles.animBtn, { backgroundColor: '#6366F1' }]}
              onPress={toggleFade}
            >
              <Text style={styles.animBtnText}>{isFaded ? 'Fade In' : 'Fade Out'}</Text>
            </TouchableOpacity>
          </View>

          {/* Scale */}
          <Text style={styles.animLabel}>Animated.spring → scale</Text>
          <View style={styles.animRow}>
            <Animated.View
              style={[styles.animBox, { backgroundColor: '#10B981', transform: [{ scale: scaleAnim }] }]}
            >
              <Text style={styles.animBoxText}>📦</Text>
            </Animated.View>
            <View style={{ gap: 6 }}>
              <TouchableOpacity
                style={[styles.animBtn, { backgroundColor: '#10B981' }]}
                onPress={toggleScale}
              >
                <Text style={styles.animBtnText}>{isScaled ? 'Reducir' : 'Agrandar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.animBtn, { backgroundColor: '#064E3B' }]}
                onPress={pulseAnimation}
              >
                <Text style={styles.animBtnText}>💥 Pulse</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rotate */}
          <Text style={styles.animLabel}>Animated.spring → rotate (interpolate)</Text>
          <View style={styles.animRow}>
            <Animated.View
              style={[styles.animBox, { backgroundColor: '#F59E0B', transform: [{ rotate: spin }] }]}
            >
              <Text style={styles.animBoxText}>🔄</Text>
            </Animated.View>
            <TouchableOpacity
              style={[styles.animBtn, { backgroundColor: '#F59E0B' }]}
              onPress={toggleRotate}
            >
              <Text style={styles.animBtnText}>{isRotated ? 'Girar ↩' : 'Girar ↻'}</Text>
            </TouchableOpacity>
          </View>

          {/* Slide en mount */}
          <Text style={styles.animLabel}>Animated.spring → translateY (al montar)</Text>
          <Animated.View
            style={[
              styles.slideBox,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.slideText}>✨ Animación al cargar el componente</Text>
          </Animated.View>
        </View>

        {/* STATUSBAR */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionName}>{'<StatusBar>'}</Text>
          <Text style={styles.sectionDesc}>
            Controla la barra de estado del dispositivo. Props: barStyle, backgroundColor, translucent, hidden.
          </Text>
          <View style={styles.statusRow}>
            {(['dark-content', 'light-content', 'default'] as const).map((style) => (
              <TouchableOpacity
                key={style}
                style={styles.statusBtn}
                onPress={() => StatusBar.setBarStyle(style, true)}
              >
                <Text style={styles.statusBtnText}>{style.split('-')[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.animLabel}>Presiona para cambiar el barStyle</Text>
        </View>

        {/* KEYBOARD AVOIDING VIEW */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionName}>{'<KeyboardAvoidingView>'}</Text>
          <Text style={styles.sectionDesc}>
            Evita que el teclado tape el contenido. Wrap tu UI en este componente.
            Usa behavior="padding" en iOS y "height" en Android.
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.kavContainer}
          >
            <TextInput
              style={styles.kavInput}
              value={keyboardInput}
              onChangeText={setKeyboardInput}
              placeholder="El teclado no tapará este input..."
              placeholderTextColor="#475569"
              selectionColor="#EF4444"
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <TouchableOpacity
              style={styles.kavBtn}
              onPress={() => Keyboard.dismiss()}
            >
              <Text style={styles.kavBtnText}>Keyboard.dismiss() →</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <Text style={styles.animLabel}>
            Platform.OS: {Platform.OS} · behavior={Platform.OS === 'ios' ? '"padding"' : '"height"'}
          </Text>
        </View>

        {/* PLATFORM */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionName}>{'Platform API'}</Text>
          <Text style={styles.sectionDesc}>
            API para detectar la plataforma en tiempo de ejecución. Permite diferencias de comportamiento entre iOS, Android y Web.
          </Text>
          <View style={styles.platformGrid}>
            <View style={styles.platformItem}>
              <Text style={styles.platformLabel}>Platform.OS</Text>
              <Text style={styles.platformValue}>"{Platform.OS}"</Text>
            </View>
            <View style={styles.platformItem}>
              <Text style={styles.platformLabel}>Platform.Version</Text>
              <Text style={styles.platformValue}>"{String(Platform.Version)}"</Text>
            </View>
            <View style={styles.platformItem}>
              <Text style={styles.platformLabel}>Platform.select()</Text>
              <Text style={styles.platformValue}>
                "
                {Platform.select({
                  ios: 'iOS value',
                  android: 'Android value',
                  default: 'default value',
                })}
                "
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  scroll: { flex: 1 },
  container: { paddingBottom: 40 },
  header: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 28 },
  headerBadge: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: '#EF4444', marginBottom: 8 },
  headerTitle: { fontSize: 40, fontWeight: '800', color: '#F1F5F9', marginBottom: 8 },
  headerSubtitle: { fontSize: 15, color: '#64748B', lineHeight: 22 },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
  },
  sectionName: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#EF4444',
    marginBottom: 8,
  },
  sectionDesc: { fontSize: 13, color: '#94A3B8', lineHeight: 20, marginBottom: 16 },
  animLabel: { fontSize: 11, color: '#475569', marginBottom: 8, fontStyle: 'italic' },
  animRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
  },
  animBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animBoxText: { fontSize: 24 },
  animBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  animBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  slideBox: {
    backgroundColor: '#1E3A5F',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  slideText: { color: '#0EA5E9', fontWeight: '600', fontSize: 14 },
  // StatusBar
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statusBtnText: { color: '#94A3B8', fontWeight: '600', fontSize: 12 },
  // KAV
  kavContainer: { gap: 10 },
  kavInput: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  kavBtn: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 4,
  },
  kavBtnText: { color: '#FFF', fontWeight: '700' },
  // Platform
  platformGrid: { gap: 8 },
  platformItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  platformLabel: { fontSize: 13, color: '#64748B', fontFamily: 'monospace' },
  platformValue: { fontSize: 13, color: '#10B981', fontFamily: 'monospace' },
});
