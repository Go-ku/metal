export const roles = ['System admin', 'Landlord', 'Property manager', 'Maintenance', 'Tenant'];

export const properties = [
  {
    id: 'zam-001',
    name: 'Manda Hill Flats',
    city: 'Lusaka',
    landlord: 'K. Banda',
    landlordPhone: '+260 97 222 1000',
    units: 24,
    occupied: 22,
    avgRent: 6800,
  },
  {
    id: 'zam-002',
    name: 'Ndola Terraces',
    city: 'Ndola',
    landlord: 'L. Mwansa',
    landlordPhone: '+260 95 880 1200',
    units: 16,
    occupied: 15,
    avgRent: 7200,
  },
  {
    id: 'zam-003',
    name: 'Chalala Gardens',
    city: 'Lusaka',
    landlord: 'S. Lungu',
    landlordPhone: '+260 97 402 4410',
    units: 12,
    occupied: 10,
    avgRent: 5600,
  },
];

export const tenants = [
  {
    id: 'ten-101',
    name: 'Memory Phiri',
    phone: '+260 97 000 111',
    email: 'memory@example.com',
    propertyId: 'zam-001',
    unit: 'A4',
    leaseEnd: '2025-01-30',
    rent: 6500,
  },
  {
    id: 'ten-102',
    name: 'Chanda Mulenga',
    phone: '+260 96 500 200',
    email: 'chanda@example.com',
    propertyId: 'zam-002',
    unit: 'B2',
    leaseEnd: '2024-12-15',
    rent: 7200,
  },
  {
    id: 'ten-103',
    name: 'Petronella Zulu',
    phone: '+260 97 330 300',
    email: 'petronella@example.com',
    propertyId: 'zam-003',
    unit: 'C1',
    leaseEnd: '2025-03-10',
    rent: 5600,
  },
  {
    id: 'ten-104',
    name: 'Bwalya Simpasa',
    phone: '+260 96 901 880',
    email: 'bwalya@example.com',
    propertyId: 'zam-001',
    unit: 'A9',
    leaseEnd: '2024-11-20',
    rent: 7000,
  },
];

export const payments = [
  {
    id: 'pay-901',
    tenantId: 'ten-101',
    amount: 6500,
    date: '2024-07-01',
    method: 'Mobile Money',
    status: 'Posted',
    receipt: 'RCPT-901',
  },
  {
    id: 'pay-902',
    tenantId: 'ten-102',
    amount: 7200,
    date: '2024-07-03',
    method: 'Bank Transfer',
    status: 'Pending',
    receipt: null,
  },
  {
    id: 'pay-903',
    tenantId: 'ten-103',
    amount: 5600,
    date: '2024-06-28',
    method: 'Mobile Money',
    status: 'Posted',
    receipt: 'RCPT-903',
  },
  {
    id: 'pay-904',
    tenantId: 'ten-104',
    amount: 3000,
    date: '2024-07-02',
    method: 'Cash',
    status: 'Partial',
    receipt: null,
  },
];

export const maintenanceTickets = [
  {
    id: 'mt-01',
    title: 'Leaking tap in kitchen',
    tenantId: 'ten-101',
    priority: 'High',
    status: 'Open',
    createdAt: '2024-07-06',
  },
  {
    id: 'mt-02',
    title: 'Gate remote replacement',
    tenantId: 'ten-102',
    priority: 'Medium',
    status: 'In progress',
    createdAt: '2024-07-04',
  },
  {
    id: 'mt-03',
    title: 'Paint peeling in bedroom',
    tenantId: 'ten-104',
    priority: 'Low',
    status: 'Open',
    createdAt: '2024-07-05',
  },
];

export const reminders = [
  {
    id: 'rem-01',
    tenantId: 'ten-102',
    type: 'Rental invoice',
    dueDate: '2024-07-05',
    channel: 'Email & SMS',
    status: 'Queued',
  },
  {
    id: 'rem-02',
    tenantId: 'ten-104',
    type: 'Late payment notice',
    dueDate: '2024-07-08',
    channel: 'WhatsApp',
    status: 'Draft',
  },
  {
    id: 'rem-03',
    tenantId: 'ten-101',
    type: 'Lease increase notice',
    dueDate: '2024-08-01',
    channel: 'Email & SMS',
    status: 'Queued',
  },
];

export const maintenanceGuides = [
  {
    title: 'Emergency response',
    detail: 'Escalate water, electricity, or gate failures within 1 hour to protect tenant safety.',
  },
  {
    title: 'Landlord updates',
    detail: 'Notify landlords on priority High tickets with expected resolution date.',
  },
  {
    title: 'Stock tracking',
    detail: 'Log spares used (taps, bulbs, fuses) against each ticket to control costs.',
  },
];
