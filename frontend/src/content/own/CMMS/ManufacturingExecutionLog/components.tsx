import type { ReactNode } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

import { useDropzone } from 'react-dropzone';

import {
  Link as RouterLink
} from 'react-router-dom';

import type {
  AttachmentItem,
  EntrySection,
  ManufacturingLogSection,
  RawMaterialInventoryItem
} from './types';

export function ManufacturingTopBar({
  searchQuery,
  onSearchChange
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row'
      }}
      spacing={2}
      alignItems={{
        xs: 'stretch',
        md: 'center'
      }}
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h2">
          Manufacturing Log
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Track every step from raw material
          to finished product
        </Typography>
      </Box>

      <Stack
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        spacing={1.5}
        alignItems={{
          xs: 'stretch',
          sm: 'center'
        }}
      >
        <TextField
          size="small"
          placeholder="Search anything"
          value={searchQuery}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon fontSize="small" />
              </InputAdornment>
            )
          }}
          sx={{ minWidth: 220 }}
        />
      </Stack>
    </Stack>
  );
}

export function ManufacturingLogCard({
  section
}: {
  section: ManufacturingLogSection;
}) {
  const theme = useTheme();

  const emptyRows = Math.max(
    0,
    5 - section.rows.length
  );

  return (
    <Stack spacing={1}>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          to={section.newPath}
          variant="contained"
          size="small"
          startIcon={<AddTwoToneIcon />}
        >
          {section.addLabel}
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: 1,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <SectionHeader section={section} />

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {section.columns.map((column) => (
                    <TableCell key={column}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {section.rows.map((row) => (
                  <TableRow key={row.join('-')}>
                    {row.map((cell, index) => (
                      <TableCell
                        key={`${cell}-${index}`}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {section.rows.length === 0 &&
                  Array.from({
                    length: 5
                  }).map((_, rowIndex) => (
                    <TableRow
                      key={`empty-${section.type}-${rowIndex}`}
                    >
                      {section.columns.map((column) => (
                        <TableCell
                          key={`${column}-${rowIndex}`}
                        />
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            display="flex"
            justifyContent="center"
            sx={{
              py: 1
            }}
          >
            <Link
              component={RouterLink}
              to={section.listPath}
              underline="none"
            >
              {section.fullLogLabel}
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export function SectionHeader({
  section
}: {
  section: ManufacturingLogSection;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        px: 2,
        py: 1
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Chip
          label={section.number}
          size="small"
          color="primary"
        />

        <Typography variant="h5">
          {section.title}
        </Typography>
      </Stack>

      <Link
        component={RouterLink}
        to={section.listPath}
        underline="none"
      >
        View All
      </Link>
    </Stack>
  );
}

export function FormSectionBlock({
  section,
  values,
  onFieldChange,
  number
}: {
  section: EntrySection;
  values: Record<string, string>;
  onFieldChange: (
    name: string,
    value: string
  ) => void;
  number: number;
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <Chip
            label={number}
            color="primary"
            size="small"
          />

          <Typography variant="h5">
            {section.title}
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {section.fields.map((field) => (
            <Grid
              item
              xs={12}
              md={field.width || 3}
              key={field.name}
            >
              <TextField
                fullWidth
                size="small"
                label={field.label}
                value={values[field.name] || ''}
                onChange={(event) =>
                  onFieldChange(
                    field.name,
                    event.target.value
                  )
                }
                type={field.type}
                select={Boolean(field.options)}
                multiline={field.multiline}
                rows={field.rows}
                helperText={field.helperText}
                disabled={field.readOnly}
                InputProps={{
                  readOnly: field.readOnly
                }}
                InputLabelProps={
                  field.type === 'date'
                    ? { shrink: true }
                    : undefined
                }
              >
                {field.options?.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export function EntryActionButtons({
  onDraft,
  onSubmit,
  compact = false
}: {
  onDraft: () => void;
  onSubmit: () => void;
  compact?: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="flex-end"
    >
      <Button
        variant="outlined"
        size={compact ? 'small' : 'medium'}
        startIcon={<SaveTwoToneIcon />}
        onClick={onDraft}
      >
        Save Draft
      </Button>

      <Button
        variant="contained"
        size={compact ? 'small' : 'medium'}
        startIcon={<SendTwoToneIcon />}
        onClick={onSubmit}
      >
        Submit Entry
      </Button>
    </Stack>
  );
}

export function EntryUploadSidebar({
  documentFiles,
  productImageFiles,
  onDocumentFilesAdded,
  onProductImageFilesAdded,
  onDocumentFileRemove,
  onProductImageFileRemove,
  showProductImageUpload
}: {
  documentFiles: AttachmentItem[];
  productImageFiles: AttachmentItem[];
  onDocumentFilesAdded: (
    files: File[]
  ) => void;
  onProductImageFilesAdded: (
    files: File[]
  ) => void;
  onDocumentFileRemove: (
    id: string
  ) => void;
  onProductImageFileRemove: (
    id: string
  ) => void;
  showProductImageUpload?: boolean;
}) {
  return (
    <Stack spacing={2}>
      <UploadPanel
        title="Document Upload"
        description="Upload documents"
        helperText="PDF, DOC, JPG"
        files={documentFiles}
        onFilesAdded={
          onDocumentFilesAdded
        }
        onFileRemove={
          onDocumentFileRemove
        }
      />

      {showProductImageUpload && (
        <UploadPanel
          title="Product Image"
          description="Upload product image"
          helperText="PNG, JPG"
          files={productImageFiles}
          onFilesAdded={
            onProductImageFilesAdded
          }
          onFileRemove={
            onProductImageFileRemove
          }
          icon="image"
          multiple={false}
          accept={{
            'image/*': [
              '.jpg',
              '.jpeg',
              '.png'
            ]
          }}
        />
      )}
    </Stack>
  );
}

export function ManufacturingExecutionSidebar() {
  const theme = useTheme();

  return (
    <Stack spacing={2}>
      <Accordion
        defaultExpanded={false}
        sx={{
          borderRadius: 1,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          '&:before': {
            display: 'none'
          }
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreTwoToneIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Inventory2TwoToneIcon color="primary" />

            <Typography variant="h5">
              Inventory
            </Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Button
            fullWidth
            component={RouterLink}
            to="/app/manufacturing-execution-log/inventory"
            variant="outlined"
            startIcon={<Inventory2TwoToneIcon />}
            sx={{
              justifyContent: 'flex-start'
            }}
          >
            Open Inventory
          </Button>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export function RawMaterialInventoryPanel({
  inventoryItems
}: {
  inventoryItems: RawMaterialInventoryItem[];
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Inventory2TwoToneIcon color="primary" />

            <Box>
              <Typography variant="h5">
                Raw Material Inventory
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Frontend-only raw material and Fleetbase details
              </Typography>
            </Box>
          </Stack>

          {/* TODO(API): Replace this frontend-only inventory state with a backend inventory lookup endpoint. */}
          {inventoryItems.length > 0 ? (
            inventoryItems.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  boxShadow: 'none'
                }}
              >
                <CardContent>
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                      alignItems="flex-start"
                    >
                      <Box minWidth={0}>
                        <Typography
                          variant="subtitle2"
                          noWrap
                        >
                          {item.materialName}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {item.materialId}
                        </Typography>
                      </Box>

                      <Chip
                        size="small"
                        label={item.status}
                        color={
                          item.status === 'Available'
                            ? 'success'
                            : item.status === 'Low Stock'
                            ? 'warning'
                            : 'default'
                        }
                      />
                    </Stack>

                    <Grid container spacing={1}>
                      <InventoryDetail
                        label="Batch ID"
                        value={item.batchId}
                      />
                      <InventoryDetail
                        label="Quantity"
                        value={`${item.quantity} ${item.unit}`}
                      />
                      <InventoryDetail
                        label="Warehouse/Location"
                        value={
                          item.warehouseLocation
                        }
                      />
                      <InventoryDetail
                        label="Last Updated"
                        value={item.lastUpdated}
                      />
                    </Grid>

                    <Paper
                      variant="outlined"
                      sx={{
                        p: 1.25,
                        bgcolor:
                          'background.default',
                        borderRadius: 1
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <LocalShippingTwoToneIcon
                          color="primary"
                          fontSize="small"
                        />

                        <Typography variant="subtitle2">
                          Fleetbase
                        </Typography>
                      </Stack>

                      {/* TODO(API): Replace Fleetbase values with Fleetbase shipment/fleet API data. */}
                      <Grid container spacing={1}>
                        <InventoryDetail
                          label="Transfer ID"
                          value={
                            item.fleetbase.transferId
                          }
                        />
                        <InventoryDetail
                          label="Vehicle ID"
                          value={
                            item.fleetbase.vehicleId
                          }
                        />
                        <InventoryDetail
                          label="Driver"
                          value={
                            item.fleetbase.driverName
                          }
                        />
                        <InventoryDetail
                          label="Dispatch Status"
                          value={
                            item.fleetbase
                              .dispatchStatus
                          }
                        />
                        <InventoryDetail
                          label="ETA"
                          value={item.fleetbase.eta}
                        />
                      </Grid>
                    </Paper>
                  </Stack>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              No raw material inventory selected.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

function InventoryDetail({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <Grid item xs={12} sm={6}>
      <Typography
        variant="caption"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{ wordBreak: 'break-word' }}
      >
        {value || '-'}
      </Typography>
    </Grid>
  );
}

function UploadPanel({
  title,
  description,
  helperText,
  files,
  onFilesAdded,
  onFileRemove,
  multiple = true,
  accept,
  icon = 'document'
}: {
  title: string;
  description: string;
  helperText: string;
  files: AttachmentItem[];
  onFilesAdded: (
    files: File[]
  ) => void;
  onFileRemove: (
    id: string
  ) => void;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  icon?: 'document' | 'image';
}) {
  const theme = useTheme();

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    multiple,
    accept,
    onDrop: (acceptedFiles) => {
      onFilesAdded(acceptedFiles);
    }
  });

  return (
    <SidePanel title={title}>
      <Paper
        {...getRootProps()}
        variant="outlined"
        sx={{
          p: 3,
          textAlign: 'center',
          borderStyle: 'dashed',
          cursor: 'pointer',
          bgcolor: isDragActive
            ? alpha(
                theme.palette.primary.main,
                0.08
              )
            : 'background.default'
        }}
      >
        <input {...getInputProps()} />

        <CloudUploadTwoToneIcon
          color="primary"
        />

        <Typography variant="body2">
          {description}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {helperText}
        </Typography>
      </Paper>

      <Stack spacing={1} mt={2}>
        {files.length > 0 ? (
          files.map((file) => (
            <Stack
              key={file.id || file.name}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                p: 1
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
              >
                {icon === 'image' ? (
                  <ImageTwoToneIcon />
                ) : (
                  <InsertDriveFileTwoToneIcon />
                )}

                <Box>
                  <Typography variant="body2">
                    {file.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {file.size}
                  </Typography>
                </Box>
              </Stack>

              <IconButton
                size="small"
                color="error"
                onClick={() =>
                  onFileRemove(
                    file.id || file.name
                  )
                }
              >
                <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            No files attached
          </Typography>
        )}
      </Stack>
    </SidePanel>
  );
}

function SidePanel({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 'none',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          mb={2}
        >
          {title}
        </Typography>

        {children}
      </CardContent>
    </Card>
  );
}
