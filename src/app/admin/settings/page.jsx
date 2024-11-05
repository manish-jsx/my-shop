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
  Divider
} from '@nextui-org/react'
import { Save, Mail, Bell, Shield, Globe, Palette } from 'lucide-react'

export default function SettingsManager() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'My E-commerce Store',
    siteUrl: 'https://mystore.com',
    contactEmail: 'contact@mystore.com',
    timezone: 'UTC',
    currency: 'USD'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    stockAlerts: true,
    securityAlerts: true
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    requireStrongPasswords: true,
    sessionTimeout: '30',
    ipRestriction: false
  })

  const timezones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
  ]

  const currencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD'
  ]

  const handleGeneralSubmit = () => {
    // Handle saving general settings
    console.log('Saving general settings:', generalSettings)
  }

  const handleNotificationSubmit = () => {
    // Handle saving notification settings
    console.log('Saving notification settings:', notificationSettings)
  }

  const handleSecuritySubmit = () => {
    // Handle saving security settings
    console.log('Saving security settings:', securitySettings)
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs aria-label="Settings options">
        <Tab key="general" title={
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4"/>
            <span>General</span>
          </div>
        }>
          <Card>
            <CardBody>
              <form className="space-y-4">
                <Input
                  label="Site Name"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                />
                <Input
                  label="Site URL"
                  value={generalSettings.siteUrl}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteUrl: e.target.value})}
                />
                <Input
                  label="Contact Email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    label="Timezone"
                    selectedKeys={[generalSettings.timezone]}
                    onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  >
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Currency"
                    selectedKeys={[generalSettings.currency]}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  >
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button color="primary" startContent={<Save />} onPress={handleGeneralSubmit}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="notifications" title={
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4"/>
            <span>Notifications</span>
          </div>
        }>
          <Card>
            <CardBody>
              <form className="space-y-4">
                <div className="space-y-3">
                  <Switch
                    isSelected={notificationSettings.emailNotifications}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, emailNotifications: value})}
                  >
                    Email Notifications
                  </Switch>
                  <Switch
                    isSelected={notificationSettings.orderUpdates}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, orderUpdates: value})}
                  >
                    Order Updates
                  </Switch>
                  <Switch
                    isSelected={notificationSettings.marketingEmails}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, marketingEmails: value})}
                  >
                    Marketing Emails
                  </Switch>
                  <Switch
                    isSelected={notificationSettings.stockAlerts}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, stockAlerts: value})}
                  >
                    Stock Alerts
                  </Switch>
                  <Switch
                    isSelected={notificationSettings.securityAlerts}
                    onValueChange={(value) => setNotificationSettings({...notificationSettings, securityAlerts: value})}
                  >
                    Security Alerts
                  </Switch>
                </div>
                <Divider />
                <div className="flex justify-end">
                  <Button color="primary" startContent={<Save />} onPress={handleNotificationSubmit}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="security" title={
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4"/>
            <span>Security</span>
          </div>
        }>
          <Card>
            <CardBody>
              <form className="space-y-4">
                <Switch
                  isSelected={securitySettings.twoFactorAuth}
                  onValueChange={(value) => setSecuritySettings({...securitySettings, twoFactorAuth: value})}
                >
                  Two-Factor Authentication
                </Switch>
                <Switch
                  isSelected={securitySettings.requireStrongPasswords}
                  onValueChange={(value) => setSecuritySettings({...securitySettings, requireStrongPasswords: value})}
                >
                  Require Strong Passwords
                </Switch>
                <Select
                  label="Session Timeout (minutes)"
                  selectedKeys={[securitySettings.sessionTimeout]}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                >
                  <SelectItem key="15">15</SelectItem>
                  <SelectItem key="30">30</SelectItem>
                  <SelectItem key="60">60</SelectItem>
                  <SelectItem key="120">120</SelectItem>
                </Select>
                <Switch
                  isSelected={securitySettings.ipRestriction}
                  onValueChange={(value) => setSecuritySettings({...securitySettings, ipRestriction: value})}
                >
                  IP Restriction
                </Switch>
                <Divider />
                <div className="flex justify-end">
                  <Button color="primary" startContent={<Save />} onPress={handleSecuritySubmit}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}