import { RiskLevel } from '../lib/types';

export const URGENT_SYMPTOM_KEYWORDS = [
  'fuel smell',
  'fuel leak',
  'brake failure',
  'brake pedal sinking',
  'overheating',
  'oil pressure warning',
  'smoke',
  'engine bay smoke',
  'electrical burning smell',
  'steering loss',
  'severe knocking',
  'wheel wobble',
  'sudden loss of power',
];

export function riskForSymptom(symptom: string, notes = ''): RiskLevel {
  const combined = `${symptom} ${notes}`.toLowerCase();

  if (
    combined.includes('fuel leak') ||
    combined.includes('brake failure') ||
    combined.includes('pedal sinking') ||
    combined.includes('oil pressure') ||
    combined.includes('engine bay') ||
    combined.includes('electrical burning') ||
    combined.includes('steering loss') ||
    combined.includes('severe knocking') ||
    combined.includes('wheel wobble') ||
    combined.includes('sudden loss of power')
  ) {
    return 'Stop Driving';
  }

  if (
    combined.includes('fuel smell') ||
    combined.includes('brake') ||
    combined.includes('overheating') ||
    combined.includes('smoke') ||
    combined.includes('knocking')
  ) {
    return 'High';
  }

  if (
    combined.includes('misfire') ||
    combined.includes('transmission') ||
    combined.includes('clutch') ||
    combined.includes("won't start")
  ) {
    return 'Medium';
  }

  return 'Low';
}
