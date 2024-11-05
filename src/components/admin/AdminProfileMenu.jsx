// src/components/admin/AdminProfileMenu.jsx
'use client'
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Avatar,
  User
} from '@nextui-org/react'
import { useUser, useClerk } from '@clerk/nextjs'
import { Settings, LogOut, User as UserIcon } from 'lucide-react'

export default function AdminProfileMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={user?.imageUrl}
          name={user?.fullName}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <User
            name={user?.fullName}
            description={user?.primaryEmailAddress?.emailAddress}
            avatarProps={{
              src: user?.imageUrl
            }}
          />
        </DropdownItem>
        <DropdownItem
          key="settings"
          startContent={<Settings className="w-4 h-4" />}
        >
          Settings
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          startContent={<LogOut className="w-4 h-4" />}
          onClick={() => signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
