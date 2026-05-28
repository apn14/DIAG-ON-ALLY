import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';

import { COLORS } from '../constants/colors';

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function DropdownField({ label, options, value, onChange, disabled = false }: Props) {
  const [visible, setVisible] = useState(false);
  const isDisabled = disabled || options.length === 0;

  function handleSelect(option: string) {
    onChange(option);
    setVisible(false);
  }

  function openMenu() {
    if (!isDisabled) {
      setVisible(true);
    }
  }

  return (
    <Menu
      visible={visible && !isDisabled}
      onDismiss={() => setVisible(false)}
      contentStyle={styles.menu}
      anchor={
        <Pressable disabled={isDisabled} onPress={openMenu}>
          <TextInput
            label={label}
            value={value}
            disabled={isDisabled}
            editable={false}
            pointerEvents="none"
            style={[styles.input, isDisabled && styles.disabledInput]}
            textColor={COLORS.mainText}
            right={<TextInput.Icon icon="menu-down" color={isDisabled ? COLORS.mutedText : COLORS.secondaryText} />}
          />
        </Pressable>
      }
    >
      {options.map((option) => (
        <Menu.Item key={option} title={option} titleStyle={styles.menuText} onPress={() => handleSelect(option)} />
      ))}
    </Menu>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.elevated,
    marginBottom: 12,
  },
  disabledInput: {
    opacity: 0.72,
  },
  menu: {
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  menuText: {
    color: COLORS.mainText,
  },
});
