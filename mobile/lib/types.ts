import { SymptomCategory } from '../constants/symptoms';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Stop Driving';
export type ConfidenceLevel = 'Low' | 'Medium' | 'High';
export type Sender = 'user' | 'assistant';

export type VehicleProfile = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  engine: string;
  transmission: string;
  mileage: number;
  fuelType: string;
  modifications: string;
  obdCodes: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatMessage = {
  id: string;
  sender: Sender;
  text: string;
  createdAt: string;
};

export type DiagnosticSummary = {
  riskLevel: RiskLevel;
  likelyCauses: string[];
  immediateActions: string[];
  diyChecks: string[];
  toolsNeeded: string[];
  mechanicSummary: string;
  confidence: ConfidenceLevel;
};

export type DiagnosticReport = {
  id: string;
  vehicleId: string;
  vehicleLabel: string;
  symptom: SymptomCategory | string;
  notes: string;
  summary: DiagnosticSummary;
  createdAt: string;
};
