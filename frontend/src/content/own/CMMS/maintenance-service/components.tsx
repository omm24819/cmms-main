import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import type { ReactNode } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import WorkOrder, { Priority } from 'src/models/owns/workOrder';
import { AssetDTO } from 'src/models/owns/asset';
import {
  emptyValue,
  formatDate,
  formatDateOnly,
  getAssetCode,
  getSlaRemaining,
  getTicketCode,
  getUserName,
  priorityColor,
  priorityLabels,
  statusColor
} from './helpers';

interface KpiCardProps {
  label: string;
  value: number | string;
  tone: string;
  helper?: string;
}

export function KpiCard({ label, value, tone, helper }: KpiCardProps) {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', borderRadius: 1, boxShadow: 'none' }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1,
              bgcolor: alpha(tone, 0.12),
              color: tone,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AddTwoToneIcon fontSize="small" />
          </Box>
          <Box minWidth={0}>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
              {value}
            </Typography>
            {helper && (
              <Typography variant="caption" color="text.secondary">
                {helper}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function StatusBadge({ status }: { status?: string }) {
  return (
    <Chip
      size="small"
      label={(status || 'UNKNOWN').replaceAll('_', ' ')}
      color={statusColor(status) as any}
      variant="outlined"
    />
  );
}

export function PriorityBadge({ priority }: { priority?: Priority }) {
  return (
    <Chip
      size="small"
      label={priority ? priorityLabels[priority] : '-'}
      color={priorityColor(priority) as any}
      variant="outlined"
    />
  );
}

interface TicketTableProps {
  tickets: WorkOrder[];
  loading?: boolean;
  onView: (ticket: WorkOrder) => void;
  onEdit: (ticket: WorkOrder) => void;
  onDelete: (ticket: WorkOrder) => void;
  onOnsite: (ticket: WorkOrder) => void;
}

export function TicketTable({
  tickets,
  loading,
  onView,
  onEdit,
  onDelete,
  onOnsite
}: TicketTableProps) {
  return (
    <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
      {loading && <LinearProgress />}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Product UID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Complaint Category</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Assigned Engineer</TableCell>
              <TableCell>SLA Remaining</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reported Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} hover>
                <TableCell>{getTicketCode(ticket)}</TableCell>
                <TableCell>{getAssetCode(ticket.asset)}</TableCell>
                <TableCell>{ticket.customers?.[0]?.name || '-'}</TableCell>
                <TableCell>{ticket.category?.name || '-'}</TableCell>
                <TableCell>
                  <PriorityBadge priority={ticket.priority} />
                </TableCell>
                <TableCell>{getUserName(ticket.primaryUser)}</TableCell>
                <TableCell>{getSlaRemaining(ticket)}</TableCell>
                <TableCell>
                  <StatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>{formatDateOnly(ticket.createdAt)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <Tooltip title="View ticket">
                      <IconButton size="small" onClick={() => onView(ticket)}>
                        <VisibilityTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit ticket">
                      <IconButton size="small" onClick={() => onEdit(ticket)}>
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete ticket">
                      <IconButton size="small" onClick={() => onDelete(ticket)}>
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Onsite tracking">
                      <IconButton size="small" onClick={() => onOnsite(ticket)}>
                        <LocationOnTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Open details">
                      <IconButton size="small" onClick={() => onView(ticket)}>
                        <LaunchTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {!tickets.length && !loading && (
              <TableRow>
                <TableCell colSpan={10}>
                  <Box py={5} textAlign="center">
                    <Typography variant="h4">No maintenance tickets found</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      Tickets will appear here after work orders are available from the backend.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export function FormSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </CardContent>
    </Card>
  );
}

export function DetailField({
  label,
  value
}: {
  label: string;
  value?: ReactNode;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {emptyValue(value as any)}
      </Typography>
    </Box>
  );
}

export function AssetQuickInfo({ asset }: { asset?: AssetDTO | null }) {
  const imageUrl = asset?.image?.url;

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 'none',
        position: { md: 'sticky' },
        top: { md: 96 }
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Asset Quick Info
        </Typography>
        <Box
          sx={{
            height: 140,
            borderRadius: 1,
            bgcolor: 'action.hover',
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mb: 2
          }}
        />
        <Stack spacing={1.5}>
          <DetailField label="Product UID" value={asset ? getAssetCode(asset) : '-'} />
          <DetailField label="Product Name" value={asset?.name} />
          <DetailField label="Model Number" value={asset?.model} />
          <DetailField label="Serial Number" value={asset?.serialNumber} />
          <DetailField label="Location" value={asset?.location?.name} />
          <DetailField label="Status" value={asset?.status?.replaceAll('_', ' ')} />
          <DetailField label="Installation Date" value={formatDateOnly(asset?.inServiceDate)} />
          <DetailField label="Warranty Status" value={asset?.warrantyExpirationDate ? `Until ${formatDateOnly(asset.warrantyExpirationDate)}` : '-'} />
          <DetailField label="AMC Status" value="-" />
        </Stack>
      </CardContent>
    </Card>
  );
}

export function TimelineList({
  items
}: {
  items: { label: string; time?: string; helper?: string }[];
}) {
  return (
    <Stack spacing={0}>
      {items.map((item, index) => (
        <Stack key={`${item.label}-${index}`} direction="row" spacing={2}>
          <Stack alignItems="center">
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: index === 0 ? 'primary.main' : 'divider',
                mt: 0.75
              }}
            />
            {index < items.length - 1 && (
              <Divider orientation="vertical" flexItem sx={{ minHeight: 42 }} />
            )}
          </Stack>
          <Box sx={{ pb: 2 }}>
            <Typography variant="body2">{item.label}</Typography>
            <Typography variant="caption" color="text.secondary">
              {item.time ? formatDate(item.time) : item.helper || 'Pending'}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

export function EmptyIntegrationPanel({ title }: { title: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        No backend records are available for this maintenance-specific section yet.
      </Typography>
    </Paper>
  );
}
