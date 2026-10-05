/**
 * TAB: Inputs & Controles
 * TextInput, Switch, Slider (simulado), Button, ActivityIndicator,
 * Modal, Alert
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ActivityIndicator,
  Modal,
  Alert,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function InputsComponents() {
  // TextInput state
  const [textValue, setTextValue] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [multiline, setMultiline] = useState<string>('');

  // Switch state
  const [switchA, setSwitchA] = useState<boolean>(false);
  const [switchB, setSwitchB] = useState<boolean>(true);
  const [switchC, setSwitchC] = useState<boolean>(false);

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Modal state
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

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
          <Text style={styles.headerTitle}>Inputs</Text>
          <Text style={styles.headerSubtitle}>
            Componentes para capturar y controlar entradas del usuario
          </Text>
        </View>

        {/* TEXT INPUT */}
        <View style={styles.card}>
          <View style={[styles.accent, { backgroundColor: '#10B981' }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.componentName, { color: '#10B981' }]}>{'<TextInput>'}</Text>
            <Text style={styles.desc}>
              Campo de texto editable. Soporta teclados personalizados, máscaras, multiline y autocompletado.
            </Text>

            <Text style={styles.label}>Texto simple</Text>
            <TextInput
              style={styles.input}
              value={textValue}
              onChangeText={setTextValue}
              placeholder="Escribe algo..."
              placeholderTextColor="#475569"
              selectionColor="#10B981"
            />
            {textValue.length > 0 && (
              <Text style={styles.inputHint}>✏️ Caracteres: {textValue.length}</Text>
            )}

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#475569"
              secureTextEntry
              selectionColor="#10B981"
            />

            <Text style={styles.label}>Multiline</Text>
            <TextInput
              style={[styles.input, styles.multiInput]}
              value={multiline}
              onChangeText={setMultiline}
              placeholder="Escribe varias líneas..."
              placeholderTextColor="#475569"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              selectionColor="#10B981"
            />
          </View>
        </View>

        {/* SWITCH */}
        <View style={styles.card}>
          <View style={[styles.accent, { backgroundColor: '#F59E0B' }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.componentName, { color: '#F59E0B' }]}>{'<Switch>'}</Text>
            <Text style={styles.desc}>
              Toggle booleano. Usa trackColor y thumbColor para personalizarlo.
            </Text>

            {[
              { label: 'Notificaciones', value: switchA, setter: setSwitchA, color: '#10B981' },
              { label: 'Modo Oscuro', value: switchB, setter: setSwitchB, color: '#6366F1' },
              { label: 'Sincronización', value: switchC, setter: setSwitchC, color: '#EF4444' },
            ].map((sw, i) => (
              <View key={i} style={styles.switchRow}>
                <Text style={styles.switchLabel}>{sw.label}</Text>
                <Switch
                  value={sw.value}
                  onValueChange={sw.setter}
                  trackColor={{ false: '#334155', true: sw.color + '80' }}
                  thumbColor={sw.value ? sw.color : '#64748B'}
                  ios_backgroundColor="#334155"
                />
              </View>
            ))}
          </View>
        </View>

        {/* BUTTON nativo */}
        <View style={styles.card}>
          <View style={[styles.accent, { backgroundColor: '#EF4444' }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.componentName, { color: '#EF4444' }]}>{'<Button>'}</Text>
            <Text style={styles.desc}>
              Botón nativo de la plataforma. Mínimo control de estilo — preferir TouchableOpacity para diseño.
            </Text>
            <View style={{ gap: 10 }}>
              <Button
                title="Botón Nativo"
                color="#EF4444"
                onPress={() => Alert.alert('¡Presionado!', 'Esto es un Alert nativo 📱')}
              />
              <Button
                title="Botón Desactivado"
                color="#64748B"
                disabled
                onPress={() => {}}
              />
            </View>
          </View>
        </View>

        {/* ACTIVITY INDICATOR */}
        <View style={styles.card}>
          <View style={[styles.accent, { backgroundColor: '#8B5CF6' }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.componentName, { color: '#8B5CF6' }]}>{'<ActivityIndicator>'}</Text>
            <Text style={styles.desc}>
              Spinner de carga nativo. Usa size="small" | "large" y color.
            </Text>
            <View style={styles.indicatorRow}>
              <ActivityIndicator size="small" color="#8B5CF6" />
              <ActivityIndicator size="large" color="#8B5CF6" />
              <ActivityIndicator size="large" color="#EC4899" animating={loading} />
            </View>
            <TouchableOpacity
              style={[styles.demoBtn, { backgroundColor: '#8B5CF6' }]}
              onPress={simulateLoading}
            >
              <Text style={styles.demoBtnText}>
                {loading ? '⏳ Cargando... (2.5s)' : '▶ Simular carga'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* MODAL */}
        <View style={styles.card}>
          <View style={[styles.accent, { backgroundColor: '#0EA5E9' }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.componentName, { color: '#0EA5E9' }]}>{'<Modal>'}</Text>
            <Text style={styles.desc}>
              Overlay de pantalla completa. Props: visible, animationType, transparent, onRequestClose.
            </Text>
            <TouchableOpacity
              style={[styles.demoBtn, { backgroundColor: '#0EA5E9' }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.demoBtnText}>Abrir Modal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ALERT (sin demo en tarjeta, se mostró en Button) */}
        <View style={styles.card}>
          <View style={[styles.accent, { backgroundColor: '#F97316' }]} />
          <View style={styles.cardBody}>
            <Text style={[styles.componentName, { color: '#F97316' }]}>{'Alert'}</Text>
            <Text style={styles.desc}>
              API estática (no es un componente). Muestra diálogos nativos con botones personalizados.
            </Text>
            <TouchableOpacity
              style={[styles.demoBtn, { backgroundColor: '#F97316' }]}
              onPress={() =>
                Alert.alert(
                  '¿Confirmar acción?',
                  'Esta acción no se puede deshacer.',
                  [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Confirmar', onPress: () => Alert.alert('✅', 'Confirmado') },
                  ]
                )
              }
            >
              <Text style={styles.demoBtnText}>Mostrar Alert con opciones</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* MODAL DEMO */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>¡Hola desde el Modal! 👋</Text>
            <Text style={styles.modalBody}>
              Este es un {'<Modal>'} con animationType="slide" y transparent=true.{'\n\n'}
              Puedes poner cualquier contenido aquí: formularios, imágenes, menus contextuales.
            </Text>
            <View style={styles.modalBadges}>
              <View style={styles.modalBadge}><Text style={styles.modalBadgeText}>animationType="slide"</Text></View>
              <View style={styles.modalBadge}><Text style={styles.modalBadgeText}>transparent={'{true}'}</Text></View>
            </View>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>Cerrar Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  scroll: { flex: 1 },
  container: { paddingBottom: 40 },
  header: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 32 },
  headerBadge: { fontSize: 11, fontWeight: '700', letterSpacing: 3, color: '#10B981', marginBottom: 8 },
  headerTitle: { fontSize: 40, fontWeight: '800', color: '#F1F5F9', marginBottom: 10 },
  headerSubtitle: { fontSize: 15, color: '#64748B', lineHeight: 22 },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  accent: { width: 4 },
  cardBody: { flex: 1, padding: 18 },
  componentName: { fontSize: 17, fontWeight: '700', fontFamily: 'monospace', marginBottom: 6 },
  desc: { fontSize: 13, color: '#94A3B8', lineHeight: 20, marginBottom: 16 },
  label: { fontSize: 12, color: '#64748B', fontWeight: '600', marginBottom: 6, letterSpacing: 0.5 },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  multiInput: { minHeight: 90 },
  inputHint: { fontSize: 12, color: '#10B981', marginTop: -8, marginBottom: 12 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0F172A',
  },
  switchLabel: { fontSize: 15, color: '#CBD5E1' },
  indicatorRow: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  demoBtn: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  demoBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 40,
  },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#F1F5F9', marginBottom: 16 },
  modalBody: { fontSize: 15, color: '#94A3B8', lineHeight: 24, marginBottom: 20 },
  modalBadges: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 24 },
  modalBadge: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalBadgeText: { fontFamily: 'monospace', fontSize: 12, color: '#0EA5E9' },
  modalCloseBtn: {
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
