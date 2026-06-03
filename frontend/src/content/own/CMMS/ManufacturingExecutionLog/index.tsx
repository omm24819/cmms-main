import {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import axios from 'axios';

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

  // RAW MATERIAL LOGS
  const [rawMaterialLogs, setRawMaterialLogs] =
    useState<any[]>([]);

  // COMPONENT LOGS
  const [componentLogs, setComponentLogs] =
    useState<any[]>([]);

  // ASSEMBLY LOGS
  const [assemblyLogs, setAssemblyLogs] =
    useState<any[]>([]);

  // LOGISTICS LOGS
  const [logisticsLogs, setLogisticsLogs] =
    useState<any[]>([]);

  useEffect(() => {
    setTitle(
      'Manufacturing Execution Log'
    );
  }, [setTitle]);

  useEffect(() => {
    fetchRawMaterialLogs();
    fetchComponentLogs();
    fetchAssemblyLogs();
    fetchLogisticsLogs();
  }, []);

  const fetchRawMaterialLogs =
    async () => {
      try {
        const token =
          localStorage.getItem(
            'accessToken'
          );

        const response =
          await axios.get(
            'http://localhost:8080/api/raw-material-procurement',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

        setRawMaterialLogs(
          response.data || []
        );
      } catch (error) {
        console.error(
          'RAW MATERIAL FETCH ERROR',
          error
        );
      }
    };

  const fetchComponentLogs =
    async () => {
      try {
        const token =
          localStorage.getItem(
            'accessToken'
          );

        const response =
          await axios.get(
            'http://localhost:8080/api/component-manufacturing',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

        setComponentLogs(
          response.data || []
        );
      } catch (error) {
        console.error(
          'COMPONENT FETCH ERROR',
          error
        );
      }
    };

  const fetchAssemblyLogs =
    async () => {
      try {
        const token =
          localStorage.getItem(
            'accessToken'
          );

        const response =
          await axios.get(
            'http://localhost:8080/api/assembly-line-tracking',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

        setAssemblyLogs(
          response.data || []
        );
      } catch (error) {
        console.error(
          'ASSEMBLY FETCH ERROR',
          error
        );
      }
    };

  const fetchLogisticsLogs =
    async () => {
      try {
        const token =
          localStorage.getItem(
            'accessToken'
          );

        const response =
          await axios.get(
            'http://localhost:8080/api/manufacturing-logistics-trail',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

        setLogisticsLogs(
          response.data || []
        );
      } catch (error) {
        console.error(
          'LOGISTICS FETCH ERROR',
          error
        );
      }
    };

  const updatedSections =
    useMemo(() => {
      return manufacturingLogSections.map(
        (section) => {

          // RAW MATERIAL PROCUREMENT
          if (
            section.type ===
            'raw-materials'
          ) {
            return {
              ...section,

              totalRows:
                rawMaterialLogs.length,

              rows:
                rawMaterialLogs.length > 0
                  ? rawMaterialLogs
                      .slice(0, 5)
                      .map(
                        (item: any) => [
                          item.logUid ||
                            item.id ||
                            '-',

                          item.materialName ||
                            '-',

                          item.supplierVendorName ||
                            item.supplierName ||
                            '-',

                          item.quantityPurchased
                            ? item.quantityPurchased.toString()
                            : '-',

                          item.unitPrice ||
                            '-',

                          item.inspectionStatus ||
                            '-',

                          item.materialStatus ||
                            '-'
                        ]
                      )
                  : []
            };
          }

          // COMPONENT MANUFACTURING
          if (
            section.type ===
            'components'
          ) {
            return {
              ...section,

              totalRows:
                componentLogs.length,

              rows:
                componentLogs.length > 0
                  ? componentLogs
                      .slice(0, 5)
                      .map(
                        (item: any) => [
                          item.logUid ||
                            item.id ||
                            '-',

                          item.componentName ||
                            '-',

                          item.associatedProductName ||
                            item.associatedProductUid ||
                            '-',

                          item.pcbVersion ||
                            '-',

                          item.functionalTest ||
                            '-',

                          item.calibrationResult ||
                            '-'
                        ]
                      )
                  : []
            };
          }

          // ASSEMBLY LINE TRACKING
          if (
            section.type ===
            'assembly-line'
          ) {
            return {
              ...section,

              totalRows:
                assemblyLogs.length,

              rows:
                assemblyLogs.length > 0
                  ? assemblyLogs
                      .slice(0, 5)
                      .map(
                        (item: any) => [
                          item.logUid ||
                            item.id ||
                            '-',

                          item.productionOrderId ||
                            '-',

                          item.associatedProductName ||
                            item.associatedProductUid ||
                            '-',

                          item.assemblyLine ||
                            '-',

                          item.assemblyStation ||
                            '-',

                          item.shift ||
                            '-',

                          item.goodUnits
                            ?.toString() ||
                            '-',

                          item.productionYield
                            ?.toString() ||
                            '-'
                        ]
                      )
                  : []
            };
          }

          // MANUFACTURING LOGISTICS TRAIL
          if (
            section.type ===
            'logistics-trail'
          ) {
            return {
              ...section,

              totalRows:
                logisticsLogs.length,

              rows:
                logisticsLogs.length > 0
                  ? logisticsLogs
                      .slice(0, 5)
                      .map(
                        (item: any) => [
                          item.logUid ||
                            item.id ||
                            '-',

                          item.transferDateTime ||
                            '-',

                          item.movementType ||
                            '-',

                          item.sourceWarehouse ||
                            '-',

                          item.destinationWarehouse ||
                            '-',

                          item.quantityToTransfer
                            ? item.quantityToTransfer.toString()
                            : '-',

                          item.status ||
                            '-'
                        ]
                      )
                  : []
            };
          }

          return section;
        }
      );
    }, [
      rawMaterialLogs,
      componentLogs,
      assemblyLogs,
      logisticsLogs
    ]);

  const filteredSections =
    useMemo(() => {
      const normalizedQuery =
        searchQuery
          .trim()
          .toLowerCase();

      if (!normalizedQuery) {
        return updatedSections;
      }

      return updatedSections.map(
        (section) => ({
          ...section,

          rows: section.rows.filter(
            (row) =>
              row
                .join(' ')
                .toLowerCase()
                .includes(
                  normalizedQuery
                )
          )
        })
      );
    }, [
      searchQuery,
      updatedSections
    ]);

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
            searchQuery={
              searchQuery
            }
            onSearchChange={
              setSearchQuery
            }
          />

          <Grid
            container
            spacing={3}
          >
            {filteredSections.map(
              (section) => (
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
              )
            )}
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

export default ManufacturingExecutionLogPage;