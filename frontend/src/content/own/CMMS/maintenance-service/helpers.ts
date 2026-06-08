import WorkOrder, { Priority } from 'src/models/owns/workOrder';
import { AssetDTO, AssetMiniDTO } from 'src/models/owns/asset';
import { UserMiniDTO } from 'src/models/user';

export const maintenanceStatuses = [
  'OPEN',
  'IN_PROGRESS',
  'ON_HOLD',
  'COMPLETE'
] as const;

export const priorityLabels: Record<Priority, string> = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  NONE: 'None'
};

export function formatDate(value?: string) {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

export function formatDateOnly(value?: string) {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString();
}

export function getUserName(user?: UserMiniDTO | null) {
  if (!user) return '-';

  return [user.firstName, user.lastName].filter(Boolean).join(' ') || '-';
}

export function getTicketCode(ticket?: WorkOrder | null) {
  if (!ticket) return '-';

  return ticket.customId || `WO-${ticket.id}`;
}

export function getAssetCode(asset?: AssetDTO | AssetMiniDTO | null) {
  if (!asset) return '-';

  return asset.customId || String(asset.id);
}

export function getSlaRemaining(ticket: WorkOrder) {
  if (!ticket.dueDate) return '-';

  const due = new Date(ticket.dueDate).getTime();
  if (Number.isNaN(due)) return '-';

  const hours = Math.ceil((due - Date.now()) / 36e5);
  if (hours < 0) return 'Overdue';
  if (hours < 24) return `${hours}h`;

  return `${Math.ceil(hours / 24)}d`;
}

export function statusColor(status?: string) {
  if (status === 'COMPLETE') return 'success';
  if (status === 'IN_PROGRESS') return 'info';
  if (status === 'ON_HOLD') return 'warning';
  if (status === 'OPEN') return 'primary';

  return 'default';
}

export function priorityColor(priority?: Priority) {
  if (priority === 'HIGH') return 'error';
  if (priority === 'MEDIUM') return 'warning';
  if (priority === 'LOW') return 'success';

  return 'default';
}

export function emptyValue(value?: string | number | null) {
  if (value === undefined || value === null || value === '') return '-';

  return value;
}
