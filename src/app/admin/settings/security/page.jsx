// src/app/admin/settings/security/page.jsx
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar
} from '@nextui-org/react'

import { 
  Shield, 
  Key, 
  Eye, 
  Lock, 
  AlertTriangle, 
  Users,
  Clock,
  Globe,
  Smartphone,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function SecuritySettingsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState(null)
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    ipWhitelisting: false,
    emailVerification: true,
    sslEnforcement: true
  })

  const [accessSettings, setAccessSettings] = useState({
    adminApprovalRequired: true,
    roleBasedAccess: true,
    auditLogging: true,
    automaticLogout: true,
    deviceTracking: true
  })

  // Mock data for recent security events
  const recentSecurityEvents = [
    {
      id: 1,
      type: 'login_success',
      user: 'admin@shukragems.com',
      ip: '192.168.1.100',
      location: 'New York, NY',
      timestamp: '2024-12-07 14:30:25',
      status: 'success',
      device: 'Chrome on Windows'
    },
    {
      id: 2,
      type: 'login_failed',
      user: 'unknown@example.com',
      ip: '203.45.67.89',
      location: 'Unknown Location',
      timestamp: '2024-12-07 14:15:12',
      status: 'blocked',
      device: 'Unknown Browser'
    },
    {
      id: 3,
      type: 'password_change',
      user: 'manager@shukragems.com',
      ip: '192.168.1.105',
      location: 'New York, NY',
      timestamp: '2024-12-07 13:45:18',
      status: 'success',
      device: 'Safari on MacOS'
    },
    {
      id: 4,
      type: 'admin_access',
      user: 'admin@shukragems.com',
      ip: '192.168.1.100',
      location: 'New York, NY',
      timestamp: '2024-12-07 12:20:05',
      status: 'success',
      device: 'Chrome on Windows'
    },
    {
      id: 5,
      type: 'suspicious_activity',
      user: 'bot@malicious.com',
      ip: '45.123.45.67',
      location: 'Unknown Location',
      timestamp: '2024-12-07 11:55:33',
      status: 'blocked',
      device: 'Automated Bot'
    }
  ]

  // Mock data for active sessions
  const activeSessions = [
    {
      id: 1,
      user: 'admin@shukragems.com',
      device: 'Chrome on Windows',
      ip: '192.168.1.100',
      location: 'New York, NY',
      lastActive: '2 minutes ago',
      isCurrent: true
    },
    {
      id: 2,
      user: 'manager@shukragems.com',
      device: 'Safari on MacOS',
      ip: '192.168.1.105',
      location: 'New York, NY',
      lastActive: '15 minutes ago',
      isCurrent: false
    },
    {
      id: 3,
      user: 'staff@shukragems.com',
      device: 'Firefox on Ubuntu',
      ip: '192.168.1.110',
      location: 'New York, NY',
      lastActive: '1 hour ago',
      isCurrent: false
    }
  ]

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'login_success': return 'success'
      case 'login_failed': return 'danger'
      case 'password_change': return 'warning'
      case 'admin_access': return 'primary'
      case 'suspicious_activity': return 'danger'
      default: return 'default'
    }
  }

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'login_success': return <CheckCircle className="w-4 h-4" />
      case 'login_failed': return <XCircle className="w-4 h-4" />
      case 'password_change': return <Key className="w-4 h-4" />
      case 'admin_access': return <Shield className="w-4 h-4" />
      case 'suspicious_activity': return <AlertTriangle className="w-4 h-4" />
      default: return <Eye className="w-4 h-4" />
    }
  }

  const handleSaveSettings = () => {
    console.log('Saving security settings:', securitySettings)
    console.log('Saving access settings:', accessSettings)
  }

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              Security Settings
            </h1>
            <p className="text-gray-600 mt-1">Manage authentication, access control, and security policies</p>
          </div>
        </div>


      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Security Score</p>
                <p className="text-xl font-bold text-green-600">95%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Sessions</p>
                <p className="text-xl font-bold text-blue-600">{activeSessions.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Security Alerts</p>
                <p className="text-xl font-bold text-yellow-600">2</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Key className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">2FA Users</p>
                <p className="text-xl font-bold text-purple-600">8/10</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Security Settings */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Security Configuration</h2>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Security settings" className="w-full">
            {/* Authentication Tab */}
            <Tab key="auth" title="Authentication">
              <div className="space-y-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Authentication Settings</h3>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch
                      isSelected={securitySettings.twoFactorAuth}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, twoFactorAuth: value})}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      isSelected={securitySettings.emailVerification}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, emailVerification: value})}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">SSL Enforcement</p>
                      <p className="text-sm text-gray-600">Force HTTPS for all connections</p>
                    </div>
                    <Switch
                      isSelected={securitySettings.sslEnforcement}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, sslEnforcement: value})}
                    />
                  </div>
                </div>

                <Divider />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Password Policy</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      label="Minimum Password Length"
                      value={securitySettings.passwordMinLength.toString()}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
                      min={6}
                      max={128}
                    />
                    <Select
                      label="Session Timeout (minutes)"
                      selectedKeys={[securitySettings.sessionTimeout.toString()]}
                      onSelectionChange={(keys) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(Array.from(keys)[0])})}
                    >
                      <SelectItem key="15">15 minutes</SelectItem>
                      <SelectItem key="30">30 minutes</SelectItem>
                      <SelectItem key="60">1 hour</SelectItem>
                      <SelectItem key="120">2 hours</SelectItem>
                      <SelectItem key="480">8 hours</SelectItem>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Require Special Characters</p>
                        <p className="text-sm text-gray-600">Password must contain special characters</p>
                      </div>
                      <Switch
                        isSelected={securitySettings.passwordRequireSpecial}
                        onValueChange={(value) => setSecuritySettings({...securitySettings, passwordRequireSpecial: value})}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Require Numbers</p>
                        <p className="text-sm text-gray-600">Password must contain numeric characters</p>
                      </div>
                      <Switch
                        isSelected={securitySettings.passwordRequireNumbers}
                        onValueChange={(value) => setSecuritySettings({...securitySettings, passwordRequireNumbers: value})}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Require Uppercase Letters</p>
                        <p className="text-sm text-gray-600">Password must contain uppercase letters</p>
                      </div>
                      <Switch
                        isSelected={securitySettings.passwordRequireUppercase}
                        onValueChange={(value) => setSecuritySettings({...securitySettings, passwordRequireUppercase: value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button color="primary" onPress={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Authentication Settings
                  </Button>
                </div>
              </div>
            </Tab>

            {/* Access Control Tab */}
            <Tab key="access" title="Access Control">
              <div className="space-y-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Access Control Settings</h3>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Admin Approval Required</p>
                      <p className="text-sm text-gray-600">New user accounts require admin approval</p>
                    </div>
                    <Switch
                      isSelected={accessSettings.adminApprovalRequired}
                      onValueChange={(value) => setAccessSettings({...accessSettings, adminApprovalRequired: value})}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Role-Based Access Control</p>
                      <p className="text-sm text-gray-600">Enforce role-based permissions</p>
                    </div>
                    <Switch
                      isSelected={accessSettings.roleBasedAccess}
                      onValueChange={(value) => setAccessSettings({...accessSettings, roleBasedAccess: value})}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-gray-600">Log all user activities and system events</p>
                    </div>
                    <Switch
                      isSelected={accessSettings.auditLogging}
                      onValueChange={(value) => setAccessSettings({...accessSettings, auditLogging: value})}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Device Tracking</p>
                      <p className="text-sm text-gray-600">Track and monitor user devices</p>
                    </div>
                    <Switch
                      isSelected={accessSettings.deviceTracking}
                      onValueChange={(value) => setAccessSettings({...accessSettings, deviceTracking: value})}
                    />
                  </div>
                </div>

                <Divider />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Login Protection</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      type="number"
                      label="Max Login Attempts"
                      value={securitySettings.maxLoginAttempts.toString()}
                      onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                      min={1}
                      max={10}
                      description="Maximum failed login attempts before lockout"
                    />
                    <Input
                      type="number"
                      label="Lockout Duration (minutes)"
                      value={securitySettings.lockoutDuration.toString()}
                      onChange={(e) => setSecuritySettings({...securitySettings, lockoutDuration: parseInt(e.target.value)})}
                      min={5}
                      max={1440}
                      description="How long to lock out after failed attempts"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">IP Whitelisting</p>
                      <p className="text-sm text-gray-600">Only allow access from approved IP addresses</p>
                    </div>
                    <Switch
                      isSelected={securitySettings.ipWhitelisting}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, ipWhitelisting: value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button color="primary" onPress={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Access Control Settings
                  </Button>
                </div>
              </div>
            </Tab>

            {/* Security Events Tab */}
            <Tab key="events" title="Security Events">
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Recent Security Events</h3>
                  <Button size="sm" variant="flat" color="primary">
                    Export Log
                  </Button>
                </div>

                <Table aria-label="Security events table">
                  <TableHeader>
                    <TableColumn>EVENT</TableColumn>
                    <TableColumn>USER</TableColumn>
                    <TableColumn>IP ADDRESS</TableColumn>
                    <TableColumn>DEVICE</TableColumn>
                    <TableColumn>TIMESTAMP</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {recentSecurityEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getEventTypeIcon(event.type)}
                            <span className="capitalize">{event.type.replace('_', ' ')}</span>
                          </div>
                        </TableCell>
                        <TableCell>{event.user}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{event.ip}</p>
                            <p className="text-xs text-gray-500">{event.location}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{event.device}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{event.timestamp}</p>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="sm"
                            color={getEventTypeColor(event.type)}
                            variant="flat"
                          >
                            {event.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>

            {/* Active Sessions Tab */}
            <Tab key="sessions" title="Active Sessions">
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Current Active Sessions</h3>
                  <Button size="sm" color="danger" variant="flat">
                    Terminate All Sessions
                  </Button>
                </div>

                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <Card key={session.id} className="border-0 shadow-sm">
                      <CardBody className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar
                              name={session.user.charAt(0).toUpperCase()}
                              size="sm"
                              className="bg-purple-100 text-purple-700"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{session.user}</p>
                                {session.isCurrent && (
                                  <Chip size="tiny" color="success" variant="flat">
                                    Current Session
                                  </Chip>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{session.device}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                <span>{session.ip}</span>
                                <span>{session.location}</span>
                                <span>Last active: {session.lastActive}</span>
                              </div>
                            </div>
                          </div>
                          {!session.isCurrent && (
                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              onPress={() => handleTerminateSession(session.id)}
                            >
                              Terminate
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
