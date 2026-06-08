import { useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router-dom';
import { TitleContext } from 'src/contexts/TitleContext';
import { useDispatch, useSelector } from 'src/store';
import { deleteWorkOrder, getWorkOrders } from 'src/slices/workOrder';
import WorkOrder from 'src/models/owns/workOrder';
import { SearchCriteria } from 'src/models/owns/page';
import { KpiCard, TicketTable } from './components';
import { maintenanceStatuses } from './helpers';

function DashboardPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle } = useContext(TitleContext);
  const { workOrders, loadingGet } = useSelector((state) => state.workOrders);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('ALL');

  useEffect(() => {
    setTitle('Maintenance & Service Log');
  }, [setTitle]);

  useEffect(() => {
    const filterFields: SearchCriteria['filterFields'] = [
      {
        field: 'archived',
        operation: 'eq',
        value: false
      }
    ];

    if (status !== 'ALL') {
      filterFields.push({
        field: 'status',
        operation: 'eq',
        value: status,
        enumName: 'STATUS'
      });
    }

    if (query.trim()) {
      filterFields.push({
        field: 'title',
        operation: 'cn',
        value: query.trim()
      });
    }

    // TODO backend: replace the generic work-order search with a dedicated
    // maintenance ticket list endpoint when ticket-specific fields exist.
    dispatch(
      getWorkOrders({
        filterFields,
        pageNum: 0,
        pageSize: 25,
        sortField: 'updatedAt',
        direction: 'DESC'
      })
    );
  }, [dispatch, query, status]);

  const kpis = useMemo(() => {
    const tickets = workOrders.content;
    return {
      open: tickets.filter((ticket) => ticket.status === 'OPEN').length,
      progress: tickets.filter((ticket) => ticket.status === 'IN_PROGRESS').length,
      hold: tickets.filter((ticket) => ticket.status === 'ON_HOLD').length,
      resolved: tickets.filter((ticket) => ticket.status === 'COMPLETE').length
    };
  }, [workOrders.content]);

  const handleDelete = (ticket: WorkOrder) => {
    // TODO backend: confirm delete permissions and audit reason for maintenance tickets.
    dispatch(deleteWorkOrder(ticket.id));
  };

  return (
    <>
      <Helmet>
        <title>Maintenance & Service Log</title>
      </Helmet>
      <Box p={{ xs: 2, md: 4 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h2">Maintenance & Service Log</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Track open service tickets, SLA pressure, assignments, and onsite visits.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddTwoToneIcon />}
            onClick={() => navigate('/app/maintenance/new')}
          >
            New Ticket
          </Button>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <KpiCard label="Open Tickets" value={kpis.open} tone={theme.palette.primary.main} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <KpiCard label="In Progress" value={kpis.progress} tone={theme.palette.info.main} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <KpiCard label="On Hold" value={kpis.hold} tone={theme.palette.warning.main} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <KpiCard label="Resolved" value={kpis.resolved} tone={theme.palette.success.main} />
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            label="Search tickets"
            value={query}
            onChange={(event) => {
              // TODO backend: move full ticket search to a maintenance endpoint
              // that searches ticket ID, customer, asset, complaint, and engineer.
              setQuery(event.target.value);
            }}
          />
          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            sx={{ minWidth: { md: 220 } }}
          >
            <MenuItem value="ALL">All statuses</MenuItem>
            {maintenanceStatuses.map((item) => (
              <MenuItem key={item} value={item}>
                {item.replaceAll('_', ' ')}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <TicketTable
          tickets={workOrders.content}
          loading={loadingGet}
          onView={(ticket) => {
            // TODO backend: route by immutable ticket UUID when available.
            navigate(`/app/maintenance/${ticket.id}`);
          }}
          onEdit={(ticket) => navigate(`/app/work-orders/${ticket.id}`)}
          onDelete={handleDelete}
          onOnsite={(ticket) => navigate(`/app/maintenance/onsite/${ticket.id}`)}
        />
      </Box>
    </>
  );
}

export default DashboardPage;
