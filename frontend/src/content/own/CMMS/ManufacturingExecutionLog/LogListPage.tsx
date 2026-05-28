import {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
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
import type { ManufacturingLogType } from './types';

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

  const section =
    manufacturingLogSections.find(
      (item) => item.type === type
    ) || manufacturingLogSections[0];

  useEffect(() => {
    setTitle(section.title);
  }, [section.title, setTitle]);

  // TODO(API): Replace this local section lookup with GET /api/manufacturing-execution-log/:type.
  const filteredRows = useMemo(() => {
    const normalizedQuery =
      searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return section.rows;
    }

    return section.rows.filter((row) =>
      row
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [searchQuery, section.rows]);

  const handleDelete = () => {
    // TODO(API): Wire DELETE /api/manufacturing-execution-log/:type/:id
    // and refresh the table after the backend responds.
    window.alert(
      'Delete will be connected when backend APIs are ready.'
    );
  };

  const handleEdit = () => {
    // TODO(API): Route to an edit screen and prefill it with GET /api/manufacturing-execution-log/:type/:id.
    window.alert(
      'Edit will be connected when backend APIs are ready.'
    );
  };

  const getDetailPath = (row: string[]) =>
    `${section.listPath}/${encodeURIComponent(row[0])}`;

  return (
    <>
      <Helmet>
        <title>{section.title}</title>
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
                  startIcon={<AddTwoToneIcon />}
                  onClick={() =>
                    navigate(section.newPath)
                  }
                >
                  {section.addLabel}
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Card>
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {section.columns.map((column) => (
                        <TableCell key={column}>
                          {column}
                        </TableCell>
                      ))}
                      <TableCell align="right">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredRows.length > 0 ? (
                      filteredRows.map((row) => (
                        <TableRow
                          hover
                          key={row.join('-')}
                          onClick={() =>
                            navigate(getDetailPath(row))
                          }
                          sx={{ cursor: 'pointer' }}
                        >
                          {row.map((cell, index) => (
                            <TableCell
                              key={`${cell}-${index}`}
                            >
                              {index ===
                              row.length - 1 ? (
                                <Chip
                                  size="small"
                                  label={cell}
                                  color={
                                    cell
                                      .toLowerCase()
                                      .includes(
                                        'completed'
                                      ) ||
                                    cell
                                      .toLowerCase()
                                      .includes(
                                        'accepted'
                                      ) ||
                                    cell
                                      .toLowerCase()
                                      .includes('pass')
                                      ? 'success'
                                      : 'default'
                                  }
                                />
                              ) : (
                                cell
                              )}
                            </TableCell>
                          ))}
                          <TableCell align="right">
                            <Button
                              size="small"
                              startIcon={
                                <EditTwoToneIcon />
                              }
                              onClick={(event) => {
                                event.stopPropagation();
                                handleEdit();
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
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDelete();
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={
                            section.columns.length + 1
                          }
                          align="center"
                          sx={{ py: 5 }}
                        >
                          No log records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </>
  );
}

export default LogListPage;
