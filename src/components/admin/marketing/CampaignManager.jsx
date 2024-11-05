
// // src/components/admin/marketing/CampaignManager.jsx
// 'use client'
// import { useState } from 'react'
// import {
//   Card,
//   CardBody,
//   Button,
//   Input,
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Chip,
//   useDisclosure,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Textarea,
//   Switch,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem
// } from '@nextui-org/react'
// import {
//   Calendar,
//   Plus,
//   Edit2,
//   Trash2,
//   MoreVertical,
//   Play,
//   Pause
// } from 'lucide-react'

// // Sample campaigns data
// const initialCampaigns = [
//   {
//     id: 1,
//     name: 'Summer Sale 2024',
//     type: 'discount',
//     status: 'active',
//     startDate: '2024-06-01',
//     endDate: '2024-06-30',
//     budget: 1000,
//     spent: 450,
//     reach: 15000,
//     conversions: 320
//   },
//   // Add more campaigns...
// ]

// export default function CampaignManager() {
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const [campaigns, setCampaigns] = useState(initialCampaigns)
//   const [editingCampaign, setEditingCampaign] = useState(null)

//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     startDate: '',
//     endDate: '',
//     budget: '',
//     description: '',
//     isActive: true
//   })

//   const handleEdit = (campaign) => {
//     setEditingCampaign(campaign)
//     setFormData({
//       name: campaign.name,
//       type: campaign.type,
//       startDate: campaign.startDate,
//       endDate: campaign.endDate,
//       budget: campaign.budget,
//       description: campaign.description || '',
//       isActive: campaign.status === 'active'
//     })
//     onOpen()
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Handle form submission
//     onClose()
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Campaign Manager</h1>
//         <Button
//           color="primary"
//           startContent={<Plus className="w-4 h-4" />}
//           onPress={() => {
//             setEditingCampaign(null)
//             setFormData({
//               name: '',
//               type: '',
//               startDate: '',
//               endDate: '',
//               budget: '',
//               description: '',
//               isActive: true
//             })
//             onOpen()
//           }}
//         >
//           Create Campaign
//         </Button>
//       </div>

//       {/* Campaigns Table */}
//       <Card>
//         <CardBody>
//           <Table aria-label="Campaigns table">
//             <TableHeader>
//               <TableColumn>CAMPAIGN</TableColumn>
//               <TableColumn>DATE RANGE</TableColumn>
//               <TableColumn>BUDGET</TableColumn>
//               <TableColumn>PERFORMANCE</TableColumn>
//               <TableColumn>STATUS</TableColumn>
//               <TableColumn>ACTIONS</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {campaigns.map((campaign) => (
//                 <TableRow key={campaign.id}>
//                   <TableCell>
//                     <div>
//                       <p className="font-medium">{campaign.name}</p>
//                       <p className="text-sm text-gray-500">{campaign.type}</p>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 text-gray-400" />
//                       <span>{campaign.startDate} - {campaign.endDate}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div>
//                       <p className="font-medium">${campaign.budget}</p>
//                       <p className="text-sm text-gray-500">
//                         Spent: ${campaign.spent}
//                       </p>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div>
//                       <p>Reach: {campaign.reach.toLocaleString()}</p>
//                       <p>Conversions: {campaign.conversions}</p>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       color={campaign.status === 'active' ? 'success' : 'default'}
//                       size="sm"
//                       variant="flat"
//                     >
//                       {campaign.status}
//                     </Chip>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button
//                         isIconOnly
//                         size="sm"
//                         variant="light"
//                         onClick={() => handleEdit(campaign)}
//                       >
//                         <Edit2 className="w-4 h-4" />
//                       </Button>
//                       <Dropdown>
//                         <DropdownTrigger>
//                           <Button
//                             isIconOnly
//                             size="sm"
//                             variant="light"
//                           >
//                             <MoreVertical className="w-4 h-4" />
//                           </Button>
//                         </DropdownTrigger>
//                         <DropdownMenu>
//                           <DropdownItem
//                             startContent={campaign.status === 'active' ?
//                               <Pause className="w-4 h-4" /> :
//                               <Play className="w-4 h-4" />
//                             }
//                           >
//                             {campaign.status === 'active' ? 'Pause' : 'Resume'}
//                           </DropdownItem>
//                           <DropdownItem
//                             className="text-danger"
//                             color="danger"
//                             startContent={<Trash2 className="w-4 h-4" />}
//                           >
//                             Delete
//                           </DropdownItem>
//                         </DropdownMenu>
//                       </Dropdown>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardBody>
//       </Card>

      
// {/* Campaign Form Modal */}
// <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
//   <ModalContent>
//     {(onClose) => (
//       <>
//         <ModalHeader>
//           {editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
//         </ModalHeader>
//         <ModalBody>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               label="Campaign Name"
//               placeholder="Enter campaign name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               isRequired
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 type="date"
//                 label="Start Date"
//                 value={formData.startDate}
//                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//                 isRequired
//               />
//               <Input
//                 type="date"
//                 label="End Date"
//                 value={formData.endDate}
//                 onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//                 isRequired
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <Select
//                 label="Campaign Type"
//                 placeholder="Select campaign type"
//                 value={formData.type}
//                 onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                 isRequired
//               >
//                 <SelectItem key="discount">Discount</SelectItem>
//                 <SelectItem key="promotion">Promotion</SelectItem>
//                 <SelectItem key="seasonal">Seasonal</SelectItem>
//                 <SelectItem key="flash-sale">Flash Sale</SelectItem>
//               </Select>
//               <Input
//                 type="number"
//                 label="Budget"
//                 placeholder="Enter budget"
//                 startContent="$"
//                 value={formData.budget}
//                 onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//                 isRequired
//               />
//             </div>

//             <Textarea
//               label="Description"
//               placeholder="Enter campaign description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             />

//             <Switch
//               isSelected={formData.isActive}
//               onValueChange={(value) => setFormData({ ...formData, isActive: value })}
//             >
//               Activate Campaign
//             </Switch>
//           </form>
//         </ModalBody>
//         <ModalFooter>
//           <Button variant="flat" onPress={onClose}>
//             Cancel
//           </Button>
//           <Button color="primary" onPress={handleSubmit}>
//             {editingCampaign ? 'Update' : 'Create'} Campaign
//           </Button>
//         </ModalFooter>
//       </>
//     )}
//   </ModalContent>
// </Modal>

'use client'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Switch,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem
} from '@nextui-org/react'
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  MoreVertical,
  Play,
  Pause
} from 'lucide-react'

// Sample campaigns data
const initialCampaigns = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    type: 'discount',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    budget: 1000,
    spent: 450,
    reach: 15000,
    conversions: 320,
    description: 'Summer season promotional campaign'
  },
  {
    id: 2,
    name: 'Back to School',
    type: 'seasonal',
    status: 'draft',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    budget: 2000,
    spent: 0,
    reach: 0,
    conversions: 0,
    description: 'Back to school season campaign'
  }
]

export default function CampaignManager() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [editingCampaign, setEditingCampaign] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    isActive: true
  })

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign)
    setFormData({
      name: campaign.name,
      type: campaign.type,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      budget: campaign.budget,
      description: campaign.description || '',
      isActive: campaign.status === 'active'
    })
    onOpen()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newCampaign = {
      id: editingCampaign ? editingCampaign.id : Date.now(),
      name: formData.name,
      type: formData.type,
      status: formData.isActive ? 'active' : 'draft',
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget),
      spent: editingCampaign ? editingCampaign.spent : 0,
      reach: editingCampaign ? editingCampaign.reach : 0,
      conversions: editingCampaign ? editingCampaign.conversions : 0,
      description: formData.description
    }

    if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id ? newCampaign : c
      ))
    } else {
      setCampaigns([...campaigns, newCampaign])
    }
    
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      startDate: '',
      endDate: '',
      budget: '',
      description: '',
      isActive: true
    })
    setEditingCampaign(null)
  }

  const handleDelete = (campaignId) => {
    setCampaigns(campaigns.filter(c => c.id !== campaignId))
  }

  const toggleCampaignStatus = (campaignId) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'draft' : 'active'
        }
      }
      return campaign
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaign Manager</h1>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onPress={() => {
            resetForm()
            onOpen()
          }}
        >
          Create Campaign
        </Button>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardBody>
          <Table aria-label="Campaigns table">
            <TableHeader>
              <TableColumn>CAMPAIGN</TableColumn>
              <TableColumn>DATE RANGE</TableColumn>
              <TableColumn>BUDGET</TableColumn>
              <TableColumn>PERFORMANCE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-gray-500">{campaign.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        Spent: ${campaign.spent.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>Reach: {campaign.reach.toLocaleString()}</p>
                      <p>Conversions: {campaign.conversions.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={campaign.status === 'active' ? 'success' : 'default'}
                      size="sm"
                      variant="flat"
                    >
                      {campaign.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(campaign)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            key="toggle"
                            startContent={campaign.status === 'active' ?
                              <Pause className="w-4 h-4" /> :
                              <Play className="w-4 h-4" />
                            }
                            onPress={() => toggleCampaignStatus(campaign.id)}
                          >
                            {campaign.status === 'active' ? 'Pause' : 'Resume'}
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<Trash2 className="w-4 h-4" />}
                            onPress={() => handleDelete(campaign.id)}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Campaign Form Modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingCampaign ? 'Edit Campaign' : 'Create Campaign'}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Campaign Name"
                    placeholder="Enter campaign name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isRequired
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      isRequired
                    />
                    <Input
                      type="date"
                      label="End Date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      isRequired
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Campaign Type"
                      placeholder="Select campaign type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      isRequired
                    >
                      <SelectItem key="discount">Discount</SelectItem>
                      <SelectItem key="promotion">Promotion</SelectItem>
                      <SelectItem key="seasonal">Seasonal</SelectItem>
                      <SelectItem key="flash-sale">Flash Sale</SelectItem>
                    </Select>
                    <Input
                      type="number"
                      label="Budget"
                      placeholder="Enter budget"
                      startContent="$"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      isRequired
                    />
                  </div>

                  <Textarea
                    label="Description"
                    placeholder="Enter campaign description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />

                  <Switch
                    isSelected={formData.isActive}
                    onValueChange={(value) => setFormData({ ...formData, isActive: value })}
                  >
                    Activate Campaign
                  </Switch>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {editingCampaign ? 'Update' : 'Create'} Campaign
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}