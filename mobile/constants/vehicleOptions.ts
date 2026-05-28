export type VehiclePowertrain = {
  label: string;
  engine: string;
  transmission: string;
  fuelType: string;
  drivetrain?: string;
  trims?: string[];
};

type VehicleCatalogEntry = {
  make: string;
  model: string;
  years: string[];
  trims: string[];
  powertrains: VehiclePowertrain[];
};

const currentModelYear = new Date().getFullYear() + 1;

function yearsFrom(start: number, end = currentModelYear) {
  const safeEnd = Math.min(end, currentModelYear);
  const safeStart = Math.min(start, safeEnd);

  return Array.from({ length: safeEnd - safeStart + 1 }, (_, index) => String(safeEnd - index));
}

function yearsBetween(start: number, end: number) {
  return yearsFrom(start, end);
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function withOther(values: string[]) {
  return Array.from(new Set([...values, 'Other']));
}

export const GENERIC_POWERTRAINS: VehiclePowertrain[] = [
  { label: 'Gas I4 automatic', engine: 'I4 gasoline', transmission: 'Automatic', fuelType: 'Gasoline' },
  { label: 'Gas I4 manual', engine: 'I4 gasoline', transmission: 'Manual', fuelType: 'Gasoline' },
  { label: 'Gas I4 CVT', engine: 'I4 gasoline', transmission: 'CVT', fuelType: 'Gasoline' },
  { label: 'Gas V6 automatic', engine: 'V6 gasoline', transmission: 'Automatic', fuelType: 'Gasoline' },
  { label: 'Gas V8 automatic', engine: 'V8 gasoline', transmission: 'Automatic', fuelType: 'Gasoline' },
  { label: 'Diesel automatic', engine: 'Diesel engine', transmission: 'Automatic', fuelType: 'Diesel' },
  { label: 'Hybrid eCVT', engine: 'Hybrid powertrain', transmission: 'eCVT', fuelType: 'Hybrid' },
  { label: 'Plug-in hybrid eCVT', engine: 'Plug-in hybrid powertrain', transmission: 'eCVT', fuelType: 'Plug-in hybrid' },
  { label: 'Electric single-speed', engine: 'Electric motor', transmission: 'Single-speed reduction gear', fuelType: 'Electric' },
  { label: 'Other / Unknown', engine: 'Other', transmission: 'Other', fuelType: 'Other' },
];

export const VEHICLE_CATALOG: VehicleCatalogEntry[] = [
  {
    make: 'Acura',
    model: 'Integra',
    years: yearsFrom(2023),
    trims: ['Base', 'A-Spec', 'A-Spec Technology', 'Type S'],
    powertrains: [
      { label: '1.5T CVT FWD', engine: '1.5L turbo I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['Base', 'A-Spec', 'A-Spec Technology'] },
      { label: '1.5T 6MT FWD', engine: '1.5L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['A-Spec Technology'] },
      { label: '2.0T 6MT FWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['Type S'] },
    ],
  },
  {
    make: 'Acura',
    model: 'MDX',
    years: yearsFrom(2001),
    trims: ['Base', 'Technology', 'A-Spec', 'Advance', 'Type S'],
    powertrains: [
      { label: '3.5L automatic FWD', engine: '3.5L V6', transmission: 'Automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '3.5L automatic SH-AWD', engine: '3.5L V6', transmission: 'Automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '3.0T automatic SH-AWD', engine: '3.0L turbo V6', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Type S'] },
    ],
  },
  {
    make: 'Audi',
    model: 'A4',
    years: yearsFrom(1996),
    trims: ['Premium', 'Premium Plus', 'Prestige', 'S line'],
    powertrains: [
      { label: '2.0T automatic FWD', engine: '2.0L turbo I4', transmission: 'Automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.0T automatic quattro', engine: '2.0L turbo I4', transmission: 'Automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '2.0T manual quattro', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD' },
    ],
  },
  {
    make: 'Audi',
    model: 'Q5',
    years: yearsFrom(2009),
    trims: ['Premium', 'Premium Plus', 'Prestige', 'Sportback'],
    powertrains: [
      { label: '2.0T quattro S tronic', engine: '2.0L turbo I4', transmission: '7-speed dual-clutch', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: 'Plug-in hybrid quattro S tronic', engine: '2.0L turbo plug-in hybrid I4', transmission: '7-speed dual-clutch', fuelType: 'Plug-in hybrid', drivetrain: 'AWD' },
    ],
  },
  {
    make: 'BMW',
    model: '3 Series',
    years: yearsFrom(1992),
    trims: ['320i', '328i', '328i xDrive', '330i', '330i xDrive', '335i', '335i xDrive', '340i', 'M340i', 'M340i xDrive'],
    powertrains: [
      { label: '328i automatic RWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['328i', '330i'] },
      { label: '328i manual RWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['328i', '330i'] },
      { label: '328i xDrive automatic AWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['328i xDrive', '330i xDrive'] },
      { label: '335i automatic RWD', engine: '3.0L turbo I6', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['335i'] },
      { label: '335i manual RWD', engine: '3.0L turbo I6', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['335i'] },
      { label: '335i xDrive automatic AWD', engine: '3.0L turbo I6', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['335i xDrive'] },
      { label: '335i xDrive manual AWD', engine: '3.0L turbo I6', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['335i xDrive'] },
      { label: 'M340i automatic RWD', engine: '3.0L turbo I6 mild hybrid', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['M340i'] },
      { label: 'M340i xDrive automatic AWD', engine: '3.0L turbo I6 mild hybrid', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['M340i xDrive'] },
    ],
  },
  {
    make: 'BMW',
    model: '5 Series',
    years: yearsFrom(1997),
    trims: ['528i', '530i', '530i xDrive', '535i', '540i', '540i xDrive', '550i', 'M550i xDrive'],
    powertrains: [
      { label: '530i automatic RWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['528i', '530i'] },
      { label: '530i xDrive automatic AWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['530i xDrive'] },
      { label: '535i automatic RWD', engine: '3.0L turbo I6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['535i'] },
      { label: '540i automatic RWD', engine: '3.0L turbo I6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['540i'] },
      { label: '540i xDrive automatic AWD', engine: '3.0L turbo I6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['540i xDrive'] },
      { label: 'M550i xDrive automatic AWD', engine: '4.4L twin-turbo V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['M550i xDrive'] },
    ],
  },
  {
    make: 'BMW',
    model: 'X3',
    years: yearsFrom(2004),
    trims: ['xDrive28i', 'xDrive30i', 'M40i', 'xDrive30e'],
    powertrains: [
      { label: 'xDrive30i automatic AWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['xDrive28i', 'xDrive30i'] },
      { label: 'M40i automatic AWD', engine: '3.0L turbo I6 mild hybrid', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['M40i'] },
      { label: 'xDrive30e PHEV automatic AWD', engine: '2.0L turbo plug-in hybrid I4', transmission: '8-speed automatic', fuelType: 'Plug-in hybrid', drivetrain: 'AWD', trims: ['xDrive30e'] },
    ],
  },
  {
    make: 'Cadillac',
    model: 'Escalade',
    years: yearsFrom(1999),
    trims: ['Luxury', 'Premium Luxury', 'Sport', 'Platinum', 'V-Series'],
    powertrains: [
      { label: '6.2L automatic RWD', engine: '6.2L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '6.2L automatic 4WD', engine: '6.2L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.0L Duramax automatic 4WD', engine: '3.0L turbodiesel I6', transmission: '10-speed automatic', fuelType: 'Diesel', drivetrain: '4WD' },
      { label: '6.2L supercharged automatic AWD', engine: '6.2L supercharged V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['V-Series'] },
    ],
  },
  {
    make: 'Chevrolet',
    model: 'Silverado 1500',
    years: yearsFrom(1999),
    trims: ['WT', 'Custom', 'LT', 'RST', 'LTZ', 'High Country', 'Trail Boss'],
    powertrains: [
      { label: '2.7T automatic RWD', engine: '2.7L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '2.7T automatic 4WD', engine: '2.7L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '5.3L automatic RWD', engine: '5.3L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '5.3L automatic 4WD', engine: '5.3L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '6.2L automatic 4WD', engine: '6.2L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.0L Duramax automatic 4WD', engine: '3.0L turbodiesel I6', transmission: '10-speed automatic', fuelType: 'Diesel', drivetrain: '4WD' },
    ],
  },
  {
    make: 'Chevrolet',
    model: 'Tahoe',
    years: yearsFrom(1995),
    trims: ['LS', 'LT', 'RST', 'Z71', 'Premier', 'High Country'],
    powertrains: [
      { label: '5.3L automatic RWD', engine: '5.3L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '5.3L automatic 4WD', engine: '5.3L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '6.2L automatic 4WD', engine: '6.2L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.0L Duramax automatic 4WD', engine: '3.0L turbodiesel I6', transmission: '10-speed automatic', fuelType: 'Diesel', drivetrain: '4WD' },
    ],
  },
  {
    make: 'Chevrolet',
    model: 'Camaro',
    years: yearsBetween(2010, 2024),
    trims: ['LS', 'LT', 'LT1', 'SS', 'ZL1'],
    powertrains: [
      { label: '2.0T automatic RWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['LS', 'LT'] },
      { label: '2.0T manual RWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['LS', 'LT'] },
      { label: '3.6L automatic RWD', engine: '3.6L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['LT'] },
      { label: '6.2L manual RWD', engine: '6.2L V8', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['LT1', 'SS'] },
      { label: '6.2L automatic RWD', engine: '6.2L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['LT1', 'SS'] },
      { label: '6.2L supercharged automatic RWD', engine: '6.2L supercharged V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['ZL1'] },
    ],
  },
  {
    make: 'Dodge',
    model: 'Challenger',
    years: yearsBetween(2008, 2023),
    trims: ['SXT', 'GT', 'R/T', 'Scat Pack', 'SRT Hellcat'],
    powertrains: [
      { label: '3.6L automatic RWD', engine: '3.6L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['SXT', 'GT'] },
      { label: '3.6L automatic AWD', engine: '3.6L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['SXT', 'GT'] },
      { label: '5.7L manual RWD', engine: '5.7L V8', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['R/T'] },
      { label: '5.7L automatic RWD', engine: '5.7L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['R/T'] },
      { label: '6.4L manual RWD', engine: '6.4L V8', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['Scat Pack'] },
      { label: '6.2L supercharged automatic RWD', engine: '6.2L supercharged V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['SRT Hellcat'] },
    ],
  },
  {
    make: 'Ford',
    model: 'F-150',
    years: yearsFrom(1997),
    trims: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited', 'Tremor', 'Raptor'],
    powertrains: [
      { label: '2.7L EcoBoost automatic RWD', engine: '2.7L twin-turbo V6', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '2.7L EcoBoost automatic 4WD', engine: '2.7L twin-turbo V6', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.5L EcoBoost automatic 4WD', engine: '3.5L twin-turbo V6', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '5.0L automatic RWD', engine: '5.0L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '5.0L automatic 4WD', engine: '5.0L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: 'PowerBoost hybrid automatic 4WD', engine: '3.5L twin-turbo hybrid V6', transmission: '10-speed automatic', fuelType: 'Hybrid', drivetrain: '4WD' },
      { label: 'Raptor automatic 4WD', engine: '3.5L twin-turbo V6', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD', trims: ['Raptor'] },
    ],
  },
  {
    make: 'Ford',
    model: 'Mustang',
    years: yearsFrom(1994),
    trims: ['EcoBoost', 'GT', 'Mach 1', 'Dark Horse', 'Shelby GT350', 'Shelby GT500'],
    powertrains: [
      { label: 'EcoBoost automatic RWD', engine: '2.3L turbo I4', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['EcoBoost'] },
      { label: 'EcoBoost manual RWD', engine: '2.3L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['EcoBoost'] },
      { label: 'GT manual RWD', engine: '5.0L V8', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['GT', 'Mach 1', 'Dark Horse'] },
      { label: 'GT automatic RWD', engine: '5.0L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['GT', 'Mach 1', 'Dark Horse'] },
      { label: 'GT350 manual RWD', engine: '5.2L V8', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['Shelby GT350'] },
      { label: 'GT500 DCT RWD', engine: '5.2L supercharged V8', transmission: '7-speed dual-clutch', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['Shelby GT500'] },
    ],
  },
  {
    make: 'Ford',
    model: 'Explorer',
    years: yearsFrom(1991),
    trims: ['Base', 'XLT', 'Limited', 'ST-Line', 'ST', 'Platinum'],
    powertrains: [
      { label: '2.3L automatic RWD', engine: '2.3L turbo I4', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '2.3L automatic 4WD', engine: '2.3L turbo I4', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.0L EcoBoost automatic AWD', engine: '3.0L twin-turbo V6', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['ST', 'Platinum'] },
      { label: 'Hybrid automatic RWD', engine: '3.3L hybrid V6', transmission: '10-speed automatic', fuelType: 'Hybrid', drivetrain: 'RWD', trims: ['Limited', 'Platinum'] },
    ],
  },
  {
    make: 'GMC',
    model: 'Sierra 1500',
    years: yearsFrom(1999),
    trims: ['Pro', 'SLE', 'Elevation', 'SLT', 'AT4', 'Denali'],
    powertrains: [
      { label: '2.7T automatic RWD', engine: '2.7L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '5.3L automatic 4WD', engine: '5.3L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '6.2L automatic 4WD', engine: '6.2L V8', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.0L Duramax automatic 4WD', engine: '3.0L turbodiesel I6', transmission: '10-speed automatic', fuelType: 'Diesel', drivetrain: '4WD' },
    ],
  },
  {
    make: 'Honda',
    model: 'Civic',
    years: yearsFrom(1992),
    trims: ['LX', 'Sport', 'EX', 'EX-L', 'Touring', 'Si', 'Type R'],
    powertrains: [
      { label: '2.0L CVT FWD', engine: '2.0L I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['LX', 'Sport', 'EX', 'EX-L', 'Touring'] },
      { label: '1.5T CVT FWD', engine: '1.5L turbo I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['EX', 'EX-L', 'Touring'] },
      { label: '1.5T manual FWD', engine: '1.5L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['Si'] },
      { label: '2.0T manual FWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['Type R'] },
    ],
  },
  {
    make: 'Honda',
    model: 'Accord',
    years: yearsFrom(1990),
    trims: ['LX', 'Sport', 'EX', 'EX-L', 'Touring', 'Hybrid Sport', 'Hybrid Touring'],
    powertrains: [
      { label: '1.5T CVT FWD', engine: '1.5L turbo I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.0T automatic FWD', engine: '2.0L turbo I4', transmission: '10-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.0T manual FWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['Sport'] },
      { label: 'Hybrid eCVT FWD', engine: '2.0L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'FWD', trims: ['Hybrid Sport', 'Hybrid Touring', 'EX-L', 'Touring'] },
    ],
  },
  {
    make: 'Honda',
    model: 'CR-V',
    years: yearsFrom(1997),
    trims: ['LX', 'EX', 'EX-L', 'Sport', 'Sport-L', 'Touring'],
    powertrains: [
      { label: '1.5T CVT FWD', engine: '1.5L turbo I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '1.5T CVT AWD', engine: '1.5L turbo I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: 'Hybrid eCVT FWD', engine: '2.0L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'FWD', trims: ['Sport', 'Sport-L', 'Touring'] },
      { label: 'Hybrid eCVT AWD', engine: '2.0L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'AWD', trims: ['Sport', 'Sport-L', 'Touring'] },
    ],
  },
  {
    make: 'Hyundai',
    model: 'Elantra',
    years: yearsFrom(1992),
    trims: ['SE', 'SEL', 'Limited', 'N Line', 'N'],
    powertrains: [
      { label: '2.0L IVT FWD', engine: '2.0L I4', transmission: 'IVT/CVT', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['SE', 'SEL', 'Limited'] },
      { label: '1.6T DCT FWD', engine: '1.6L turbo I4', transmission: '7-speed dual-clutch', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['N Line'] },
      { label: '2.0T manual FWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['N'] },
      { label: '2.0T DCT FWD', engine: '2.0L turbo I4', transmission: '8-speed dual-clutch', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['N'] },
    ],
  },
  {
    make: 'Hyundai',
    model: 'Tucson',
    years: yearsFrom(2005),
    trims: ['SE', 'SEL', 'XRT', 'Limited', 'Hybrid Blue', 'Hybrid Limited', 'PHEV Limited'],
    powertrains: [
      { label: '2.5L automatic FWD', engine: '2.5L I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.5L automatic AWD', engine: '2.5L I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: 'Hybrid automatic AWD', engine: '1.6L turbo hybrid I4', transmission: '6-speed automatic', fuelType: 'Hybrid', drivetrain: 'AWD', trims: ['Hybrid Blue', 'Hybrid Limited'] },
      { label: 'PHEV automatic AWD', engine: '1.6L turbo plug-in hybrid I4', transmission: '6-speed automatic', fuelType: 'Plug-in hybrid', drivetrain: 'AWD', trims: ['PHEV Limited'] },
    ],
  },
  {
    make: 'Jeep',
    model: 'Wrangler',
    years: yearsFrom(1997),
    trims: ['Sport', 'Willys', 'Sahara', 'Rubicon', 'Rubicon 392'],
    powertrains: [
      { label: '2.0T automatic 4WD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.6L manual 4WD', engine: '3.6L V6', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.6L automatic 4WD', engine: '3.6L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '4xe automatic 4WD', engine: '2.0L turbo plug-in hybrid I4', transmission: '8-speed automatic', fuelType: 'Plug-in hybrid', drivetrain: '4WD' },
      { label: '392 automatic 4WD', engine: '6.4L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD', trims: ['Rubicon 392'] },
    ],
  },
  {
    make: 'Jeep',
    model: 'Grand Cherokee',
    years: yearsFrom(1993),
    trims: ['Laredo', 'Limited', 'Trailhawk', 'Overland', 'Summit', 'SRT', 'Trackhawk'],
    powertrains: [
      { label: '3.6L automatic RWD', engine: '3.6L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '3.6L automatic 4WD', engine: '3.6L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '5.7L automatic 4WD', engine: '5.7L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '4xe automatic 4WD', engine: '2.0L turbo plug-in hybrid I4', transmission: '8-speed automatic', fuelType: 'Plug-in hybrid', drivetrain: '4WD' },
      { label: '6.4L SRT automatic 4WD', engine: '6.4L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD', trims: ['SRT'] },
      { label: 'Trackhawk automatic 4WD', engine: '6.2L supercharged V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD', trims: ['Trackhawk'] },
    ],
  },
  {
    make: 'Kia',
    model: 'K5',
    years: yearsFrom(2021),
    trims: ['LXS', 'GT-Line', 'EX', 'GT'],
    powertrains: [
      { label: '1.6T automatic FWD', engine: '1.6L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '1.6T automatic AWD', engine: '1.6L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['GT-Line'] },
      { label: '2.5T DCT FWD', engine: '2.5L turbo I4', transmission: '8-speed dual-clutch', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['GT'] },
    ],
  },
  {
    make: 'Kia',
    model: 'Telluride',
    years: yearsFrom(2020),
    trims: ['LX', 'S', 'EX', 'SX', 'X-Line', 'X-Pro'],
    powertrains: [
      { label: '3.8L automatic FWD', engine: '3.8L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '3.8L automatic AWD', engine: '3.8L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
    ],
  },
  {
    make: 'Lexus',
    model: 'RX',
    years: yearsFrom(1999),
    trims: ['RX 350', 'RX 350h', 'RX 450h+', 'RX 500h F Sport'],
    powertrains: [
      { label: 'RX 350 automatic FWD', engine: '2.4L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['RX 350'] },
      { label: 'RX 350 automatic AWD', engine: '2.4L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['RX 350'] },
      { label: 'RX 350h eCVT AWD', engine: '2.5L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'AWD', trims: ['RX 350h'] },
      { label: 'RX 450h+ eCVT AWD', engine: '2.5L plug-in hybrid I4', transmission: 'eCVT', fuelType: 'Plug-in hybrid', drivetrain: 'AWD', trims: ['RX 450h+'] },
      { label: 'RX 500h automatic AWD', engine: '2.4L turbo hybrid I4', transmission: '6-speed automatic', fuelType: 'Hybrid', drivetrain: 'AWD', trims: ['RX 500h F Sport'] },
    ],
  },
  {
    make: 'Lexus',
    model: 'IS',
    years: yearsFrom(2001),
    trims: ['IS 300', 'IS 350', 'IS 500'],
    powertrains: [
      { label: 'IS 300 automatic RWD', engine: '2.0L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['IS 300'] },
      { label: 'IS 300 automatic AWD', engine: '3.5L V6', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['IS 300'] },
      { label: 'IS 350 automatic RWD', engine: '3.5L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['IS 350'] },
      { label: 'IS 500 automatic RWD', engine: '5.0L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['IS 500'] },
    ],
  },
  {
    make: 'Mazda',
    model: 'Mazda3',
    years: yearsFrom(2004),
    trims: ['Base', 'Select', 'Preferred', 'Premium', 'Turbo', 'Turbo Premium Plus'],
    powertrains: [
      { label: '2.5L automatic FWD', engine: '2.5L I4', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.5L manual FWD', engine: '2.5L I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['Premium'] },
      { label: '2.5T automatic AWD', engine: '2.5L turbo I4', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Turbo', 'Turbo Premium Plus'] },
    ],
  },
  {
    make: 'Mazda',
    model: 'CX-5',
    years: yearsFrom(2013),
    trims: ['Sport', 'Touring', 'Carbon Edition', 'Grand Touring', 'Premium', 'Turbo Signature'],
    powertrains: [
      { label: '2.5L automatic FWD', engine: '2.5L I4', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.5L automatic AWD', engine: '2.5L I4', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '2.5T automatic AWD', engine: '2.5L turbo I4', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Turbo Signature', 'Carbon Edition', 'Grand Touring'] },
    ],
  },
  {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    years: yearsFrom(1994),
    trims: ['C 300', 'C 300 4MATIC', 'AMG C 43', 'AMG C 63'],
    powertrains: [
      { label: 'C 300 automatic RWD', engine: '2.0L turbo I4', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['C 300'] },
      { label: 'C 300 automatic 4MATIC', engine: '2.0L turbo I4', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['C 300 4MATIC'] },
      { label: 'AMG C 43 automatic 4MATIC', engine: '3.0L twin-turbo V6', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['AMG C 43'] },
      { label: 'AMG C 63 automatic RWD', engine: '4.0L twin-turbo V8', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['AMG C 63'] },
    ],
  },
  {
    make: 'Mercedes-Benz',
    model: 'GLE',
    years: yearsFrom(2016),
    trims: ['GLE 350', 'GLE 350 4MATIC', 'GLE 450 4MATIC', 'GLE 580 4MATIC', 'AMG GLE 53', 'AMG GLE 63 S'],
    powertrains: [
      { label: 'GLE 350 automatic RWD', engine: '2.0L turbo I4', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['GLE 350'] },
      { label: 'GLE 350 automatic 4MATIC', engine: '2.0L turbo I4', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['GLE 350 4MATIC'] },
      { label: 'GLE 450 automatic 4MATIC', engine: '3.0L turbo I6 mild hybrid', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['GLE 450 4MATIC'] },
      { label: 'GLE 580 automatic 4MATIC', engine: '4.0L twin-turbo V8 mild hybrid', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['GLE 580 4MATIC'] },
      { label: 'AMG GLE automatic 4MATIC+', engine: 'AMG turbo engine', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['AMG GLE 53', 'AMG GLE 63 S'] },
    ],
  },
  {
    make: 'Nissan',
    model: 'Altima',
    years: yearsFrom(1993),
    trims: ['S', 'SV', 'SR', 'SL', 'Platinum'],
    powertrains: [
      { label: '2.5L CVT FWD', engine: '2.5L I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.5L CVT AWD', engine: '2.5L I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: 'VC-Turbo CVT FWD', engine: '2.0L variable-compression turbo I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['SR'] },
    ],
  },
  {
    make: 'Nissan',
    model: 'Frontier',
    years: yearsFrom(1998),
    trims: ['S', 'SV', 'PRO-X', 'PRO-4X'],
    powertrains: [
      { label: '3.8L automatic RWD', engine: '3.8L V6', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '3.8L automatic 4WD', engine: '3.8L V6', transmission: '9-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
    ],
  },
  {
    make: 'Porsche',
    model: '911',
    years: yearsFrom(1999),
    trims: ['Carrera', 'Carrera S', 'Carrera 4S', 'GTS', 'Turbo', 'Turbo S', 'GT3'],
    powertrains: [
      { label: 'Carrera PDK RWD', engine: '3.0L twin-turbo flat-6', transmission: '8-speed PDK dual-clutch', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['Carrera', 'Carrera S', 'GTS'] },
      { label: 'Carrera manual RWD', engine: '3.0L twin-turbo flat-6', transmission: '7-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['Carrera S', 'GTS'] },
      { label: 'Carrera 4S PDK AWD', engine: '3.0L twin-turbo flat-6', transmission: '8-speed PDK dual-clutch', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Carrera 4S'] },
      { label: 'Turbo PDK AWD', engine: '3.7L twin-turbo flat-6', transmission: '8-speed PDK dual-clutch', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Turbo', 'Turbo S'] },
      { label: 'GT3 PDK RWD', engine: '4.0L flat-6', transmission: '7-speed PDK dual-clutch', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['GT3'] },
      { label: 'GT3 manual RWD', engine: '4.0L flat-6', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'RWD', trims: ['GT3'] },
    ],
  },
  {
    make: 'Ram',
    model: '1500',
    years: yearsFrom(2011),
    trims: ['Tradesman', 'Big Horn', 'Laramie', 'Rebel', 'Limited', 'TRX'],
    powertrains: [
      { label: '3.6L eTorque automatic RWD', engine: '3.6L mild-hybrid V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '3.6L eTorque automatic 4WD', engine: '3.6L mild-hybrid V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '5.7L HEMI automatic RWD', engine: '5.7L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '5.7L HEMI automatic 4WD', engine: '5.7L V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.0L EcoDiesel automatic 4WD', engine: '3.0L turbodiesel V6', transmission: '8-speed automatic', fuelType: 'Diesel', drivetrain: '4WD' },
      { label: 'TRX automatic 4WD', engine: '6.2L supercharged V8', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD', trims: ['TRX'] },
    ],
  },
  {
    make: 'Subaru',
    model: 'WRX',
    years: yearsFrom(2002),
    trims: ['Base', 'Premium', 'Limited', 'GT', 'TR'],
    powertrains: [
      { label: '2.0T manual AWD', engine: '2.0L turbo flat-4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '2.0T CVT AWD', engine: '2.0L turbo flat-4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '2.4T manual AWD', engine: '2.4L turbo flat-4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '2.4T SPT AWD', engine: '2.4L turbo flat-4', transmission: 'Subaru Performance Transmission CVT', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['GT'] },
    ],
  },
  {
    make: 'Subaru',
    model: 'WRX STI',
    years: yearsBetween(2004, 2021),
    trims: ['Base', 'Limited', 'Launch Edition', 'Series.Gray', 'S209'],
    powertrains: [
      { label: 'EJ257 manual AWD', engine: '2.5L turbo flat-4 EJ257', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Base', 'Limited', 'Launch Edition', 'Series.Gray'] },
      { label: 'S209 manual AWD', engine: '2.5L turbo flat-4 EJ257 S209', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['S209'] },
    ],
  },
  {
    make: 'Subaru',
    model: 'Outback',
    years: yearsFrom(1995),
    trims: ['Base', 'Premium', 'Limited', 'Onyx Edition', 'Wilderness', 'Touring'],
    powertrains: [
      { label: '2.5L CVT AWD', engine: '2.5L flat-4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: '2.4T CVT AWD', engine: '2.4L turbo flat-4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Onyx Edition', 'Wilderness', 'Touring', 'Limited'] },
      { label: '3.6R CVT AWD', engine: '3.6L flat-6', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Limited', 'Touring'] },
    ],
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    years: yearsFrom(2017),
    trims: ['Rear-Wheel Drive', 'Long Range AWD', 'Performance AWD'],
    powertrains: [
      { label: 'RWD single motor', engine: 'Single electric motor', transmission: 'Single-speed reduction gear', fuelType: 'Electric', drivetrain: 'RWD', trims: ['Rear-Wheel Drive'] },
      { label: 'Long Range dual motor AWD', engine: 'Dual electric motors', transmission: 'Single-speed reduction gear', fuelType: 'Electric', drivetrain: 'AWD', trims: ['Long Range AWD'] },
      { label: 'Performance dual motor AWD', engine: 'Dual electric motors', transmission: 'Single-speed reduction gear', fuelType: 'Electric', drivetrain: 'AWD', trims: ['Performance AWD'] },
    ],
  },
  {
    make: 'Tesla',
    model: 'Model Y',
    years: yearsFrom(2020),
    trims: ['Rear-Wheel Drive', 'Long Range AWD', 'Performance AWD'],
    powertrains: [
      { label: 'RWD single motor', engine: 'Single electric motor', transmission: 'Single-speed reduction gear', fuelType: 'Electric', drivetrain: 'RWD', trims: ['Rear-Wheel Drive'] },
      { label: 'Long Range dual motor AWD', engine: 'Dual electric motors', transmission: 'Single-speed reduction gear', fuelType: 'Electric', drivetrain: 'AWD', trims: ['Long Range AWD'] },
      { label: 'Performance dual motor AWD', engine: 'Dual electric motors', transmission: 'Single-speed reduction gear', fuelType: 'Electric', drivetrain: 'AWD', trims: ['Performance AWD'] },
    ],
  },
  {
    make: 'Toyota',
    model: 'Camry',
    years: yearsFrom(1990),
    trims: ['LE', 'SE', 'XLE', 'XSE', 'TRD', 'Hybrid LE', 'Hybrid SE', 'Hybrid XLE'],
    powertrains: [
      { label: '2.5L automatic FWD', engine: '2.5L I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '3.5L automatic FWD', engine: '3.5L V6', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['XLE', 'XSE', 'TRD'] },
      { label: 'Hybrid eCVT FWD', engine: '2.5L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'FWD', trims: ['Hybrid LE', 'Hybrid SE', 'Hybrid XLE'] },
      { label: '2.5L automatic AWD', engine: '2.5L I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
    ],
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    years: yearsFrom(1990),
    trims: ['L', 'LE', 'SE', 'XLE', 'XSE', 'Hybrid LE', 'GR Core', 'GR Circuit'],
    powertrains: [
      { label: '1.8L CVT FWD', engine: '1.8L I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.0L CVT FWD', engine: '2.0L I4', transmission: 'CVT', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['SE', 'XSE'] },
      { label: '2.0L manual FWD', engine: '2.0L I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['SE'] },
      { label: 'Hybrid eCVT FWD', engine: '1.8L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'FWD', trims: ['Hybrid LE'] },
      { label: 'GR manual AWD', engine: '1.6L turbo I3', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['GR Core', 'GR Circuit'] },
    ],
  },
  {
    make: 'Toyota',
    model: 'RAV4',
    years: yearsFrom(1996),
    trims: ['LE', 'XLE', 'Adventure', 'TRD Off-Road', 'Limited', 'Hybrid XLE', 'Hybrid Limited', 'Prime SE', 'Prime XSE'],
    powertrains: [
      { label: '2.5L automatic FWD', engine: '2.5L I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.5L automatic AWD', engine: '2.5L I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD' },
      { label: 'Hybrid eCVT AWD', engine: '2.5L hybrid I4', transmission: 'eCVT', fuelType: 'Hybrid', drivetrain: 'AWD', trims: ['Hybrid XLE', 'Hybrid Limited'] },
      { label: 'Prime eCVT AWD', engine: '2.5L plug-in hybrid I4', transmission: 'eCVT', fuelType: 'Plug-in hybrid', drivetrain: 'AWD', trims: ['Prime SE', 'Prime XSE'] },
    ],
  },
  {
    make: 'Toyota',
    model: 'Tacoma',
    years: yearsFrom(1995),
    trims: ['SR', 'SR5', 'TRD Sport', 'TRD Off-Road', 'Limited', 'Trailhunter', 'TRD Pro'],
    powertrains: [
      { label: '2.7L automatic RWD', engine: '2.7L I4', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: 'RWD' },
      { label: '3.5L automatic 4WD', engine: '3.5L V6', transmission: '6-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: '3.5L manual 4WD', engine: '3.5L V6', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: '4WD', trims: ['TRD Sport', 'TRD Off-Road', 'TRD Pro'] },
      { label: 'i-FORCE automatic 4WD', engine: '2.4L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: '4WD' },
      { label: 'i-FORCE MAX automatic 4WD', engine: '2.4L turbo hybrid I4', transmission: '8-speed automatic', fuelType: 'Hybrid', drivetrain: '4WD', trims: ['Trailhunter', 'TRD Pro'] },
    ],
  },
  {
    make: 'Volkswagen',
    model: 'Golf GTI',
    years: yearsFrom(2006),
    trims: ['S', 'SE', 'Autobahn', 'Rabbit Edition', '40th Anniversary'],
    powertrains: [
      { label: '2.0T manual FWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '2.0T DSG FWD', engine: '2.0L turbo I4', transmission: '7-speed dual-clutch DSG', fuelType: 'Gasoline', drivetrain: 'FWD' },
    ],
  },
  {
    make: 'Volkswagen',
    model: 'Jetta',
    years: yearsFrom(1990),
    trims: ['S', 'Sport', 'SE', 'SEL', 'GLI'],
    powertrains: [
      { label: '1.5T automatic FWD', engine: '1.5L turbo I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'FWD' },
      { label: '1.5T manual FWD', engine: '1.5L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['S', 'Sport'] },
      { label: 'GLI manual FWD', engine: '2.0L turbo I4', transmission: '6-speed manual', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['GLI'] },
      { label: 'GLI DSG FWD', engine: '2.0L turbo I4', transmission: '7-speed dual-clutch DSG', fuelType: 'Gasoline', drivetrain: 'FWD', trims: ['GLI'] },
    ],
  },
  {
    make: 'Volvo',
    model: 'XC90',
    years: yearsFrom(2003),
    trims: ['Core', 'Plus', 'Ultimate', 'T5', 'T6', 'B5', 'B6', 'Recharge'],
    powertrains: [
      { label: 'B5 automatic AWD', engine: '2.0L turbo mild-hybrid I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Core', 'Plus', 'Ultimate', 'B5'] },
      { label: 'B6 automatic AWD', engine: '2.0L turbo/supercharged mild-hybrid I4', transmission: '8-speed automatic', fuelType: 'Gasoline', drivetrain: 'AWD', trims: ['Plus', 'Ultimate', 'B6'] },
      { label: 'Recharge automatic AWD', engine: '2.0L plug-in hybrid I4', transmission: '8-speed automatic', fuelType: 'Plug-in hybrid', drivetrain: 'AWD', trims: ['Recharge'] },
    ],
  },
];

export const VEHICLE_MAKES = withOther(uniqueSorted(VEHICLE_CATALOG.map((vehicle) => vehicle.make)));

export const VEHICLE_YEARS = yearsFrom(1981);

export const VEHICLE_TRIMS = withOther(uniqueSorted(VEHICLE_CATALOG.flatMap((vehicle) => vehicle.trims)));

export const VEHICLE_ENGINES = withOther(uniqueSorted(VEHICLE_CATALOG.flatMap((vehicle) => vehicle.powertrains.map((powertrain) => powertrain.engine))));

export const VEHICLE_TRANSMISSIONS = withOther(
  uniqueSorted(VEHICLE_CATALOG.flatMap((vehicle) => vehicle.powertrains.map((powertrain) => powertrain.transmission))),
);

export const FUEL_TYPES = withOther(uniqueSorted([...VEHICLE_CATALOG.flatMap((vehicle) => vehicle.powertrains.map((powertrain) => powertrain.fuelType)), 'E85/Flex fuel']));

export const MILEAGE_OPTIONS = ['0', '25000', '50000', '75000', '100000', '125000', '150000', '175000', '200000', '250000', '300000'];

function findCatalogEntry(make: string, model: string) {
  return VEHICLE_CATALOG.find((vehicle) => vehicle.make === make && vehicle.model === model);
}

export function getModelsForMake(make: string) {
  if (!make) {
    return [];
  }

  if (make === 'Other') {
    return ['Other'];
  }

  return withOther(uniqueSorted(VEHICLE_CATALOG.filter((vehicle) => vehicle.make === make).map((vehicle) => vehicle.model)));
}

export function getYearsForSelection(make: string, model: string) {
  if (!make || !model) {
    return [];
  }

  if (make === 'Other' || model === 'Other') {
    return VEHICLE_YEARS;
  }

  return findCatalogEntry(make, model)?.years ?? VEHICLE_YEARS;
}

export function getTrimsForSelection(make: string, model: string, year: string) {
  if (!make || !model || !year) {
    return [];
  }

  if (make === 'Other' || model === 'Other') {
    return ['Other'];
  }

  return withOther(findCatalogEntry(make, model)?.trims ?? []);
}

export function formatPowertrainLabel(powertrain: VehiclePowertrain) {
  const details = [powertrain.engine, powertrain.transmission, powertrain.drivetrain, powertrain.fuelType].filter(Boolean).join(' • ');

  return `${powertrain.label} — ${details}`;
}

export function getPowertrainOptionsForSelection(make: string, model: string, year: string, trim: string) {
  if (!make || !model || !year) {
    return [];
  }

  if (make === 'Other' || model === 'Other' || trim === 'Other') {
    return GENERIC_POWERTRAINS.map(formatPowertrainLabel);
  }

  const entry = findCatalogEntry(make, model);
  if (!entry) {
    return GENERIC_POWERTRAINS.map(formatPowertrainLabel);
  }

  const matchingPowertrains = entry.powertrains.filter((powertrain) => {
    if (!trim || !powertrain.trims?.length) {
      return true;
    }

    return powertrain.trims.includes(trim);
  });

  const powertrains = matchingPowertrains.length > 0 ? matchingPowertrains : entry.powertrains;

  return withOther(powertrains.map(formatPowertrainLabel));
}

export function getPowertrainFromLabel(make: string, model: string, year: string, trim: string, label: string) {
  if (!label) {
    return undefined;
  }

  if (label === 'Other') {
    return { label: 'Other', engine: 'Other', transmission: 'Other', fuelType: 'Other' };
  }

  const catalogPowertrains = getPowertrainsForSelection(make, model, year, trim);
  return catalogPowertrains.find((powertrain) => formatPowertrainLabel(powertrain) === label);
}

function getPowertrainsForSelection(make: string, model: string, year: string, trim: string) {
  void year;

  if (make === 'Other' || model === 'Other' || trim === 'Other') {
    return GENERIC_POWERTRAINS;
  }

  const entry = findCatalogEntry(make, model);
  if (!entry) {
    return GENERIC_POWERTRAINS;
  }

  const matchingPowertrains = entry.powertrains.filter((powertrain) => {
    if (!trim || !powertrain.trims?.length) {
      return true;
    }

    return powertrain.trims.includes(trim);
  });

  return matchingPowertrains.length > 0 ? matchingPowertrains : entry.powertrains;
}
