// src/content/own/CMMS/ManufacturingExecutionLog/LogListPage.tsx

import {
  useContext,
  useEffect,
  useMemo,
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
  Chip,
  CircularProgress,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';

import { manufacturingLogSections } from './mockData';

import type {
  ManufacturingLogType
} from './types';

function LogListPage({
  type
}: {
  type: ManufacturingLogType;
}) {
  const navigate = useNavigate();

  const { setTitle } =
    useContext(TitleContext);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [rows, setRows] =
    useState<string[][]>([]);

  const [loading, setLoading] =
    useState(false);

  const [successOpen, setSuccessOpen] =
    useState(false);

  const [errorOpen, setErrorOpen] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedProcurementId, setSelectedProcurementId] =
    useState('');

  const section =
    manufacturingLogSections.find(
      (item) => item.type === type
    ) || manufacturingLogSections[0];

  useEffect(() => {
    setTitle(section.title);
  }, [section.title, setTitle]);

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // GET JWT TOKEN
  // =========================

  const token =
    localStorage.getItem('accessToken');

  // =========================
  // FETCH DATA
  // =========================

  const fetchData = async () => {
  try {
    setLoading(true);

    let response;
    let formattedRows: string[][] = [];

    switch (type) {
      case 'raw-materials':
        response = await axios.get(
          'http://localhost:8080/api/raw-material-procurement',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        formattedRows = (response.data || []).map(
          (item: any) => [
            item.logUid || '',
            item.materialName || '',
            item.supplierVendorName || '',
            String(item.quantityPurchased || ''),
            item.unitPrice || '',
            item.inspectionStatus || '',
            item.materialStatus || ''
          ]
        );
        break;

      case 'components':
        response = await axios.get(
          'http://localhost:8080/api/component-manufacturing',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        formattedRows = (response.data || []).map(
          (item: any) => [
            item.logUid || '',
            item.componentName || '',
            item.associatedProductUid || '',
            item.pcbVersion || '',
            item.functionalTest || '',
            item.calibrationResult || ''
          ]
        );
        break;

      case 'assembly-line':
        response = await axios.get(
          'http://localhost:8080/api/assembly-line-tracking',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        formattedRows = (response.data || []).map(
          (item: any) => [
            item.logUid || '',
            item.productionOrderId || '',
            item.associatedProductName || '',
            item.assemblyLine || '',
            item.assemblyStation || '',
            item.shift || '',
            item.goodUnits || '',
            item.productionYield || '',
          ]
        );
        break;

      case 'logistics-trail':
        response = await axios.get(
          'http://localhost:8080/api/manufacturing-logistics-trail',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        formattedRows = (response.data || []).map(
          (item: any) => [
            item.logUid || '',
            item.transferDateTime || '',
            item.movementType || '',
            item.sourceWarehouse || '',
            item.destinationWarehouse || '',
            item.quantityToTransfer || '',
            item.status || '',
          ]
        );
        break;

      default:
        formattedRows = [];
    }

    setRows(formattedRows);
  } catch (error: any) {
    console.error(error);

    setErrorMessage(
      error?.response?.data?.message ||
        'Failed to fetch records'
    );

    setErrorOpen(true);
  } finally {
    setLoading(false);
  }
};

  // =========================
  // SEARCH FILTER
  // =========================

  const filteredRows = useMemo(() => {
    const normalizedQuery =
      searchQuery
        .trim()
        .toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) =>
      row
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [searchQuery, rows]);

  // =========================
  // DELETE DIALOG
  // =========================

  const openDeleteDialog = (
    procurementId: string
  ) => {
    setSelectedProcurementId(
      procurementId
    );

    setDeleteOpen(true);
  };

  // =========================
  // DELETE RECORD
  // =========================

  const handleDelete = async (
  recordId: string
) => {
  try {
    let deleteUrl = '';

    switch (type) {
      case 'raw-materials':
        deleteUrl =
          `http://localhost:8080/api/raw-material-procurement/log/${recordId}`;
        break;

      case 'components':
        deleteUrl =
          `http://localhost:8080/api/component-manufacturing/${recordId}`;
        break;

      case 'assembly-line':
        deleteUrl =
          `http://localhost:8080/api/assembly-line-tracking/${recordId}`;
        break;

      case 'logistics-trail':
        deleteUrl =
          `http://localhost:8080/api/manufacturing-logistics-trail/${recordId}`;
        break;

      default:
        return;
    }

    await axios.delete(deleteUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setRows((previousRows) =>
      previousRows.filter(
        (row) => row[0] !== recordId
      )
    );

    setDeleteOpen(false);

    setSuccessOpen(true);
  } catch (error: any) {
    console.error(error);

    setErrorMessage(
      error?.response?.data?.message ||
        'Delete failed'
    );

    setErrorOpen(true);
  }
};

  // =========================
  // EDIT
  // =========================

  const handleEdit = (
  recordId: string
) => {
  switch (type) {
    case 'raw-materials':
      navigate(
        `/app/manufacturing-execution-log/raw-materials/edit/${recordId}`
      );
      break;

    case 'components':
      navigate(
        `/app/manufacturing-execution-log/components/edit/${recordId}`
      );
      break;

    case 'assembly-line':
      navigate(
        `/app/manufacturing-execution-log/assembly-line/edit/${recordId}`
      );
      break;

    case 'logistics-trail':
      navigate(
        `/app/manufacturing-execution-log/logistics-trail/edit/${recordId}`
      );
      break;
  }
};

  const getDetailPath = (
    row: string[]
  ) =>
    `${section.listPath}/${encodeURIComponent(
      row[0]
    )}`;

  return (
    <>
      <Helmet>
        <title>{section.title}</title>
      </Helmet>

      <Box p={{ xs: 2, md: 4 }}>
        <Stack spacing={2.5}>
          {/* HEADER */}

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

              <Typography>
                {section.title}
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
                </Typography>

                <Typography color="text.secondary">
                  {section.description}
                </Typography>
              </Box>

              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                spacing={1}
              >
                <TextField
                  size="small"
                  placeholder="Search log"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoToneIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  variant="contained"
                  startIcon={
                    <AddTwoToneIcon />
                  }
                  onClick={() =>
                    navigate(section.newPath)
                  }
                >
                  {section.addLabel}
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* TABLE */}

          <Card>
            <CardContent sx={{ p: 0 }}>
              {loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {section.columns.map(
                          (column) => (
                            <TableCell
                              key={column}
                            >
                              {column}
                            </TableCell>
                          )
                        )}

                        <TableCell align="right">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredRows.length >
                      0 ? (
                        filteredRows.map(
                          (row) => (
                            <TableRow
                              hover
                              key={row.join('-')}
                              onClick={() =>
                                navigate(
                                  getDetailPath(
                                    row
                                  )
                                )
                              }
                              sx={{
                                cursor:
                                  'pointer'
                              }}
                            >
                              {row.map(
                                (
                                  cell,
                                  index
                                ) => (
                                  <TableCell
                                    key={`${cell}-${index}`}
                                  >
                                    {index ===
                                    row.length -
                                      1 ? (
                                      <Chip
                                        size="small"
                                        label={
                                          cell
                                        }
                                        color="success"
                                      />
                                    ) : (
                                      cell
                                    )}
                                  </TableCell>
                                )
                              )}

                              <TableCell align="right">
                                <Button
                                  size="small"
                                  startIcon={
                                    <EditTwoToneIcon />
                                  }
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();

                                    handleEdit(
                                      row[0]
                                    );
                                  }}
                                >
                                  Edit
                                </Button>

                                <Button
                                  size="small"
                                  color="error"
                                  startIcon={
                                    <DeleteTwoToneIcon />
                                  }
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();

                                    openDeleteDialog(
                                      row[0]
                                    );
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={
                              section.columns
                                .length + 1
                            }
                            align="center"
                            sx={{
                              py: 5
                            }}
                          >
                            No log records found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {/* SUCCESS */}

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() =>
          setSuccessOpen(false)
        }
      >
        <Alert severity="success">
          Record deleted successfully
        </Alert>
      </Snackbar>

      {/* ERROR */}

      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() =>
          setErrorOpen(false)
        }
      >
        <Alert severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* DELETE CONFIRMATION DIALOG */}

      <Dialog
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
      >
        <DialogTitle>
          Confirm Delete
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to
            delete this record?
            <br />
            This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() =>
              handleDelete(
                selectedProcurementId
              )
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LogListPage;