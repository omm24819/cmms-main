import type { ReactNode } from 'react';

import {
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
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import InsertDriveFileTwoToneIcon from '@mui/icons-material/InsertDriveFileTwoTone';
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
  ManufacturingLogSection
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