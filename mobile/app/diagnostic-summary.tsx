import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';

import { DiagnosticSummaryCard } from '../components/DiagnosticSummaryCard';
import { COLORS } from '../constants/colors';
import { generateMockDiagnosticSummary } from '../lib/mockDiagnostic';
import { getVehicleById, saveReport } from '../lib/storage';
import { DiagnosticSummary, VehicleProfile } from '../lib/types';

export default function DiagnosticSummaryScreen() {
  const router = useRouter();
  const { vehicleId, symptom, notes } = useLocalSearchParams<{ vehicleId?: string; symptom?: string; notes?: string }>();
  const [vehicle, setVehicle] = useState<VehicleProfile | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadVehicle() {
      if (vehicleId) {
        setVehicle((await getVehicleById(vehicleId)) ?? null);
      }
    }

    loadVehicle();
  }, [vehicleId]);

  const summary: DiagnosticSummary | null = useMemo(() => {
    if (!vehicle || !symptom) {
      return null;
    }

    return generateMockDiagnosticSummary(vehicle, symptom, notes ?? '');
  }, [notes, symptom, vehicle]);

  async function handleSaveReport() {
    if (!vehicle || !symptom || !summary) {
      return;
    }

    setSaving(true);
    await saveReport({
      vehicleId: vehicle.id,
      vehicleLabel: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      symptom,
      notes: notes ?? '',
      summary,
    });
    setSaved(true);
    setSaving(false);
  }

  if (!vehicle || !summary || !symptom) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Diagnostic context is missing.</Text>
        <Button mode="contained" onPress={() => router.replace('/garage')}>
          Back to Garage
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.vehicle}>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </Text>
      <Text style={styles.symptom}>Symptom: {symptom}</Text>

      <DiagnosticSummaryCard summary={summary} />

      <View style={styles.actions}>
        <Button mode="contained" onPress={handleSaveReport} loading={saving} disabled={saving || saved} style={styles.button}>
          {saved ? 'Report Saved' : 'Save Report'}
        </Button>
        <Button mode="outlined" textColor={COLORS.mainText} onPress={() => router.push('/saved-reports')} style={styles.button}>
          View Saved Reports
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  vehicle: {
    color: COLORS.mainText,
    fontSize: 18,
    fontWeight: '800',
  },
  symptom: {
    color: COLORS.brightRed,
    marginBottom: 16,
    marginTop: 4,
  },
  actions: {
    gap: 10,
    marginTop: 16,
  },
  button: {
    borderRadius: 8,
  },
  empty: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.background,
    flex: 1,
    gap: 14,
    justifyContent: 'center',
    padding: 18,
  },
  emptyText: {
    color: COLORS.secondaryText,
  },
});
