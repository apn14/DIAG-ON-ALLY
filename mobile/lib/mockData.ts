import { VehicleProfile } from './types';

const now = new Date().toISOString();

export const mockVehicles: VehicleProfile[] = [
  {
    id: 'mock-civic-2014',
    make: 'Honda',
    model: 'Civic',
    year: 2014,
    trim: 'EX',
    engine: '1.8L I4',
    transmission: 'Automatic',
    mileage: 128400,
    fuelType: 'Gasoline',
    modifications: 'Stock',
    obdCodes: 'P0420',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'mock-f150-2018',
    make: 'Ford',
    model: 'F-150',
    year: 2018,
    trim: 'XLT',
    engine: '2.7L EcoBoost V6',
    transmission: '10-speed automatic',
    mileage: 86500,
    fuelType: 'Gasoline',
    modifications: 'Leveling kit, all-terrain tires',
    obdCodes: '',
    createdAt: now,
    updatedAt: now,
  },
];
