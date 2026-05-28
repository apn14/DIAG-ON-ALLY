import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, TextInput } from 'react-native-paper';

import { ChatBubble } from '../components/ChatBubble';
import { COLORS } from '../constants/colors';
import { createInitialAssistantMessage, createMockAssistantReply } from '../lib/mockDiagnostic';
import { getVehicleById } from '../lib/storage';
import { ChatMessage, VehicleProfile } from '../lib/types';

function createMessage(sender: 'user' | 'assistant', text: string): ChatMessage {
  return {
    id: `${sender}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    sender,
    text,
    createdAt: new Date().toISOString(),
  };
}

export default function DiagnosticChatScreen() {
  const router = useRouter();
  const { vehicleId, symptom } = useLocalSearchParams<{ vehicleId?: string; symptom?: string }>();
  const [vehicle, setVehicle] = useState<VehicleProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    async function loadVehicle() {
      if (!vehicleId || !symptom) {
        return;
      }

      const savedVehicle = await getVehicleById(vehicleId);
      setVehicle(savedVehicle ?? null);
      if (savedVehicle) {
        setMessages([createMessage('assistant', createInitialAssistantMessage(savedVehicle, symptom))]);
      }
    }

    loadVehicle();
  }, [vehicleId, symptom]);

  const userNotes = useMemo(
    () =>
      messages
        .filter((message) => message.sender === 'user')
        .map((message) => message.text)
        .join(' '),
    [messages],
  );

  const vehicleSpecs = useMemo(
    () =>
      vehicle
        ? [
            vehicle.trim,
            vehicle.engine,
            vehicle.transmission,
            `${vehicle.mileage.toLocaleString()} mi`,
            vehicle.fuelType,
            vehicle.modifications ? `Mods: ${vehicle.modifications}` : '',
            vehicle.obdCodes ? `OBD-II: ${vehicle.obdCodes}` : '',
          ].filter(Boolean)
        : [],
    [vehicle],
  );

  function handleSend() {
    const text = draft.trim();
    if (!text || !symptom) {
      return;
    }

    setMessages((current) => [...current, createMessage('user', text), createMessage('assistant', createMockAssistantReply(symptom, text))]);
    setDraft('');
  }

  function handleSummary() {
    if (!vehicleId || !symptom) {
      return;
    }

    router.push({
      pathname: '/diagnostic-summary',
      params: {
        vehicleId,
        symptom,
        notes: userNotes,
      },
    });
  }

  if (!vehicleId || !symptom || !vehicle) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Vehicle or symptom context is missing.</Text>
        <Button mode="contained" onPress={() => router.replace('/garage')}>
          Back to Garage
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.context}>
        <Text style={styles.vehicle}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </Text>
        <Text style={styles.symptom}>Symptom: {symptom}</Text>
        <View style={styles.specGrid}>
          {vehicleSpecs.map((spec) => (
            <Text key={spec} style={styles.spec}>
              {spec}
            </Text>
          ))}
        </View>
      </View>

      <ScrollView style={styles.messages} contentContainerStyle={styles.messagesContent}>
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          label="Describe what you notice"
          value={draft}
          onChangeText={setDraft}
          multiline
          style={styles.input}
          textColor={COLORS.mainText}
          onSubmitEditing={handleSend}
        />
        <View style={styles.buttonRow}>
          <Button mode="outlined" textColor={COLORS.mainText} onPress={handleSend} style={styles.button}>
            Send
          </Button>
          <Button mode="contained" onPress={handleSummary} style={styles.button}>
            Generate Summary
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  context: {
    backgroundColor: COLORS.elevated,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    padding: 16,
  },
  vehicle: {
    color: COLORS.mainText,
    fontWeight: '800',
  },
  symptom: {
    color: COLORS.brightRed,
    marginTop: 4,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  spec: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.secondaryText,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  composer: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    padding: 12,
  },
  input: {
    backgroundColor: COLORS.elevated,
    maxHeight: 110,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
    flex: 1,
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
