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
  const emptyRows = Math.max(0, 5 - section.rows.length);

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
          sx={{
            whiteSpace: 'nowrap'
          }}
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
          <SectionHeader
            section={section}
          />

          <TableContainer>
            <Table
              size="small"
              sx={{
                tableLayout: 'fixed',
                '& th': {
                  fontWeight: 700,
                  fontSize: 12,
                  bgcolor: 'background.default'
                },
                '& th, & td': {
                  borderColor: alpha(
                    theme.palette.text.primary,
                    0.16
                  ),
                  py: 1.1,
                  px: 1,
                  height: 38
                }
              }}
            >
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
                {section.rows.map((row, rowIndex) => (
                  <TableRow key={row.join('-')}>
                    {row.map((cell, index) => (
                      <TableCell key={`${cell}-${index}`}>
                        {index === 0 ? (
                          <Typography
                            variant="subtitle2"
                            noWrap
                          >
                            {cell}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            noWrap
                          >
                            {cell}
                          </Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {Array.from({
                  length: emptyRows
                }).map((_, rowIndex) => (
                  <TableRow
                    key={`empty-${section.type}-${rowIndex}`}
                  >
                    {section.columns.map((column) => (
                      <TableCell
                        key={`${column}-${rowIndex}`}
                      >
                        {rowIndex === 0 &&
                        section.rows.length === 0
                          ? 'No records yet'
                          : ''}
                      </TableCell>
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
              borderTop: `1px solid ${theme.palette.divider}`,
              py: 1.1
            }}
          >
            <Link
              component={RouterLink}
              to={section.listPath}
              underline="none"
              variant="subtitle2"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {section.fullLogLabel}
              <ArrowForwardTwoToneIcon fontSize="small" />
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
      spacing={2}
      sx={{ px: 1.5, py: 1 }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        minWidth={0}
      >
        <Chip
          label={section.number}
          color="primary"
          size="small"
          sx={{
            width: 26,
            height: 24,
            borderRadius: 1,
            '& .MuiChip-label': { px: 0 }
          }}
        />
        <Typography
          variant="h5"
          noWrap
        >
          {section.title}
        </Typography>
      </Stack>

      <Link
        component={RouterLink}
        to={section.listPath}
        underline="none"
        variant="subtitle2"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          flexShrink: 0
        }}
      >
        View All
        <ArrowForwardTwoToneIcon fontSize="small" />
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
  onFieldChange: (name: string, value: string) => void;
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
      <CardContent sx={{ p: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            px: 2,
            py: 1.4,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <Chip
            label={number}
            color="primary"
            size="small"
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              '& .MuiChip-label': { px: 0 }
            }}
          />
          <Typography variant="h5">
            {section.title}
          </Typography>
        </Stack>

        <Grid
          container
          spacing={2}
          sx={{ p: 2 }}
        >
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
                select={Boolean(field.options)}
                type={field.type}
                value={values[field.name] || ''}
                onChange={(event) =>
                  onFieldChange(
                    field.name,
                    event.target.value
                  )
                }
                multiline={field.multiline}
                rows={field.rows}
                helperText={field.helperText}
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
      spacing={1.5}
      justifyContent="flex-end"
      flexWrap="wrap"
    >
      <Button
        variant="outlined"
        size={compact ? 'small' : 'medium'}
        startIcon={<SaveTwoToneIcon />}
        onClick={onDraft}
      >
        Save as Draft
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
  onDocumentFilesAdded: (files: File[]) => void;
  onProductImageFilesAdded: (files: File[]) => void;
  onDocumentFileRemove: (id: string) => void;
  onProductImageFileRemove: (id: string) => void;
  showProductImageUpload?: boolean;
}) {
  return (
    <Stack spacing={2}>
      <UploadPanel
        title="Document Upload"
        description="Upload supporting documents"
        helperText="PDF, JPG, PNG, DOCX"
        files={documentFiles}
        onFilesAdded={onDocumentFilesAdded}
        onFileRemove={onDocumentFileRemove}
      />

      {showProductImageUpload && (
        <UploadPanel
          title="Product Image Upload"
          description="Upload product or item image"
          helperText="JPG or PNG"
          files={productImageFiles}
          icon="image"
          multiple={false}
          accept={{
            'image/*': ['.jpg', '.jpeg', '.png']
          }}
          onFilesAdded={onProductImageFilesAdded}
          onFileRemove={onProductImageFileRemove}
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
  onFilesAdded: (files: File[]) => void;
  onFileRemove: (id: string) => void;
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
      // TODO(API): Upload accepted files to the backend document endpoint here.
      onFilesAdded(acceptedFiles);
    }
  });

  return (
    <SidePanel title={title}>
      <Paper
        variant="outlined"
        {...getRootProps()}
        sx={{
          borderStyle: 'dashed',
          py: 4,
          px: 2,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragActive
            ? alpha(
                theme.palette.primary.main,
                0.08
              )
            : 'background.default',
          borderColor: isDragActive
            ? 'primary.main'
            : 'divider'
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadTwoToneIcon color="primary" />
        <Typography variant="body2">
          {isDragActive
            ? 'Drop files to attach'
            : description}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Drag and drop files here or browse files
        </Typography>
        <Typography
          display="block"
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          {helperText}
        </Typography>
      </Paper>

      <Stack
        spacing={1}
        sx={{ mt: 1.5 }}
      >
        <Typography
          variant="subtitle2"
          color="text.secondary"
        >
          Attachment List
        </Typography>

        {files.length > 0 ? (
          files.map((file) => (
            <Stack
              key={file.id || file.name}
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: 1,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.default'
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                minWidth={0}
              >
                {icon === 'image' ? (
                  <ImageTwoToneIcon
                    color="primary"
                    fontSize="small"
                  />
                ) : (
                  <InsertDriveFileTwoToneIcon
                    color="primary"
                    fontSize="small"
                  />
                )}

                <Box minWidth={0}>
                  <Typography
                    variant="body2"
                    noWrap
                  >
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
                onClick={(event) => {
                  event.stopPropagation();
                  // TODO(API): Delete the attachment from backend storage before removing it locally.
                  onFileRemove(
                    file.id || file.name
                  );
                }}
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
            No files attached yet
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
          sx={{ mb: 1.5 }}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
