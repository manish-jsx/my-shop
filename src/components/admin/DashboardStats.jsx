// src/components/admin/DashboardStats.jsx
'use client'
import { Card, CardBody } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign 
} from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.3%',
    icon: DollarSign,
    color: 'primary'
  },
  {
    title: 'Orders',
    value: '156',
    change: '+8.2%',
    icon: ShoppingBag,
    color: 'success'
  },
  {
    title: 'Customers',
    value: '2,345',
    change: '+5.7%',
    icon: Users,
    color: 'secondary'
  },
  {
    title: 'Avg. Order Value',
    value: '$79.23',
    change: '-2.1%',
    icon: TrendingUp,
    color: 'warning'
  }
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardBody className="flex flex-row items-center gap-4">
              <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-success' : 'text-danger'
                }`}>
                  {stat.change} vs last period
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}