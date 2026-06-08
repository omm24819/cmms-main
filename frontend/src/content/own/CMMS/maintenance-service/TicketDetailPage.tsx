import { useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import { useNavigate, useParams } from 'react-router-dom';
import { TitleContext } from 'src/contexts/TitleContext';
import { useDispatch, useSelector } from 'src/store';
import { getSingleWorkOrder, getPDFReport } from 'src/slices/workOrder';
import { getSingleAsset, getAssetWorkOrders } from 'src/slices/asset';
import { getWorkOrderHistories } from 'src/slices/workOrderHistory';
import { getParts } from 'src/slices/part';
import {
  AssetQuickInfo,
  DetailField,
  EmptyIntegrationPanel,
  PriorityBadge,
  StatusBadge,
  TimelineList
} from './components';
import {
  formatDate,
  formatDateOnly,
  getAssetCode,
  getSlaRemaining,
  getTicketCode,
  getUserName
} from './helpers';

const tabs = [
  'Ticket Details',
  'Asset Info',
  'Diagnosis',
  'Repair & Resolution',
  'Spare Parts',
  'Documents',
  'Activity Log'
];

function TicketDetailPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle } = useContext(TitleContext);
  const { singleWorkOrder } = useSelector((state) => state.workOrders);
  const { assetInfos } = useSelector((state) => state.assets);
  const { parts } = useSelector((state) => state.parts);
  const { workOrderHistories } = useSelector((state) => state.workOrderHistories);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTitle('Ticket Detail');
  }, [setTitle]);

  useEffect(() => {
    if (ticketId) {
      // TODO backend: fetch maintenance ticket by ticket UUID when the
      // maintenance service has its own endpoint.
      dispatch(getSingleWorkOrder(Number(ticketId)));
      dispatch(getWorkOrderHistories(Number(ticketId)));
    }
  }, [dispatch, ticketId]);

  useEffect(() => {
    if (singleWorkOrder?.asset?.id) {
      dispatch(getSingleAsset(singleWorkOrder.asset.id));
      dispatch(getAssetWorkOrders(singleWorkOrder.asset.id));
    }
  }, [dispatch, singleWorkOrder?.asset?.id]);

  useEffect(() => {
    // TODO backend: replace broad parts search with ticket-specific spare part
    // requests and issued/installed quantities.
    dispatch(getParts({ filterFields: [], pageNum: 0, pageSize: 10 }));
  }, [dispatch]);

  const asset = singleWorkOrder?.asset?.id
    ? assetInfos[singleWorkOrder.asset.id]?.asset
    : null;

  const histories = ticketId ? workOrderHistories[Number(ticketId)] || [] : [];
  const previousTickets = singleWorkOrder?.asset?.id
    ? assetInfos[singleWorkOrder.asset.id]?.workOrders || []
    : [];

  const activityItems = useMemo(
    () =>
      histories.length
        ? histories.map((item) => ({
            label: item.name,
            time: item.createdAt,
            helper: getUserName(item.user as any)
          }))
        : [
            {
              label: 'Ticket Created',
              time: singleWorkOrder?.createdAt
            },
            {
              label: 'Assigned',
              time: singleWorkOrder?.updatedAt
            },
            { label: 'Diagnosis Started' },
            { label: 'Diagnosis Completed' },
            { label: 'Repair Started' },
            { label: 'Repair Completed' },
            { label: 'Testing Completed' },
            {
              label: 'Ticket Resolved',
              time: singleWorkOrder?.completedOn
            },
            { label: 'Customer Notified' }
          ],
    [histories, singleWorkOrder]
  );

  if (!singleWorkOrder) {
    return (
      <Box p={{ xs: 2, md: 4 }}>
        <Typography>Loading ticket...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>{getTicketCode(singleWorkOrder)}</title>
      </Helmet>
      <Box p={{ xs: 2, md: 4 }}>
        <Card
          sx={{
            borderRadius: 1,
            boxShadow: 'none',
            position: 'sticky',
            top: 0,
            zIndex: 5,
            mb: 3
          }}
        >
          <CardContent>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                  <Typography variant="h2">{getTicketCode(singleWorkOrder)}</Typography>
                  <StatusBadge status={singleWorkOrder.status} />
                  <PriorityBadge priority={singleWorkOrder.priority} />
                </Stack>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {singleWorkOrder.title}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button startIcon={<EditTwoToneIcon />} onClick={() => navigate(`/app/work-orders/${singleWorkOrder.id}`)}>
                  Edit Ticket
                </Button>
                <Button startIcon={<LocalPrintshopTwoToneIcon />}>Print</Button>
                <Button
                  startIcon={<FileDownloadTwoToneIcon />}
                  onClick={() => dispatch(getPDFReport(singleWorkOrder.id))}
                >
                  Export
                </Button>
                <Button
                  variant="contained"
                  startIcon={<LocationOnTwoToneIcon />}
                  onClick={() => navigate(`/app/maintenance/onsite/${singleWorkOrder.id}`)}
                >
                  Start Visit
                </Button>
              </Stack>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <DetailField label="SLA Countdown" value={getSlaRemaining(singleWorkOrder)} />
              </Grid>
              <Grid item xs={12} md={3}>
                <DetailField label="Assigned Engineer" value={getUserName(singleWorkOrder.primaryUser)} />
              </Grid>
              <Grid item xs={12} md={3}>
                <DetailField label="Reported On" value={formatDate(singleWorkOrder.createdAt)} />
              </Grid>
              <Grid item xs={12} md={3}>
                <DetailField label="Due Date" value={formatDateOnly(singleWorkOrder.dueDate)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 1, boxShadow: 'none' }}>
              <Tabs
                value={tab}
                onChange={(_event, value) => setTab(value)}
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map((item) => (
                  <Tab key={item} label={item} />
                ))}
              </Tabs>
              <CardContent>
                {tab === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}><DetailField label="Customer" value={singleWorkOrder.customers?.[0]?.name} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Site Location" value={singleWorkOrder.location?.name} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Complaint Category" value={singleWorkOrder.category?.name || singleWorkOrder.title} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Severity" value={singleWorkOrder.priority} /></Grid>
                    <Grid item xs={12}><DetailField label="Problem Description" value={singleWorkOrder.description} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Reported By" value={singleWorkOrder.parentRequest?.createdBy} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Reported Date" value={formatDate(singleWorkOrder.createdAt)} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Maintenance Type" value="-" /></Grid>
                  </Grid>
                )}

                {tab === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}><DetailField label="Product Name" value={asset?.name || singleWorkOrder.asset?.name} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Product UID" value={asset ? getAssetCode(asset) : getAssetCode(singleWorkOrder.asset)} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Category" value={asset?.category?.name} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Version" value={asset?.model} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Serial Number" value={asset?.serialNumber} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="MAC Address" value="-" /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Installation Date" value={formatDateOnly(asset?.inServiceDate)} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="AMC Status" value="-" /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Warranty Status" value={asset?.warrantyExpirationDate ? `Until ${formatDateOnly(asset.warrantyExpirationDate)}` : '-'} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Health Status" value={asset?.status?.replaceAll('_', ' ')} /></Grid>
                    <Grid item xs={12} md={6}><DetailField label="Previous Tickets" value={previousTickets.length} /></Grid>
                  </Grid>
                )}

                {tab === 2 && (
                  <>
                    {/* TODO backend: save diagnosis fields, fault codes, measured values, images, and recommended action. */}
                    <EmptyIntegrationPanel title="Diagnosis" />
                  </>
                )}

                {tab === 3 && (
                  <>
                    {/* TODO backend: save repair actions, downtime, costs, MTTR, testing notes, and closure approvals. */}
                    <EmptyIntegrationPanel title="Repair & Resolution" />
                  </>
                )}

                {tab === 4 && (
                  <Grid container spacing={2}>
                    {parts.content.map((part) => (
                      <Grid item xs={12} md={6} key={part.id}>
                        <Card variant="outlined" sx={{ borderRadius: 1 }}>
                          <CardContent>
                            <Typography variant="h4">{part.name}</Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                              Part #{part.id} • Available {part.quantity} {part.unit}
                            </Typography>
                            <Button sx={{ mt: 2 }} variant="outlined">Request Part</Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                    {!parts.content.length && (
                      <Grid item xs={12}>
                        <EmptyIntegrationPanel title="Spare Parts" />
                      </Grid>
                    )}
                  </Grid>
                )}

                {tab === 5 && (
                  <>
                    {/* TODO backend: connect document upload categories and maintenance-specific file metadata. */}
                    <Grid container spacing={2}>
                      {(singleWorkOrder.files || []).map((file) => (
                        <Grid item xs={12} md={6} key={file.id}>
                          <Card variant="outlined" sx={{ borderRadius: 1 }}>
                            <CardContent>
                              <Typography variant="h4">{file.name}</Typography>
                              <Typography color="text.secondary">{file.type}</Typography>
                              <Button href={file.url} target="_blank" sx={{ mt: 1 }}>View / Download</Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                      {!singleWorkOrder.files?.length && (
                        <Grid item xs={12}>
                          <EmptyIntegrationPanel title="Documents" />
                        </Grid>
                      )}
                    </Grid>
                  </>
                )}

                {tab === 6 && (
                  <>
                    {/* TODO backend: expose full maintenance activity timeline and status transition metadata. */}
                    <TimelineList items={activityItems} />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <AssetQuickInfo asset={asset} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default TicketDetailPage;
