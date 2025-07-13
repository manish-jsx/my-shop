// src/app/admin/authentication/page.jsx
'use client'
import { useState } from 'react'
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip,
  Progress,
  Divider
} from '@nextui-org/react'
import { 
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Award,
  Building,
  FileCheck,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

const authStats = {
  totalCertificates: 247,
  verified: 198,
  pending: 32,
  expired: 17,
  monthlyGrowth: 12.5,
  averageProcessingTime: 3.2,
  topLab: 'GIA'
}

const recentActivity = [
  {
    id: 1,
    type: 'certificate_verified',
    gemstone: 'Kashmir Sapphire',
    lab: 'GIA',
    value: '$45,999',
    timestamp: '2 hours ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'verification_pending',
    gemstone: 'Burmese Ruby',
    lab: 'AGL',
    value: '$32,500',
    timestamp: '4 hours ago',
    status: 'warning'
  },
  {
    id: 3,
    type: 'lab_partnership',
    gemstone: 'New Partnership',
    lab: 'SSEF',
    value: 'Premium Tier',
    timestamp: '1 day ago',
    status: 'info'
  }
]

const quickActions = [
  {
    title: 'Certificate Management',
    description: 'View and manage all gemstone certificates',
    icon: FileCheck,
    href: '/admin/authentication/certificates',
    color: 'primary'
  },
  {
    title: 'Lab Partnerships',
    description: 'Manage relationships with certification labs',
    icon: Building,
    href: '/admin/authentication/labs',
    color: 'secondary'
  },
  {
    title: 'Verification Queue',
    description: 'Process pending authentication requests',
    icon: Clock,
    href: '/admin/authentication/queue',
    color: 'warning'
  }
]

export default function AuthenticationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Authentication Center
          </h1>
          <p className="text-gray-600 mt-1">Manage gemstone authenticity and certification processes</p>
        </div>
        <Button color="primary" startContent={<Award className="w-4 h-4" />}>
          New Partnership
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{authStats.totalCertificates}</p>
                <p className="text-xs text-green-600">+{authStats.monthlyGrowth}% this month</p>
              </div>
              <FileCheck className="w-8 h-8 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{authStats.verified}</p>
                <p className="text-xs text-gray-500">
                  {((authStats.verified / authStats.totalCertificates) * 100).toFixed(1)}% success rate
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{authStats.pending}</p>
                <p className="text-xs text-gray-500">Avg. {authStats.averageProcessingTime} days</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-red-600">{authStats.expired}</p>
                <p className="text-xs text-gray-500">Next 90 days</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Verification Progress */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Monthly Verification Progress</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">GIA Certifications</span>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <Progress value={85} color="primary" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">AGL Certifications</span>
                <span className="text-sm text-gray-500">72%</span>
              </div>
              <Progress value={72} color="secondary" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">SSEF Certifications</span>
                <span className="text-sm text-gray-500">68%</span>
              </div>
              <Progress value={68} color="success" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Other Labs</span>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <Progress value={45} color="warning" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href={action.href}>
              <CardBody className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-${action.color}-100`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </CardBody>
            </Link>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Lab Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Authentication Activity</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : activity.status === 'warning' ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <Building className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.gemstone}</p>
                    <p className="text-xs text-gray-600">
                      {activity.lab} • {activity.value}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Lab Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Lab Performance</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">GIA</p>
                    <p className="text-sm text-gray-600">98 certificates</p>
                  </div>
                </div>
                <div className="text-right">
                  <Chip size="sm" color="success" variant="flat">
                    99.2% accuracy
                  </Chip>
                  <p className="text-xs text-gray-500 mt-1">2.1 days avg</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">AGL</p>
                    <p className="text-sm text-gray-600">45 certificates</p>
                  </div>
                </div>
                <div className="text-right">
                  <Chip size="sm" color="success" variant="flat">
                    97.8% accuracy
                  </Chip>
                  <p className="text-xs text-gray-500 mt-1">3.5 days avg</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">SSEF</p>
                    <p className="text-sm text-gray-600">32 certificates</p>
                  </div>
                </div>
                <div className="text-right">
                  <Chip size="sm" color="success" variant="flat">
                    96.9% accuracy
                  </Chip>
                  <p className="text-xs text-gray-500 mt-1">4.2 days avg</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Compliance & Security */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Compliance & Security Status</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h4 className="font-semibold text-green-600">Security Compliant</h4>
              <p className="text-sm text-gray-600 mt-1">All security protocols active</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold text-blue-600">ISO Certified</h4>
              <p className="text-sm text-gray-600 mt-1">ISO 9001:2015 compliant</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-600">Lab Accredited</h4>
              <p className="text-sm text-gray-600 mt-1">5 accredited lab partners</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
