import {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  Box,
  Grid,
  Stack
} from '@mui/material';

import { TitleContext } from 'src/contexts/TitleContext';

import {
  ManufacturingLogCard,
  ManufacturingTopBar
} from './components';

import { manufacturingLogSections } from './mockData';

function ManufacturingExecutionLogPage() {
  const { setTitle } =
    useContext(TitleContext);

  const [searchQuery, setSearchQuery] =
    useState('');

  useEffect(() => {
    setTitle('Manufacturing Execution Log');
  }, [setTitle]);

  // TODO(API): Replace this mock filtering with GET /api/manufacturing-execution-log
  // once the backend list endpoint is available.
  const filteredSections = useMemo(() => {
    const normalizedQuery =
      searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return manufacturingLogSections;
    }

    return manufacturingLogSections.map((section) => ({
      ...section,
      rows: section.rows.filter((row) =>
        row
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      )
    }));
  }, [searchQuery]);

  return (
    <>
      <Helmet>
        <title>
          Manufacturing Execution Log
        </title>
      </Helmet>

      <Box p={{ xs: 2, md: 3 }}>
        <Stack spacing={3}>
          <ManufacturingTopBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <Grid container spacing={3}>
            {filteredSections.map((section) => (
              <Grid
                item
                xs={12}
                xl={6}
                key={section.type}
              >
                <ManufacturingLogCard
                  section={section}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

export default ManufacturingExecutionLogPage;
