import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { COLORS } from '../constants/colors';
import { ChatMessage } from '../lib/types';

type Props = {
  message: ChatMessage;
};

export function ChatBubble({ message }: Props) {
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.assistant]}>
      <Text style={styles.sender}>{isUser ? 'You' : 'Garage AI'}</Text>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '88%',
    padding: 12,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.darkRed,
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  sender: {
    color: COLORS.brightRed,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  text: {
    color: COLORS.mainText,
    lineHeight: 20,
  },
});
