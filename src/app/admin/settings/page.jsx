// src/app/admin/settings/page.jsx
'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Switch,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Chip
} from '@nextui-org/react'

import { 
  Save, 
  Mail, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  User,
  CreditCard,
  Truck,
  Database,
  Key,
  Users,
  Settings as SettingsIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'SHUKRA Gems',
    siteUrl: 'https://shukragems.com',
    contactEmail: 'contact@shukragems.com',
    timezone: 'UTC',
    currency: 'USD',
    language: 'English'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    inventoryAlerts: true,
    securityAlerts: true,
    certificateExpiry: true
  })

  const [businessSettings, setBusinessSettings] = useState({
    businessName: 'SHUKRA Gems Ltd.',
    businessType: 'Luxury Jewelry & Gemstones',
    taxId: 'GEM-123456789',
    businessAddress: '123 Diamond District, New York, NY 10047',
    businessPhone: '+1 (555) 123-4567'
  })

  const settingsCategories = [
    {
      title: 'General Settings',
      description: 'Basic site configuration and business information',
      icon: Globe,
      color: 'primary',
      href: '#general'
    },
    {
      title: 'Security Settings',
      description: 'Authentication, access control, and security policies',
      icon: Shield,
      color: 'warning',
      href: '/admin/settings/security'
    },
    {
      title: 'Payment Settings',
      description: 'Payment gateways, currencies, and transaction settings',
      icon: CreditCard,
      color: 'success',
      href: '/admin/settings/payments'
    },
    {
      title: 'Shipping Settings',
      description: 'Shipping methods, rates, and delivery configuration',
      icon: Truck,
      color: 'secondary',
      href: '/admin/settings/shipping'
    },
    {
      title: 'User Management',
      description: 'Staff accounts, roles, and permissions',
      icon: Users,
      color: 'danger',
      href: '/admin/settings/users'
    },
    {
      title: 'System Settings',
      description: 'Database, backups, and system maintenance',
      icon: Database,
      color: 'default',
      href: '/admin/settings/system'
    }
  ]

  const handleSaveGeneral = () => {
    // Save general settings logic
    console.log('Saving general settings:', generalSettings)
  }

  const handleSaveNotifications = () => {
    // Save notification settings logic
    console.log('Saving notification settings:', notificationSettings)
  }

  const handleSaveBusiness = () => {
    // Save business settings logic
    console.log('Saving business settings:', businessSettings)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-purple-600" />
              Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage your store configuration and preferences</p>
          </div>
        </div>

      </div>

      {/* Settings Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category) => (
          <Card 
            key={category.title} 
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            isPressable
            onPress={() => {
              if (category.href.startsWith('/')) {
                router.push(category.href)
              } else {
                // Scroll to section for anchor links
                document.getElementById(category.href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-${category.color}-100`}>
                  <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* General Settings Section */}
      <div id="general">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold">General Settings</h2>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs aria-label="Settings sections" className="w-full">
              {/* Site Configuration Tab */}
              <Tab key="site" title="Site Configuration">
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Site Name"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                      description="Display name for your store"
                    />
                    <Input
                      label="Site URL"
                      value={generalSettings.siteUrl}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteUrl: e.target.value})}
                      description="Your store's primary domain"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Contact Email"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                      description="Primary contact email address"
                    />
                    <Select
                      label="Default Currency"
                      selectedKeys={[generalSettings.currency]}
                      onSelectionChange={(keys) => setGeneralSettings({...generalSettings, currency: Array.from(keys)[0]})}
                    >
                      <SelectItem key="USD">USD - US Dollar</SelectItem>
                      <SelectItem key="EUR">EUR - Euro</SelectItem>
                      <SelectItem key="GBP">GBP - British Pound</SelectItem>
                      <SelectItem key="INR">INR - Indian Rupee</SelectItem>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Timezone"
                      selectedKeys={[generalSettings.timezone]}
                      onSelectionChange={(keys) => setGeneralSettings({...generalSettings, timezone: Array.from(keys)[0]})}
                    >
                      <SelectItem key="UTC">UTC - Coordinated Universal Time</SelectItem>
                      <SelectItem key="EST">EST - Eastern Standard Time</SelectItem>
                      <SelectItem key="PST">PST - Pacific Standard Time</SelectItem>
                      <SelectItem key="GMT">GMT - Greenwich Mean Time</SelectItem>
                    </Select>
                    <Select
                      label="Language"
                      selectedKeys={[generalSettings.language]}
                      onSelectionChange={(keys) => setGeneralSettings({...generalSettings, language: Array.from(keys)[0]})}
                    >
                      <SelectItem key="English">English</SelectItem>
                      <SelectItem key="Spanish">Spanish</SelectItem>
                      <SelectItem key="French">French</SelectItem>
                      <SelectItem key="German">German</SelectItem>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <Button color="primary" onPress={handleSaveGeneral}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Site Settings
                    </Button>
                  </div>
                </div>
              </Tab>

              {/* Business Information Tab */}
              <Tab key="business" title="Business Information">
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Business Name"
                      value={businessSettings.businessName}
                      onChange={(e) => setBusinessSettings({...businessSettings, businessName: e.target.value})}
                    />
                    <Input
                      label="Business Type"
                      value={businessSettings.businessType}
                      onChange={(e) => setBusinessSettings({...businessSettings, businessType: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Tax ID / Registration Number"
                      value={businessSettings.taxId}
                      onChange={(e) => setBusinessSettings({...businessSettings, taxId: e.target.value})}
                    />
                    <Input
                      label="Business Phone"
                      value={businessSettings.businessPhone}
                      onChange={(e) => setBusinessSettings({...businessSettings, businessPhone: e.target.value})}
                    />
                  </div>

                  <Input
                    label="Business Address"
                    value={businessSettings.businessAddress}
                    onChange={(e) => setBusinessSettings({...businessSettings, businessAddress: e.target.value})}
                    description="Complete business address for legal and shipping purposes"
                  />

                  <div className="flex justify-end">
                    <Button color="primary" onPress={handleSaveBusiness}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Business Info
                    </Button>
                  </div>
                </div>
              </Tab>

              {/* Notifications Tab */}
              <Tab key="notifications" title="Notifications">
                <div className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive email notifications for important events</p>
                        </div>
                        <Switch
                          isSelected={notificationSettings.emailNotifications}
                          onValueChange={(value) => setNotificationSettings({...notificationSettings, emailNotifications: value})}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-600">Get notified about new orders and status changes</p>
                        </div>
                        <Switch
                          isSelected={notificationSettings.orderUpdates}
                          onValueChange={(value) => setNotificationSettings({...notificationSettings, orderUpdates: value})}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Inventory Alerts</p>
                          <p className="text-sm text-gray-600">Low stock and inventory management alerts</p>
                        </div>
                        <Switch
                          isSelected={notificationSettings.inventoryAlerts}
                          onValueChange={(value) => setNotificationSettings({...notificationSettings, inventoryAlerts: value})}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Security Alerts</p>
                          <p className="text-sm text-gray-600">Login attempts, security events, and suspicious activity</p>
                        </div>
                        <Switch
                          isSelected={notificationSettings.securityAlerts}
                          onValueChange={(value) => setNotificationSettings({...notificationSettings, securityAlerts: value})}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Certificate Expiry</p>
                          <p className="text-sm text-gray-600">Notifications for expiring gemstone certificates</p>
                        </div>
                        <Switch
                          isSelected={notificationSettings.certificateExpiry}
                          onValueChange={(value) => setNotificationSettings({...notificationSettings, certificateExpiry: value})}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-600">Promotional and marketing email notifications</p>
                        </div>
                        <Switch
                          isSelected={notificationSettings.marketingEmails}
                          onValueChange={(value) => setNotificationSettings({...notificationSettings, marketingEmails: value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button color="primary" onPress={handleSaveNotifications}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>

      {/* Quick Settings Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold">Security Status</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Two-Factor Authentication</span>
                <Chip size="sm" color="success" variant="flat">Enabled</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SSL Certificate</span>
                <Chip size="sm" color="success" variant="flat">Valid</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Password Policy</span>
                <Chip size="sm" color="warning" variant="flat">Standard</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Session Timeout</span>
                <Chip size="sm" color="primary" variant="flat">30 minutes</Chip>
              </div>
            </div>
            <Button 
              size="sm" 
              color="warning" 
              variant="flat" 
              className="w-full mt-4"
              onPress={() => router.push('/admin/settings/security')}
            >
              Manage Security Settings
            </Button>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">System Information</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Application Version</span>
                <Chip size="sm" color="primary" variant="flat">v2.1.4</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Status</span>
                <Chip size="sm" color="success" variant="flat">Healthy</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Backup</span>
                <Chip size="sm" color="success" variant="flat">2 hours ago</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage Used</span>
                <Chip size="sm" color="warning" variant="flat">78% of 1TB</Chip>
              </div>
            </div>
            <Button 
              size="sm" 
              color="primary" 
              variant="flat" 
              className="w-full mt-4"
              onPress={() => router.push('/admin/settings/system')}
            >
              View System Settings
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
