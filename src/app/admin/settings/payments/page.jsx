// src/app/admin/settings/payments/page.jsx
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
  useDisclosure
} from '@nextui-org/react'
import { CreditCard, Shield, Globe, Plus, Edit, Settings } from 'lucide-react'

export default function PaymentSettingsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedGateway, setSelectedGateway] = useState(null)

  const paymentMethods = [
    {
      id: 1,
      name: 'Stripe',
      type: 'Credit Cards',
      status: 'active',
      fees: '2.9% + $0.30',
      currencies: ['USD', 'EUR', 'GBP', 'CAD'],
      features: ['3D Secure', 'Apple Pay', 'Google Pay'],
      monthlyVolume: '$245,000'
    },
    {
      id: 2,
      name: 'PayPal',
      type: 'Digital Wallet',
      status: 'active',
      fees: '3.49% + $0.49',
      currencies: ['USD', 'EUR', 'GBP'],
      features: ['Buyer Protection', 'Express Checkout'],
      monthlyVolume: '$89,000'
    },
    {
      id: 3,
      name: 'Bank Transfer',
      type: 'Wire Transfer',
      status: 'active',
      fees: '$25 flat fee',
      currencies: ['USD', 'EUR'],
      features: ['High Value Support', 'Manual Verification'],
      monthlyVolume: '$456,000'
    },
    {
      id: 4,
      name: 'Cryptocurrency',
      type: 'Digital Currency',
      status: 'inactive',
      fees: '1.5%',
      currencies: ['BTC', 'ETH', 'USDC'],
      features: ['Blockchain Verification', 'Instant Settlement'],
      monthlyVolume: '$12,000'
    }
  ]

  const fraudSettings = {
    enableAVS: true,
    enableCVV: true,
    enable3DSecure: true,
    maxDailyAmount: 50000,
    maxTransactionAmount: 25000,
    velocityChecks: true,
    riskScoring: true,
    blacklistEnabled: true
  }

  const currencySettings = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.00, primary: true },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85, primary: false },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.73, primary: false },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.25, primary: false },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.35, primary: false }
  ]

  const taxSettings = [
    { region: 'United States', rate: '8.5%', type: 'Sales Tax', status: 'active' },
    { region: 'European Union', rate: '20%', type: 'VAT', status: 'active' },
    { region: 'Canada', rate: '13%', type: 'HST/GST', status: 'active' },
    { region: 'United Kingdom', rate: '20%', type: 'VAT', status: 'active' },
    { region: 'Australia', rate: '10%', type: 'GST', status: 'inactive' }
  ]

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default'
  }

  const handleEditGateway = (gateway) => {
    setSelectedGateway(gateway)
    onOpen()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment Settings</h1>
          <p className="text-gray-600">Configure payment methods, fraud protection, and financial settings</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={onOpen}>
          Add Payment Method
        </Button>
      </div>

      <Tabs aria-label="Payment Settings" className="mb-6">
        <Tab key="methods" title="Payment Methods">
          <div className="space-y-6">
            {/* Payment Methods Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardBody className="text-center">
                  <CreditCard className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-gray-600">Active Methods</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <Globe className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600">Supported Countries</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <Settings className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">98.5%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </CardBody>
              </Card>
            </div>

            {/* Payment Methods Table */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Payment Gateways</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Payment methods table">
                  <TableHeader>
                    <TableColumn>METHOD</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>FEES</TableColumn>
                    <TableColumn>MONTHLY VOLUME</TableColumn>
                    <TableColumn>CURRENCIES</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {paymentMethods.map((method) => (
                      <TableRow key={method.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-600">
                              {method.features.slice(0, 2).join(', ')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{method.type}</TableCell>
                        <TableCell>{method.fees}</TableCell>
                        <TableCell className="font-medium">{method.monthlyVolume}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {method.currencies.slice(0, 3).map((currency) => (
                              <Chip key={currency} size="sm" variant="flat">
                                {currency}
                              </Chip>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color={getStatusColor(method.status)} size="sm" variant="flat">
                            {method.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onPress={() => handleEditGateway(method)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="fraud" title="Fraud Protection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Address Verification (AVS)</div>
                      <div className="text-sm text-gray-600">Verify billing address matches card</div>
                    </div>
                    <Switch defaultSelected={fraudSettings.enableAVS} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">CVV Verification</div>
                      <div className="text-sm text-gray-600">Require card security code</div>
                    </div>
                    <Switch defaultSelected={fraudSettings.enableCVV} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">3D Secure 2.0</div>
                      <div className="text-sm text-gray-600">Enhanced authentication for cards</div>
                    </div>
                    <Switch defaultSelected={fraudSettings.enable3DSecure} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Velocity Checks</div>
                      <div className="text-sm text-gray-600">Monitor transaction frequency</div>
                    </div>
                    <Switch defaultSelected={fraudSettings.velocityChecks} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Risk Scoring</div>
                      <div className="text-sm text-gray-600">AI-powered fraud detection</div>
                    </div>
                    <Switch defaultSelected={fraudSettings.riskScoring} />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Transaction Limits</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <Input
                    label="Maximum Transaction Amount"
                    type="number"
                    defaultValue={fraudSettings.maxTransactionAmount.toString()}
                    startContent={<span className="text-gray-500">$</span>}
                    description="Single transaction limit for fraud protection"
                  />
                  
                  <Input
                    label="Daily Transaction Limit"
                    type="number"
                    defaultValue={fraudSettings.maxDailyAmount.toString()}
                    startContent={<span className="text-gray-500">$</span>}
                    description="Maximum amount per customer per day"
                  />
                  
                  <Select label="Risk Level for Manual Review" defaultSelectedKeys={["medium"]}>
                    <SelectItem key="low" value="low">Low Risk ($10,000+)</SelectItem>
                    <SelectItem key="medium" value="medium">Medium Risk ($5,000+)</SelectItem>
                    <SelectItem key="high" value="high">High Risk ($1,000+)</SelectItem>
                  </Select>
                  
                  <Textarea
                    label="Blocked Countries"
                    placeholder="Enter country codes separated by commas"
                    description="Countries where transactions are blocked"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="currency" title="Currency & Tax">
          <div className="space-y-6">
            {/* Currency Settings */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Supported Currencies</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Currency settings table">
                  <TableHeader>
                    <TableColumn>CURRENCY</TableColumn>
                    <TableColumn>SYMBOL</TableColumn>
                    <TableColumn>EXCHANGE RATE</TableColumn>
                    <TableColumn>PRIMARY</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {currencySettings.map((currency) => (
                      <TableRow key={currency.code}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{currency.code}</div>
                            <div className="text-sm text-gray-600">{currency.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{currency.symbol}</TableCell>
                        <TableCell>{currency.rate.toFixed(4)}</TableCell>
                        <TableCell>
                          {currency.primary && (
                            <Chip color="primary" size="sm" variant="flat">Primary</Chip>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="light" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>

            {/* Tax Settings */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Tax Configuration</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Tax settings table">
                  <TableHeader>
                    <TableColumn>REGION</TableColumn>
                    <TableColumn>TAX RATE</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {taxSettings.map((tax, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tax.region}</TableCell>
                        <TableCell>{tax.rate}</TableCell>
                        <TableCell>{tax.type}</TableCell>
                        <TableCell>
                          <Chip color={getStatusColor(tax.status)} size="sm" variant="flat">
                            {tax.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Button variant="light" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="webhooks" title="Webhooks & API">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Webhook Endpoints</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Payment Success</span>
                      <Chip color="success" size="sm" variant="flat">Active</Chip>
                    </div>
                    <div className="text-sm text-gray-600 font-mono">
                      https://api.shukragems.com/webhooks/payment-success
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Payment Failed</span>
                      <Chip color="success" size="sm" variant="flat">Active</Chip>
                    </div>
                    <div className="text-sm text-gray-600 font-mono">
                      https://api.shukragems.com/webhooks/payment-failed
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Chargeback</span>
                      <Chip color="warning" size="sm" variant="flat">Inactive</Chip>
                    </div>
                    <div className="text-sm text-gray-600 font-mono">
                      https://api.shukragems.com/webhooks/chargeback
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="bordered">
                  Add Webhook
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">API Configuration</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <Input
                    label="Stripe Publishable Key"
                    type="password"
                    defaultValue="pk_live_..."
                    description="Public key for client-side integration"
                  />
                  
                  <Input
                    label="Stripe Secret Key"
                    type="password"
                    defaultValue="sk_live_..."
                    description="Secret key for server-side operations"
                  />
                  
                  <Input
                    label="PayPal Client ID"
                    type="password"
                    defaultValue="AY..."
                    description="PayPal application client ID"
                  />
                  
                  <Select label="Environment" defaultSelectedKeys={["production"]}>
                    <SelectItem key="sandbox" value="sandbox">Sandbox (Testing)</SelectItem>
                    <SelectItem key="production" value="production">Production (Live)</SelectItem>
                  </Select>
                </div>
                
                <Button className="w-full mt-4" color="primary">
                  Save API Configuration
                </Button>
              </CardBody>
            </Card>
          </div>
        </Tab>
      </Tabs>

      {/* Payment Method Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {selectedGateway ? 'Edit Payment Method' : 'Add Payment Method'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Select label="Payment Gateway" defaultSelectedKeys={selectedGateway ? [selectedGateway.name.toLowerCase()] : []}>
                <SelectItem key="stripe" value="stripe">Stripe</SelectItem>
                <SelectItem key="paypal" value="paypal">PayPal</SelectItem>
                <SelectItem key="square" value="square">Square</SelectItem>
                <SelectItem key="braintree" value="braintree">Braintree</SelectItem>
              </Select>
              
              <Input
                label="Display Name"
                placeholder="Enter display name"
                defaultValue={selectedGateway?.name || ''}
              />
              
              <Input
                label="API Key"
                type="password"
                placeholder="Enter API key"
              />
              
              <Input
                label="Secret Key"
                type="password"
                placeholder="Enter secret key"
              />
              
              <Select label="Supported Currencies" selectionMode="multiple">
                <SelectItem key="usd" value="usd">USD</SelectItem>
                <SelectItem key="eur" value="eur">EUR</SelectItem>
                <SelectItem key="gbp" value="gbp">GBP</SelectItem>
                <SelectItem key="cad" value="cad">CAD</SelectItem>
              </Select>
              
              <Switch defaultSelected={selectedGateway?.status === 'active'}>
                Enable Payment Method
              </Switch>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              {selectedGateway ? 'Update' : 'Add'} Payment Method
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
