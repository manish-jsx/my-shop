// src/components/admin/AdminHeader.jsx
'use client'
import { useState } from 'react'
import { 
  Button, 
  Avatar, 
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { Bell, Search, User, Settings, LogOut } from 'lucide-react'

export default function AdminHeader() {
  const [notifications] = useState([
    { id: 1, title: 'New Order #1234', time: '5 minutes ago' },
    { id: 2, title: 'Low Stock Alert', time: '10 minutes ago' },
    // Add more notifications
  ])

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light">
              <Badge content={notifications.length} color="danger">
                <Bell className="w-5 h-5" />
              </Badge>
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Notifications"
            className="w-80"
          >
            {notifications.map((notification) => (
              <DropdownItem
                key={notification.id}
                description={notification.time}
              >
                {notification.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* User Menu */}
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              src="https://i.pravatar.cc/150"
              size="sm"
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User menu">
            <DropdownItem
              key="profile"
              startContent={<User className="w-4 h-4" />}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<Settings className="w-4 h-4" />}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              startContent={<LogOut className="w-4 h-4" />}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}