import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const CARDS = [
  {
    id: '1',
    emoji: '⚡',
    title: 'Expo Router',
    desc: 'Navegación basada en archivos, igual que Next.js.',
    bg: '#1A1A2E',
    accent: '#6C63FF',
  },
  {
    id: '2',
    emoji: '🎨',
    title: 'StyleSheet',
    desc: 'Sistema de estilos nativo con performance optimizado.',
    bg: '#6C63FF',
    accent: '#A09CF7',
  },
  {
    id: '3',
    emoji: '🔄',
    title: 'Hot Reload',
    desc: 'Ve los cambios al instante sin recompilar.',
    bg: '#27AE60',
    accent: '#6FCF97',
  },
  {
    id: '4',
    emoji: '📦',
    title: 'Expo SDK',
    desc: 'Accede a cámara, GPS, notificaciones y más.',
    bg: '#F57C00',
    accent: '#FFB74D',
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4FF" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con estilo diferente (degradado simulado con View) */}
        <View style={styles.headerBg}>
          <Text style={styles.headerLabel}>DESCUBRE</Text>
          <Text style={styles.headerTitle}>Explora{'\n'}React Native</Text>
        </View>

        {/* Grid de tarjetas */}
        <Text style={styles.sectionTitle}>Características clave</Text>
        <View style={styles.grid}>
          {CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, { backgroundColor: card.bg }]}
              activeOpacity={0.85}
            >
              <Text style={styles.cardEmoji}>{card.emoji}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDesc}>{card.desc}</Text>
              <View style={[styles.cardTag, { backgroundColor: card.accent }]}>
                <Text style={styles.cardTagText}>Ver más →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Banner inferior */}
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>¿Sabías que?</Text>
            <Text style={styles.bannerText}>
              Más de 2 millones de apps usan React Native en producción.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: 32,
  },
  headerBg: {
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 36,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 28,
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#6C63FF',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 46,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '47%',
    borderRadius: 20,
    padding: 20,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
    flex: 1,
  },
  cardTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 12,
  },
  cardTagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  banner: {
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerEmoji: {
    fontSize: 36,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
