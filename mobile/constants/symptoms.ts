export const SYMPTOM_CATEGORIES = [
  'Check engine light',
  "Won't start",
  'Misfire',
  'Overheating',
  'Fuel smell',
  'Brake issue',
  'Suspension noise',
  'Electrical issue',
  'Transmission/clutch issue',
  'Oil pressure warning',
  'Smoke',
  'Steering issue',
  'Severe knocking',
  'Other',
] as const;

export type SymptomCategory = (typeof SYMPTOM_CATEGORIES)[number];
