export type ManufacturingLogType =
  | 'raw-materials'
  | 'components'
  | 'assembly-line'
  | 'logistics-trail';

export interface ManufacturingLogSection {
  type: ManufacturingLogType;
  number: number;
  title: string;
  description: string;
  addLabel: string;
  fullLogLabel: string;
  listPath: string;
  newPath: string;
  columns: string[];
  rows: string[][];
}

export interface EntryField {
  name: string;
  label: string;
  value: string;
  type?: string;
  options?: string[];
  multiline?: boolean;
  rows?: number;
  helperText?: string;
  width?: 2 | 3 | 4 | 5 | 6 | 8 | 12;
}

export interface EntrySection {
  title: string;
  fields: EntryField[];
}

export interface PreviewDetail {
  label: string;
  value: string;
}

export interface AttachmentItem {
  name: string;
  size: string;
}

export interface ManufacturingEntryConfig {
  type: ManufacturingLogType;
  title: string;
  subtitle: string;
  role: string;
  listPath: string;
  sections: EntrySection[];
  previewTitle: string;
  previewImage: string;
  previewDetails: PreviewDetail[];
  summaryTitle: string;
  summaryDetails: PreviewDetail[];
  checklistTitle: string;
  checklist: string[];
  attachments?: AttachmentItem[];
}
