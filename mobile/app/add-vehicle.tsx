import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { DropdownField } from '../components/DropdownField';
import { COLORS } from '../constants/colors';
import {
  MILEAGE_OPTIONS,
  VEHICLE_MAKES,
  getModelsForMake,
  getPowertrainFromLabel,
  getPowertrainOptionsForSelection,
  getTrimsForSelection,
  getYearsForSelection,
} from '../constants/vehicleOptions';
import { saveVehicle } from '../lib/storage';

type FormState = {
  make: string;
  model: string;
  year: string;
  trim: string;
  powertrain: string;
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
  powertrain: '',
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

  const modelOptions = getModelsForMake(form.make);
  const yearOptions = getYearsForSelection(form.make, form.model);
  const trimOptions = getTrimsForSelection(form.make, form.model, form.year);
  const powertrainOptions = getPowertrainOptionsForSelection(form.make, form.model, form.year, form.trim);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateMake(make: string) {
    setError('');
    setForm((current) => ({
      ...current,
      make,
      model: '',
      year: '',
      trim: '',
      powertrain: '',
      engine: '',
      transmission: '',
      fuelType: '',
    }));
  }

  function updateModel(model: string) {
    setError('');
    setForm((current) => ({
      ...current,
      model,
      year: '',
      trim: '',
      powertrain: '',
      engine: '',
      transmission: '',
      fuelType: '',
    }));
  }

  function updateYear(year: string) {
    setError('');
    setForm((current) => ({
      ...current,
      year,
      trim: '',
      powertrain: '',
      engine: '',
      transmission: '',
      fuelType: '',
    }));
  }

  function updateTrim(trim: string) {
    setError('');
    setForm((current) => ({
      ...current,
      trim,
      powertrain: '',
      engine: '',
      transmission: '',
      fuelType: '',
    }));
  }

  function updatePowertrain(powertrainLabel: string) {
    setError('');
    const powertrain = getPowertrainFromLabel(form.make, form.model, form.year, form.trim, powertrainLabel);

    setForm((current) => ({
      ...current,
      powertrain: powertrainLabel,
      engine: powertrain?.engine ?? '',
      transmission: powertrain?.transmission ?? '',
      fuelType: powertrain?.fuelType ?? '',
    }));
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
      <Text style={styles.subtitle}>Pick a make first, then the available models, years, trims, and powertrains will narrow automatically.</Text>

      <DropdownField label="Make" value={form.make} options={VEHICLE_MAKES} onChange={updateMake} />
      <DropdownField label="Model" value={form.model} options={modelOptions} onChange={updateModel} disabled={!form.make} />
      <DropdownField label="Year" value={form.year} options={yearOptions} onChange={updateYear} disabled={!form.model} />
      <DropdownField label="Trim" value={form.trim} options={trimOptions} onChange={updateTrim} disabled={!form.year} />
      <DropdownField
        label="Engine / Transmission"
        value={form.powertrain}
        options={powertrainOptions}
        onChange={updatePowertrain}
        disabled={!form.year}
      />

      <HelperText type="info" visible={!!form.powertrain}>
        Engine, transmission, and fuel type are auto-filled from the selected powertrain.
      </HelperText>

      <TextInput
        label="Engine"
        value={form.engine}
        editable={false}
        style={styles.input}
        textColor={COLORS.mainText}
        placeholder="Auto-filled after choosing engine / transmission"
        placeholderTextColor={COLORS.mutedText}
      />
      <TextInput
        label="Transmission"
        value={form.transmission}
        editable={false}
        style={styles.input}
        textColor={COLORS.mainText}
        placeholder="Auto-filled after choosing engine / transmission"
        placeholderTextColor={COLORS.mutedText}
      />
      <TextInput
        label="Fuel Type"
        value={form.fuelType}
        editable={false}
        style={styles.input}
        textColor={COLORS.mainText}
        placeholder="Auto-filled after choosing engine / transmission"
        placeholderTextColor={COLORS.mutedText}
      />

      <DropdownField label="Mileage" value={form.mileage} options={MILEAGE_OPTIONS} onChange={(value) => updateField('mileage', value)} />
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
