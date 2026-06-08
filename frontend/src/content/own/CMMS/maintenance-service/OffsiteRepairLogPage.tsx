import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';

function OffsiteRepairLogPage() {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        <Typography variant="h3">Offsite / Factory Repair Log</Typography>
        <Card>
          <CardContent>
            <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
              <BuildCircleTwoToneIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h5" color="text.secondary">
                Coming Soon
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                This page is under construction. Offsite and factory repair log features will be available here.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default OffsiteRepairLogPage;
