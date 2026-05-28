export const VEHICLE_MAKES = ['Honda', 'Toyota', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Subaru', 'Jeep', 'Hyundai', 'Kia', 'Other'];

export const VEHICLE_MODEL_OPTIONS: Record<string, string[]> = {
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Other'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Tacoma', 'Highlander', 'Other'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Other'],
  Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Camaro', 'Other'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Frontier', 'Pathfinder', 'Other'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'Other'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'Other'],
  Subaru: ['Outback', 'Forester', 'Impreza', 'Crosstrek', 'Other'],
  Jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Other'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Other'],
  Kia: ['Forte', 'K5', 'Sportage', 'Sorento', 'Other'],
  Other: ['Other'],
};

export const VEHICLE_YEARS = Array.from({ length: new Date().getFullYear() + 1 - 1981 + 1 }, (_, index) =>
  String(new Date().getFullYear() + 1 - index),
);

export const VEHICLE_TRIMS = ['Base', 'S', 'SE', 'EX', 'EX-L', 'Sport', 'Touring', 'XLT', 'LT', 'Limited', 'Other'];

export const VEHICLE_ENGINES = ['I3', 'I4', 'I5', 'I6', 'V6', 'V8', 'Hybrid', 'Plug-in hybrid', 'Electric', 'Diesel', 'Other'];

export const VEHICLE_TRANSMISSIONS = ['Automatic', 'Manual', 'CVT', 'Dual-clutch', '10-speed automatic', 'Other'];

export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Hybrid', 'Plug-in hybrid', 'Electric', 'E85/Flex fuel', 'Other'];

export const MILEAGE_OPTIONS = ['0', '25000', '50000', '75000', '100000', '125000', '150000', '175000', '200000', '250000', '300000'];
