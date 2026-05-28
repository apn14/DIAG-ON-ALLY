import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';

import { VehicleCard } from '../components/VehicleCard';
import { COLORS } from '../constants/colors';
import { getReports, getVehicles } from '../lib/storage';
import { DiagnosticReport, VehicleProfile } from '../lib/types';

export default function GarageScreen() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<VehicleProfile[]>([]);
  const [reports, setReports] = useState<DiagnosticReport[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [savedVehicles, savedReports] = await Promise.all([getVehicles(), getReports()]);
    setVehicles(savedVehicles);
    setReports(savedReports);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  function handleSelect(vehicle: VehicleProfile) {
    router.push({ pathname: '/symptom-picker', params: { vehicleId: vehicle.id } });
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} tintColor={COLORS.brightRed} />}
    >
      <View style={styles.hero}>
        <Text variant="headlineMedium" style={styles.title}>
          Diag-on-Ally
        </Text>
        <Text style={styles.subtitle}>Garage AI Diagnostic for fast, cautious vehicle troubleshooting.</Text>
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={() => router.push('/add-vehicle')} style={styles.actionButton}>
          Add Vehicle
        </Button>
        <Button mode="outlined" textColor={COLORS.mainText} onPress={() => router.push('/saved-reports')} style={styles.actionButton}>
          Saved Reports ({reports.length})
        </Button>
      </View>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Saved Vehicles
      </Text>

      {!loading && vehicles.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No vehicles saved yet.</Text>
          <Button mode="contained" onPress={() => router.push('/add-vehicle')}>
            Add First Vehicle
          </Button>
        </View>
      ) : (
        <View style={styles.grid}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={handleSelect} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 18,
    paddingBottom: 32,
  },
  hero: {
    marginBottom: 18,
  },
  title: {
    color: COLORS.mainText,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.secondaryText,
    lineHeight: 21,
    marginTop: 8,
  },
  actions: {
    gap: 10,
    marginBottom: 22,
  },
  actionButton: {
    borderRadius: 8,
  },
  sectionTitle: {
    color: COLORS.mainText,
    fontWeight: '800',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  empty: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  emptyText: {
    color: COLORS.secondaryText,
  },
});
