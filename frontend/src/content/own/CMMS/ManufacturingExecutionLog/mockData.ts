import type {
  ManufacturingEntryConfig,
  ManufacturingLogSection,
  ManufacturingLogType
} from './types';

const basePath =
  '/app/manufacturing-execution-log';

export const manufacturingLogSections:
  ManufacturingLogSection[] = [
  {
    type: 'raw-materials',
    number: 1,
    title: 'Raw Materials Procurement Log',
    description:
      'Purchase, receipt, inspection, and acceptance records.',
    addLabel: 'Add Raw Materials Procurement Log',
    fullLogLabel: 'View Full Raw Material Log',
    listPath: `${basePath}/raw-materials`,
    newPath: `${basePath}/raw-materials/new`,
    columns: [
      'Material Batch ID',
      'Material Name',
      'Supplier Name',
      'Quantity',
      'Unit',
      'Inspection Status',
      'Material Status'
    ],
    rows: [
      [
        'MAT-BATCH-2025-0520-001',
        'Resistor 10K Ohm 1%',
        'ABC Electronics',
        '10,000',
        'PCS',
        'Accepted',
        'Accepted'
      ]
    ]
  },
  {
    type: 'components',
    number: 2,
    title: 'Component Manufacturing Log',
    description:
      'Component build, calibration, test, and QA status.',
    addLabel: 'Add Component Manufacturing Log',
    fullLogLabel: 'View Full Component Log',
    listPath: `${basePath}/components`,
    newPath: `${basePath}/components/new`,
    columns: [
      'Component ID',
      'Component Name',
      'Associated product',
      'Built-in Status',
      'Functional Test',
      'QA Status'
    ],
    rows: [
      [
        'COMP-2025-000156',
        'Main PCB Assembly',
        'IoT Gateway X100',
        'Completed',
        'Pass',
        'Packed'
      ]
    ]
  },
  {
    type: 'assembly-line',
    number: 3,
    title: 'Assembly Line Tracking',
    description:
      'Line station activity, operator timing, and yield metrics.',
    addLabel: 'Add Assembly Line Tracking',
    fullLogLabel: 'View Full Assembly Line Log',
    listPath: `${basePath}/assembly-line`,
    newPath: `${basePath}/assembly-line/new`,
    columns: [
      'Work Order ID',
      'Assembly Station',
      'Operator',
      'Start Time',
      'End Time',
      'Status',
      'Yield (%)'
    ],
    rows: [
      [
        'WO-2025-000123',
        'Station 2 - Assembly',
        'Ramesh Kumar',
        '09:15 AM',
        '11:45 AM',
        'Completed',
        '96'
      ]
    ]
  },
  {
    type: 'logistics-trail',
    number: 4,
    title: 'Manufacturing Logistics Trail',
    description:
      'Internal material movement between manufacturing locations.',
    addLabel: 'Add Manufacturing Logistics Trail',
    fullLogLabel: 'View Full Logistics Trail',
    listPath: `${basePath}/logistics-trail`,
    newPath: `${basePath}/logistics-trail/new`,
    columns: [
      'Internal Transfer ID',
      'From Warehouse',
      'To Warehouse',
      'Movement Time',
      'Status',
      'Transit Delay'
    ],
    rows: [
      [
        'ITR-2025-000245',
        'Main Store - WH01',
        'Assembly Line Store - WH02',
        '20 May 2025, 10:30 AM',
        'Completed',
        '0 mins'
      ]
    ]
  }
];

const productImage =
  '/static/images/features/asset-hero.png';

const componentImage =
  '/static/images/features/part-hero.png';

const rawMaterialImage =
  '/static/images/placeholders/products/3.png';

const logisticsImage =
  '/static/images/features/pm-hero.png';

export const manufacturingEntryConfigs:
  Record<ManufacturingLogType, ManufacturingEntryConfig> = {
  'raw-materials': {
    type: 'raw-materials',
    title: 'Raw Material Procurement Log Entry',
    subtitle:
      'Capture details of raw material purchase and receipt',
    role: 'Store Incharge',
    listPath: `${basePath}/raw-materials`,
    previewTitle: 'Material Preview',
    previewImage: rawMaterialImage,
    previewDetails: [
      {
        label: 'Material',
        value: 'Resistor 10K Ohm 1% 1/4W'
      },
      { label: 'Specification', value: 'ERJ-6ENF1002V' },
      { label: 'Category', value: 'Electronic Components' }
    ],
    summaryTitle: 'Related Information',
    summaryDetails: [
      { label: 'Supplier Rating', value: '4.2' },
      { label: 'Last Purchase Date', value: '10 May 2025' },
      { label: 'Last GRN Number', value: 'GRN-2025-0510-077' },
      { label: 'On-Time Delivery', value: '92%' }
    ],
    checklistTitle: 'Attachments',
    checklist: [
      'invoice_0567.pdf',
      'certificate_rohs.pdf',
      'spec_sheet_rev2.1.pdf'
    ],
    attachments: [
      { name: 'invoice_0567.pdf', size: '320 KB' },
      { name: 'certificate_rohs.pdf', size: '450 KB' },
      { name: 'spec_sheet_rev2.1.pdf', size: '280 KB' }
    ],
    sections: [
      {
        title: 'Purchase Information',
        fields: [
          { name: 'poNumber', label: 'PO Number *', value: 'PO-2025-000123', options: ['PO-2025-000123'], width: 3 },
          { name: 'poDate', label: 'PO Date *', value: '2025-05-20', type: 'date', width: 3 },
          { name: 'supplierName', label: 'Supplier / Vendor Name *', value: 'ABC Electronics Pvt. Ltd.', options: ['ABC Electronics Pvt. Ltd.'], width: 3 },
          { name: 'supplierCode', label: 'Supplier Code', value: 'SUP-00045', width: 3 },
          { name: 'invoiceNumber', label: 'Invoice Number *', value: 'INV-2025-0567', width: 3 },
          { name: 'invoiceDate', label: 'Invoice Date *', value: '2025-05-20', type: 'date', width: 3 },
          { name: 'currency', label: 'Currency *', value: 'INR', options: ['INR', 'USD'], width: 3 },
          { name: 'paymentTerms', label: 'Payment Terms', value: '30 Days', options: ['30 Days', '45 Days'], width: 3 }
        ]
      },
      {
        title: 'Material Details',
        fields: [
          { name: 'materialBatchId', label: 'Material Batch ID *', value: 'MAT-BATCH-2025-0520-001', width: 3 },
          { name: 'materialName', label: 'Material Name *', value: 'Resistor 10K Ohm 1% 1/4W', width: 3 },
          { name: 'materialCategory', label: 'Material Category', value: 'Electronic Components', options: ['Electronic Components', 'Mechanical'], width: 3 },
          { name: 'materialSpecification', label: 'Material Specification *', value: 'ERJ-6ENF1002V', width: 3 },
          { name: 'hsnCode', label: 'HSN / SAC Code', value: '8533', width: 2 },
          { name: 'uom', label: 'UOM *', value: 'PCS', options: ['PCS', 'KG', 'MTR'], width: 2 },
          { name: 'quantityPurchased', label: 'Quantity Purchased *', value: '10,000', width: 2 },
          { name: 'unitPrice', label: 'Unit Price (INR) *', value: '0.80', width: 3 },
          { name: 'totalAmount', label: 'Total Amount (INR)', value: '8,000.00', width: 3 }
        ]
      },
      {
        title: 'Receipt & Inspection',
        fields: [
          { name: 'grnNumber', label: 'GRN Number *', value: 'GRN-2025-0520-089', width: 3 },
          { name: 'grnDate', label: 'GRN Date *', value: '2025-05-20', type: 'date', width: 3 },
          { name: 'receivedQuantity', label: 'Received Quantity *', value: '10,000', width: 3 },
          { name: 'warehouseLocation', label: 'Warehouse Location *', value: 'Main Warehouse - WH01', options: ['Main Warehouse - WH01'], width: 3 },
          { name: 'receivedBy', label: 'Received By *', value: 'Ramesh Yadav', options: ['Ramesh Yadav'], width: 3 },
          { name: 'inspectionStatus', label: 'Inspection Status *', value: 'Accepted', options: ['Accepted', 'Rejected', 'Pending'], width: 3 },
          { name: 'inspectedBy', label: 'Inspected By *', value: 'Anita Sharma', options: ['Anita Sharma'], width: 3 },
          { name: 'inspectionDate', label: 'Inspection Date *', value: '2025-05-20', type: 'date', width: 3 }
        ]
      },
      {
        title: 'Additional Information',
        fields: [
          { name: 'complianceCertificate', label: 'Compliance Certificate', value: 'RoHS Compliant', options: ['RoHS Compliant'], width: 3 },
          { name: 'specificationDocument', label: 'Material Specification Document', value: 'Rev 2.1', options: ['Rev 2.1'], width: 3 },
          { name: 'expiryDate', label: 'Expiry Date (if applicable)', value: '2027-05-20', type: 'date', width: 3 },
          { name: 'shelfLife', label: 'Shelf Life', value: '24 Months', width: 3 },
          { name: 'materialStatus', label: 'Material Status *', value: 'Accepted', options: ['Accepted', 'Rejected', 'On Hold'], width: 3 },
          { name: 'rejectionReason', label: 'Rejection Reason (if any)', value: '', width: 3 },
          { name: 'remarks', label: 'Remarks', value: 'Material received in good condition.', width: 6 }
        ]
      },
      {
        title: 'Cost & Accounting',
        fields: [
          { name: 'taxableAmount', label: 'Taxable Amount (INR)', value: '8,000.00', width: 2 },
          { name: 'tax', label: 'Tax (%)', value: '18', width: 2 },
          { name: 'taxAmount', label: 'Tax Amount (INR)', value: '1,440.00', width: 2 },
          { name: 'freightCharges', label: 'Freight Charges (INR)', value: '200.00', width: 2 },
          { name: 'otherCharges', label: 'Other Charges (INR)', value: '50.00', width: 2 },
          { name: 'finalAmount', label: 'Total Amount (INR)', value: '9,690.00', width: 2 }
        ]
      }
    ]
  },
  components: {
    type: 'components',
    title: 'Component Manufacturing Log Entry',
    subtitle:
      'Capture component manufacturing details and quality information',
    role: 'Operator',
    listPath: `${basePath}/components`,
    previewTitle: 'Component Preview',
    previewImage: componentImage,
    previewDetails: [
      { label: 'Component Name', value: 'Main PCB Assembly' },
      { label: 'Component ID', value: 'COMP-2025-000156' },
      { label: 'Associated Product', value: 'IoT Gateway X100' }
    ],
    summaryTitle: 'Attachments',
    summaryDetails: [
      { label: 'pcb_front.jpg', value: '120 KB' },
      { label: 'pcb_back.jpg', value: '110 KB' },
      { label: 'test_report.pdf', value: '250 KB' }
    ],
    checklistTitle: 'Process Checklist',
    checklist: [
      'Material Verification',
      'SMT Placement',
      'Soldering',
      'AOI Inspection',
      'Functional Test',
      'Burn-In Test',
      'Final QC'
    ],
    attachments: [
      { name: 'pcb_front.jpg', size: '120 KB' },
      { name: 'pcb_back.jpg', size: '110 KB' },
      { name: 'test_report.pdf', size: '250 KB' }
    ],
    sections: [
      {
        title: 'Component Information',
        fields: [
          { name: 'componentId', label: 'Component ID *', value: 'COMP-2025-000156', width: 3 },
          { name: 'componentSerial', label: 'Component Serial / Lot No. *', value: 'LOT-COMP-2025-0516-001', width: 3 },
          { name: 'componentName', label: 'Component Name *', value: 'Main PCB Assembly', options: ['Main PCB Assembly'], width: 3 },
          { name: 'associatedProduct', label: 'Associated Product *', value: 'IoT Gateway X100', options: ['IoT Gateway X100'], width: 3 },
          { name: 'pcbVersion', label: 'PCB Version *', value: 'PCB-2.4', options: ['PCB-2.4'], width: 3 },
          { name: 'cadVersion', label: 'CAD Version', value: 'CAD-2.4', options: ['CAD-2.4'], width: 3 },
          { name: 'bomVersion', label: 'BOM Version', value: 'BOM-2.4', width: 3 },
          { name: 'revision', label: 'Revision', value: 'Rev A', width: 3 }
        ]
      },
      {
        title: 'Manufacturing Details',
        fields: [
          { name: 'manufacturingDate', label: 'Manufacturing Date *', value: '2025-05-20', type: 'date', width: 3 },
          { name: 'manufacturingTime', label: 'Manufacturing Time *', value: '09:15 AM', width: 3 },
          { name: 'operatorId', label: 'Operator ID *', value: 'EMP-2025-00156', options: ['EMP-2025-00156'], width: 3 },
          { name: 'machineId', label: 'Machine ID *', value: 'SMT-MACHINE-02', options: ['SMT-MACHINE-02'], width: 3 },
          { name: 'smtBatchId', label: 'SMT Batch ID *', value: 'SMT-2025-0520-02', width: 3 },
          { name: 'solderPasteBatch', label: 'Solder Paste Batch *', value: 'SPB-2025-0520-08', width: 3 },
          { name: 'firmwareLoaded', label: 'Firmware Loaded', value: 'FW-2.4.1', width: 3 },
          { name: 'testJig', label: 'Test Jig Used', value: 'JIG-PCB-02', width: 3 }
        ]
      },
      {
        title: 'Testing & Calibration',
        fields: [
          { name: 'burnInStatus', label: 'Burn-in Status *', value: 'Completed', options: ['Completed', 'Pending'], width: 3 },
          { name: 'functionalTest', label: 'Functional Test Result *', value: 'Pass', options: ['Pass', 'Fail'], width: 3 },
          { name: 'calibrationResult', label: 'Calibration Result *', value: 'Pass', options: ['Pass', 'Fail'], width: 3 },
          { name: 'testEquipment', label: 'Test Equipment / ID', value: 'FT-01', width: 3 },
          { name: 'burnInDuration', label: 'Burn-in Duration', value: '02:00:00', width: 3 },
          { name: 'voltageCheck', label: 'Voltage Check (V)', value: '5.02', width: 3 },
          { name: 'currentCheck', label: 'Current Check (A)', value: '0.85', width: 3 },
          { name: 'frequencyCheck', label: 'Frequency Check (Hz)', value: '50.02', width: 3 }
        ]
      },
      {
        title: 'Rework & Scrap Information',
        fields: [
          { name: 'reworkCount', label: 'Rework Count', value: '0', width: 3 },
          { name: 'reworkDetails', label: 'Rework Details', value: '', width: 3 },
          { name: 'scrapStatus', label: 'Scrap Status', value: 'No', options: ['No', 'Yes'], width: 3 },
          { name: 'scrapReason', label: 'Scrap Reason (if any)', value: '', width: 3 }
        ]
      },
      {
        title: 'Quality Control',
        fields: [
          { name: 'qcInspector', label: 'QC Inspector *', value: 'QC-INS-0045 (Anita Sharma)', options: ['QC-INS-0045 (Anita Sharma)'], width: 3 },
          { name: 'qcTimestamp', label: 'QC Timestamp *', value: '20 May 2025, 11:20 AM', width: 3 },
          { name: 'packagingStatus', label: 'Packaging Status *', value: 'Packed', options: ['Packed', 'Pending'], width: 3 },
          { name: 'remarks', label: 'Remarks', value: '', width: 3 }
        ]
      },
      {
        title: 'Additional Information',
        fields: [
          { name: 'notes', label: 'Notes', value: '', width: 6 },
          { name: 'internalReference', label: 'Internal Reference (Optional)', value: '', width: 6 }
        ]
      }
    ]
  },
  'assembly-line': {
    type: 'assembly-line',
    title: 'Assembly Line Tracking Entry',
    subtitle:
      'Capture assembly line activities, quality checks, and production metrics',
    role: 'Manager',
    listPath: `${basePath}/assembly-line`,
    previewTitle: 'Product Preview',
    previewImage: productImage,
    previewDetails: [
      { label: 'Product', value: 'IoT Gateway X100' },
      { label: 'Product ID', value: 'PROD-2025-0001234' },
      { label: 'BOM Version', value: 'BOM-2.4' }
    ],
    summaryTitle: 'Checklist',
    summaryDetails: [
      { label: 'SOP Followed', value: 'Verified' },
      { label: 'Tools Calibrated', value: 'Verified' },
      { label: 'ESD Check', value: 'Verified' },
      { label: 'Material Availability', value: 'Verified' }
    ],
    checklistTitle: 'Recent Attachments',
    checklist: [
      'torque_log_200525.csv',
      'assembly_images.zip',
      'assembly_video.mp4',
      'sensor_logs_200525.json'
    ],
    attachments: [
      { name: 'torque_log_200525.csv', size: '120 KB' },
      { name: 'assembly_images.zip', size: '16.4 MB' },
      { name: 'assembly_video.mp4', size: '120 MB' }
    ],
    sections: [
      {
        title: 'Work Order & Line Information',
        fields: [
          { name: 'workOrderId', label: 'Work Order ID *', value: 'WO-2025-000123', options: ['WO-2025-000123'], width: 3 },
          { name: 'productionOrderId', label: 'Production Order ID', value: 'PO-2025-000456', width: 3 },
          { name: 'productModel', label: 'Product / Model *', value: 'IoT Gateway X100', options: ['IoT Gateway X100'], width: 3 },
          { name: 'bomVersion', label: 'BOM Version', value: 'BOM-2.4', width: 3 },
          { name: 'assemblyLine', label: 'Assembly Line *', value: 'LINE-02', options: ['LINE-02'], width: 3 },
          { name: 'assemblyStation', label: 'Assembly Station *', value: 'Station 2 - Assembly', options: ['Station 2 - Assembly'], width: 3 },
          { name: 'shift', label: 'Shift *', value: 'Morning (06:00 AM - 02:00 PM)', options: ['Morning (06:00 AM - 02:00 PM)'], width: 3 },
          { name: 'date', label: 'Date *', value: '2025-05-20', type: 'date', width: 3 }
        ]
      },
      {
        title: 'Operator & Time Details',
        fields: [
          { name: 'operator', label: 'Operator / Employee *', value: 'EMP-2025-00156', options: ['EMP-2025-00156'], helperText: 'Ramesh Kumar', width: 3 },
          { name: 'startTime', label: 'Start Time *', value: '20 May 2025, 09:15 AM', width: 3 },
          { name: 'endTime', label: 'End Time *', value: '20 May 2025, 11:45 AM', width: 3 },
          { name: 'cycleTime', label: 'Total Cycle Time (mins)', value: '150', width: 3 },
          { name: 'shiftIncharge', label: 'Shift Incharge', value: 'EMP-2025-00098', options: ['EMP-2025-00098'], helperText: 'Suresh Patel', width: 3 },
          { name: 'teamMembers', label: 'Team Members (IDs)', value: 'EMP-2025-00157, EMP-2025-00158', width: 3 },
          { name: 'unitsStarted', label: 'No. of Units Started', value: '100', width: 3 },
          { name: 'unitsCompleted', label: 'No. of Units Completed', value: '96', width: 3 }
        ]
      },
      {
        title: 'Assembly Process Details',
        fields: [
          { name: 'sopVersion', label: 'Assembly SOP Version *', value: 'SOP-ASM-2.1', options: ['SOP-ASM-2.1'], width: 3 },
          { name: 'toolsUsed', label: 'Tools / Equipment Used', value: 'Torque Driver, ESD Mat, Jig-ASM-02', width: 3 },
          { name: 'calibrationStatus', label: 'Tool Calibration Status *', value: 'Calibrated', options: ['Calibrated', 'Due'], width: 3 },
          { name: 'torqueLogs', label: 'Torque Logs *', value: 'torque_log_200525.csv', width: 3 },
          { name: 'assemblyVerification', label: 'Assembly Verification *', value: 'Verified', options: ['Verified', 'Pending'], width: 3 },
          { name: 'imageCapture', label: 'Image Capture *', value: '6 files uploaded', width: 3 },
          { name: 'videoCapture', label: 'Video Capture', value: '1 file uploaded (120 MB)', width: 3 },
          { name: 'sensorLogs', label: 'IoT Sensor Logs', value: 'Auto Captured', width: 3 }
        ]
      },
      {
        title: 'Production & Quality Metrics',
        fields: [
          { name: 'goodUnits', label: 'Good Units', value: '96', width: 3 },
          { name: 'rejectedUnits', label: 'Rejected Units', value: '4', width: 3 },
          { name: 'reworkUnits', label: 'Rework Units', value: '0', width: 3 },
          { name: 'defectCode', label: 'Defect Code (if any)', value: 'DC-104 (Loose Connector)', width: 3 },
          { name: 'productionYield', label: 'Production Yield (%)', value: '96.00', width: 3 },
          { name: 'cycleTimeUnit', label: 'Cycle Time per Unit (mins)', value: '1.50', width: 3 },
          { name: 'downtime', label: 'Downtime (mins)', value: '10', width: 3 },
          { name: 'downtimeReason', label: 'Downtime Reason (if any)', value: 'Material waiting', width: 3 }
        ]
      },
      {
        title: 'Energy & Environmental Data',
        fields: [
          { name: 'energy', label: 'Energy Consumption (kWh)', value: '12.45', width: 2 },
          { name: 'voltage', label: 'Voltage (V)', value: '230', width: 2 },
          { name: 'temperature', label: 'Temperature (C)', value: '26.5', width: 2 },
          { name: 'humidity', label: 'Humidity (%)', value: '48', width: 2 },
          { name: 'ambient', label: 'Ambient Condition', value: 'Normal', width: 4 }
        ]
      },
      {
        title: 'Remarks & Approval',
        fields: [
          { name: 'remarks', label: 'Remarks', value: 'Assembly completed as per SOP. Quality within acceptable limits.', width: 5 },
          { name: 'approvedBy', label: 'Approved By (Manager) *', value: 'MGR-2025-00021', options: ['MGR-2025-00021'], helperText: 'Anita Sharma', width: 3 },
          { name: 'approvalTime', label: 'Approval Time *', value: '20 May 2025, 12:05 PM', width: 2 },
          { name: 'signature', label: 'Signature', value: 'Signed', width: 2 }
        ]
      }
    ]
  },
  'logistics-trail': {
    type: 'logistics-trail',
    title: 'Manufacturing Logistics Trail Entry',
    subtitle:
      'Record internal material or product movement between locations',
    role: 'Operator',
    listPath: `${basePath}/logistics-trail`,
    previewTitle: 'Item Preview',
    previewImage: logisticsImage,
    previewDetails: [
      { label: 'Product', value: 'IoT Gateway X100' },
      { label: 'Item Type', value: 'Finished Product' },
      { label: 'Batch No.', value: 'BATCH-2025-05-001' },
      { label: 'UOM', value: 'pcs' }
    ],
    summaryTitle: 'Transfer Summary',
    summaryDetails: [
      { label: 'From Location', value: 'Main Store - WH01' },
      { label: 'To Location', value: 'Assembly Line Store - WH02' },
      { label: 'Quantity', value: '50 pcs' },
      { label: 'Movement Type', value: 'Internal Transfer' },
      { label: 'Expected By', value: '20 May 2025, 04:00 PM' }
    ],
    checklistTitle: 'Checklist',
    checklist: [
      'Item Verified',
      'Quantity Checked',
      'Packaging Intact',
      'Documentation Verified'
    ],
    sections: [
      {
        title: 'Transfer Information',
        fields: [
          { name: 'internalTransferId', label: 'Internal Transfer ID *', value: 'ITR-2025-000245', width: 3 },
          { name: 'transferDateTime', label: 'Transfer Date & Time *', value: '20 May 2025, 10:30 AM', width: 3 },
          { name: 'movementType', label: 'Movement Type *', value: 'Internal Transfer', options: ['Internal Transfer'], width: 3 },
          { name: 'reference', label: 'Reference (WO / Batch / Others)', value: 'WO-2025-000123', width: 3 },
          { name: 'priority', label: 'Priority', value: 'Normal', options: ['Normal', 'Urgent'], width: 3 },
          { name: 'reason', label: 'Reason for Transfer *', value: 'Production', options: ['Production', 'Quality'], width: 3 },
          { name: 'materialType', label: 'Material / Item Type *', value: 'Finished Product', options: ['Finished Product', 'Raw Material'], width: 3 },
          { name: 'productDetails', label: 'Item / Product Details *', value: 'IoT Gateway X100', width: 3 }
        ]
      },
      {
        title: 'Source Information',
        fields: [
          { name: 'fromWarehouse', label: 'Warehouse / Location (From) *', value: 'Main Store - WH01', options: ['Main Store - WH01'], width: 3 },
          { name: 'sourceZone', label: 'Area / Zone', value: 'R1 - Rack A', width: 3 },
          { name: 'sourceBin', label: 'Bin / Shelf No.', value: 'R1-A-04', width: 3 },
          { name: 'batchLotNo', label: 'Batch / Lot No.', value: 'BATCH-2025-05-001', width: 3 },
          { name: 'availableQuantity', label: 'Quantity Available', value: '150 pcs', width: 3 },
          { name: 'uom', label: 'UOM', value: 'pcs', options: ['pcs'], width: 3 },
          { name: 'quantityTransfer', label: 'Quantity to Transfer *', value: '50 pcs', width: 3 },
          { name: 'serialRange', label: 'Serial / Batch Range (if applicable)', value: 'SN10001 - SN10050', width: 3 }
        ]
      },
      {
        title: 'Destination Information',
        fields: [
          { name: 'toWarehouse', label: 'Warehouse / Location (To) *', value: 'Assembly Line Store - WH02', options: ['Assembly Line Store - WH02'], width: 3 },
          { name: 'destinationZone', label: 'Area / Zone', value: 'A2 - Line 2', width: 3 },
          { name: 'destinationBin', label: 'Bin / Shelf No.', value: 'A2-B-02', width: 3 },
          { name: 'purpose', label: 'Expected Use / Purpose', value: 'Assembly Line Production', width: 3 },
          { name: 'requiredBy', label: 'Required By (Date & Time)', value: '20 May 2025, 04:00 PM', width: 3 },
          { name: 'linkedWorkOrder', label: 'Linked Work Order', value: 'WO-2025-000123', width: 3 },
          { name: 'linkedProductionOrder', label: 'Linked Production Order', value: 'PO-2025-000456', width: 3 },
          { name: 'endProduct', label: 'End Product', value: 'IoT Gateway X100', width: 3 }
        ]
      },
      {
        title: 'Logistics & Handling Details',
        fields: [
          { name: 'handledBy', label: 'Handled By (Operator) *', value: 'EMP-2025-00156', options: ['EMP-2025-00156'], helperText: 'Ramesh Kumar', width: 3 },
          { name: 'movementMethod', label: 'Movement Method *', value: 'Manual', options: ['Manual', 'Forklift'], width: 3 },
          { name: 'packagingCondition', label: 'Packaging Condition *', value: 'Good', options: ['Good', 'Damaged'], width: 3 },
          { name: 'vehicle', label: 'Transport Device / Vehicle', value: 'Trolley - TRL-05', width: 3 },
          { name: 'packagingId', label: 'Packaging / Container ID', value: 'PKG-2025-0520-11', width: 3 },
          { name: 'tagId', label: 'Seal / Tag / RFID (if any)', value: 'RFID1234567890', width: 3 },
          { name: 'conditionTransfer', label: 'Condition on Transfer *', value: 'Good', options: ['Good', 'Hold'], width: 3 },
          { name: 'transitDelay', label: 'Transit Delay (mins)', value: '0', width: 3 }
        ]
      },
      {
        title: 'Verification & Approval',
        fields: [
          { name: 'checkedBy', label: 'Checked By (Supervisor)', value: 'SUP-2025-00008', options: ['SUP-2025-00008'], helperText: 'Anita Sharma', width: 3 },
          { name: 'verificationTime', label: 'Verification Time', value: '20 May 2025, 10:45 AM', width: 3 },
          { name: 'status', label: 'Status *', value: 'Completed', options: ['Completed', 'Pending', 'On Hold'], width: 3 },
          { name: 'remarks', label: 'Remarks', value: 'Material transferred as per requirement.', width: 3 }
        ]
      }
    ]
  }
};
