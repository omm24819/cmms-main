import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone';

function OnsiteMaintenancePage() {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        <Typography variant="h3">On-site Maintenance Tracking</Typography>
        <Card>
          <CardContent>
            <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
              <ConstructionTwoToneIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h5" color="text.secondary">
                Coming Soon
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                This page is under construction. On-site maintenance tracking features will be available here.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default OnsiteMaintenancePage;
