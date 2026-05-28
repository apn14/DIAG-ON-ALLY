# Garage AI Diagnostic Product Spec

## Goal

Garage AI Diagnostic is a mobile app that helps users diagnose car problems using an AI-assisted guided chatbot.

## Core User Flow

1. User opens app.
2. User adds or selects a vehicle.
3. User chooses a symptom category.
4. User answers diagnostic questions in chat.
5. App generates a diagnostic summary.
6. User saves the report.

## MVP Screens

### Garage
Shows saved vehicles and an Add Vehicle button.

### Add Vehicle
Collects make, model, year, trim, engine, transmission, mileage, fuel type, modifications, and OBD-II codes.

### Symptom Picker
Lets user choose from common issue categories:
- Check engine light
- Won't start
- Misfire
- Overheating
- Fuel smell
- Brake issue
- Suspension noise
- Electrical issue
- Transmission/clutch issue
- Other

### Diagnostic Chat
Shows selected vehicle context and lets the user chat with the diagnostic assistant.

### Diagnostic Summary
Shows:
- Risk level
- Likely causes
- Immediate actions
- DIY checks
- Tools needed
- Mechanic-facing summary

## Safety Requirements

The app must flag these as urgent:
- Fuel smell or fuel leak
- Brake failure
- Overheating
- Oil pressure warning
- Smoke
- Electrical burning smell
- Steering loss
- Severe knocking
- Wheel wobble

The assistant should not claim certainty. It should rank possible causes and recommend a mechanic when appropriate.
