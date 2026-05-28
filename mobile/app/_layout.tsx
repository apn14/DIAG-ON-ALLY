import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconButton, MD3DarkTheme, PaperProvider } from 'react-native-paper';

import { COLORS } from '../constants/colors';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: COLORS.primaryRed,
    secondary: COLORS.brightRed,
    background: COLORS.background,
    surface: COLORS.elevated,
    surfaceVariant: COLORS.elevated,
    outline: COLORS.border,
    onSurface: COLORS.mainText,
    onSurfaceVariant: COLORS.secondaryText,
    error: COLORS.brightRed,
  },
  roundness: 3,
};

export default function RootLayout() {
  const router = useRouter();

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerRight: () => (
            <IconButton
              icon="home"
              iconColor={COLORS.mainText}
              size={22}
              accessibilityLabel="Home"
              onPress={() => router.replace('/garage')}
            />
          ),
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.mainText,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="garage" options={{ title: 'Diag-on-Ally Garage' }} />
        <Stack.Screen name="add-vehicle" options={{ title: 'Add Vehicle' }} />
        <Stack.Screen name="symptom-picker" options={{ title: 'Choose Symptom' }} />
        <Stack.Screen name="chat" options={{ title: 'Diagnostic Chat' }} />
        <Stack.Screen name="diagnostic-summary" options={{ title: 'Diagnostic Summary' }} />
        <Stack.Screen name="saved-reports" options={{ title: 'Saved Reports' }} />
      </Stack>
    </PaperProvider>
  );
}
