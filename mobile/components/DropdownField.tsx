import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';

import { COLORS } from '../constants/colors';

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function DropdownField({ label, options, value, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  function handleSelect(option: string) {
    onChange(option);
    setVisible(false);
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentStyle={styles.menu}
      anchor={
        <Pressable onPress={() => setVisible(true)}>
          <TextInput
            label={label}
            value={value}
            editable={false}
            pointerEvents="none"
            style={styles.input}
            textColor={COLORS.mainText}
            right={<TextInput.Icon icon="menu-down" color={COLORS.secondaryText} />}
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
  menu: {
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  menuText: {
    color: COLORS.mainText,
  },
});
