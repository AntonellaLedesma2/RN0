/**
 * TAB: Listas & Scroll
 * FlatList, SectionList, ScrollView (horizontal), VirtualizedList
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

interface SectionData {
  title: string;
  color: string;
  data: ListItem[];
}

const FLAT_DATA: ListItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i),
  title: `Elemento ${i + 1}`,
  subtitle: `Descripción del ítem #${i + 1}`,
  color: ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#0EA5E9'][i % 6],
}));

const SECTION_DATA: SectionData[] = [
  {
    title: '🟣 Componentes UI',
    color: '#6366F1',
    data: [
      { id: 's1', title: 'View', subtitle: 'Contenedor base', color: '#6366F1' },
      { id: 's2', title: 'Text', subtitle: 'Texto renderizado', color: '#6366F1' },
      { id: 's3', title: 'Image', subtitle: 'Imágenes nativas', color: '#6366F1' },
    ],
  },
  {
    title: '🟢 Controles',
    color: '#10B981',
    data: [
      { id: 's4', title: 'TextInput', subtitle: 'Entrada de texto', color: '#10B981' },
      { id: 's5', title: 'Switch', subtitle: 'Toggle booleano', color: '#10B981' },
      { id: 's6', title: 'Button', subtitle: 'Botón nativo', color: '#10B981' },
    ],
  },
  {
    title: '🟡 Navegación',
    color: '#F59E0B',
    data: [
      { id: 's7', title: 'Tab Navigator', subtitle: 'Tabs inferiores', color: '#F59E0B' },
      { id: 's8', title: 'Stack Navigator', subtitle: 'Navegación apilada', color: '#F59E0B' },
    ],
  },
];

const HORIZONTAL_ITEMS = ['Expo', 'TypeScript', 'React', 'Redux', 'Zustand', 'React Query', 'Reanimated', 'MMKV'];

export default function ListsComponents() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'flat' | 'section'>('flat');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const renderFlatItem = ({ item, index }: { item: ListItem; index: number }) => (
    <View style={[styles.flatItem, index % 2 === 0 && styles.flatItemAlt]}>
      <View style={[styles.flatDot, { backgroundColor: item.color }]} />
      <View style={styles.flatText}>
        <Text style={styles.flatTitle}>{item.title}</Text>
        <Text style={styles.flatSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={[styles.flatIndex, { color: item.color }]}>#{index + 1}</Text>
    </View>
  );

  const renderSectionItem = ({ item }: { item: ListItem }) => (
    <View style={styles.sectionItem}>
      <View style={[styles.sectionDot, { backgroundColor: item.color }]} />
      <View>
        <Text style={styles.flatTitle}>{item.title}</Text>
        <Text style={styles.flatSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View style={[styles.sectionHeader, { borderLeftColor: section.color }]}>
      <Text style={[styles.sectionHeaderText, { color: section.color }]}>{section.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerBadge}>COMPONENTES NATIVOS</Text>
          <Text style={styles.headerTitle}>Listas</Text>
          <Text style={styles.headerSubtitle}>
            Componentes optimizados para renderizar grandes volúmenes de datos
          </Text>
        </View>

        {/* ScrollView horizontal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {'<ScrollView horizontal>'}
          </Text>
          <Text style={styles.sectionDesc}>
            Desplazamiento libre sin virtualización. Ideal para listas cortas horizontales.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hScrollContent}
          >
            {HORIZONTAL_ITEMS.map((item, i) => (
              <View
                key={i}
                style={[
                  styles.hChip,
                  { backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'][i % 4] + '25' },
                ]}
              >
                <Text
                  style={[
                    styles.hChipText,
                    { color: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'][i % 4] },
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tabs selector */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'flat' && styles.tabBtnActive]}
            onPress={() => setActiveTab('flat')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'flat' && styles.tabBtnTextActive]}>
              {'<FlatList>'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'section' && styles.tabBtnActive]}
            onPress={() => setActiveTab('section')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'section' && styles.tabBtnTextActive]}>
              {'<SectionList>'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.descCard}>
          {activeTab === 'flat' ? (
            <>
              <Text style={styles.descTitle}>FlatList</Text>
              <Text style={styles.descText}>
                Lista virtualizada de alto rendimiento. Solo renderiza los ítems visibles.
                Props clave: data, renderItem, keyExtractor, onEndReached, refreshControl.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.descTitle}>SectionList</Text>
              <Text style={styles.descText}>
                Como FlatList pero con soporte para secciones y headers por sección.
                Props clave: sections, renderItem, renderSectionHeader, keyExtractor.
              </Text>
            </>
          )}
        </View>

        {/* Lista activa */}
        {activeTab === 'flat' ? (
          <FlatList
            data={FLAT_DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderFlatItem}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#6366F1"
                colors={['#6366F1']}
              />
            }
          />
        ) : (
          <SectionList
            sections={SECTION_DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderSectionItem}
            renderSectionHeader={renderSectionHeader}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  container: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 16 },
  headerBadge: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: '#F59E0B', marginBottom: 8 },
  headerTitle: { fontSize: 36, fontWeight: '800', color: '#F1F5F9', marginBottom: 8 },
  headerSubtitle: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  section: { paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#F59E0B', fontFamily: 'monospace', marginBottom: 4 },
  sectionDesc: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  hScrollContent: { paddingLeft: 2, paddingRight: 16, gap: 8 },
  hChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 4,
  },
  hChipText: { fontSize: 13, fontWeight: '600' },
  tabsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: '#F59E0B' },
  tabBtnText: { fontSize: 13, fontWeight: '700', color: '#64748B', fontFamily: 'monospace' },
  tabBtnTextActive: { color: '#0F172A' },
  descCard: {
    marginHorizontal: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  descTitle: { fontSize: 14, fontWeight: '700', color: '#F1F5F9', marginBottom: 4 },
  descText: { fontSize: 12, color: '#94A3B8', lineHeight: 18 },
  list: { flex: 1, marginHorizontal: 16 },
  // FlatList items
  flatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 6,
    gap: 12,
  },
  flatItemAlt: { backgroundColor: '#162032' },
  flatDot: { width: 10, height: 10, borderRadius: 5 },
  flatText: { flex: 1 },
  flatTitle: { fontSize: 14, fontWeight: '600', color: '#F1F5F9', marginBottom: 2 },
  flatSubtitle: { fontSize: 12, color: '#64748B' },
  flatIndex: { fontSize: 12, fontWeight: '700' },
  // SectionList
  sectionHeader: {
    backgroundColor: '#0F172A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderLeftWidth: 3,
    marginBottom: 6,
  },
  sectionHeaderText: { fontSize: 14, fontWeight: '700' },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 6,
    gap: 12,
  },
  sectionDot: { width: 10, height: 10, borderRadius: 5 },
});
