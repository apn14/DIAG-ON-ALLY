import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';

import { SymptomButton } from '../components/SymptomButton';
import { COLORS } from '../constants/colors';
import { SYMPTOM_CATEGORIES } from '../constants/symptoms';
import { getVehicleById } from '../lib/storage';
import { VehicleProfile } from '../lib/types';

export default function SymptomPickerScreen() {
  const router = useRouter();
  const { vehicleId } = useLocalSearchParams<{ vehicleId?: string }>();
  const [vehicle, setVehicle] = useState<VehicleProfile | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadVehicle() {
        if (vehicleId) {
          setVehicle((await getVehicleById(vehicleId)) ?? null);
        }
      }

      loadVehicle();
    }, [vehicleId]),
  );

  if (!vehicleId || !vehicle) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Select a vehicle before choosing a symptom.</Text>
        <Button mode="contained" onPress={() => router.replace('/garage')}>
          Back to Garage
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text variant="titleLarge" style={styles.title}>
        What is happening?
      </Text>
      <Text style={styles.subtitle}>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </Text>

      {SYMPTOM_CATEGORIES.map((symptom) => (
        <SymptomButton
          key={symptom}
          label={symptom}
          onPress={() => router.push({ pathname: '/chat', params: { vehicleId: vehicle.id, symptom } })}
        />
      ))}
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
  title: {
    color: COLORS.mainText,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.secondaryText,
    marginBottom: 18,
    marginTop: 6,
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
