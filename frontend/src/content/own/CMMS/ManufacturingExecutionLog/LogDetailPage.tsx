import {
  useContext,
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import { Helmet } from 'react-helmet-async';

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
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

import type {
  ManufacturingLogType
} from './types';

function LogDetailPage({
  type
}: {
  type: ManufacturingLogType;
}) {

  const navigate = useNavigate();

  const { logId = '' } =
    useParams();

  const { setTitle } =
    useContext(TitleContext);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [logDetails, setLogDetails] =
    useState<any>(null);

  const section =
    manufacturingLogSections.find(
      (item) => item.type === type
    ) || manufacturingLogSections[0];

  const decodedLogId =
    decodeURIComponent(logId);

  useEffect(() => {

    setTitle(
      `${section.title} Details`
    );

  }, [
    section.title,
    setTitle
  ]);

  useEffect(() => {

    fetchLogDetails();

  }, [decodedLogId]);

  const fetchLogDetails = async () => {
  try {
    setLoading(true);

    const token =
      localStorage.getItem(
        'accessToken'
      );

    let response;

    switch (type) {
      case 'raw-materials':
        response = await axios.get(
          `http://localhost:8080/api/raw-material-procurement/log/${decodedLogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        break;

      case 'components':
        response = await axios.get(
          `http://localhost:8080/api/component-manufacturing/${decodedLogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        break;

      case 'assembly-line':
        response = await axios.get(
          `http://localhost:8080/api/assembly-line-tracking/${decodedLogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        break;

      case 'logistics-trail':
        response = await axios.get(
          `http://localhost:8080/api/manufacturing-logistics-trail/${decodedLogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        break;

      default:
        throw new Error(
          'Unsupported log type'
        );
    }

    setLogDetails(response.data);
  } catch (err: any) {
    console.error(err);

    setError(
      err?.response?.data?.message ||
        'Failed to load details'
    );
  } finally {
    setLoading(false);
  }
};

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
                  {section.title}
                  {' '}
                  Details
                </Typography>

                <Typography color="text.secondary">
                  {
                    logDetails?.logUid ||
                    decodedLogId
                  }
                </Typography>

              </Box>

              <Button
                variant="outlined"
                startIcon={
                  <ArrowBackTwoToneIcon />
                }
                onClick={() =>
                  navigate(
                    section.listPath
                  )
                }
              >
                Back to Full Log
              </Button>

            </Stack>

          </Stack>

          <Card>

            <CardContent>

              {loading ? (

                <Box
                  display="flex"
                  justifyContent="center"
                  py={4}
                >
                  <CircularProgress />
                </Box>

              ) : error ? (

                <Alert severity="error">
                  {error}
                </Alert>

              ) : (

                <Grid
                  container
                  spacing={3}
                >

                  {Object.entries(
                    logDetails || {}
                  ).map(
                    ([key, value]) => (

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={key}
                      >

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {key
                            .replace(
                              /([A-Z])/g,
                              ' $1'
                            )
                            .replace(
                              /^./,
                              (
                                str
                              ) =>
                                str.toUpperCase()
                            )}
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          sx={{
                            mt: 0.5,
                            wordBreak:
                              'break-word'
                          }}
                        >
                          {value === null ||
                          value ===
                            undefined ||
                          value === ''
                            ? '-'
                            : String(
                                value
                              )}
                        </Typography>

                      </Grid>
                    )
                  )}

                </Grid>

              )}

            </CardContent>

          </Card>

        </Stack>

      </Box>
    </>
  );
}

export default LogDetailPage;