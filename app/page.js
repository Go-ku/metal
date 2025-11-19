'use client';

import { useMemo, useState } from 'react';
import { Bell, Home, ReceiptText, Wrench } from 'lucide-react';
import Button from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import Select from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import SimpleTable from '@/components/dashboard/SimpleTable';
import { maintenanceTickets as seedTickets, payments as seedPayments, properties, reminders as seedReminders, roles, tenants as seedTenants } from '@/lib/mockData';

const currency = new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' });

export default function HomePage() {
  const [activeRole, setActiveRole] = useState(roles[0]);
  const [tenants, setTenants] = useState(seedTenants);
  const [payments, setPayments] = useState(seedPayments);
  const [tickets, setTickets] = useState(seedTickets);
  const [reminders, setReminders] = useState(seedReminders);

  const [paymentForm, setPaymentForm] = useState({ tenantId: seedTenants[0].id, amount: '', method: 'Mobile Money' });
  const [ticketForm, setTicketForm] = useState({ tenantId: seedTenants[0].id, title: '', priority: 'Medium' });
  const [reminderForm, setReminderForm] = useState({ tenantId: seedTenants[0].id, type: 'Rental invoice', channel: 'Email & SMS', dueDate: '' });
  const [tenantForm, setTenantForm] = useState({ name: '', phone: '', email: '', propertyId: properties[0].id, unit: '', leaseEnd: '', rent: '' });

  const tenantLookup = useMemo(() => Object.fromEntries(tenants.map((t) => [t.id, t])), [tenants]);
  const propertyLookup = useMemo(() => Object.fromEntries(properties.map((p) => [p.id, p])), []);

  const summaries = useMemo(() => {
    const openTickets = tickets.filter((t) => t.status !== 'Closed').length;
    const pendingReceipts = payments.filter((p) => !p.receipt).length;
    const dueLeases = tenants.filter((t) => new Date(t.leaseEnd) < new Date('2025-02-01')).length;
    return [
      { label: 'Active leases', value: tenants.length, icon: Home, color: 'text-brand-700' },
      { label: 'Rent posted', value: currency.format(payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)), icon: ReceiptText, color: 'text-emerald-600' },
      { label: 'Receipts to issue', value: pendingReceipts, icon: Bell, color: 'text-amber-600' },
      { label: 'Open maintenance', value: openTickets, icon: Wrench, color: 'text-rose-600' },
      { label: 'Leases under review', value: dueLeases, icon: Home, color: 'text-indigo-600' },
    ];
  }, [payments, tenants, tickets]);

  const paymentColumns = [
    { header: 'Tenant', cell: (info) => tenantLookup[info.row.original.tenantId]?.name },
    { header: 'Amount', cell: (info) => currency.format(info.row.original.amount) },
    { header: 'Date', cell: (info) => info.row.original.date },
    { header: 'Method', cell: (info) => info.row.original.method },
    {
      header: 'Receipt',
      cell: (info) => (
        <Badge intent={info.row.original.receipt ? 'success' : 'warning'}>
          {info.row.original.receipt ? info.row.original.receipt : 'Pending'}
        </Badge>
      ),
    },
  ];

  const maintenanceColumns = [
    { header: 'Ticket', cell: (info) => info.row.original.id },
    { header: 'Issue', cell: (info) => info.row.original.title },
    { header: 'Tenant', cell: (info) => tenantLookup[info.row.original.tenantId]?.name },
    {
      header: 'Priority',
      cell: (info) => (
        <Badge intent={info.row.original.priority === 'High' ? 'danger' : info.row.original.priority === 'Medium' ? 'warning' : 'neutral'}>
          {info.row.original.priority}
        </Badge>
      ),
    },
    {
      header: 'Status',
      cell: (info) => (
        <Badge intent={info.row.original.status === 'Open' ? 'warning' : info.row.original.status === 'Closed' ? 'neutral' : 'info'}>
          {info.row.original.status}
        </Badge>
      ),
    },
  ];

  const reminderColumns = [
    { header: 'Tenant', cell: (info) => tenantLookup[info.row.original.tenantId]?.name },
    { header: 'Type', cell: (info) => info.row.original.type },
    { header: 'Due', cell: (info) => info.row.original.dueDate },
    { header: 'Channel', cell: (info) => info.row.original.channel },
    {
      header: 'Status',
      cell: (info) => (
        <Badge intent={info.row.original.status === 'Sent' ? 'success' : 'info'}>{info.row.original.status}</Badge>
      ),
    },
  ];

  const leaseColumns = [
    { header: 'Tenant', cell: (info) => info.row.original.name },
    { header: 'Property', cell: (info) => propertyLookup[info.row.original.propertyId]?.name },
    { header: 'Unit', cell: (info) => info.row.original.unit },
    { header: 'Rent', cell: (info) => currency.format(info.row.original.rent) },
    { header: 'Lease ends', cell: (info) => info.row.original.leaseEnd },
  ];

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    if (!paymentForm.amount) return;
    setPayments((prev) => [
      {
        id: `pay-${Date.now()}`,
        tenantId: paymentForm.tenantId,
        amount: Number(paymentForm.amount),
        date: new Date().toISOString().slice(0, 10),
        method: paymentForm.method,
        status: 'Posted',
        receipt: `RCPT-${Math.floor(Math.random() * 9999)}`,
      },
      ...prev,
    ]);
    setPaymentForm((prev) => ({ ...prev, amount: '' }));
  };

  const handleTicketSubmit = (event) => {
    event.preventDefault();
    if (!ticketForm.title) return;
    setTickets((prev) => [
      {
        id: `mt-${prev.length + 1}`,
        title: ticketForm.title,
        tenantId: ticketForm.tenantId,
        priority: ticketForm.priority,
        status: 'Open',
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setTicketForm({ tenantId: tenants[0].id, title: '', priority: 'Medium' });
  };

  const handleReminderSubmit = (event) => {
    event.preventDefault();
    if (!reminderForm.dueDate) return;
    setReminders((prev) => [
      {
        id: `rem-${prev.length + 1}`,
        ...reminderForm,
        status: 'Queued',
      },
      ...prev,
    ]);
    setReminderForm({ tenantId: tenants[0].id, type: 'Rental invoice', channel: 'Email & SMS', dueDate: '' });
  };

  const handleTenantSubmit = (event) => {
    event.preventDefault();
    if (!tenantForm.name || !tenantForm.unit) return;
    setTenants((prev) => [
      {
        id: `ten-${prev.length + 200}`,
        ...tenantForm,
        rent: Number(tenantForm.rent),
      },
      ...prev,
    ]);
    setTenantForm({ name: '', phone: '', email: '', propertyId: properties[0].id, unit: '', leaseEnd: '', rent: '' });
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 rounded-2xl bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-5">
        {summaries.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft ${color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
              <p className="text-lg font-semibold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Operational actions</CardTitle>
                <CardDescription>Log payments, issue reminders, and file maintenance tasks.</CardDescription>
              </div>
              <Select value={activeRole} onChange={(e) => setActiveRole(e.target.value)} className="w-48">
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </CardHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <form onSubmit={handlePaymentSubmit} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment & receipt</p>
                    <p className="text-sm text-slate-600">Managers can post on behalf of tenants</p>
                  </div>
                  <ReceiptText className="text-brand-700" size={20} />
                </div>
                <div>
                  <Label htmlFor="tenant">Tenant</Label>
                  <Select
                    id="tenant"
                    value={paymentForm.tenantId}
                    onChange={(e) => setPaymentForm({ ...paymentForm, tenantId: e.target.value })}
                  >
                    {tenants.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name} · {tenant.unit}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="amount">Amount (ZMW)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentForm.amount}
                      onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                      placeholder="6500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">Method</Label>
                    <Select
                      id="method"
                      value={paymentForm.method}
                      onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                    >
                      <option>Mobile Money</option>
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Log payment & issue receipt
                </Button>
              </form>

              <form onSubmit={handleTicketSubmit} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Maintenance</p>
                    <p className="text-sm text-slate-600">Accept and triage requests by priority</p>
                  </div>
                  <Wrench className="text-rose-600" size={20} />
                </div>
                <div>
                  <Label htmlFor="ticket-tenant">Tenant</Label>
                  <Select
                    id="ticket-tenant"
                    value={ticketForm.tenantId}
                    onChange={(e) => setTicketForm({ ...ticketForm, tenantId: e.target.value })}
                  >
                    {tenants.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name} · {tenant.unit}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="issue">Issue</Label>
                  <Textarea
                    id="issue"
                    value={ticketForm.title}
                    onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                    rows={3}
                    placeholder="e.g. Replace broken geyser"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    id="priority"
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </Select>
                </div>
                <Button type="submit" variant="outline" className="w-full">
                  Create maintenance ticket
                </Button>
              </form>

              <form onSubmit={handleReminderSubmit} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Invoices & reminders</p>
                    <p className="text-sm text-slate-600">Schedule rent notices and arrears chasers</p>
                  </div>
                  <Bell className="text-amber-600" size={20} />
                </div>
                <div>
                  <Label htmlFor="rem-tenant">Tenant</Label>
                  <Select
                    id="rem-tenant"
                    value={reminderForm.tenantId}
                    onChange={(e) => setReminderForm({ ...reminderForm, tenantId: e.target.value })}
                  >
                    {tenants.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      id="type"
                      value={reminderForm.type}
                      onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
                    >
                      <option>Rental invoice</option>
                      <option>Late payment notice</option>
                      <option>Lease increase notice</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="due">Due date</Label>
                    <Input
                      id="due"
                      type="date"
                      value={reminderForm.dueDate}
                      onChange={(e) => setReminderForm({ ...reminderForm, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="channel">Channel</Label>
                  <Select
                    id="channel"
                    value={reminderForm.channel}
                    onChange={(e) => setReminderForm({ ...reminderForm, channel: e.target.value })}
                  >
                    <option>Email & SMS</option>
                    <option>WhatsApp</option>
                    <option>Phone call</option>
                  </Select>
                </div>
                <Button type="submit" variant="ghost" className="w-full">
                  Queue reminder / invoice
                </Button>
              </form>

              <form onSubmit={handleTenantSubmit} className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Register tenant</p>
                    <p className="text-sm text-slate-600">Capture leases and rent for new occupants</p>
                  </div>
                  <Home className="text-indigo-600" size={20} />
                </div>
                <div>
                  <Label htmlFor="tenant-name">Full name</Label>
                  <Input
                    id="tenant-name"
                    value={tenantForm.name}
                    onChange={(e) => setTenantForm({ ...tenantForm, name: e.target.value })}
                    placeholder="Tenant full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={tenantForm.phone}
                      onChange={(e) => setTenantForm({ ...tenantForm, phone: e.target.value })}
                      placeholder="e.g. +260 97 123 4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={tenantForm.email}
                      onChange={(e) => setTenantForm({ ...tenantForm, email: e.target.value })}
                      placeholder="tenant@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="property">Property</Label>
                    <Select
                      id="property"
                      value={tenantForm.propertyId}
                      onChange={(e) => setTenantForm({ ...tenantForm, propertyId: e.target.value })}
                    >
                      {properties.map((property) => (
                        <option key={property.id} value={property.id}>
                          {property.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={tenantForm.unit}
                      onChange={(e) => setTenantForm({ ...tenantForm, unit: e.target.value })}
                      placeholder="e.g. B4"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="rent">Monthly rent (ZMW)</Label>
                    <Input
                      id="rent"
                      type="number"
                      value={tenantForm.rent}
                      onChange={(e) => setTenantForm({ ...tenantForm, rent: e.target.value })}
                      placeholder="7000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lease-end">Lease end date</Label>
                    <Input
                      id="lease-end"
                      type="date"
                      value={tenantForm.leaseEnd}
                      onChange={(e) => setTenantForm({ ...tenantForm, leaseEnd: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Save tenant & lease
                </Button>
              </form>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Receipting & payments</CardTitle>
              <CardDescription>Track posted rent, pending receipts, and channels used.</CardDescription>
            </CardHeader>
            <SimpleTable columns={paymentColumns} data={payments} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lease register</CardTitle>
              <CardDescription>All tenants, units, rent amounts, and lease review dates.</CardDescription>
            </CardHeader>
            <SimpleTable columns={leaseColumns} data={tenants} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reminders & invoices</CardTitle>
              <CardDescription>Send SMS, email, or WhatsApp nudges with one click.</CardDescription>
            </CardHeader>
            <SimpleTable columns={reminderColumns} data={reminders} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance queue</CardTitle>
              <CardDescription>Prioritise requests and monitor SLA progress.</CardDescription>
            </CardHeader>
            <SimpleTable columns={maintenanceColumns} data={tickets} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Operational notes</CardTitle>
              <CardDescription>Role-based guidance for your team.</CardDescription>
            </CardHeader>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-600" />
                System administrator can see and configure everything across properties, tenants, and accounting.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Property managers can register tenants, log payments, issue invoices, and send arrears reminders.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                Maintenance team receives tickets, updates statuses, and prioritises emergency cases first.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                Tenants can submit maintenance requests, pay rent, and receive receipts and reminders.
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
