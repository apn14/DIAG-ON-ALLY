import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { COLORS } from '../constants/colors';
import { RiskLevel } from '../lib/types';

const RISK_COLORS: Record<RiskLevel, { background: string; text: string }> = {
  Low: { background: COLORS.elevated, text: COLORS.secondaryText },
  Medium: { background: COLORS.darkRed, text: COLORS.white },
  High: { background: COLORS.primaryRed, text: COLORS.white },
  'Stop Driving': { background: COLORS.brightRed, text: COLORS.white },
};

type Props = {
  riskLevel: RiskLevel;
};

export function RiskBadge({ riskLevel }: Props) {
  const colors = RISK_COLORS[riskLevel];

  return (
    <View style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>{riskLevel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
