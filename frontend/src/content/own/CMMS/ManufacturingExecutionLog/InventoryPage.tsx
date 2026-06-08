import {
  useContext,
  useEffect,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  Box,
  Breadcrumbs,
  Link,
  Stack,
  Typography
} from '@mui/material';

import {
  Link as RouterLink
} from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';

import {
  ManufacturingExecutionSidebar,
  RawMaterialInventoryPanel
} from './components';

import type {
  RawMaterialInventoryItem
} from './types';

function ManufacturingInventoryPage() {
  const { setTitle } =
    useContext(TitleContext);

  // TODO(API): Replace this frontend-only state with the backend raw material inventory endpoint.
  // TODO(API): Replace Fleetbase values with Fleetbase shipment/fleet tracking API data when available.
  const [inventoryItems] =
    useState<RawMaterialInventoryItem[]>([
      {
        id: 'raw-material-inventory-1',
        materialId: 'MAT-001',
        materialName: 'Raw Material',
        batchId: 'BATCH-001',
        quantity: '0',
        unit: 'PCS',
        warehouseLocation: 'Main Warehouse',
        status: 'Pending',
        lastUpdated: 'Not synced',
        fleetbase: {
          transferId: 'FB-TX-PENDING',
          vehicleId: 'Not assigned',
          driverName: 'Not assigned',
          dispatchStatus: 'Not scheduled',
          eta: 'Not available'
        }
      },
      {
        id: 'raw-material-inventory-2',
        materialId: 'MAT-002',
        materialName: 'Incoming Material',
        batchId: 'BATCH-002',
        quantity: '0',
        unit: 'KG',
        warehouseLocation: 'Receiving Bay',
        status: 'Pending',
        lastUpdated: 'Not synced',
        fleetbase: {
          transferId: 'FB-TX-PENDING-2',
          vehicleId: 'Not assigned',
          driverName: 'Not assigned',
          dispatchStatus: 'Awaiting dispatch',
          eta: 'Not available'
        }
      }
    ]);

  useEffect(() => {
    setTitle('Manufacturing Inventory');
  }, [setTitle]);

  return (
    <>
      <Helmet>
        <title>
          Manufacturing Inventory
        </title>
      </Helmet>

      <Box p={{ xs: 2, md: 3 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Breadcrumbs>
              <Link
                component={RouterLink}
                to="/app/home"
              >
                Dashboard
              </Link>

              <Link
                component={RouterLink}
                to="/app/manufacturing-execution-log"
              >
                Manufacturing Execution Log
              </Link>

              <Typography>
                Inventory
              </Typography>
            </Breadcrumbs>

            <Box>
              <Typography variant="h2">
                Inventory
              </Typography>

              <Typography color="text.secondary">
                Raw material inventory and Fleetbase tracking details.
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              xl: 'row'
            }}
            spacing={3}
            alignItems="flex-start"
          >
            <Box
              sx={{
                flex: 1,
                width: '100%'
              }}
            >
              <RawMaterialInventoryPanel
                inventoryItems={inventoryItems}
              />
            </Box>

            <Box
              sx={{
                width: {
                  xs: '100%',
                  xl: 360
                },
                flexShrink: 0
              }}
            >
              <ManufacturingExecutionSidebar />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default ManufacturingInventoryPage;
