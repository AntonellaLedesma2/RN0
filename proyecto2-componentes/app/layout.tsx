/**
 * TAB: Layout & Estructura
 * SafeAreaView, KeyboardAvoidingView, Dimensions,
 * Flexbox demos, useWindowDimensions
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface FlexDemoProps {
  label: string;
  flexDirection: 'row' | 'column';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  color: string;
}

const FLEX_DEMOS: FlexDemoProps[] = [
  { label: 'row + space-between + center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: '#6366F1' },
  { label: 'row + center + center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', color: '#10B981' },
  { label: 'column + space-evenly + stretch', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'stretch', color: '#F59E0B' },
  { label: 'row + space-around + flex-end', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', color: '#EF4444' },
];

function FlexDemo({ label, flexDirection, justifyContent, alignItems, color }: FlexDemoProps) {
  return (
    <View style={styles.flexCard}>
      <Text style={[styles.flexLabel, { color }]}>{label}</Text>
      <View
        style={[
          styles.flexBox,
          { flexDirection, justifyContent, alignItems, borderColor: color + '40' },
        ]}
      >
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[
              styles.flexItem,
              {
                backgroundColor: color + (n === 1 ? 'CC' : n === 2 ? '88' : '44'),
                width: flexDirection === 'row' ? 36 + n * 8 : '90%',
                height: flexDirection === 'column' ? 24 : 32 + n * 4,
              },
            ]}
          >
            <Text style={styles.flexItemText}>{n}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function LayoutComponents() {
  const { width, height, scale, fontScale } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerBadge}>COMPONENTES NATIVOS</Text>
          <Text style={styles.headerTitle}>Layout</Text>
          <Text style={styles.headerSubtitle}>
            Flexbox, Dimensions, SafeAreaView y herramientas de layout
          </Text>
        </View>

        {/* SAFE AREA VIEW */}
        <View style={styles.infoCard}>
          <View style={[styles.infoAccent, { backgroundColor: '#6366F1' }]} />
          <View style={styles.infoBody}>
            <Text style={[styles.infoTitle, { color: '#6366F1' }]}>{'<SafeAreaView>'}</Text>
            <Text style={styles.infoDesc}>
              Respeta los insets seguros del dispositivo (notch, home bar, status bar).
              Siempre úsalo como contenedor raíz de tus pantallas.
            </Text>
            <View style={styles.safeDemo}>
              <View style={styles.safeDemoInner}>
                <View style={styles.safeDemoNotch} />
                <View style={styles.safeDemoContent}>
                  <Text style={styles.safeDemoText}>Tu contenido aquí</Text>
                </View>
                <View style={styles.safeDemoBar} />
              </View>
              <Text style={styles.safeDemoLabel}>Sin safe area riesgo de recorte</Text>
            </View>
          </View>
        </View>

        {/* DIMENSIONS */}
        <View style={styles.infoCard}>
          <View style={[styles.infoAccent, { backgroundColor: '#10B981' }]} />
          <View style={styles.infoBody}>
            <Text style={[styles.infoTitle, { color: '#10B981' }]}>Dimensions + useWindowDimensions</Text>
            <Text style={styles.infoDesc}>
              Dimensions.get() devuelve medidas estáticas. useWindowDimensions() es reactivo y se actualiza al rotar la pantalla.
            </Text>
            <View style={styles.dimGrid}>
              {[
                { label: 'width', value: String(Math.round(width)) + 'px', color: '#10B981' },
                { label: 'height', value: String(Math.round(height)) + 'px', color: '#10B981' },
                { label: 'scale', value: String(scale.toFixed(2)), color: '#6FCF97' },
                { label: 'fontScale', value: String(fontScale.toFixed(2)), color: '#6FCF97' },
                { label: 'Dimensions.width', value: String(Math.round(SCREEN_W)) + 'px', color: '#059669' },
                { label: 'Dimensions.height', value: String(Math.round(SCREEN_H)) + 'px', color: '#059669' },
              ].map((item, i) => (
                <View key={i} style={styles.dimItem}>
                  <Text style={styles.dimLabel}>{item.label}</Text>
                  <Text style={[styles.dimValue, { color: item.color }]}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* FLEXBOX */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Flexbox en React Native</Text>
          <Text style={styles.sectionHeaderDesc}>
            React Native usa Flexbox con columna vertical por defecto (flexDirection: "column").
            Todos los View son flex por defecto.
          </Text>
        </View>

        {FLEX_DEMOS.map((demo, i) => (
          <FlexDemo key={i} {...demo} />
        ))}

        {/* FLEX RATIOS */}
        <View style={styles.infoCard}>
          <View style={[styles.infoAccent, { backgroundColor: '#8B5CF6' }]} />
          <View style={styles.infoBody}>
            <Text style={[styles.infoTitle, { color: '#8B5CF6' }]}>flex: ratio</Text>
            <Text style={styles.infoDesc}>
              Con flex puedes distribuir espacio proporcional entre hijos.
              flex: 1 + flex: 2 + flex: 1 = 25% + 50% + 25%.
            </Text>
            <View style={styles.flexRatioContainer}>
              {[
                { flex: 1, color: '#6366F1', label: '1' },
                { flex: 2, color: '#8B5CF6', label: '2' },
                { flex: 1, color: '#A78BFA', label: '1' },
              ].map((item, i) => (
                <View key={i} style={[styles.flexRatioItem, { flex: item.flex, backgroundColor: item.color }]}>
                  <Text style={styles.flexRatioText}>flex: {item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* POSITIONING */}
        <View style={styles.infoCard}>
          <View style={[styles.infoAccent, { backgroundColor: '#0EA5E9' }]} />
          <View style={styles.infoBody}>
            <Text style={[styles.infoTitle, { color: '#0EA5E9' }]}>position: "absolute"</Text>
            <Text style={styles.infoDesc}>
              Posiciona elementos respecto a su contenedor. Ideal para overlays, badges y FABs.
            </Text>
            <View style={styles.posContainer}>
              <View style={styles.posBase}>
                <Text style={styles.posBaseText}>Contenedor relativo</Text>
                <View style={styles.posBadge}>
                  <Text style={styles.posBadgeText}>3</Text>
                </View>
                <View style={styles.posFab}>
                  <Text style={styles.posFabText}>FAB</Text>
                </View>
              </View>
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
  headerBadge: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: '#8B5CF6', marginBottom: 8 },
  headerTitle: { fontSize: 40, fontWeight: '800', color: '#F1F5F9', marginBottom: 8 },
  headerSubtitle: { fontSize: 15, color: '#64748B', lineHeight: 22 },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  infoAccent: { width: 4 },
  infoBody: { flex: 1, padding: 18 },
  infoTitle: { fontSize: 16, fontWeight: '700', fontFamily: 'monospace', marginBottom: 8 },
  infoDesc: { fontSize: 13, color: '#94A3B8', lineHeight: 20, marginBottom: 14 },
  // SafeArea demo
  safeDemo: { alignItems: 'center' },
  safeDemoInner: {
    width: 120,
    height: 80,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  safeDemoNotch: { height: 12, backgroundColor: '#EF4444', width: '100%' },
  safeDemoContent: {
    flex: 1,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeDemoText: { color: '#FFF', fontSize: 9, fontWeight: '700' },
  safeDemoBar: { height: 10, backgroundColor: '#EF4444', width: '100%' },
  safeDemoLabel: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  // Dimensions grid
  dimGrid: { gap: 6 },
  dimItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dimLabel: { fontSize: 12, color: '#64748B', fontFamily: 'monospace' },
  dimValue: { fontSize: 12, fontWeight: '700', fontFamily: 'monospace' },
  // Flex demos
  sectionHeader: { paddingHorizontal: 20, marginBottom: 12 },
  sectionHeaderText: { fontSize: 18, fontWeight: '700', color: '#F1F5F9', marginBottom: 6 },
  sectionHeaderDesc: { fontSize: 13, color: '#64748B', lineHeight: 20 },
  flexCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
  },
  flexLabel: { fontSize: 12, fontFamily: 'monospace', fontWeight: '600', marginBottom: 10 },
  flexBox: {
    height: 80,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    padding: 6,
  },
  flexItem: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexItemText: { color: '#FFF', fontWeight: '800', fontSize: 12 },
  // Flex ratio
  flexRatioContainer: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 10,
    overflow: 'hidden',
    gap: 2,
  },
  flexRatioItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  flexRatioText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  // Position
  posContainer: { alignItems: 'center' },
  posBase: {
    width: '100%',
    height: 90,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  posBaseText: { color: '#475569', fontSize: 13 },
  posBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  posBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  posFab: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  posFabText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});
