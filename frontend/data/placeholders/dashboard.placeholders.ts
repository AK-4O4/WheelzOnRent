// =============================================================================
// data/placeholders/dashboard.placeholders.ts
// Placeholder data for the admin dashboard (/dashboard page).
// NOTE: Currency is shown as $ here for now — update to PKR when real API is
// connected. All USD figures are placeholder only.
// TODO: Replace with real API calls once the bookings/fleet API is implemented.
// =============================================================================

// ─── Status helpers ───────────────────────────────────────────────────────────

export type StatusKey = 'Finished' | 'Completed' | 'Ongoing' | 'Pending' | 'Cancelled' | 'Overdue'

export const STATUS_MAP: Record<StatusKey, { color: string; bg: string; dot: string }> = {
  Finished:  { color: '#12a05c', bg: '#e9f8f0', dot: '#12a05c' },
  Completed: { color: '#12a05c', bg: '#e9f8f0', dot: '#12a05c' },
  Ongoing:   { color: '#3b53c4', bg: '#eef1fb', dot: '#3b53c4' },
  Pending:   { color: '#e08e0b', bg: '#fef2e6', dot: '#e08e0b' },
  Cancelled: { color: '#e0403f', bg: '#fdecee', dot: '#e0403f' },
  Overdue:   { color: '#e0403f', bg: '#fdecee', dot: '#e0403f' },
}

function st(name: string) {
  const s = STATUS_MAP[name as StatusKey] ?? STATUS_MAP.Pending
  return { statusColor: s.color, statusBg: s.bg, statusDot: s.dot }
}

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export const kpis = [
  { label: 'Total Revenue',  value: 'PKR 845K', delta: '10.5%', up: true,  iconBg: '#fdecee', iconColor: '#f0343c', icon: 'payment'  },
  { label: 'New Bookings',   value: '386',       delta: '12%',   up: true,  iconBg: '#eef1fb', iconColor: '#3b53c4', icon: 'calendar' },
  { label: 'Rented Units',   value: '214',       delta: '3.5%',  up: false, iconBg: '#fef2e6', iconColor: '#e08e0b', icon: 'car'      },
  { label: 'Available',      value: '89',        delta: '4.5%',  up: true,  iconBg: '#e9f8f0', iconColor: '#12a05c', icon: 'user'     },
].map(k => ({ ...k, deltaArrow: k.up ? '▲' : '▼', deltaColor: k.up ? '#12a05c' : '#e0403f', deltaBg: k.up ? '#e9f8f0' : '#fdecee' }))

export const rentStatus = [
  { label: 'On hire',    pct: 62, color: '#f0343c' },
  { label: 'Pending',   pct: 25, color: '#1b2440' },
  { label: 'Cancelled', pct: 13, color: '#e2e6ee' },
]

export const bars = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((label, i) => ({
  label,
  h: [58,64,50,72,60,92,68,74,62,70,66,60][i],
  color: i === 5 ? '#f0343c' : '#1b2440',
}))

export const carTypes = [
  { name: 'Sedan',       pct: 39, color: '#f0343c' },
  { name: 'SUV',         pct: 30, color: '#1b2440' },
  { name: 'Truck',       pct: 16, color: '#3b53c4' },
  { name: 'Convertible', pct: 10, color: '#e08e0b' },
]

const cbDefs = [
  { id: '#4021', date: 'Aug 2, 2026', client: 'Alice Johnson',  car: 'Toyota Corolla',    days: '10 days', price: 'PKR 45,000', status: 'Finished'  },
  { id: '#4032', date: 'Aug 3, 2026', client: 'Bob Smith',      car: 'Honda Civic',       days: '7 days',  price: 'PKR 38,000', status: 'Ongoing'   },
  { id: '#4048', date: 'Aug 4, 2026', client: 'Diana White',    car: 'Chevrolet Malibu',  days: '5 days',  price: 'PKR 30,000', status: 'Ongoing'   },
  { id: '#4053', date: 'Aug 6, 2026', client: 'Edward Green',   car: 'Nissan Altima',     days: '3 days',  price: 'PKR 19,000', status: 'Pending'   },
  { id: '#4061', date: 'Aug 7, 2026', client: 'Fiona Brown',    car: 'Audi Q7',           days: '2 days',  price: 'PKR 26,000', status: 'Cancelled' },
]
export const carBookingRows = cbDefs.map(r => ({ ...r, ...st(r.status) }))

export const reminders = [
  { title: 'Inspect and maintain the fleet vehicles',              time: 'Today · 9:00 AM',      bg: '#fdecee', color: '#f0343c', icon: 'wrench'   },
  { title: 'Update car renting pricing plans for next season',     time: 'Today · 1:30 PM',      bg: '#eef1fb', color: '#3b53c4', icon: 'dollar'   },
  { title: 'Review customer feedback and service improvements',    time: 'Tomorrow · 11:00 AM',  bg: '#e9f8f0', color: '#12a05c', icon: 'message'  },
]

export const activity = [
  { who: 'Alice Johnson', what: 'completed a booking for Toyota Corolla (KHI-234).',               time: '12 min ago',   avatar: 'https://i.pravatar.cc/48?img=5'  },
  { who: 'Bob Smith',     what: 'is looking at Honda Civic (LHR-4412) — payment pending.',          time: '48 min ago',   avatar: 'https://i.pravatar.cc/48?img=8'  },
  { who: 'Edward Green',  what: 'booked a Kia Sportage for a 3-day trip.',                          time: '2 hours ago',  avatar: 'https://i.pravatar.cc/48?img=12' },
]

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookingStats = [
  { label: 'Upcoming Bookings',   value: '145', bg: '#eef1fb', color: '#3b53c4', icon: 'calendar' },
  { label: 'Pending Bookings',    value: '106', bg: '#fef2e6', color: '#e08e0b', icon: 'clock'    },
  { label: 'Cancelled Bookings',  value: '86',  bg: '#fdecee', color: '#f0343c', icon: 'x'        },
  { label: 'Completed Bookings',  value: '298', bg: '#e9f8f0', color: '#12a05c', icon: 'check'    },
]

const bDefs = [
  { id: '#4021', date: 'Aug 1, 2026', client: 'Alice Johnson',  car: 'Toyota Corolla',   days: '7',  pickup: 'Aug 1',  dropoff: 'Aug 8',  price: 'PKR 35,500', status: 'Ongoing'   },
  { id: '#4032', date: 'Aug 2, 2026', client: 'Bob Smith',      car: 'Honda Civic',      days: '5',  pickup: 'Aug 2',  dropoff: 'Aug 7',  price: 'PKR 26,000', status: 'Ongoing'   },
  { id: '#4048', date: 'Aug 3, 2026', client: 'Diana White',    car: 'Chevrolet Malibu', days: '3',  pickup: 'Aug 3',  dropoff: 'Aug 6',  price: 'PKR 18,000', status: 'Ongoing'   },
  { id: '#4053', date: 'Aug 4, 2026', client: 'Edward Green',   car: 'Nissan Altima',    days: '10', pickup: 'Aug 4',  dropoff: 'Aug 14', price: 'PKR 61,000', status: 'Pending'   },
  { id: '#4061', date: 'Aug 4, 2026', client: 'George Clark',   car: 'Audi Q7',          days: '2',  pickup: 'Aug 4',  dropoff: 'Aug 6',  price: 'PKR 26,000', status: 'Ongoing'   },
  { id: '#4070', date: 'Aug 5, 2026', client: 'Fiona Brown',    car: 'BMW LX3',          days: '6',  pickup: 'Aug 5',  dropoff: 'Aug 11', price: 'PKR 72,000', status: 'Finished'  },
  { id: '#4078', date: 'Aug 6, 2026', client: 'Ian Rodriguez',  car: 'Mercedes S-Class', days: '4',  pickup: 'Aug 6',  dropoff: 'Aug 10', price: 'PKR 40,000', status: 'Pending'   },
  { id: '#4085', date: 'Aug 7, 2026', client: 'Laura King',     car: 'KIA EV6',          days: '1',  pickup: 'Aug 7',  dropoff: 'Aug 8',  price: 'PKR 4,000',  status: 'Cancelled' },
]
export const bookingRows = bDefs.map(r => ({ ...r, ...st(r.status) }))

// ─── Units ────────────────────────────────────────────────────────────────────

const uStat: Record<string, { color: string; bg: string }> = {
  'Available':   { color: '#12a05c', bg: '#e9f8f0' },
  'On hire':     { color: '#3b53c4', bg: '#eef1fb' },
  'Maintenance': { color: '#e08e0b', bg: '#fef2e6' },
}
const uDefs = [
  { brand: 'Aston Martin', name: 'Aston Martin', price: 'PKR 12,000', plate: 'AM-01', status: 'Available',   trans: 'Automatic', seats: 2, fuel: 'Petrol',   image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500&q=80' },
  { brand: 'Hyundai',      name: 'Sonata',        price: 'PKR 4,500',  plate: 'HS-22', status: 'Available',   trans: 'Manual',    seats: 5, fuel: 'Petrol',   image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=500&q=80' },
  { brand: 'Nissan',       name: 'Ariya',         price: 'PKR 5,500',  plate: 'NA-09', status: 'Maintenance', trans: 'Automatic', seats: 5, fuel: 'Electric', image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=500&q=80' },
  { brand: 'Range Rover',  name: 'Velar',         price: 'PKR 14,000', plate: 'RV-14', status: 'Available',   trans: 'Automatic', seats: 5, fuel: 'Diesel',   image: 'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?w=500&q=80' },
  { brand: 'BMW',          name: 'LX3',           price: 'PKR 12,000', plate: 'BX-3',  status: 'On hire',     trans: 'Automatic', seats: 7, fuel: 'Hybrid',   image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80' },
  { brand: 'Audi',         name: 'Q7',            price: 'PKR 13,000', plate: 'AQ-7',  status: 'Available',   trans: 'Automatic', seats: 7, fuel: 'Diesel',   image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&q=80' },
  { brand: 'Mercedes',     name: 'S-Class',       price: 'PKR 10,000', plate: 'MS-01', status: 'Available',   trans: 'Automatic', seats: 5, fuel: 'Petrol',   image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&q=80' },
  { brand: 'KIA',          name: 'EV6',           price: 'PKR 4,000',  plate: 'KE-6',  status: 'On hire',     trans: 'Manual',    seats: 5, fuel: 'Electric', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80' },
  { brand: 'Volkswagen',   name: 'Amarok',        price: 'PKR 8,000',  plate: 'VA-01', status: 'Available',   trans: 'Automatic', seats: 5, fuel: 'Diesel',   image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80' },
]
export const units = uDefs.map(u => {
  const s = uStat[u.status] ?? uStat['Available']
  return { ...u, statusColor: s.color, statusBg: s.bg }
})

export const carFeatures = ['Air Conditioning','Keyless Entry / Go','Backup Camera','Spacious Trunk','Cruise Control','Heated Seats','Blind Spot Monitor','Power Windows & Locks']
export const specs = [
  { label: 'Transmission', value: 'Automatic' },
  { label: 'Capacity',     value: '5 seats'   },
  { label: 'Fuel',         value: 'Petrol'    },
  { label: 'Mileage',      value: '40 mpg'    },
  { label: 'Engine',       value: '2.0L Turbo'},
  { label: 'Year',         value: '2023'      },
]

// ─── Clients ──────────────────────────────────────────────────────────────────

export const clients = [
  { name: 'Alice Johnson',  email: 'alice.johnson@example.com',  phone: '801-455-7000', address: '63 Marple Street',  card: '4321', trips: 12, avatar: 'https://i.pravatar.cc/48?img=5'  },
  { name: 'Bob Smith',      email: 'bob.smith@example.com',      phone: '354-500-4400', address: '700 First Street',  card: '8842', trips: 5,  avatar: 'https://i.pravatar.cc/48?img=8'  },
  { name: 'Charlie Davis',  email: 'charlie.d@example.com',      phone: '524-475-4100', address: '700 Wisconsin Ave', card: '2013', trips: 20, avatar: 'https://i.pravatar.cc/48?img=12' },
  { name: 'Diana White',    email: 'diana.white@example.com',    phone: '455-780-9100', address: '12 Western Lane',   card: '6634', trips: 8,  avatar: 'https://i.pravatar.cc/48?img=9'  },
  { name: 'Edward Green',   email: 'edward.g@example.com',       phone: '667-990-1200', address: '300 Cedar Street',  card: '1190', trips: 3,  avatar: 'https://i.pravatar.cc/48?img=13' },
  { name: 'Fiona Brown',    email: 'fiona.b@example.com',        phone: '355-780-2200', address: '500 Bern Avenue',   card: '7781', trips: 15, avatar: 'https://i.pravatar.cc/48?img=16' },
  { name: 'George Clark',   email: 'george.c@example.com',       phone: '201-355-2110', address: '421 Sunset Road',   card: '3320', trips: 9,  avatar: 'https://i.pravatar.cc/48?img=15' },
  { name: 'Kate Thompson',  email: 'kate.t@example.com',         phone: '355-460-7700', address: '700 Fenny Road',    card: '9902', trips: 7,  avatar: 'https://i.pravatar.cc/48?img=20' },
  { name: 'Laura King',     email: 'laura.king@example.com',     phone: '204-767-4200', address: 'C301 Northwood',    card: '4415', trips: 11, avatar: 'https://i.pravatar.cc/48?img=25' },
]

// ─── Drivers ──────────────────────────────────────────────────────────────────

const dStat: Record<string, { color: string; bg: string; dot: string }> = {
  'On trip':  { color: '#12a05c', bg: '#e9f8f0', dot: '#12a05c' },
  'On hire':  { color: '#3b53c4', bg: '#eef1fb', dot: '#3b53c4' },
  'Available':{ color: '#e08e0b', bg: '#fef2e6', dot: '#e08e0b' },
}
const dDefs = [
  { name: 'John Adams',      email: 'john.adams@example.com',    phone: '555-123-1010', status: 'On trip',  avatar: 'https://i.pravatar.cc/48?img=11' },
  { name: 'Emily Nelson',    email: 'emily.nelson@example.com',  phone: '333-880-4444', status: 'On hire',  avatar: 'https://i.pravatar.cc/48?img=22' },
  { name: 'Michael Chen',    email: 'm.chen@example.com',        phone: '333-445-7200', status: 'Available',avatar: 'https://i.pravatar.cc/48?img=33' },
  { name: 'Sarah Davis',     email: 'sarah.davis@example.com',   phone: '667-322-9000', status: 'On trip',  avatar: 'https://i.pravatar.cc/48?img=44' },
  { name: 'James Evans',     email: 'james.evans@example.com',   phone: '555-655-1717', status: 'On hire',  avatar: 'https://i.pravatar.cc/48?img=51' },
  { name: 'Robert Price',    email: 'robert.p@example.com',      phone: '777-880-9800', status: 'Available',avatar: 'https://i.pravatar.cc/48?img=59' },
  { name: 'Jessica Smith',   email: 'jessica.s@example.com',     phone: '555-320-4413', status: 'On trip',  avatar: 'https://i.pravatar.cc/48?img=48' },
  { name: 'Daniel Jackson',  email: 'daniel.j@example.com',      phone: '555-333-1111', status: 'On trip',  avatar: 'https://i.pravatar.cc/48?img=60' },
  { name: 'Chloe King',      email: 'chloe.king@example.com',    phone: '355-222-2122', status: 'On hire',  avatar: 'https://i.pravatar.cc/48?img=45' },
  { name: 'David Lee',       email: 'david.lee@example.com',     phone: '355-333-1000', status: 'Available',avatar: 'https://i.pravatar.cc/48?img=68' },
]
export const drivers = dDefs.map(d => {
  const s = dStat[d.status] ?? dStat['Available']
  return { ...d, statusColor: s.color, statusBg: s.bg, statusDot: s.dot }
})
export const driverSchedule = [
  { time: 'Wed, 2 Aug · 10:30 AM', client: 'Alice Johnson', note: 'Pickup — Karachi Airport', color: '#f0343c' },
  { time: 'Wed, 2 Aug · 4:00 PM',  client: 'Bob Smith',     note: 'Return — DHA Phase 5',     color: '#3b53c4' },
  { time: 'Thu, 3 Aug · 9:00 AM',  client: 'Diana White',   note: 'Service — Workshop',        color: '#12a05c' },
]

// ─── Payments ─────────────────────────────────────────────────────────────────

export const paymentStats = [
  { label: 'Completed Payment', value: 'PKR 2.2M', bg: '#e9f8f0', color: '#12a05c', icon: 'check'   },
  { label: 'Awaiting Payment',  value: 'PKR 1.5M', bg: '#fef2e6', color: '#e08e0b', icon: 'clock'   },
  { label: 'Overdue',           value: 'PKR 1.2M', bg: '#fdecee', color: '#f0343c', icon: 'warning' },
]
const pDefs = [
  { invoice: 'INV-00901', client: 'Alice Johnson',  car: 'Toyota Corolla',   days: '10', amount: 'PKR 45,000',  date: '2026-08-06', status: 'Completed' },
  { invoice: 'INV-00902', client: 'Bob Smith',      car: 'Honda Civic',      days: '3',  amount: 'PKR 22,000',  date: '2026-08-06', status: 'Pending'   },
  { invoice: 'INV-00903', client: 'Charlie Davis',  car: 'Ford Focus',       days: '5',  amount: 'PKR 30,000',  date: '2026-08-05', status: 'Completed' },
  { invoice: 'INV-00904', client: 'Diana White',    car: 'Chevrolet Malibu', days: '1',  amount: 'PKR 6,000',   date: '2026-08-04', status: 'Overdue'   },
  { invoice: 'INV-00905', client: 'Edward Green',   car: 'Nissan Altima',    days: '8',  amount: 'PKR 49,000',  date: '2026-08-04', status: 'Pending'   },
  { invoice: 'INV-00906', client: 'Fiona Brown',    car: 'BMW LX3',          days: '3',  amount: 'PKR 36,000',  date: '2026-08-03', status: 'Completed' },
  { invoice: 'INV-00907', client: 'George Clark',   car: 'Audi Q7',          days: '2',  amount: 'PKR 26,000',  date: '2026-08-03', status: 'Overdue'   },
  { invoice: 'INV-00908', client: 'Ian Rodriguez',  car: 'Mercedes S-Class', days: '1',  amount: 'PKR 10,000',  date: '2026-08-02', status: 'Completed' },
]
export const payments = pDefs.map(p => ({ ...p, ...st(p.status) }))

// ─── Expenses ─────────────────────────────────────────────────────────────────

export const expenseStats = [
  { label: 'Total Expenses', value: 'PKR 15.5M', delta: '+12.5%', up: true,  bg: '#eef1fb', color: '#3b53c4', icon: 'payment' },
  { label: 'Maintenance',    value: 'PKR 2.5M',  delta: '+3.2%',  up: true,  bg: '#fef2e6', color: '#e08e0b', icon: 'wrench'  },
  { label: 'Insurance',      value: 'PKR 1.4M',  delta: '-1.5%',  up: false, bg: '#e9f8f0', color: '#12a05c', icon: 'shield'  },
].map(s => ({ ...s, deltaColor: s.up ? '#12a05c' : '#e0403f', deltaBg: s.up ? '#e9f8f0' : '#fdecee' }))

const catColors: Record<string, string> = {
  'Vehicle Maintenance': '#f0343c',
  'Fuel':               '#3b53c4',
  'Insurance':          '#12a05c',
  'Office Supplies':    '#e08e0b',
  'Marketing':          '#8b5cf6',
}
const tDefs = [
  { name: 'Oil Change',               category: 'Vehicle Maintenance', qty: '1',  amount: 'PKR 12,000',  date: '2026-03-01', status: 'Completed' },
  { name: 'Fuel Purchase',            category: 'Fuel',               qty: '12', amount: 'PKR 65,000',  date: '2026-03-02', status: 'Pending'   },
  { name: 'Insurance Payment',        category: 'Insurance',          qty: '1',  amount: 'PKR 200,000', date: '2026-03-03', status: 'Completed' },
  { name: 'Office Supplies Purchase', category: 'Office Supplies',    qty: '5',  amount: 'PKR 30,000',  date: '2026-03-05', status: 'Completed' },
  { name: 'Marketing Campaign',       category: 'Marketing',          qty: '1',  amount: 'PKR 90,000',  date: '2026-03-05', status: 'Pending'   },
  { name: 'Tire Replacement',         category: 'Vehicle Maintenance', qty: '4', amount: 'PKR 40,000',  date: '2026-03-08', status: 'Completed' },
  { name: 'Fuel Purchase',            category: 'Fuel',               qty: '10', amount: 'PKR 54,000',  date: '2026-03-10', status: 'Completed' },
]
export const transactions = tDefs.map(t => ({ ...t, catColor: catColors[t.category] ?? '#94a3b8', ...st(t.status) }))

export const expenseBreakdown = [
  { label: 'Maintenance', value: 'PKR 420K', color: '#f0343c' },
  { label: 'Fuel',        value: 'PKR 260K', color: '#1b2440' },
  { label: 'Insurance',   value: 'PKR 180K', color: '#3b53c4' },
  { label: 'Other',       value: 'PKR 140K', color: '#e08e0b' },
]

// ─── Calendar ─────────────────────────────────────────────────────────────────

export const calHeaders = [
  { day: '14', name: 'Sun', color: '#1b2440' },
  { day: '15', name: 'Mon', color: '#1b2440' },
  { day: '16', name: 'Tue', color: '#f0343c' },
  { day: '17', name: 'Wed', color: '#1b2440' },
  { day: '18', name: 'Thu', color: '#1b2440' },
]

type CalEvent = { has: true; title: string; sub: string; color: string; bg: string } | { has: false }
const blank = (): CalEvent => ({ has: false })
const ev = (title: string, sub: string, type: 'pickup' | 'return' | 'service'): CalEvent => {
  const c = { pickup: { color: '#f0343c', bg: '#fdecee' }, return: { color: '#3b53c4', bg: '#eef1fb' }, service: { color: '#12a05c', bg: '#e9f8f0' } }[type]
  return { has: true, title, sub, color: c.color, bg: c.bg }
}
export const calRows = [
  { time: '8 AM',  cells: [ev('Toyota Corolla','Alice J.','pickup'), blank(), blank(), ev('Nissan Altima','Bob S.','return'), blank()] },
  { time: '10 AM', cells: [blank(), ev('Honda Civic','Diana W.','pickup'), blank(), blank(), ev('Audi Q7','George C.','service')] },
  { time: '12 PM', cells: [blank(), blank(), ev('BMW LX3','Kyle T.','pickup'), blank(), blank()] },
  { time: '2 PM',  cells: [ev('Chevrolet','Fiona B.','return'), blank(), blank(), ev('Mercedes','Ian R.','pickup'), blank()] },
  { time: '4 PM',  cells: [blank(), ev('KIA EV6','Laura K.','service'), blank(), blank(), ev('Ford Focus','Diana W.','return')] },
  { time: '6 PM',  cells: [blank(), blank(), ev('Range Rover','Bob S.','pickup'), blank(), blank()] },
]

// ─── Tracking ─────────────────────────────────────────────────────────────────

const trStat: Record<string, string> = { 'On trip': '#12a05c', 'Returned': '#3b53c4', 'One trip': '#e08e0b' }
const trDefs = [
  { client: 'Helen Martinez', car: 'Nissan Ariya',        status: 'Returned',  active: false, image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&q=80' },
  { client: 'Bob Smith',      car: 'Honda Civic',         status: 'On trip',   active: false, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&q=80' },
  { client: 'Diana White',    car: 'Chevrolet Malibu',    status: 'On trip',   active: true,  image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=200&q=80' },
  { client: 'Edward Green',   car: 'Nissan Altima',       status: 'Returned',  active: false, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80' },
  { client: 'Fiona Brown',    car: 'BMW LX3',             status: 'On trip',   active: false, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&q=80' },
  { client: 'George Clark',   car: 'Audi Q7',             status: 'One trip',  active: false, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=80' },
  { client: 'Helen Martinez', car: 'Mercedes S-Class',    status: 'Returned',  active: false, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&q=80' },
  { client: 'Laura King',     car: 'KIA EV6',             status: 'On trip',   active: false, image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&q=80' },
]
export const trackCars = trDefs.map(t => ({ ...t, statusColor: trStat[t.status] ?? '#5b6478', rowBg: t.active ? '#fdecee' : 'transparent' }))

// ─── Messages ─────────────────────────────────────────────────────────────────

const cvDefs = [
  { name: 'Helen Martinez', preview: 'Hi! I clicked the wrong car…',              time: '10:40',    active: false, avatar: 'https://i.pravatar.cc/48?img=32' },
  { name: 'Alice Johnson',  preview: 'Just returned the Toyota Corolla.',         time: '10:12',    active: false, avatar: 'https://i.pravatar.cc/48?img=5'  },
  { name: 'George Clark',   preview: 'Sure, give me a moment.',                   time: '09:50',    active: true,  avatar: 'https://i.pravatar.cc/48?img=13' },
  { name: 'Bob Smith',      preview: 'The Ford Focus needs maintenance.',          time: '09:22',    active: false, avatar: 'https://i.pravatar.cc/48?img=8'  },
  { name: 'Charlie Davis',  preview: 'Here is the picture.',                      time: 'Yesterday',active: false, avatar: 'https://i.pravatar.cc/48?img=12' },
  { name: 'Fiona Brown',    preview: 'Thank you for the smooth rental.',           time: 'Yesterday',active: false, avatar: 'https://i.pravatar.cc/48?img=16' },
  { name: 'Diana White',    preview: 'Perfect, see you then.',                    time: 'Yesterday',active: false, avatar: 'https://i.pravatar.cc/48?img=9'  },
]
export const conversations = cvDefs.map(c => ({ ...c, rowBg: c.active ? '#fafbfc' : 'transparent' }))

const thDefs = [
  { text: 'Hi! I clicked the wrong car when booking. Can you help me switch it?',                               me: false, time: '09:41' },
  { text: 'Hello George, thanks for letting us know. Can you please send a picture of the cockpit?',            me: true,  time: '09:44' },
  { text: 'Sure, give me a moment.',                                                                             me: false, time: '09:50' },
  { text: "Got it. We'll make sure it's documented so also you need assistance later.",                          me: true,  time: '09:55' },
  { text: "No, that's all for now. Thanks for the quick response, I really appreciate it!",                      me: false, time: '09:58' },
]
export const thread = thDefs.map(m => ({
  text: m.text, time: m.time,
  justify: m.me ? 'flex-end' : 'flex-start',
  bg: m.me ? '#f0343c' : '#fff',
  color: m.me ? '#fff' : '#1b2440',
  timeColor: m.me ? 'rgba(255,255,255,0.7)' : '#a9b0c0',
  radius: m.me ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
}))
