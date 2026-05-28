import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Button, Card, Text } from 'react-native-paper';

import { RiskBadge } from '../components/RiskBadge';
import { COLORS } from '../constants/colors';
import { clearReports, deleteReport, getReports } from '../lib/storage';
import { DiagnosticReport } from '../lib/types';

function ReportList({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.reportSection}>
      <Text style={styles.reportSectionTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.reportBullet}>
          - {item}
        </Text>
      ))}
    </View>
  );
}

export default function SavedReportsScreen() {
  const router = useRouter();
  const [reports, setReports] = useState<DiagnosticReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyReportId, setBusyReportId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const loadReports = useCallback(async () => {
    setLoading(true);
    setReports(await getReports());
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [loadReports]),
  );

  async function handleDeleteReport(reportId: string) {
    setBusyReportId(reportId);
    await deleteReport(reportId);
    setReports((current) => current.filter((report) => report.id !== reportId));
    setBusyReportId(null);
  }

  async function handleClearReports() {
    setClearing(true);
    await clearReports();
    setReports([]);
    setClearing(false);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadReports} tintColor={COLORS.brightRed} />}
    >
      <Text variant="titleLarge" style={styles.title}>
        Saved Reports
      </Text>

      {reports.length > 0 && (
        <Button
          mode="outlined"
          textColor={COLORS.mainText}
          onPress={handleClearReports}
          loading={clearing}
          disabled={clearing}
          style={styles.clearButton}
        >
          Clear All Reports
        </Button>
      )}

      {!loading && reports.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No diagnostic reports saved yet.</Text>
          <Button mode="contained" onPress={() => router.replace('/garage')}>
            Start Diagnosis
          </Button>
        </View>
      ) : (
        reports.map((report) => (
          <Card key={report.id} mode="contained" style={styles.card}>
            <Card.Content>
              <View style={styles.header}>
                <Text style={styles.vehicle}>{report.vehicleLabel}</Text>
                <RiskBadge riskLevel={report.summary.riskLevel} />
              </View>
              <Text style={styles.meta}>{report.symptom}</Text>
              <Text style={styles.date}>{new Date(report.createdAt).toLocaleString()}</Text>
              <ReportList title="Likely Causes" items={report.summary.likelyCauses} />
              <ReportList title="Immediate Actions" items={report.summary.immediateActions} />
              <ReportList title="DIY Checks" items={report.summary.diyChecks} />
              <ReportList title="Tools Needed" items={report.summary.toolsNeeded} />
              <View style={styles.reportSection}>
                <Text style={styles.reportSectionTitle}>Mechanic Summary</Text>
                <Text style={styles.summary}>{report.summary.mechanicSummary}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="text"
                textColor={COLORS.brightRed}
                onPress={() => handleDeleteReport(report.id)}
                loading={busyReportId === report.id}
                disabled={busyReportId === report.id || clearing}
              >
                Delete Report
              </Button>
            </Card.Actions>
          </Card>
        ))
      )}
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
    marginBottom: 16,
  },
  clearButton: {
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 14,
  },
  empty: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  emptyText: {
    color: COLORS.secondaryText,
  },
  card: {
    backgroundColor: COLORS.elevated,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  header: {
    gap: 8,
    marginBottom: 8,
  },
  vehicle: {
    color: COLORS.mainText,
    fontWeight: '800',
  },
  meta: {
    color: COLORS.brightRed,
    fontWeight: '700',
  },
  date: {
    color: COLORS.secondaryText,
    marginTop: 4,
  },
  reportSection: {
    marginTop: 12,
  },
  reportSectionTitle: {
    color: COLORS.brightRed,
    fontWeight: '900',
    marginBottom: 5,
  },
  reportBullet: {
    color: COLORS.mainText,
    lineHeight: 20,
    marginBottom: 3,
  },
  summary: {
    color: COLORS.mainText,
    lineHeight: 21,
  },
});
