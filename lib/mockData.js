export const roles = ['System admin', 'Landlord', 'Property manager', 'Maintenance', 'Tenant'];

export const properties = [
  {
    id: 'zam-001',
    name: 'Manda Hill Flats',
    city: 'Lusaka',
    landlord: 'K. Banda',
    units: 24,
  },
  {
    id: 'zam-002',
    name: 'Ndola Terraces',
    city: 'Ndola',
    landlord: 'L. Mwansa',
    units: 16,
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
];
