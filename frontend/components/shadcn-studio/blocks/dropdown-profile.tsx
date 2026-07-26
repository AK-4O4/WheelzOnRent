"use client";

import type { ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserIcon, SettingsIcon, CreditCardIcon, CarIcon, LogOutIcon } from "lucide-react"

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const ProfileDropdown = ({ trigger, defaultOpen, align = 'end' }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className='w-80' align={align || 'end'}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
            <div className='relative'>
              <Avatar size='lg'>
                <AvatarImage src='https://i.pravatar.cc/80?img=11' alt='Jordan Mercer' />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <span className='ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2' />
            </div>
            <div className='flex flex-1 flex-col items-start'>
              <span className='text-foreground text-lg font-semibold'>Jordan Mercer</span>
              <span className='text-muted-foreground text-base'>jordan@example.com</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className='gap-2 px-4 py-2.5 text-base cursor-pointer'
            onClick={() => router.push('/account')}
          >
            <UserIcon className='text-foreground size-5' />
            <span>My account</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='gap-2 px-4 py-2.5 text-base cursor-pointer'
            onClick={() => router.push('/account?tab=settings')}
          >
            <SettingsIcon className='text-foreground size-5' />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='gap-2 px-4 py-2.5 text-base cursor-pointer'
            onClick={() => router.push('/account?tab=rentals')}
          >
            <CreditCardIcon className='text-foreground size-5' />
            <span>My rentals</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className='gap-2 px-4 py-2.5 text-base cursor-pointer'
            onClick={() => router.push('/account?tab=listings')}
          >
            <CarIcon className='text-foreground size-5' />
            <span>My listings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem variant='destructive' className='gap-2 px-4 py-2.5 text-base cursor-pointer'>
            <LogOutIcon className='size-5' />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
