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
      'Log ID',
      'Material Name',
      'Supplier Name',
      'Quantity',
      'Unit',
      'Inspection Status',
      'Material Status'
    ],
    rows: []
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
      'Log ID',
      'Component Name',
      'Associated Product UID',
      'PCB Version',
      'Functional Test',
      'calibiration Result'
    ],
    rows: []
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
      'Log ID',
      'Production Order Id',
      'Associated Product Name',
      'Assembly Line',
      'Assembly Station',
      'Shift',
      'Good Units',
      'Production Yields'
    ],
    rows: []
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
      'Log ID',
      'Transfer Date Time',
      'Movement Type',
      'Source Warehouse',
      'Destination Warehouse',
      'quantityToTransfer',
      'Status'
    ],
    rows: []
  }
];

const emptySideData = {
  previewTitle: '',
  previewImage: '',
  previewDetails: [],
  summaryTitle: '',
  summaryDetails: [],
  checklistTitle: '',
  checklist: [],
  attachments: []
};

export const manufacturingEntryConfigs:
  Record<ManufacturingLogType, ManufacturingEntryConfig> = {
  'raw-materials': {
    ...emptySideData,
    type: 'raw-materials',
    title: 'Raw Material Procurement Log Entry',
    subtitle:
      'Capture details of raw material purchase and receipt',
    role: '',
    listPath: `${basePath}/raw-materials`,
    sections: [
      {
        title: 'Purchase Information',
        fields: [
          { name: 'materialBatchId', label: 'Log ID *', value: '', autoGenerate: true, readOnly: true, width: 3 },
          { name: 'poNumber', label: 'PO Number *', value: '', width: 3 },
          { name: 'poDate', label: 'PO Date *', value: '', type: 'date', width: 3 },
          { name: 'supplierName', label: 'Supplier / Vendor Name *', value: '', width: 3 },
          { name: 'supplierCode', label: 'Supplier Code', value: '', width: 3 },
          { name: 'invoiceNumber', label: 'Invoice Number *', value: '', width: 3 },
          { name: 'invoiceDate', label: 'Invoice Date *', value: '', type: 'date', width: 3 },
          { name: 'currency', label: 'Currency *', value: '', options: ['INR', 'USD'], width: 3 },
          { name: 'paymentTerms', label: 'Payment Terms', value: '', options: ['Immediate', '15 Days', '30 Days', '45 Days'], width: 3 }
        ]
      },
      {
        title: 'Material Details',
        fields: [
          { name: 'materialName', label: 'Material Name *', value: '', width: 3 },
          { name: 'materialCategory', label: 'Material Category', value: '', options: ['Electronic Components', 'Mechanical', 'Packaging', 'Consumables'], width: 3 },
          { name: 'materialSpecification', label: 'Material Specification *', value: '', width: 3 },
          { name: 'hsnCode', label: 'HSN / SAC Code', value: '', width: 3 },
          { name: 'uom', label: 'UOM *', value: '', options: ['PCS', 'KG', 'MTR', 'LTR'], width: 3 },
          { name: 'quantityPurchased', label: 'Quantity Purchased *', value: '', width: 3 },
          { name: 'unitPrice', label: 'Unit Price *', value: '', width: 3 },
          { name: 'totalAmount', label: 'Total Amount', value: '', width: 3 }
        ]
      },
      {
        title: 'Receipt & Inspection',
        fields: [
          { name: 'grnNumber', label: 'GRN Number *', value: '', width: 3 },
          { name: 'grnDate', label: 'GRN Date *', value: '', type: 'date', width: 3 },
          { name: 'receivedQuantity', label: 'Received Quantity *', value: '', width: 3 },
          { name: 'warehouseLocation', label: 'Warehouse Location *', value: '', width: 3 },
          { name: 'receivedBy', label: 'Received By *', value: '', width: 3 },
          { name: 'inspectionStatus', label: 'Inspection Status *', value: '', options: ['Accepted', 'Rejected', 'Pending', 'On Hold'], width: 3 },
          { name: 'inspectedBy', label: 'Inspected By *', value: '', width: 3 },
          { name: 'inspectionDate', label: 'Inspection Date *', value: '', type: 'date', width: 3 }
        ]
      },
      {
        title: 'Additional Information',
        fields: [
          { name: 'complianceCertificate', label: 'Compliance Certificate', value: '', width: 3 },
          { name: 'specificationDocument', label: 'Material Specification Document', value: '', width: 3 },
          { name: 'expiryDate', label: 'Expiry Date (if applicable)', value: '', type: 'date', width: 3 },
          { name: 'shelfLife', label: 'Shelf Life', value: '', width: 3 },
          { name: 'materialStatus', label: 'Material Status *', value: '', options: ['Accepted', 'Rejected', 'On Hold', 'Pending'], width: 3 },
          { name: 'rejectionReason', label: 'Rejection Reason (if any)', value: '', width: 3 },
          { name: 'remarks', label: 'Remarks', value: '', width: 6 }
        ]
      },
      {
        title: 'Cost & Accounting',
        fields: [
          { name: 'taxableAmount', label: 'Taxable Amount', value: '', width: 2 },
          { name: 'tax', label: 'Tax (%)', value: '', width: 2 },
          { name: 'taxAmount', label: 'Tax Amount', value: '', width: 2 },
          { name: 'freightCharges', label: 'Freight Charges', value: '', width: 2 },
          { name: 'otherCharges', label: 'Other Charges', value: '', width: 2 },
          { name: 'finalAmount', label: 'Final Amount', value: '', width: 2 }
        ]
      }
    ]
  },
  components: {
    ...emptySideData,
    type: 'components',
    title: 'Component Manufacturing Log Entry',
    subtitle:
      'Capture component manufacturing details and quality information',
    role: '',
    listPath: `${basePath}/components`,
    sections: [
      {
        title: 'Component Information',
        fields: [
          { name: 'componentId', label: 'Log ID *', value: '', autoGenerate: true, readOnly: true, width: 3 },
          { name: 'componentSerial', label: 'Component Serial / Lot No. *', value: '', width: 3 },
          { name: 'componentName', label: 'Component Name *', value: '', width: 3 },
          { name: 'associatedProductUid', label: 'Associated Product UID*', value: '', width: 3 },
          { name: 'pcbVersion', label: 'PCB Version *', value: '', width: 3 },
          { name: 'cadVersion', label: 'CAD Version', value: '', width: 3 },
          { name: 'bomVersion', label: 'BOM Version', value: '', width: 3 },
          { name: 'revision', label: 'Revision', value: '', width: 3 }
        ]
      },
      {
        title: 'Manufacturing Details',
        fields: [
          { name: 'manufacturingDate', label: 'Manufacturing Date *', value: '', type: 'date', width: 3 },
          { name: 'manufacturingTime', label: 'Manufacturing Time *', value: '', width: 3 },
          { name: 'operatorId', label: 'Operator ID *', value: '', width: 3 },
          { name: 'machineId', label: 'Machine ID *', value: '', width: 3 },
          { name: 'smtBatchId', label: 'SMT Batch ID *', value: '', width: 3 },
          { name: 'solderPasteBatch', label: 'Solder Paste Batch *', value: '', width: 3 },
          { name: 'firmwareLoaded', label: 'Firmware Loaded', value: '', width: 3 },
          { name: 'testJig', label: 'Test Jig Used', value: '', width: 3 }
        ]
      },
      {
        title: 'Testing & Calibration',
        fields: [
          { name: 'burnInStatus', label: 'Burn-in Status *', value: '', options: ['Completed', 'Pending', 'Failed'], width: 3 },
          { name: 'functionalTest', label: 'Functional Test Result *', value: '', options: ['Pass', 'Fail', 'Pending'], width: 3 },
          { name: 'calibrationResult', label: 'Calibration Result *', value: '', options: ['Pass', 'Fail', 'Pending'], width: 3 },
          { name: 'testEquipment', label: 'Test Equipment / ID', value: '', width: 3 },
          { name: 'burnInDuration', label: 'Burn-in Duration', value: '', width: 3 },
          { name: 'voltageCheck', label: 'Voltage Check (V)', value: '', width: 3 },
          { name: 'currentCheck', label: 'Current Check (A)', value: '', width: 3 },
          { name: 'frequencyCheck', label: 'Frequency Check (Hz)', value: '', width: 3 }
        ]
      },
      {
        title: 'Rework & Scrap Information',
        fields: [
          { name: 'reworkCount', label: 'Rework Count', value: '', width: 3 },
          { name: 'reworkDetails', label: 'Rework Details', value: '', width: 3 },
          { name: 'scrapStatus', label: 'Scrap Status', value: '', options: ['No', 'Yes'], width: 3 },
          { name: 'scrapReason', label: 'Scrap Reason (if any)', value: '', width: 3 }
        ]
      },
      {
        title: 'Quality Control',
        fields: [
          { name: 'qcInspector', label: 'QC Inspector *', value: '', width: 3 },
          { name: 'qcTimestamp', label: 'QC Timestamp *', value: '', width: 3 },
          { name: 'packagingStatus', label: 'Packaging Status *', value: '', options: ['Packed', 'Pending', 'Rejected'], width: 3 },
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
    ...emptySideData,
    type: 'assembly-line',
    title: 'Assembly Line Tracking Entry',
    subtitle:
      'Capture assembly line activities, quality checks, and production metrics',
    role: '',
    listPath: `${basePath}/assembly-line`,
    sections: [
      {
        title: 'Work Order & Line Information',
        fields: [
          { name: 'workOrderId', label: 'Log ID *', value: '', autoGenerate: true, readOnly: true, width: 3 },
          { name: 'productionOrderId', label: 'Production Order ID', value: '', width: 3 },
          { name: 'productModel', label: 'Product / Model *', value: '', width: 3 },
          { name: 'bomVersion', label: 'BOM Version', value: '', width: 3 },
          { name: 'assemblyLine', label: 'Assembly Line *', value: '', width: 3 },
          { name: 'assemblyStation', label: 'Assembly Station *', value: '', width: 3 },
          { name: 'shift', label: 'Shift *', value: '', options: ['Morning', 'Evening', 'Night'], width: 3 },
          { name: 'date', label: 'Date *', value: '', type: 'date', width: 3 }
        ]
      },
      {
        title: 'Operator & Time Details',
        fields: [
          { name: 'operator', label: 'Operator / Employee *', value: '', width: 3 },
          { name: 'startTime', label: 'Start Time *', value: '', width: 3 },
          { name: 'endTime', label: 'End Time *', value: '', width: 3 },
          { name: 'cycleTime', label: 'Total Cycle Time (mins)', value: '', width: 3 },
          { name: 'shiftIncharge', label: 'Shift Incharge', value: '', width: 3 },
          { name: 'teamMembers', label: 'Team Members (IDs)', value: '', width: 3 },
          { name: 'unitsStarted', label: 'No. of Units Started', value: '', width: 3 },
          { name: 'unitsCompleted', label: 'No. of Units Completed', value: '', width: 3 }
        ]
      },
      {
        title: 'Assembly Process Details',
        fields: [
          { name: 'sopVersion', label: 'Assembly SOP Version *', value: '', width: 3 },
          { name: 'toolsUsed', label: 'Tools / Equipment Used', value: '', width: 3 },
          { name: 'calibrationStatus', label: 'Tool Calibration Status *', value: '', options: ['Calibrated', 'Due', 'Failed'], width: 3 },
          { name: 'torqueLogs', label: 'Torque Logs *', value: '', width: 3 },
          { name: 'assemblyVerification', label: 'Assembly Verification *', value: '', options: ['Verified', 'Pending', 'Failed'], width: 3 },
          { name: 'imageCapture', label: 'Image Capture *', value: '', width: 3 },
          { name: 'videoCapture', label: 'Video Capture', value: '', width: 3 },
          { name: 'sensorLogs', label: 'IoT Sensor Logs', value: '', width: 3 }
        ]
      },
      {
        title: 'Production & Quality Metrics',
        fields: [
          { name: 'goodUnits', label: 'Good Units', value: '', width: 3 },
          { name: 'rejectedUnits', label: 'Rejected Units', value: '', width: 3 },
          { name: 'reworkUnits', label: 'Rework Units', value: '', width: 3 },
          { name: 'defectCode', label: 'Defect Code (if any)', value: '', width: 3 },
          { name: 'productionYield', label: 'Production Yield (%)', value: '', width: 3 },
          { name: 'cycleTimeUnit', label: 'Cycle Time per Unit (mins)', value: '', width: 3 },
          { name: 'downtime', label: 'Downtime (mins)', value: '', width: 3 },
          { name: 'downtimeReason', label: 'Downtime Reason (if any)', value: '', width: 3 }
        ]
      },
      {
        title: 'Energy & Environmental Data',
        fields: [
          { name: 'energy', label: 'Energy Consumption (kWh)', value: '', width: 2 },
          { name: 'voltage', label: 'Voltage (V)', value: '', width: 2 },
          { name: 'temperature', label: 'Temperature (C)', value: '', width: 2 },
          { name: 'humidity', label: 'Humidity (%)', value: '', width: 2 },
          { name: 'ambient', label: 'Ambient Condition', value: '', width: 4 }
        ]
      },
      {
        title: 'Remarks & Approval',
        fields: [
          { name: 'remarks', label: 'Remarks', value: '', width: 5 },
          { name: 'approvedBy', label: 'Approved By (Manager) *', value: '', width: 3 },
          { name: 'approvalTime', label: 'Approval Time *', value: '', width: 2 },
          { name: 'signature', label: 'Signature', value: '', width: 2 }
        ]
      }
    ]
  },
  'logistics-trail': {
    ...emptySideData,
    type: 'logistics-trail',
    title: 'Manufacturing Logistics Trail Entry',
    subtitle:
      'Record internal material or product movement between locations',
    role: '',
    listPath: `${basePath}/logistics-trail`,
    sections: [
      {
        title: 'Transfer Information',
        fields: [
          { name: 'internalTransferId', label: 'Log ID *', value: '', autoGenerate: true, readOnly: true, width: 3 },
          { name: 'transferDateTime', label: 'Transfer Date & Time *', value: '', width: 3 },
          { name: 'movementType', label: 'Movement Type *', value: '', options: ['Internal Transfer', 'Issue to Production', 'Return to Store'], width: 3 },
          { name: 'reference', label: 'Reference (WO / Batch / Others)', value: '', width: 3 },
          { name: 'priority', label: 'Priority', value: '', options: ['Normal', 'Urgent'], width: 3 },
          { name: 'reason', label: 'Reason for Transfer *', value: '', options: ['Production', 'Quality', 'Rework', 'Storage'], width: 3 },
          { name: 'materialType', label: 'Material / Item Type *', value: '', options: ['Finished Product', 'Raw Material', 'Component'], width: 3 },
          { name: 'productDetails', label: 'Item / Product Details *', value: '', width: 3 }
        ]
      },
      {
        title: 'Source Information',
        fields: [
          { name: 'fromWarehouse', label: 'Warehouse / Location (From) *', value: '', width: 3 },
          { name: 'sourceZone', label: 'Area / Zone', value: '', width: 3 },
          { name: 'sourceBin', label: 'Bin / Shelf No.', value: '', width: 3 },
          { name: 'batchLotNo', label: 'Batch / Lot No.', value: '', width: 3 },
          { name: 'availableQuantity', label: 'Quantity Available', value: '', width: 3 },
          { name: 'uom', label: 'UOM', value: '', options: ['pcs', 'kg', 'mtr', 'ltr'], width: 3 },
          { name: 'quantityTransfer', label: 'Quantity to Transfer *', value: '', width: 3 },
          { name: 'serialRange', label: 'Serial / Batch Range (if applicable)', value: '', width: 3 }
        ]
      },
      {
        title: 'Destination Information',
        fields: [
          { name: 'toWarehouse', label: 'Warehouse / Location (To) *', value: '', width: 3 },
          { name: 'destinationZone', label: 'Area / Zone', value: '', width: 3 },
          { name: 'destinationBin', label: 'Bin / Shelf No.', value: '', width: 3 },
          { name: 'purpose', label: 'Expected Use / Purpose', value: '', width: 3 },
          { name: 'requiredBy', label: 'Required By (Date & Time)', value: '', width: 3 },
          { name: 'linkedWorkOrder', label: 'Linked Work Order', value: '', width: 3 },
          { name: 'linkedProductionOrder', label: 'Linked Production Order', value: '', width: 3 },
          { name: 'endProduct', label: 'End Product', value: '', width: 3 }
        ]
      },
      {
        title: 'Logistics & Handling Details',
        fields: [
          { name: 'handledBy', label: 'Handled By (Operator) *', value: '', width: 3 },
          { name: 'movementMethod', label: 'Movement Method *', value: '', options: ['Manual', 'Forklift', 'Trolley', 'Conveyor'], width: 3 },
          { name: 'packagingCondition', label: 'Packaging Condition *', value: '', options: ['Good', 'Damaged', 'Repacked'], width: 3 },
          { name: 'vehicle', label: 'Transport Device / Vehicle', value: '', width: 3 },
          { name: 'packagingId', label: 'Packaging / Container ID', value: '', width: 3 },
          { name: 'tagId', label: 'Seal / Tag / RFID (if any)', value: '', width: 3 },
          { name: 'conditionTransfer', label: 'Condition on Transfer *', value: '', options: ['Good', 'Hold', 'Damaged'], width: 3 },
          { name: 'transitDelay', label: 'Transit Delay (mins)', value: '', width: 3 }
        ]
      },
      {
        title: 'Verification & Approval',
        fields: [
          { name: 'checkedBy', label: 'Checked By (Supervisor)', value: '', width: 3 },
          { name: 'verificationTime', label: 'Verification Time', value: '', width: 3 },
          { name: 'status', label: 'Status *', value: '', options: ['Completed', 'Pending', 'On Hold'], width: 3 },
          { name: 'remarks', label: 'Remarks', value: '', width: 3 }
        ]
      }
    ]
  }
};
