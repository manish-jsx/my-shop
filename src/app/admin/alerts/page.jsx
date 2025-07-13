// src/app/admin/alerts/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Switch,
  Input,
  Textarea,
  Select,
  SelectItem,
  Tabs,
  Tab,
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
  Badge
} from '@nextui-org/react'

import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  Smartphone,
  Settings,
  Plus,
  Filter
} from 'lucide-react'

export default function AlertsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [activeTab, setActiveTab] = useState('active')

  const alerts = [
    {
      id: 1,
      title: 'Low Stock Alert: Blue Sapphire 2ct',
      message: 'Only 2 items remaining in inventory',
      type: 'warning',
      category: 'inventory',
      priority: 'high',
      timestamp: '2024-06-15T10:30:00Z',
      status: 'active',
      actions: ['reorder', 'notify_sales'],
      metadata: { sku: 'SAP-2CT-001', current_stock: 2, threshold: 5 }
    },
    {
      id: 2,
      title: 'High-Value Order Requires Verification',
      message: 'Order #12345 for $25,000 needs manual approval',
      type: 'info',
      category: 'orders',
      priority: 'high',
      timestamp: '2024-06-15T09:45:00Z',
      status: 'active',
      actions: ['approve', 'review', 'contact_customer'],
      metadata: { order_id: '12345', amount: 25000, customer: 'Sarah Chen' }
    },
    {
      id: 3,
      title: 'Failed Payment Alert',
      message: 'Payment failed for order #12344 - Customer needs to update payment method',
      type: 'error',
      category: 'payments',
      priority: 'medium',
      timestamp: '2024-06-15T08:20:00Z',
      status: 'active',
      actions: ['retry_payment', 'contact_customer'],
      metadata: { order_id: '12344', amount: 850, reason: 'Card declined' }
    },
    {
      id: 4,
      title: 'New VIP Customer Registration',
      message: 'Michael Rodriguez has qualified for VIP status',
      type: 'success',
      category: 'customers',
      priority: 'low',
      timestamp: '2024-06-15T07:15:00Z',
      status: 'active',
      actions: ['welcome_email', 'assign_advisor'],
      metadata: { customer_id: '4567', lifetime_value: 15000 }
    },
    {
      id: 5,
      title: 'Certification Expiry Notice',
      message: 'GIA certificate for Diamond #DIA-001 expires in 30 days',
      type: 'warning',
      category: 'certification',
      priority: 'medium',
      timestamp: '2024-06-14T16:00:00Z',
      status: 'resolved',
      actions: ['renew_certificate', 'update_listing'],
      metadata: { certificate_id: 'GIA-12345', expiry_date: '2024-07-15' }
    }
  ]

  const alertRules = [
    {
      id: 1,
      name: 'Low Stock Warning',
      trigger: 'inventory.stock_level <= threshold',
      category: 'inventory',
      priority: 'high',
      enabled: true,
      channels: ['email', 'dashboard'],
      recipients: ['inventory@shukragems.com', 'admin@shukragems.com']
    },
    {
      id: 2,
      name: 'High Value Order',
      trigger: 'order.amount > $10000',
      category: 'orders',
      priority: 'high',
      enabled: true,
      channels: ['email', 'sms', 'dashboard'],
      recipients: ['sales@shukragems.com', 'manager@shukragems.com']
    },
    {
      id: 3,
      name: 'Payment Failure',
      trigger: 'payment.status == "failed"',
      category: 'payments',
      priority: 'medium',
      enabled: true,
      channels: ['email', 'dashboard'],
      recipients: ['finance@shukragems.com']
    },
    {
      id: 4,
      name: 'VIP Customer Activity',
      trigger: 'customer.lifetime_value > $10000',
      category: 'customers',
      priority: 'low',
      enabled: true,
      channels: ['dashboard'],
      recipients: ['sales@shukragems.com']
    }
  ]

  const notificationChannels = [
    { name: 'Email', icon: Mail, enabled: true, config: { smtp_server: 'smtp.shukragems.com' } },
    { name: 'SMS', icon: Smartphone, enabled: true, config: { provider: 'Twilio' } },
    { name: 'Dashboard', icon: Bell, enabled: true, config: {} },
    { name: 'Slack', icon: Bell, enabled: false, config: { webhook: '' } }
  ]

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'info': return <Info className="w-5 h-5 text-blue-500" />
      default: return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger'
      case 'medium': return 'warning'
      case 'low': return 'primary'
      default: return 'default'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'warning'
      case 'resolved': return 'success'
      case 'dismissed': return 'default'
      default: return 'default'
    }
  }

  const handleCreateRule = () => {
    setSelectedAlert(null)
    onOpen()
  }

  const handleEditRule = (rule) => {
    setSelectedAlert(rule)
    onOpen()
  }

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId)
    // Implementation for resolving alert
  }

  const activeAlerts = alerts.filter(alert => alert.status === 'active')
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
            {activeAlerts.length > 0 && (
              <Badge content={activeAlerts.length} color="danger">
                <Bell className="w-6 h-6 text-gray-400" />
              </Badge>
            )}
          </div>
          <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="bordered" startContent={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
          <Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={handleCreateRule}>
            Create Rule
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardBody className="text-center">
            <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.type === 'error' && a.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Critical Alerts</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.type === 'warning' && a.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Warning Alerts</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <Info className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.type === 'info' && a.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Info Alerts</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'resolved').length}</div>
            <div className="text-sm text-gray-600">Resolved Today</div>
          </CardBody>
        </Card>
      </div>

      <Tabs aria-label="Alerts Management" className="mb-6" selectedKey={activeTab} onSelectionChange={setActiveTab}>
        <Tab key="active" title={`Active Alerts (${activeAlerts.length})`}>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-gray-600 text-sm">{alert.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip color={getPriorityColor(alert.priority)} size="sm" variant="flat">
                            {alert.priority}
                          </Chip>
                          <Chip color={getStatusColor(alert.status)} size="sm" variant="flat">
                            {alert.status}
                          </Chip>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          </div>
                          <span className="capitalize">{alert.category}</span>
                        </div>
                        <div className="flex gap-2">
                          {alert.actions.includes('approve') && (
                            <Button size="sm" color="success" variant="flat">
                              Approve
                            </Button>
                          )}
                          {alert.actions.includes('reorder') && (
                            <Button size="sm" color="primary" variant="flat">
                              Reorder
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="bordered"
                            onPress={() => handleResolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab key="rules" title="Alert Rules">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Notification Rules</h3>
            </CardHeader>
            <CardBody>
              <Table aria-label="Alert rules table">
                <TableHeader>
                  <TableColumn>RULE NAME</TableColumn>
                  <TableColumn>TRIGGER</TableColumn>
                  <TableColumn>CATEGORY</TableColumn>
                  <TableColumn>PRIORITY</TableColumn>
                  <TableColumn>CHANNELS</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {alertRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {rule.trigger}
                        </code>
                      </TableCell>
                      <TableCell className="capitalize">{rule.category}</TableCell>
                      <TableCell>
                        <Chip color={getPriorityColor(rule.priority)} size="sm" variant="flat">
                          {rule.priority}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {rule.channels.map((channel) => (
                            <Chip key={channel} size="sm" variant="flat">
                              {channel}
                            </Chip>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch isSelected={rule.enabled} size="sm" />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => handleEditRule(rule)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="channels" title="Notification Channels">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notificationChannels.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <channel.icon className="w-6 h-6" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{channel.name}</h3>
                      <p className="text-sm text-gray-600">
                        {channel.enabled ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <Switch isSelected={channel.enabled} />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="space-y-3">
                    {channel.name === 'Email' && (
                      <>
                        <Input
                          label="SMTP Server"
                          defaultValue={channel.config.smtp_server}
                          size="sm"
                        />
                        <Input
                          label="Default Recipients"
                          placeholder="Enter email addresses"
                          size="sm"
                        />
                      </>
                    )}
                    {channel.name === 'SMS' && (
                      <>
                        <Select label="Provider" defaultSelectedKeys={["twilio"]} size="sm">
                          <SelectItem key="twilio" value="twilio">Twilio</SelectItem>
                          <SelectItem key="aws" value="aws">AWS SNS</SelectItem>
                        </Select>
                        <Input
                          label="API Key"
                          type="password"
                          size="sm"
                        />
                      </>
                    )}
                    {channel.name === 'Slack' && (
                      <Input
                        label="Webhook URL"
                        placeholder="https://hooks.slack.com/..."
                        size="sm"
                      />
                    )}
                    <Button size="sm" className="w-full">
                      Test {channel.name}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>

        <Tab key="history" title="Alert History">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Recent Alert Activity</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-gray-600">{alert.message}</div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>{new Date(alert.timestamp).toLocaleDateString()}</div>
                      <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
                    </div>
                    <Chip color={getStatusColor(alert.status)} size="sm" variant="flat">
                      {alert.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Alert Rule Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {selectedAlert ? 'Edit Alert Rule' : 'Create Alert Rule'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Rule Name"
                placeholder="Enter rule name"
                defaultValue={selectedAlert?.name || ''}
              />
              
              <Textarea
                label="Trigger Condition"
                placeholder="e.g., inventory.stock_level <= 5"
                defaultValue={selectedAlert?.trigger || ''}
                description="Define when this alert should trigger"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select label="Category" defaultSelectedKeys={selectedAlert ? [selectedAlert.category] : []}>
                  <SelectItem key="inventory" value="inventory">Inventory</SelectItem>
                  <SelectItem key="orders" value="orders">Orders</SelectItem>
                  <SelectItem key="payments" value="payments">Payments</SelectItem>
                  <SelectItem key="customers" value="customers">Customers</SelectItem>
                  <SelectItem key="certification" value="certification">Certification</SelectItem>
                </Select>
                
                <Select label="Priority" defaultSelectedKeys={selectedAlert ? [selectedAlert.priority] : []}>
                  <SelectItem key="low" value="low">Low</SelectItem>
                  <SelectItem key="medium" value="medium">Medium</SelectItem>
                  <SelectItem key="high" value="high">High</SelectItem>
                </Select>
              </div>
              
              <Select
                label="Notification Channels"
                selectionMode="multiple"
                defaultSelectedKeys={selectedAlert?.channels || []}
              >
                <SelectItem key="email" value="email">Email</SelectItem>
                <SelectItem key="sms" value="sms">SMS</SelectItem>
                <SelectItem key="dashboard" value="dashboard">Dashboard</SelectItem>
                <SelectItem key="slack" value="slack">Slack</SelectItem>
              </Select>
              
              <Textarea
                label="Recipients"
                placeholder="Enter email addresses or phone numbers"
                description="Comma-separated list of recipients"
              />
              
              <Switch defaultSelected={selectedAlert?.enabled ?? true}>
                Enable this alert rule
              </Switch>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              {selectedAlert ? 'Update' : 'Create'} Rule
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
