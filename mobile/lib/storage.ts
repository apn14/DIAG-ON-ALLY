import AsyncStorage from '@react-native-async-storage/async-storage';

import { mockVehicles } from './mockData';
import { DiagnosticReport, VehicleProfile } from './types';

const VEHICLES_KEY = 'garage_ai_diagnostic:vehicles';
const REPORTS_KEY = 'garage_ai_diagnostic:reports';

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : fallback;
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getVehicles(): Promise<VehicleProfile[]> {
  const saved = await readJson<VehicleProfile[] | null>(VEHICLES_KEY, null);
  if (saved) {
    return saved;
  }

  await writeJson(VEHICLES_KEY, mockVehicles);
  return mockVehicles;
}

export async function getVehicleById(id: string): Promise<VehicleProfile | undefined> {
  const vehicles = await getVehicles();
  return vehicles.find((vehicle) => vehicle.id === id);
}

export async function saveVehicle(input: Omit<VehicleProfile, 'id' | 'createdAt' | 'updatedAt'>) {
  const vehicles = await getVehicles();
  const timestamp = new Date().toISOString();
  const vehicle: VehicleProfile = {
    ...input,
    id: createId('vehicle'),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await writeJson(VEHICLES_KEY, [vehicle, ...vehicles]);
  return vehicle;
}

export async function getReports(): Promise<DiagnosticReport[]> {
  return readJson<DiagnosticReport[]>(REPORTS_KEY, []);
}

export async function saveReport(report: Omit<DiagnosticReport, 'id' | 'createdAt'>) {
  const reports = await getReports();
  const saved: DiagnosticReport = {
    ...report,
    id: createId('report'),
    createdAt: new Date().toISOString(),
  };

  await writeJson(REPORTS_KEY, [saved, ...reports]);
  return saved;
}

export async function deleteReport(reportId: string): Promise<void> {
  const reports = await getReports();
  await writeJson(
    REPORTS_KEY,
    reports.filter((report) => report.id !== reportId),
  );
}

export async function clearReports(): Promise<void> {
  await writeJson(REPORTS_KEY, []);
}
