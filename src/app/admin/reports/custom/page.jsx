// src/app/admin/reports/custom/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Select, 
  SelectItem,
  Input,
  Checkbox,
  CheckboxGroup,
  DatePicker,
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
  useDisclosure
} from '@nextui-org/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { FileText, Download, Plus, Play, Calendar, Filter, BarChart3 } from 'lucide-react'

export default function CustomReportsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportType, setReportType] = useState('sales')

  const savedReports = [
    {
      id: 1,
      name: 'Monthly VIP Customer Report',
      type: 'Customer Analytics',
      schedule: 'Monthly',
      lastRun: '2024-06-01',
      status: 'active',
      recipients: ['admin@shukragems.com', 'sales@shukragems.com']
    },
    {
      id: 2,
      name: 'High-Value Inventory Alert',
      type: 'Inventory',
      schedule: 'Weekly',
      lastRun: '2024-06-08',
      status: 'active',
      recipients: ['inventory@shukragems.com']
    },
    {
      id: 3,
      name: 'Quarterly Financial Summary',
      type: 'Financial',
      schedule: 'Quarterly',
      lastRun: '2024-04-01',
      status: 'active',
      recipients: ['finance@shukragems.com', 'ceo@shukragems.com']
    },
    {
      id: 4,
      name: 'Daily Sales Performance',
      type: 'Sales',
      schedule: 'Daily',
      lastRun: '2024-06-15',
      status: 'active',
      recipients: ['sales@shukragems.com']
    }
  ]

  const reportTemplates = [
    { name: 'Sales Performance', category: 'Sales', description: 'Revenue, orders, and conversion metrics' },
    { name: 'Customer Insights', category: 'Customer', description: 'Customer behavior and segmentation' },
    { name: 'Inventory Status', category: 'Inventory', description: 'Stock levels and turnover analysis' },
    { name: 'Financial Summary', category: 'Financial', description: 'Profit, loss, and cash flow' },
    { name: 'Marketing ROI', category: 'Marketing', description: 'Campaign performance and attribution' },
    { name: 'Product Analytics', category: 'Product', description: 'Product performance and trends' }
  ]

  const sampleData = {
    sales: [
      { month: 'Jan', revenue: 145000, orders: 89, customers: 67 },
      { month: 'Feb', revenue: 178000, orders: 112, customers: 89 },
      { month: 'Mar', revenue: 203000, orders: 134, customers: 98 },
      { month: 'Apr', revenue: 189000, orders: 125, customers: 85 },
      { month: 'May', revenue: 235000, orders: 156, customers: 112 },
      { month: 'Jun', revenue: 267000, orders: 178, customers: 134 }
    ],
    categories: [
      { name: 'Precious Stones', value: 45, color: '#8B5CF6' },
      { name: 'Healing Crystals', value: 25, color: '#06B6D4' },
      { name: 'Rare Gemstones', value: 20, color: '#10B981' },
      { name: 'Semi-Precious', value: 10, color: '#F59E0B' }
    ]
  }

  const availableMetrics = [
    { id: 'revenue', name: 'Total Revenue', category: 'Sales' },
    { id: 'orders', name: 'Order Count', category: 'Sales' },
    { id: 'customers', name: 'Customer Count', category: 'Customer' },
    { id: 'avg_order', name: 'Average Order Value', category: 'Sales' },
    { id: 'conversion', name: 'Conversion Rate', category: 'Marketing' },
    { id: 'inventory_value', name: 'Inventory Value', category: 'Inventory' },
    { id: 'low_stock', name: 'Low Stock Items', category: 'Inventory' },
    { id: 'vip_customers', name: 'VIP Customers', category: 'Customer' },
    { id: 'returns', name: 'Return Rate', category: 'Operations' },
    { id: 'shipping_cost', name: 'Shipping Costs', category: 'Operations' }
  ]

  const handleCreateReport = () => {
    setSelectedReport(null)
    onOpen()
  }

  const handleEditReport = (report) => {
    setSelectedReport(report)
    onOpen()
  }

  const handleRunReport = (reportId) => {
    console.log('Running report:', reportId)
    // Implementation for running report
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Custom Reports</h1>
          <p className="text-gray-600">Create, schedule, and manage custom business reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="bordered" startContent={<FileText className="w-4 h-4" />}>
            Templates
          </Button>
          <Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={handleCreateReport}>
            Create Report
          </Button>
        </div>
      </div>

      <Tabs aria-label="Custom Reports" className="mb-6">
        <Tab key="builder" title="Report Builder">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Report Configuration</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <Input
                      label="Report Name"
                      placeholder="Enter report name"
                      value="My Custom Report"
                    />
                    
                    <Select label="Report Type" selectedKeys={[reportType]} onSelectionChange={(keys) => setReportType(Array.from(keys)[0])}>
                      <SelectItem key="sales" value="sales">Sales Analysis</SelectItem>
                      <SelectItem key="customer" value="customer">Customer Analysis</SelectItem>
                      <SelectItem key="inventory" value="inventory">Inventory Analysis</SelectItem>
                      <SelectItem key="financial" value="financial">Financial Analysis</SelectItem>
                    </Select>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Start Date</label>
                        <Input type="date" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">End Date</label>
                        <Input type="date" />
                      </div>
                    </div>
                    
                    <Select label="Data Grouping" defaultSelectedKeys={["monthly"]}>
                      <SelectItem key="daily" value="daily">Daily</SelectItem>
                      <SelectItem key="weekly" value="weekly">Weekly</SelectItem>
                      <SelectItem key="monthly" value="monthly">Monthly</SelectItem>
                      <SelectItem key="quarterly" value="quarterly">Quarterly</SelectItem>
                    </Select>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Metrics Selection</h3>
                </CardHeader>
                <CardBody>
                  <CheckboxGroup
                    defaultValue={['revenue', 'orders', 'customers']}
                    className="space-y-2"
                  >
                    {availableMetrics.filter(m => m.category === 'Sales' || m.category === 'Customer').map((metric) => (
                      <Checkbox key={metric.id} value={metric.id}>
                        <div>
                          <div className="font-medium">{metric.name}</div>
                          <div className="text-sm text-gray-600">{metric.category}</div>
                        </div>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </CardBody>
              </Card>

              <div className="flex gap-2">
                <Button color="primary" className="flex-1" startContent={<Play className="w-4 h-4" />}>
                  Generate Report
                </Button>
                <Button variant="bordered" className="flex-1">
                  Save Template
                </Button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Report Preview</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="bordered" startContent={<BarChart3 className="w-4 h-4" />}>
                        Chart View
                      </Button>
                      <Button size="sm" variant="bordered" startContent={<FileText className="w-4 h-4" />}>
                        Table View
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sampleData.sales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [
                          name === 'revenue' ? `$${value.toLocaleString()}` : value,
                          name.charAt(0).toUpperCase() + name.slice(1)
                        ]} />
                        <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} />
                        <Line type="monotone" dataKey="orders" stroke="#06B6D4" strokeWidth={2} />
                        <Line type="monotone" dataKey="customers" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Key Metrics Summary</h3>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">$1.2M</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">794</div>
                      <div className="text-sm text-gray-600">Total Orders</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">585</div>
                      <div className="text-sm text-gray-600">Unique Customers</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">$1,532</div>
                      <div className="text-sm text-gray-600">Avg Order Value</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab key="saved" title="Saved Reports">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Scheduled Reports</h3>
                <Button size="sm" variant="bordered" startContent={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table aria-label="Saved reports table">
                <TableHeader>
                  <TableColumn>REPORT NAME</TableColumn>
                  <TableColumn>TYPE</TableColumn>
                  <TableColumn>SCHEDULE</TableColumn>
                  <TableColumn>LAST RUN</TableColumn>
                  <TableColumn>RECIPIENTS</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {savedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.schedule}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {report.recipients.length} recipients
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip color="success" size="sm" variant="flat">
                          {report.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="light"
                            onPress={() => handleRunReport(report.id)}
                          >
                            Run
                          </Button>
                          <Button
                            size="sm"
                            variant="light"
                            onPress={() => handleEditReport(report)}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="templates" title="Report Templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <Chip size="sm" variant="flat" className="mt-1">
                        {template.category}
                      </Chip>
                    </div>
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <Button size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>
      </Tabs>

      {/* Report Configuration Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {selectedReport ? 'Edit Report' : 'Create New Report'}
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Input
                  label="Report Name"
                  placeholder="Enter report name"
                  defaultValue={selectedReport?.name || ''}
                />
                
                <Select label="Report Type" defaultSelectedKeys={selectedReport ? [selectedReport.type] : []}>
                  <SelectItem key="Sales" value="Sales">Sales Analysis</SelectItem>
                  <SelectItem key="Customer" value="Customer">Customer Analysis</SelectItem>
                  <SelectItem key="Inventory" value="Inventory">Inventory Analysis</SelectItem>
                  <SelectItem key="Financial" value="Financial">Financial Analysis</SelectItem>
                </Select>
                
                <Select label="Schedule" defaultSelectedKeys={selectedReport ? [selectedReport.schedule] : []}>
                  <SelectItem key="Manual" value="Manual">Manual Only</SelectItem>
                  <SelectItem key="Daily" value="Daily">Daily</SelectItem>
                  <SelectItem key="Weekly" value="Weekly">Weekly</SelectItem>
                  <SelectItem key="Monthly" value="Monthly">Monthly</SelectItem>
                  <SelectItem key="Quarterly" value="Quarterly">Quarterly</SelectItem>
                </Select>
                
                <Select label="Output Format" defaultSelectedKeys={["pdf"]}>
                  <SelectItem key="pdf" value="pdf">PDF Document</SelectItem>
                  <SelectItem key="excel" value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem key="csv" value="csv">CSV File</SelectItem>
                  <SelectItem key="email" value="email">Email Summary</SelectItem>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Recipients"
                  placeholder="Enter email addresses"
                  description="Comma-separated email addresses"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date</label>
                    <Input type="date" />
                  </div>
                </div>
                
                <CheckboxGroup label="Include Sections" defaultValue={['summary', 'charts']}>
                  <Checkbox value="summary">Executive Summary</Checkbox>
                  <Checkbox value="charts">Charts and Graphs</Checkbox>
                  <Checkbox value="tables">Data Tables</Checkbox>
                  <Checkbox value="trends">Trend Analysis</Checkbox>
                  <Checkbox value="recommendations">Recommendations</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              {selectedReport ? 'Update' : 'Create'} Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
