import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';

import { COLORS } from '../constants/colors';
import { DiagnosticSummary } from '../lib/types';
import { RiskBadge } from './RiskBadge';

type Props = {
  summary: DiagnosticSummary;
};

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.item}>
          - {item}
        </Text>
      ))}
    </View>
  );
}

export function DiagnosticSummaryCard({ summary }: Props) {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.title}>
            Diagnostic Summary
          </Text>
          <RiskBadge riskLevel={summary.riskLevel} />
        </View>
        <Text style={styles.confidence}>Confidence: {summary.confidence}</Text>
        <Divider style={styles.divider} />
        <SummaryList title="Likely Causes" items={summary.likelyCauses} />
        <SummaryList title="Immediate Actions" items={summary.immediateActions} />
        <SummaryList title="DIY Checks" items={summary.diyChecks} />
        <SummaryList title="Tools Needed" items={summary.toolsNeeded} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mechanic Summary</Text>
          <Text style={styles.body}>{summary.mechanicSummary}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
  },
  header: {
    gap: 10,
    marginBottom: 8,
  },
  title: {
    color: COLORS.mainText,
    fontWeight: '800',
  },
  confidence: {
    color: COLORS.secondaryText,
    marginBottom: 12,
  },
  divider: {
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    color: COLORS.brightRed,
    fontWeight: '800',
    marginBottom: 6,
  },
  item: {
    color: COLORS.mainText,
    lineHeight: 21,
    marginBottom: 4,
  },
  body: {
    color: COLORS.mainText,
    lineHeight: 21,
  },
});
