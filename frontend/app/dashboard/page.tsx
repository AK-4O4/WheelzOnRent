'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import type { Screen } from '@/types'
import {
  CarIcon, CalendarIcon, UsersIcon, UserCircleIcon,
  CreditCardIcon, DollarIcon, MapPinIcon, ChatIcon,
  GridIcon, BellIcon, SearchIcon, LightningIcon, LogOutIcon,
} from '@/assets/svg'

import { DashboardScreen } from '@/components/dash/dashboard-screen'
import { BookingsScreen } from '@/components/dash/bookings-screen'
import { UnitsScreen, UnitDetailScreen } from '@/components/dash/units-screen'
import { ClientsScreen } from '@/components/dash/clients-screen'
import { DriversScreen } from '@/components/dash/drivers-screen'
import { PaymentsScreen } from '@/components/dash/payments-screen'
import { ExpensesScreen } from '@/components/dash/expenses-screen'
import { CalendarScreen } from '@/components/dash/calendar-screen'
import { TrackingScreen } from '@/components/dash/tracking-screen'
import { MessagesScreen } from '@/components/dash/messages-screen'

// ─── Hardcoded admin user — replace with real auth session when ready ─────────

const ADMIN_USER = {
  name: 'Abram Schleifer',
  email: 'abram@wheelzon.com',
  avatar: 'https://i.pravatar.cc/72?img=15',
  initials: 'AS',
}

// ─── Screen titles ────────────────────────────────────────────────────────────

const SCREEN_TITLES: Record<Screen, string> = {
  dashboard: 'Dashboard',
  bookings: 'Bookings',
  units: 'Units',
  unitDetail: 'Unit Details',
  calendar: 'Calendar',
  clients: 'Clients',
  drivers: 'Drivers',
  payments: 'Payments',
  expenses: 'Expenses',
  tracking: 'Tracking',
  messages: 'Messages',
}

// ─── Nav items ────────────────────────────────────────────────────────────────

interface NavItem { key: Screen; label: string; Icon: React.FC<{ className?: string }> }

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', Icon: ({ className }) => <GridIcon className={className} size={16} /> },
  { key: 'bookings', label: 'Bookings', Icon: ({ className }) => <CalendarIcon className={className} size={16} /> },
  { key: 'units', label: 'Units', Icon: ({ className }) => <CarIcon className={className} size={16} /> },
  { key: 'calendar', label: 'Calendar', Icon: ({ className }) => <CalendarIcon className={className} size={16} /> },
  { key: 'clients', label: 'Clients', Icon: ({ className }) => <UsersIcon className={className} size={16} /> },
  { key: 'drivers', label: 'Drivers', Icon: ({ className }) => <UserCircleIcon className={className} size={16} /> },
  { key: 'payments', label: 'Payments', Icon: ({ className }) => <CreditCardIcon className={className} size={16} /> },
  { key: 'expenses', label: 'Expenses', Icon: ({ className }) => <DollarIcon className={className} size={16} /> },
  { key: 'tracking', label: 'Tracking', Icon: ({ className }) => <MapPinIcon className={className} size={16} /> },
  { key: 'messages', label: 'Messages', Icon: ({ className }) => <ChatIcon className={className} size={16} /> },
]

// ─── Application shell ────────────────────────────────────────────────────────

const ApplicationShell = () => {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const go = (s: Screen) => setScreen(s)

  const activeKey: Screen = screen === 'unitDetail' ? 'units' : screen
  const title = SCREEN_TITLES[screen]

  return (
    <div className='flex min-h-dvh w-full font-sans'>
      <SidebarProvider>
        {/* ── Sidebar ── */}
        <Sidebar>
          {/* Logo */}
          <SidebarHeader className='border-b px-4 py-4'>
            <div className='flex items-center gap-2.5'>
              <span className='flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#f0343c] text-white shrink-0'>
                <CarIcon className='size-4.5' />
              </span>
              <span className='text-[19px] font-extrabold tracking-tight'>Wheelzie</span>
            </div>
          </SidebarHeader>

          {/* Nav items */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.map(({ key, label, Icon }) => (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton
                        isActive={activeKey === key}
                        onClick={() => go(key)}
                        className='cursor-pointer'
                      >
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Logout */}
          <SidebarFooter className='border-t'>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='text-muted-foreground cursor-pointer'>
                  <LogOutIcon size={16} />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main area ── */}
        <div className='flex flex-1 flex-col min-w-0'>
          {/* Header / topbar */}
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='flex items-center justify-between gap-6 px-4 py-2 sm:px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:size-5!' />
                <Separator orientation='vertical' className='hidden h-4! data-vertical:self-center sm:block' />
                <Breadcrumb className='hidden sm:block'>
                  <BreadcrumbList>
                    {/* <BreadcrumbItem>
                      <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href='#'>Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator /> */}
                    <BreadcrumbItem>
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className='flex items-center gap-3'>
                {/* Search */}
                <div className='hidden md:flex items-center gap-2 rounded-[10px] bg-muted px-3 py-2 w-52'>
                  <SearchIcon className='size-4 text-muted-foreground shrink-0' />
                  <input
                    placeholder='Search here...'
                    className='bg-transparent text-sm w-full border-none outline-none placeholder:text-muted-foreground'
                  />
                </div>

                {/* Notifications bell */}
                <Button variant='outline' size='icon' className='relative rounded-[10px]' aria-label='Notifications'>
                  <BellIcon className='size-4.5' />
                  <span className='absolute top-2 right-2 size-1.5 rounded-full bg-[#f0343c] border border-card' />
                </Button>

                {/* Profile */}
                <ProfileDropdown
                  user={ADMIN_USER}
                  trigger={
                    <Button variant='ghost' size='icon-lg'>
                      <Avatar className='size-[inherit] rounded-[inherit] after:rounded-[inherit]'>
                        <AvatarImage src={ADMIN_USER.avatar} className='rounded-[inherit]' />
                        <AvatarFallback className='rounded-[inherit]'>{ADMIN_USER.initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>

          {/* ── Screen content ── */}
          <main className='flex-1 bg-[#f4f5f7]'>
            {screen === 'dashboard' && <DashboardScreen onBookings={() => go('bookings')} />}
            {screen === 'bookings' && <BookingsScreen />}
            {screen === 'units' && <UnitsScreen onDetail={() => go('unitDetail')} />}
            {screen === 'unitDetail' && <UnitDetailScreen onBack={() => go('units')} />}
            {screen === 'clients' && <ClientsScreen />}
            {screen === 'drivers' && <DriversScreen />}
            {screen === 'payments' && <PaymentsScreen />}
            {screen === 'expenses' && <ExpensesScreen />}
            {screen === 'calendar' && <CalendarScreen />}
            {screen === 'tracking' && <TrackingScreen />}
            {screen === 'messages' && <MessagesScreen />}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default ApplicationShell
