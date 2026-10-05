/**
 * TAB: Componentes Básicos
 * View, Text, Image, ImageBackground, ScrollView, TouchableOpacity,
 * Pressable, TouchableHighlight
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

interface ComponentCardProps {
  title: string;
  description: string;
  accentColor: string;
  children: React.ReactNode;
}

function ComponentCard({ title, description, accentColor, children }: ComponentCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardAccent, { backgroundColor: accentColor }]} />
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: accentColor }]}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
        <View style={styles.cardDemo}>{children}</View>
      </View>
    </View>
  );
}

export default function BasicComponents() {
  const [pressCount, setPressCount] = useState<number>(0);
  const [highlighted, setHighlighted] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerBadge}>COMPONENTES NATIVOS</Text>
          <Text style={styles.headerTitle}>Básicos</Text>
          <Text style={styles.headerSubtitle}>
            Los bloques fundamentales de toda app React Native
          </Text>
        </View>

        {/* VIEW */}
        <ComponentCard
          title="<View>"
          description="Contenedor principal. Como un <div> en HTML. Permite flexbox, estilos y gestos."
          accentColor="#6366F1"
        >
          <View style={styles.viewDemo}>
            <View style={[styles.box, { backgroundColor: '#6366F1' }]} />
            <View style={[styles.box, { backgroundColor: '#818CF8' }]} />
            <View style={[styles.box, { backgroundColor: '#A5B4FC' }]} />
          </View>
        </ComponentCard>

        {/* TEXT */}
        <ComponentCard
          title="<Text>"
          description="Único componente para mostrar texto. Soporta estilos, anidamiento y onPress."
          accentColor="#10B981"
        >
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#F1F5F9' }}>
              Título H1
            </Text>
            <Text style={{ fontSize: 16, color: '#94A3B8' }}>
              Párrafo normal con{' '}
              <Text style={{ color: '#10B981', fontWeight: '700' }}>texto anidado</Text>
              {' '}en verde
            </Text>
            <Text style={{ fontSize: 12, letterSpacing: 2, color: '#64748B' }}>
              TEXTO PEQUEÑO CAPS
            </Text>
          </View>
        </ComponentCard>

        {/* IMAGE */}
        <ComponentCard
          title="<Image>"
          description="Muestra imágenes locales o remotas. Props: source, resizeMode, style."
          accentColor="#F59E0B"
        >
          <View style={styles.imageRow}>
            <Image
              source={{ uri: 'https://picsum.photos/seed/rn1/80/80' }}
              style={styles.imageSquare}
              resizeMode="cover"
            />
            <Image
              source={{ uri: 'https://picsum.photos/seed/rn2/80/80' }}
              style={styles.imageCircle}
              resizeMode="cover"
            />
            <Image
              source={{ uri: 'https://picsum.photos/seed/rn3/120/80' }}
              style={styles.imageRect}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.demoNote}>cover · circle · contain</Text>
        </ComponentCard>

        {/* IMAGE BACKGROUND */}
        <ComponentCard
          title="<ImageBackground>"
          description="Como Image pero permite anidar hijos sobre la imagen. Ideal para heroes."
          accentColor="#EC4899"
        >
          <ImageBackground
            source={{ uri: 'https://picsum.photos/seed/bg1/400/120' }}
            style={styles.imageBg}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.imageBgOverlay}>
              <Text style={styles.imageBgText}>Contenido sobre imagen</Text>
            </View>
          </ImageBackground>
        </ComponentCard>

        {/* TOUCHABLE OPACITY */}
        <ComponentCard
          title="<TouchableOpacity>"
          description="Botón táctil que reduce la opacidad al presionar. El más usado para botones."
          accentColor="#8B5CF6"
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#8B5CF6' }]}
              onPress={() => setPressCount((c) => c + 1)}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>Presionar</Text>
            </TouchableOpacity>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{pressCount}</Text>
            </View>
          </View>
          <Text style={styles.demoNote}>activeOpacity controla la transparencia</Text>
        </ComponentCard>

        {/* TOUCHABLE HIGHLIGHT */}
        <ComponentCard
          title="<TouchableHighlight>"
          description="Botón táctil que muestra un color de fondo al presionar. Útil para listas."
          accentColor="#EF4444"
        >
          <TouchableHighlight
            style={styles.highlightBtn}
            underlayColor="#FEE2E2"
            onShowUnderlay={() => setHighlighted(true)}
            onHideUnderlay={() => setHighlighted(false)}
          >
            <Text style={styles.highlightText}>
              {highlighted ? '🔴 Presionado' : '⬜ Mantén presionado'}
            </Text>
          </TouchableHighlight>
        </ComponentCard>

        {/* PRESSABLE */}
        <ComponentCard
          title="<Pressable>"
          description="El más moderno y flexible. Detecta hover, focus y estados de presión con precisión."
          accentColor="#0EA5E9"
        >
          <Pressable
            style={({ pressed }) => [
              styles.pressableBtn,
              pressed && styles.pressableBtnPressed,
            ]}
          >
            {({ pressed }) => (
              <Text style={styles.pressableText}>
                {pressed ? '✅ Presionando...' : '👆 Toca y mantén'}
              </Text>
            )}
          </Pressable>
          <Text style={styles.demoNote}>Usa render props para acceder al estado</Text>
        </ComponentCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  scroll: { flex: 1 },
  container: { paddingBottom: 40 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerBadge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#6366F1',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardAccent: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: 18,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardDemo: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 16,
  },
  demoNote: {
    marginTop: 8,
    fontSize: 11,
    color: '#475569',
    fontStyle: 'italic',
  },
  // View demo
  viewDemo: {
    flexDirection: 'row',
    gap: 8,
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  // Image demo
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  imageSquare: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  imageCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  imageRect: {
    width: 96,
    height: 64,
    borderRadius: 8,
  },
  // ImageBackground demo
  imageBg: {
    height: 110,
    justifyContent: 'flex-end',
  },
  imageBgOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  imageBgText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  // Button demo
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  countBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '800',
  },
  // Highlight demo
  highlightBtn: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  highlightText: {
    color: '#F1F5F9',
    fontWeight: '600',
    fontSize: 15,
  },
  // Pressable demo
  pressableBtn: {
    backgroundColor: '#0C4A6E',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  pressableBtnPressed: {
    backgroundColor: '#0EA5E9',
    transform: [{ scale: 0.97 }],
  },
  pressableText: {
    color: '#F1F5F9',
    fontWeight: '600',
    fontSize: 15,
  },
});
