import { riskForSymptom } from '../constants/safety';
import { DiagnosticSummary, VehicleProfile } from './types';

export function createInitialAssistantMessage(vehicle: VehicleProfile, symptom: string) {
  return `I will help narrow this down for your ${vehicle.year} ${vehicle.make} ${vehicle.model}. I cannot confirm a diagnosis, but I can rank likely causes. What happened first, and is the vehicle safe and stationary right now?`;
}

export function createMockAssistantReply(symptom: string, userText: string) {
  const risk = riskForSymptom(symptom, userText);

  if (risk === 'Stop Driving') {
    return 'This may be unsafe to drive. Stop when safe, shut the vehicle off if appropriate, and contact roadside assistance or a mechanic. If you can do so safely, note warning lights, leaks, smoke, sounds, and any OBD-II codes.';
  }

  if (risk === 'High') {
    return 'This should be treated as urgent. Avoid further driving if the condition is worsening, there is smoke, overheating, fuel smell, braking trouble, or warning lights. A mechanic should inspect it soon.';
  }

  return 'A few possibilities fit, but this is not certain. Check whether the issue happens cold, hot, under load, at idle, or only while turning/braking. OBD-II codes and recent maintenance history would help narrow it down.';
}

export function generateMockDiagnosticSummary(
  vehicle: VehicleProfile,
  symptom: string,
  notes: string,
): DiagnosticSummary {
  const riskLevel = riskForSymptom(symptom, notes);
  const normalized = symptom.toLowerCase();
  const urgent = riskLevel === 'High' || riskLevel === 'Stop Driving';
  const baseSummary = `${vehicle.year} ${vehicle.make} ${vehicle.model} with ${vehicle.mileage.toLocaleString()} miles. Reported symptom: ${symptom}. Notes: ${notes || 'No extra notes captured.'} This mock summary ranks possibilities only and is not a confirmed diagnosis.`;

  if (normalized.includes('fuel')) {
    return {
      riskLevel,
      likelyCauses: ['Fuel line or injector leak', 'Loose fuel cap or evaporative emissions leak', 'Rich running condition'],
      immediateActions: ['Do not smoke near the vehicle', 'Stop driving if fuel odor is strong or a leak is visible', 'Contact a mechanic or roadside assistance'],
      diyChecks: ['Look for wet spots under the vehicle from a safe distance', 'Check whether the fuel cap is tight', 'Note when the smell is strongest'],
      toolsNeeded: ['Flashlight', 'OBD-II scanner', 'Fuel-safe inspection by a technician'],
      mechanicSummary: baseSummary,
      confidence: 'Medium',
    };
  }

  if (normalized.includes('overheating')) {
    return {
      riskLevel,
      likelyCauses: ['Low coolant', 'Thermostat stuck closed', 'Cooling fan or water pump fault'],
      immediateActions: ['Stop driving if temperature rises above normal', 'Do not open a hot radiator cap', 'Tow the vehicle if overheating repeats'],
      diyChecks: ['Check coolant level only when cold', 'Look for coolant leaks', 'Confirm fans run with A/C on'],
      toolsNeeded: ['Flashlight', 'Coolant pressure tester', 'OBD-II scanner'],
      mechanicSummary: baseSummary,
      confidence: 'Medium',
    };
  }

  if (normalized.includes('brake')) {
    return {
      riskLevel,
      likelyCauses: ['Low brake fluid or hydraulic leak', 'Worn pads or rotors', 'Brake booster or master cylinder issue'],
      immediateActions: ['Do not drive if the pedal sinks or braking feels weak', 'Check brake fluid level without spilling fluid', 'Arrange inspection immediately'],
      diyChecks: ['Look for fluid near wheels', 'Listen for grinding', 'Note pedal feel and warning lights'],
      toolsNeeded: ['Flashlight', 'Brake fluid tester', 'Professional brake inspection'],
      mechanicSummary: baseSummary,
      confidence: 'Medium',
    };
  }

  if (normalized.includes('check engine') || normalized.includes('misfire')) {
    return {
      riskLevel,
      likelyCauses: ['Ignition coil or spark plug fault', 'Vacuum leak', 'Fuel delivery issue', 'Sensor fault related to stored OBD-II codes'],
      immediateActions: ['Avoid hard acceleration if the engine is shaking', 'Scan for OBD-II codes', 'Schedule service if the light flashes'],
      diyChecks: ['Record codes and freeze-frame data', 'Check for loose intake hoses', 'Review recent fuel or maintenance changes'],
      toolsNeeded: ['OBD-II scanner', 'Basic hand tools', 'Flashlight'],
      mechanicSummary: baseSummary,
      confidence: vehicle.obdCodes ? 'Medium' : 'Low',
    };
  }

  return {
    riskLevel,
    likelyCauses: ['Wear-related component fault', 'Sensor or electrical issue', 'Maintenance item overdue'],
    immediateActions: urgent
      ? ['Limit driving until inspected', 'Contact a qualified mechanic', 'Document symptoms and warning lights']
      : ['Monitor whether the symptom worsens', 'Check for warning lights', 'Scan for OBD-II codes if available'],
    diyChecks: ['Record when the symptom occurs', 'Check fluid levels where safe', 'Inspect for leaks, smoke, odors, or loose parts'],
    toolsNeeded: ['Flashlight', 'OBD-II scanner', 'Basic hand tools'],
    mechanicSummary: baseSummary,
    confidence: 'Low',
  };
}
