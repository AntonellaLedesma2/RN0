import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F7FF" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>👋 Bienvenido</Text>
          <Text style={styles.title}>Hola Mundo</Text>
          <Text style={styles.subtitle}>
            Este es tu primer proyecto con React Native + Expo
          </Text>
        </View>

        {/* Card principal */}
        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🚀</Text>
          <Text style={styles.cardTitle}>React Native + Expo</Text>
          <Text style={styles.cardText}>
            Desarrolla apps móviles multiplataforma con JavaScript y React.
            Una sola base de código para iOS, Android y Web.
          </Text>
        </View>

        {/* Info chips */}
        <View style={styles.chipsRow}>
          <View style={[styles.chip, { backgroundColor: '#E8E5FF' }]}>
            <Text style={[styles.chipText, { color: '#6C63FF' }]}>📱 iOS</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: '#E5F6EC' }]}>
            <Text style={[styles.chipText, { color: '#27AE60' }]}>🤖 Android</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[styles.chipText, { color: '#F57C00' }]}>🌐 Web</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7FF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 8,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  cardEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
