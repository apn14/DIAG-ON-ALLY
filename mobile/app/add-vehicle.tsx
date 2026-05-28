import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { DropdownField } from '../components/DropdownField';
import { COLORS } from '../constants/colors';
import {
  FUEL_TYPES,
  MILEAGE_OPTIONS,
  VEHICLE_ENGINES,
  VEHICLE_MAKES,
  VEHICLE_MODEL_OPTIONS,
  VEHICLE_TRANSMISSIONS,
  VEHICLE_TRIMS,
  VEHICLE_YEARS,
} from '../constants/vehicleOptions';
import { saveVehicle } from '../lib/storage';

type FormState = {
  make: string;
  model: string;
  year: string;
  trim: string;
  engine: string;
  transmission: string;
  mileage: string;
  fuelType: string;
  modifications: string;
  obdCodes: string;
};

const initialForm: FormState = {
  make: '',
  model: '',
  year: '',
  trim: '',
  engine: '',
  transmission: '',
  mileage: '',
  fuelType: '',
  modifications: '',
  obdCodes: '',
};

export default function AddVehicleScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateMake(make: string) {
    setForm((current) => ({ ...current, make, model: '' }));
  }

  function validate() {
    const year = Number(form.year);
    const mileage = Number(form.mileage);
    const currentYear = new Date().getFullYear() + 1;

    if (!form.make.trim() || !form.model.trim()) {
      return 'Make and model are required.';
    }

    if (!Number.isInteger(year) || year < 1981 || year > currentYear) {
      return `Year must be between 1981 and ${currentYear}.`;
    }

    if (!Number.isFinite(mileage) || mileage < 0 || mileage > 1000000) {
      return 'Mileage must be a number between 0 and 1,000,000.';
    }

    return '';
  }

  async function handleSave() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    await saveVehicle({
      make: form.make.trim(),
      model: form.model.trim(),
      year: Number(form.year),
      trim: form.trim.trim(),
      engine: form.engine.trim(),
      transmission: form.transmission.trim(),
      mileage: Number(form.mileage),
      fuelType: form.fuelType.trim(),
      modifications: form.modifications.trim(),
      obdCodes: form.obdCodes.trim(),
    });
    setSaving(false);
    router.replace('/garage');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text variant="titleLarge" style={styles.title}>
        Vehicle Profile
      </Text>
      <Text style={styles.subtitle}>Add enough detail for more useful diagnostic context.</Text>

      <DropdownField label="Make" value={form.make} options={VEHICLE_MAKES} onChange={updateMake} />
      <DropdownField label="Model" value={form.model} options={VEHICLE_MODEL_OPTIONS[form.make] ?? ['Other']} onChange={(value) => updateField('model', value)} />
      <DropdownField label="Year" value={form.year} options={VEHICLE_YEARS} onChange={(value) => updateField('year', value)} />
      <DropdownField label="Trim" value={form.trim} options={VEHICLE_TRIMS} onChange={(value) => updateField('trim', value)} />
      <DropdownField label="Engine" value={form.engine} options={VEHICLE_ENGINES} onChange={(value) => updateField('engine', value)} />
      <DropdownField label="Transmission" value={form.transmission} options={VEHICLE_TRANSMISSIONS} onChange={(value) => updateField('transmission', value)} />
      <DropdownField label="Mileage" value={form.mileage} options={MILEAGE_OPTIONS} onChange={(value) => updateField('mileage', value)} />
      <DropdownField label="Fuel Type" value={form.fuelType} options={FUEL_TYPES} onChange={(value) => updateField('fuelType', value)} />
      <TextInput
        label="Modifications"
        value={form.modifications}
        onChangeText={(value) => updateField('modifications', value)}
        multiline
        style={styles.input}
        textColor={COLORS.mainText}
      />
      <TextInput
        label="OBD-II Codes"
        value={form.obdCodes}
        onChangeText={(value) => updateField('obdCodes', value)}
        style={styles.input}
        textColor={COLORS.mainText}
      />

      {!!error && <HelperText type="error">{error}</HelperText>}

      <Button mode="contained" onPress={handleSave} loading={saving} disabled={saving} style={styles.button}>
        Save Vehicle
      </Button>
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
  input: {
    backgroundColor: COLORS.elevated,
    marginBottom: 12,
  },
  button: {
    borderRadius: 8,
    marginTop: 8,
  },
});
