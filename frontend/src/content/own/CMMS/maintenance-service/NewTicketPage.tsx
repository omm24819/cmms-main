import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import { useNavigate } from 'react-router-dom';
import { TitleContext } from 'src/contexts/TitleContext';
import { useDispatch, useSelector } from 'src/store';
import { getAssetsMini, getSingleAsset } from 'src/slices/asset';
import { getCustomersMini } from 'src/slices/customer';
import { getLocationsMini } from 'src/slices/location';
import { getUsersMini } from 'src/slices/user';
import { addWorkOrder } from 'src/slices/workOrder';
import { AssetQuickInfo, FormSection } from './components';

function NewTicketPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle } = useContext(TitleContext);
  const { assetsMini, assetInfos } = useSelector((state) => state.assets);
  const { customersMini } = useSelector((state) => state.customers);
  const { locationsMini } = useSelector((state) => state.locations);
  const { usersMini } = useSelector((state) => state.users);
  const [assetId, setAssetId] = useState('');
  const [title, setTitleValue] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [customerId, setCustomerId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [engineerId, setEngineerId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    setTitle('New Maintenance Ticket');
  }, [setTitle]);

  useEffect(() => {
    dispatch(getAssetsMini());
    dispatch(getCustomersMini());
    dispatch(getLocationsMini());
    dispatch(getUsersMini());
  }, [dispatch]);

  useEffect(() => {
    if (assetId) {
      // TODO backend: auto-fetch the richer Product Lifecycle Log asset profile
      // by Product UID or serial number once that lookup endpoint exists.
      dispatch(getSingleAsset(Number(assetId)));
    }
  }, [assetId, dispatch]);

  const selectedAsset = assetId ? assetInfos[Number(assetId)]?.asset : null;
  const selectedAssetMini = useMemo(
    () => assetsMini.find((asset) => String(asset.id) === assetId),
    [assetId, assetsMini]
  );
  const effectiveLocationId = locationId || String(selectedAssetMini?.locationId || '');

  const handleSubmit = async (event: FormEvent, draft = false) => {
    event.preventDefault();

    const payload = {
      title,
      description,
      priority,
      status: draft ? 'ON_HOLD' : 'OPEN',
      asset: assetId ? { id: Number(assetId) } : null,
      location: effectiveLocationId ? { id: Number(effectiveLocationId) } : null,
      customers: customerId ? [{ id: Number(customerId) }] : [],
      primaryUser: engineerId ? { id: Number(engineerId) } : null,
      dueDate: dueDate || null,
      estimatedStartDate: null,
      estimatedDuration: null,
      files: [],
      requiredSignature: false
    };

    // TODO backend: persist maintenance-only fields such as SLA level, AMC
    // status, warranty status, preferred visit slot, and attachments.
    // TODO backend: call a draft-specific API when draft lifecycle exists.
    await dispatch(addWorkOrder(payload));
    navigate('/app/maintenance');
  };

  return (
    <>
      <Helmet>
        <title>New Maintenance Ticket</title>
      </Helmet>
      <Box p={{ xs: 2, md: 4 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h2">New Maintenance Ticket</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Create a service ticket using live assets, customers, locations, and users.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button onClick={() => navigate('/app/maintenance')}>Cancel</Button>
            <Button
              variant="outlined"
              startIcon={<SaveTwoToneIcon />}
              onClick={(event) => handleSubmit(event as any, true)}
            >
              Save as Draft
            </Button>
            <Button
              variant="contained"
              startIcon={<SendTwoToneIcon />}
              onClick={(event) => handleSubmit(event as any)}
            >
              Create Ticket
            </Button>
          </Stack>
        </Stack>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Stack spacing={3}>
                <FormSection title="Section 1 - Ticket Info">
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Ticket ID" value="Auto-generated" disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Reported Date & Time" value="Auto-captured" disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Reported By" value="Current user" disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Customer" value={customerId} onChange={(event) => setCustomerId(event.target.value)}>
                      {customersMini.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Product UID / Serial No." value={assetId} onChange={(event) => setAssetId(event.target.value)}>
                      {assetsMini.map((asset) => (
                        <MenuItem key={asset.id} value={asset.id}>{asset.customId || asset.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Site Location" value={effectiveLocationId} onChange={(event) => setLocationId(event.target.value)}>
                      {locationsMini.map((location) => (
                        <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </FormSection>

                <FormSection title="Section 2 - Complaint Details">
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth required label="Complaint Category" value={title} onChange={(event) => setTitleValue(event.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Severity Level" value={priority} onChange={(event) => setPriority(event.target.value)}>
                      <MenuItem value="HIGH">High</MenuItem>
                      <MenuItem value="MEDIUM">Medium</MenuItem>
                      <MenuItem value="LOW">Low</MenuItem>
                      <MenuItem value="NONE">None</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="SLA Level" placeholder="Backend field pending" disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField multiline minRows={4} fullWidth label="Problem Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                  </Grid>
                </FormSection>

                <FormSection title="Section 3 - Assignment">
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Assigned Engineer" value={engineerId} onChange={(event) => setEngineerId(event.target.value)}>
                      {usersMini.map((user) => (
                        <MenuItem key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Maintenance Type" value={maintenanceType} onChange={(event) => setMaintenanceType(event.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField select fullWidth label="Preventive / Corrective" defaultValue="Corrective">
                      <MenuItem value="Preventive">Preventive</MenuItem>
                      <MenuItem value="Corrective">Corrective</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth label="AMC Status" placeholder="Backend field pending" disabled />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth label="Warranty Status" placeholder="Derived from asset" disabled />
                  </Grid>
                </FormSection>

                <FormSection title="Section 4 - Scheduling">
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth type="date" label="Preferred Visit Date" InputLabelProps={{ shrink: true }} value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Preferred Time Slot" placeholder="Backend field pending" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline minRows={3} label="Additional Remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} />
                  </Grid>
                </FormSection>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={4}>
              <AssetQuickInfo asset={selectedAsset} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default NewTicketPage;
