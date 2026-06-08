import { useContext, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import { useParams } from 'react-router-dom';
import { TitleContext } from 'src/contexts/TitleContext';
import { useDispatch, useSelector } from 'src/store';
import { getSingleWorkOrder } from 'src/slices/workOrder';
import { getSingleAsset } from 'src/slices/asset';
import { getWorkOrderHistories } from 'src/slices/workOrderHistory';
import {
  DetailField,
  EmptyIntegrationPanel,
  KpiCard,
  StatusBadge,
  TimelineList
} from './components';
import {
  formatDate,
  getSlaRemaining,
  getTicketCode,
  getUserName
} from './helpers';

const checklist = [
  'Safety & Compliance',
  'Visual Inspection',
  'Electrical Checks',
  'Functional Testing'
];

function OnsiteTrackingPage() {
  const theme = useTheme();
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const { setTitle } = useContext(TitleContext);
  const { singleWorkOrder } = useSelector((state) => state.workOrders);
  const { assetInfos } = useSelector((state) => state.assets);
  const { workOrderHistories } = useSelector((state) => state.workOrderHistories);

  useEffect(() => {
    setTitle('Onsite Tracking');
  }, [setTitle]);

  useEffect(() => {
    if (ticketId) {
      // TODO backend: replace work-order polling with live visit updates.
      dispatch(getSingleWorkOrder(Number(ticketId)));
      dispatch(getWorkOrderHistories(Number(ticketId)));
    }
  }, [dispatch, ticketId]);

  useEffect(() => {
    if (singleWorkOrder?.asset?.id) {
      dispatch(getSingleAsset(singleWorkOrder.asset.id));
    }
  }, [dispatch, singleWorkOrder?.asset?.id]);

  const asset = singleWorkOrder?.asset?.id
    ? assetInfos[singleWorkOrder.asset.id]?.asset
    : null;
  const histories = ticketId ? workOrderHistories[Number(ticketId)] || [] : [];
  const timeline = useMemo(
    () =>
      histories.length
        ? histories.map((item) => ({ label: item.name, time: item.createdAt }))
        : [
            { label: 'Check-in', time: singleWorkOrder?.updatedAt },
            { label: 'Diagnosis started' },
            { label: 'Root cause identified' },
            { label: 'Repair / replacement' },
            { label: 'Testing' },
            { label: 'Visit completed', time: singleWorkOrder?.completedOn }
          ],
    [histories, singleWorkOrder]
  );

  if (!singleWorkOrder) {
    return (
      <Box p={{ xs: 2, md: 4 }}>
        <Typography>Loading onsite tracking...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Onsite Tracking</title>
      </Helmet>
      <Box p={{ xs: 2, md: 4 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h2">Onsite Tracking</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {getTicketCode(singleWorkOrder)} • {singleWorkOrder.title}
            </Typography>
          </Box>
          <Button startIcon={<RefreshTwoToneIcon />} variant="outlined">
            Refresh Location
          </Button>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={2}><KpiCard label="Engineers onsite" value={singleWorkOrder.primaryUser ? 1 : 0} tone={theme.palette.primary.main} /></Grid>
          <Grid item xs={12} sm={6} lg={2}><KpiCard label="Active visits" value={singleWorkOrder.status === 'IN_PROGRESS' ? 1 : 0} tone={theme.palette.info.main} /></Grid>
          <Grid item xs={12} sm={6} lg={2}><KpiCard label="Completed today" value={singleWorkOrder.completedOn ? 1 : 0} tone={theme.palette.success.main} /></Grid>
          <Grid item xs={12} sm={6} lg={2}><KpiCard label="Avg. response time" value="-" tone={theme.palette.warning.main} /></Grid>
          <Grid item xs={12} sm={6} lg={2}><KpiCard label="Avg. resolution time" value="-" tone={theme.palette.secondary.main} /></Grid>
          <Grid item xs={12} sm={6} lg={2}><KpiCard label="CSAT score" value="-" tone={theme.palette.success.dark} /></Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Visit Information</Typography>
                <Stack spacing={1.5}>
                  <DetailField label="Ticket ID" value={getTicketCode(singleWorkOrder)} />
                  <DetailField label="Asset Name" value={asset?.name || singleWorkOrder.asset?.name} />
                  <DetailField label="Location" value={asset?.location?.name || singleWorkOrder.location?.name} />
                  <DetailField label="Assigned Engineer" value={getUserName(singleWorkOrder.primaryUser)} />
                  <DetailField label="Started At" value={formatDate(singleWorkOrder.updatedAt)} />
                  <DetailField label="Status" value={<StatusBadge status={singleWorkOrder.status} />} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Live Status Timeline</Typography>
                {/* TODO backend: subscribe to engineer check-in/check-out and live visit events. */}
                <TimelineList items={timeline} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Location (Live)</Typography>
                {/* TODO backend: feed real map/location data from mobile field app GPS. */}
                <Box
                  sx={{
                    height: 190,
                    borderRadius: 1,
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <Typography color="text.secondary">Live map pending backend coordinates</Typography>
                </Box>
                <DetailField label="Live Location" value={asset?.location ? `${asset.location.latitude}, ${asset.location.longitude}` : '-'} />
                <DetailField label="Last Updated" value={formatDate(singleWorkOrder.updatedAt)} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Engineer Details</Typography>
                <DetailField label="Engineer" value={getUserName(singleWorkOrder.primaryUser)} />
                <DetailField label="Team" value={singleWorkOrder.team?.name} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Quick Actions</Typography>
                {/* TODO backend: wire checklist save, part request, check-out, and escalation workflow. */}
                <Stack spacing={1}>
                  <Button variant="outlined">Check Out</Button>
                  <Button variant="outlined">Request Part</Button>
                  <Button variant="outlined">Escalate</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Status / SLA</Typography>
                <StatusBadge status={singleWorkOrder.status} />
                <Box sx={{ mt: 2 }}>
                  <DetailField label="SLA Countdown" value={getSlaRemaining(singleWorkOrder)} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography variant="h4" sx={{ mb: 2 }}>Checklist</Typography>
                {checklist.map((item) => (
                  <Stack key={item} direction="row" alignItems="center" spacing={1}>
                    <Checkbox size="small" disabled />
                    <Typography variant="body2">{item}</Typography>
                  </Stack>
                ))}
                <Typography variant="caption" color="text.secondary">Overall Progress</Typography>
                <LinearProgress value={0} variant="determinate" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <EmptyIntegrationPanel title="Spare Parts" />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* TODO backend: implement engineer completion, customer verification, QA review, and approval workflow state. */}
            <EmptyIntegrationPanel title="Approval" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default OnsiteTrackingPage;
