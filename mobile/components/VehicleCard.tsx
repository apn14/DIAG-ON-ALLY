import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { COLORS } from '../constants/colors';
import { VehicleProfile } from '../lib/types';

type Props = {
  vehicle: VehicleProfile;
  onSelect: (vehicle: VehicleProfile) => void;
};

export function VehicleCard({ vehicle, onSelect }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.tile, pressed && styles.pressed]} onPress={() => onSelect(vehicle)}>
      <View>
        <Text numberOfLines={1} style={styles.year}>
          {vehicle.year}
        </Text>
        <Text numberOfLines={2} style={styles.title}>
          {vehicle.make} {vehicle.model}
        </Text>
      </View>
      <View>
        <Text numberOfLines={1} style={styles.meta}>
          {vehicle.trim || 'Base'}
        </Text>
        <Text numberOfLines={1} style={styles.mileage}>
          {vehicle.mileage.toLocaleString()} mi
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    aspectRatio: 1,
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'space-between',
    padding: 8,
    width: '23.5%',
  },
  pressed: {
    backgroundColor: COLORS.darkRed,
    borderColor: COLORS.brightRed,
  },
  year: {
    color: COLORS.brightRed,
    fontSize: 11,
    fontWeight: '900',
  },
  title: {
    color: COLORS.mainText,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 15,
    marginTop: 3,
  },
  meta: {
    color: COLORS.secondaryText,
    fontSize: 10,
    fontWeight: '700',
  },
  mileage: {
    color: COLORS.mutedText,
    fontSize: 10,
    marginTop: 2,
  },
});
