import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { COLORS } from '../constants/colors';

type Props = {
  label: string;
  onPress: () => void;
};

export function SymptomButton({ label, onPress }: Props) {
  return (
    <Button mode="outlined" textColor={COLORS.mainText} style={styles.button} contentStyle={styles.content} onPress={onPress}>
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 10,
  },
  content: {
    justifyContent: 'center',
    minHeight: 48,
  },
});
