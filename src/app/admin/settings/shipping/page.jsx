// src/app/admin/settings/shipping/page.jsx
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
import { Truck, Package, Globe, Clock, Plus, Edit, MapPin } from 'lucide-react'

export default function ShippingSettingsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedZone, setSelectedZone] = useState(null)

  const shippingZones = [
    {
      id: 1,
      name: 'Domestic US',
      countries: ['United States'],
      methods: [
        { name: 'Standard Shipping', price: 15, days: '3-5', insured: true },
        { name: 'Express Shipping', price: 35, days: '1-2', insured: true },
        { name: 'Overnight', price: 75, days: '1', insured: true }
      ]
    },
    {
      id: 2,
      name: 'North America',
      countries: ['Canada', 'Mexico'],
      methods: [
        { name: 'International Standard', price: 45, days: '7-10', insured: true },
        { name: 'International Express', price: 95, days: '3-5', insured: true }
      ]
    },
    {
      id: 3,
      name: 'Europe',
      countries: ['United Kingdom', 'Germany', 'France', 'Italy', 'Spain'],
      methods: [
        { name: 'European Standard', price: 55, days: '10-14', insured: true },
        { name: 'European Express', price: 125, days: '5-7', insured: true }
      ]
    },
    {
      id: 4,
      name: 'Asia Pacific',
      countries: ['Japan', 'Australia', 'Singapore', 'Hong Kong'],
      methods: [
        { name: 'Asia Pacific Standard', price: 65, days: '14-21', insured: true },
        { name: 'Asia Pacific Express', price: 145, days: '7-10', insured: true }
      ]
    }
  ]

  const carriers = [
    {
      name: 'FedEx',
      status: 'active',
      tracking: true,
      insurance: true,
      services: ['Overnight', 'Express', 'Ground']
    },
    {
      name: 'UPS',
      status: 'active',
      tracking: true,
      insurance: true,
      services: ['Next Day', '2-Day', 'Ground']
    },
    {
      name: 'USPS',
      status: 'active',
      tracking: true,
      insurance: true,
      services: ['Priority', 'Express', 'Ground']
    },
    {
      name: 'DHL',
      status: 'active',
      tracking: true,
      insurance: true,
      services: ['International Express', 'International Standard']
    }
  ]

  const packagingOptions = [
    { name: 'Luxury Gift Box', size: 'Small', price: 25, description: 'Premium packaging for rings and small items' },
    { name: 'Deluxe Jewelry Box', size: 'Medium', price: 45, description: 'Elegant box for necklaces and bracelets' },
    { name: 'VIP Collection Case', size: 'Large', price: 85, description: 'Premium case for multiple items or large pieces' },
    { name: 'Collector Display Box', size: 'Extra Large', price: 125, description: 'Museum-quality display for rare gemstones' }
  ]

  const restrictedItems = [
    { item: 'Raw Diamonds', restriction: 'Requires Kimberley Process Certificate', regions: ['All'] },
    { item: 'Antique Jewelry', restriction: 'Export permits required', regions: ['EU', 'UK'] },
    { item: 'Large Gemstones (>10ct)', restriction: 'Special handling required', regions: ['All'] },
    { item: 'Jade Items', restriction: 'Cultural heritage restrictions', regions: ['China', 'Myanmar'] }
  ]

  const handleEditZone = (zone) => {
    setSelectedZone(zone)
    onOpen()
  }

  const handleCreateZone = () => {
    setSelectedZone(null)
    onOpen()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Shipping Settings</h1>
          <p className="text-gray-600">Configure shipping zones, methods, and carrier integrations</p>
        </div>
        <Button color="primary" startContent={<Plus className="w-4 h-4" />} onPress={handleCreateZone}>
          Add Shipping Zone
        </Button>
      </div>

      <Tabs aria-label="Shipping Settings" className="mb-6">
        <Tab key="zones" title="Shipping Zones">
          <div className="space-y-6">
            {/* Shipping Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardBody className="text-center">
                  <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-gray-600">Shipping Zones</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <Truck className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-gray-600">Active Carriers</div>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center">
                  <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">99.2%</div>
                  <div className="text-sm text-gray-600">On-Time Delivery</div>
                </CardBody>
              </Card>
            </div>

            {/* Shipping Zones */}
            <div className="space-y-6">
              {shippingZones.map((zone) => (
                <Card key={zone.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <h3 className="text-lg font-semibold">{zone.name}</h3>
                        <p className="text-sm text-gray-600">
                          {zone.countries.length} countries: {zone.countries.join(', ')}
                        </p>
                      </div>
                      <Button
                        variant="light"
                        size="sm"
                        startContent={<Edit className="w-4 h-4" />}
                        onPress={() => handleEditZone(zone)}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {zone.methods.map((method, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{method.name}</span>
                            <span className="text-lg font-bold">${method.price}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>Delivery: {method.days} business days</div>
                            <div className="flex items-center gap-1 mt-1">
                              {method.insured && (
                                <Chip color="success" size="sm" variant="flat">Insured</Chip>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </Tab>

        <Tab key="carriers" title="Carriers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Carrier Integrations</h3>
              </CardHeader>
              <CardBody>
                <Table aria-label="Carriers table">
                  <TableHeader>
                    <TableColumn>CARRIER</TableColumn>
                    <TableColumn>SERVICES</TableColumn>
                    <TableColumn>FEATURES</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {carriers.map((carrier) => (
                      <TableRow key={carrier.name}>
                        <TableCell className="font-medium">{carrier.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {carrier.services.slice(0, 2).join(', ')}
                            {carrier.services.length > 2 && '...'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {carrier.tracking && (
                              <Chip size="sm" variant="flat">Tracking</Chip>
                            )}
                            {carrier.insurance && (
                              <Chip size="sm" variant="flat">Insurance</Chip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" size="sm" variant="flat">
                            {carrier.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Carrier Configuration</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <Input
                    label="FedEx Account Number"
                    type="password"
                    defaultValue="123456789"
                    description="Your FedEx account number"
                  />
                  
                  <Input
                    label="UPS Access Key"
                    type="password"
                    defaultValue="ABCD..."
                    description="UPS API access key"
                  />
                  
                  <Input
                    label="USPS User ID"
                    type="password"
                    defaultValue="USPS123"
                    description="USPS web tools user ID"
                  />
                  
                  <Select label="Default Carrier" defaultSelectedKeys={["fedex"]}>
                    <SelectItem key="fedex" value="fedex">FedEx</SelectItem>
                    <SelectItem key="ups" value="ups">UPS</SelectItem>
                    <SelectItem key="usps" value="usps">USPS</SelectItem>
                    <SelectItem key="dhl" value="dhl">DHL</SelectItem>
                  </Select>
                  
                  <Switch defaultSelected>
                    Auto-select best carrier based on destination
                  </Switch>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab key="packaging" title="Packaging">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Packaging Options</h3>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packagingOptions.map((pkg, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{pkg.name}</h4>
                        <span className="text-lg font-bold">+${pkg.price}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>Size: {pkg.size}</div>
                        <div className="mt-1">{pkg.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Default Packaging Settings</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <Select label="Default Package Type" defaultSelectedKeys={["luxury"]}>
                      <SelectItem key="luxury" value="luxury">Luxury Gift Box</SelectItem>
                      <SelectItem key="deluxe" value="deluxe">Deluxe Jewelry Box</SelectItem>
                      <SelectItem key="vip" value="vip">VIP Collection Case</SelectItem>
                      <SelectItem key="collector" value="collector">Collector Display Box</SelectItem>
                    </Select>
                    
                    <Switch defaultSelected>
                      Include authentication certificate
                    </Switch>
                    
                    <Switch defaultSelected>
                      Include care instructions
                    </Switch>
                    
                    <Switch defaultSelected>
                      Include thank you note
                    </Switch>
                    
                    <Textarea
                      label="Special Handling Instructions"
                      placeholder="Default instructions for fragile items..."
                      description="Instructions for all shipments"
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Insurance & Security</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <Input
                      label="Minimum Insurance Amount"
                      type="number"
                      defaultValue="1000"
                      startContent={<span className="text-gray-500">$</span>}
                      description="Minimum insurance for all shipments"
                    />
                    
                    <Input
                      label="High-Value Threshold"
                      type="number"
                      defaultValue="10000"
                      startContent={<span className="text-gray-500">$</span>}
                      description="Orders above this amount require signature"
                    />
                    
                    <Switch defaultSelected>
                      Require signature for delivery
                    </Switch>
                    
                    <Switch defaultSelected>
                      Adult signature required (21+)
                    </Switch>
                    
                    <Switch defaultSelected>
                      Send tracking notifications to customers
                    </Switch>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab key="restrictions" title="Restrictions">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Shipping Restrictions</h3>
            </CardHeader>
            <CardBody>
              <Table aria-label="Shipping restrictions table">
                <TableHeader>
                  <TableColumn>ITEM TYPE</TableColumn>
                  <TableColumn>RESTRICTION</TableColumn>
                  <TableColumn>AFFECTED REGIONS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {restrictedItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>{item.restriction}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {item.regions.map((region) => (
                            <Chip key={region} size="sm" variant="flat">
                              {region}
                            </Chip>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="light" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• All international shipments require customs declaration</li>
                  <li>• High-value items may be subject to additional inspections</li>
                  <li>• Some countries restrict import of certain gemstone types</li>
                  <li>• Export permits may be required for antique or culturally significant items</li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Shipping Zone Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {selectedZone ? 'Edit Shipping Zone' : 'Create Shipping Zone'}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Zone Name"
                placeholder="Enter zone name"
                defaultValue={selectedZone?.name || ''}
              />
              
              <Select
                label="Countries"
                selectionMode="multiple"
                placeholder="Select countries for this zone"
              >
                <SelectItem key="us" value="us">United States</SelectItem>
                <SelectItem key="ca" value="ca">Canada</SelectItem>
                <SelectItem key="mx" value="mx">Mexico</SelectItem>
                <SelectItem key="uk" value="uk">United Kingdom</SelectItem>
                <SelectItem key="de" value="de">Germany</SelectItem>
                <SelectItem key="fr" value="fr">France</SelectItem>
                <SelectItem key="jp" value="jp">Japan</SelectItem>
                <SelectItem key="au" value="au">Australia</SelectItem>
              </Select>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Shipping Methods</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <Input label="Method Name" placeholder="Standard Shipping" />
                    <Input label="Price ($)" type="number" placeholder="15" />
                    <Input label="Delivery Days" placeholder="3-5" />
                  </div>
                  <Switch>Include insurance</Switch>
                </div>
                <Button size="sm" variant="bordered" className="mt-3">
                  Add Another Method
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              {selectedZone ? 'Update' : 'Create'} Zone
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
