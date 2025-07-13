'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Input
} from '@nextui-org/react'

import { 
  BarChart3, 
  LineChart, 
  Download, 
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp
} from 'lucide-react'

// Sample data
const salesData = [
  { date: '2024-01-01', orders: 145, revenue: 12500, customers: 98 },
  { date: '2024-01-02', orders: 132, revenue: 11200, customers: 87 },
  { date: '2024-01-03', orders: 156, revenue: 13800, customers: 103 },
  { date: '2024-01-04', orders: 123, revenue: 10900, customers: 78 },
  { date: '2024-01-05', orders: 167, revenue: 14500, customers: 112 }
]

const topProducts = [
  { name: 'Wireless Headphones', sales: 234, revenue: 23400 },
  { name: 'Smart Watch', sales: 187, revenue: 37400 },
  { name: 'Laptop Stand', sales: 156, revenue: 7800 },
  { name: 'USB-C Hub', sales: 143, revenue: 7150 },
  { name: 'Phone Case', sales: 132, revenue: 2640 }
]

export default function ReportsManager() {
  const [dateRange, setDateRange] = useState('last7days')
  const [reportType, setReportType] = useState('sales')

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0)
  const totalCustomers = salesData.reduce((sum, day) => sum + day.customers, 0)
  const averageOrderValue = totalRevenue / totalOrders

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <div className="flex gap-4">
            <Select 
              className="w-48"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <SelectItem key="today">Today</SelectItem>
              <SelectItem key="last7days">Last 7 Days</SelectItem>
              <SelectItem key="last30days">Last 30 Days</SelectItem>
              <SelectItem key="thisMonth">This Month</SelectItem>
              <SelectItem key="lastMonth">Last Month</SelectItem>
              <SelectItem key="thisYear">This Year</SelectItem>
            </Select>
            <Button 
              color="primary" 
              variant="flat"
              startContent={<Download className="w-4 h-4"/>}
            >
              Export
            </Button>
          </div>
        </div>

       
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary"/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-success"/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-xl font-bold">{totalOrders.toLocaleString()}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Users className="w-6 h-6 text-secondary"/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-xl font-bold">{totalCustomers.toLocaleString()}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-warning"/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Order Value</p>
                <p className="text-xl font-bold">${averageOrderValue.toFixed(2)}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Tabs>
        <Tab
          key="sales"
          title={
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4"/>
              <span>Sales Report</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <Table aria-label="Sales report table">
                <TableHeader>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>ORDERS</TableColumn>
                  <TableColumn>REVENUE</TableColumn>
                  <TableColumn>CUSTOMERS</TableColumn>
                </TableHeader>
                <TableBody>
                  {salesData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell>{day.orders}</TableCell>
                      <TableCell>${day.revenue.toLocaleString()}</TableCell>
                      <TableCell>{day.customers}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="products"
          title={
            <div className="flex items-center gap-2">
              <LineChart className="w-4 h-4"/>
              <span>Top Products</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <Table aria-label="Top products table">
                <TableHeader>
                  <TableColumn>PRODUCT</TableColumn>
                  <TableColumn>SALES</TableColumn>
                  <TableColumn>REVENUE</TableColumn>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.sales.toLocaleString()}</TableCell>
                      <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}