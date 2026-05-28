import {
  useContext,
  useEffect
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import {
  Link as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';

import { manufacturingLogSections } from './mockData';
import type { ManufacturingLogType } from './types';

function LogDetailPage({
  type
}: {
  type: ManufacturingLogType;
}) {
  const navigate = useNavigate();
  const { logId = '' } = useParams();
  const { setTitle } =
    useContext(TitleContext);

  const section =
    manufacturingLogSections.find(
      (item) => item.type === type
    ) || manufacturingLogSections[0];

  const decodedLogId =
    decodeURIComponent(logId);

  // TODO(API): Replace mock row lookup with GET /api/manufacturing-execution-log/:type/:id.
  const row =
    section.rows.find(
      (item) => item[0] === decodedLogId
    ) || section.rows[0];

  useEffect(() => {
    setTitle(`${section.title} Details`);
  }, [section.title, setTitle]);

  return (
    <>
      <Helmet>
        <title>
          {section.title} Details
        </title>
      </Helmet>

      <Box p={{ xs: 2, md: 4 }}>
        <Stack spacing={2.5}>
          <Stack spacing={1}>
            <Breadcrumbs>
              <Link
                component={RouterLink}
                to="/app/home"
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/app/manufacturing-execution-log"
              >
                Manufacturing Execution Log
              </Link>
              <Link
                component={RouterLink}
                to={section.listPath}
              >
                {section.title}
              </Link>
              <Typography>
                Details
              </Typography>
            </Breadcrumbs>

            <Stack
              direction={{
                xs: 'column',
                md: 'row'
              }}
              justifyContent="space-between"
              alignItems={{
                xs: 'stretch',
                md: 'center'
              }}
              spacing={2}
            >
              <Box>
                <Typography variant="h2">
                  {section.title} Details
                </Typography>
                <Typography color="text.secondary">
                  {row?.[0] || decodedLogId}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<ArrowBackTwoToneIcon />}
                onClick={() =>
                  navigate(section.listPath)
                }
              >
                Back to Full Log
              </Button>
            </Stack>
          </Stack>

          <Card>
            <CardContent>
              <Grid container spacing={2}>
                {section.columns.map(
                  (column, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={column}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {column}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ mt: 0.5 }}
                      >
                        {row?.[index] || '-'}
                      </Typography>
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </>
  );
}

export default LogDetailPage;
