import type { ReactNode } from 'react';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
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
  alpha,
  useTheme
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

import {
  Link as RouterLink
} from 'react-router-dom';

import type {
  EntrySection,
  ManufacturingLogSection,
  PreviewDetail
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

        <TextField
          size="small"
          type="date"
          defaultValue="2025-05-31"
          inputProps={{
            'aria-label': 'Date range end'
          }}
          helperText="01 May 2025 - 31 May 2025"
          sx={{
            width: 220,
            '& .MuiFormHelperText-root': {
              mx: 0,
              mt: 0.5,
              whiteSpace: 'nowrap'
            }
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            minWidth: 150,
            justifyContent: {
              xs: 'flex-start',
              sm: 'flex-end'
            }
          }}
        >
          <Avatar
            src="/static/images/avatars/1.jpg"
            sx={{
              width: 38,
              height: 38
            }}
          />
          <Box>
            <Typography variant="subtitle2">
              Max smith
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Admin
            </Typography>
          </Box>
        </Stack>
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
  onReset,
  onCancel,
  compact = false
}: {
  onDraft: () => void;
  onSubmit: () => void;
  onReset?: () => void;
  onCancel?: () => void;
  compact?: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      justifyContent="flex-end"
      flexWrap="wrap"
    >
      {onReset && (
        <Button
          variant="outlined"
          color="inherit"
          size={compact ? 'small' : 'medium'}
          startIcon={<RestartAltTwoToneIcon />}
          onClick={onReset}
        >
          Reset
        </Button>
      )}

      {onCancel && (
        <Button
          color="inherit"
          size={compact ? 'small' : 'medium'}
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}

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

export function RightSidebarPanels({
  title,
  image,
  previewDetails,
  summaryTitle,
  summaryDetails,
  checklistTitle,
  checklist,
  attachments
}: {
  title: string;
  image: string;
  previewDetails: PreviewDetail[];
  summaryTitle: string;
  summaryDetails: PreviewDetail[];
  checklistTitle: string;
  checklist: string[];
  attachments?: {
    name: string;
    size: string;
  }[];
}) {
  return (
    <Stack spacing={2}>
      <SidePanel title={title}>
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: 138,
            objectFit: 'cover',
            borderRadius: 1,
            mb: 1.5,
            bgcolor: 'background.default'
          }}
        />

        <DetailList details={previewDetails} />
      </SidePanel>

      {attachments && attachments.length > 0 && (
        <SidePanel title="Attachments">
          <Paper
            variant="outlined"
            sx={{
              borderStyle: 'dashed',
              py: 3,
              px: 2,
              textAlign: 'center',
              mb: 1.5
            }}
          >
            <CloudUploadTwoToneIcon color="primary" />
            <Typography variant="body2">
              Drag and drop files here
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              or browse files
            </Typography>
          </Paper>

          <Stack spacing={1}>
            {attachments.map((attachment) => (
              <Stack
                key={attachment.name}
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography
                  variant="body2"
                  noWrap
                >
                  {attachment.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {attachment.size}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </SidePanel>
      )}

      <SidePanel title={summaryTitle}>
        <DetailList details={summaryDetails} />
      </SidePanel>

      <SidePanel title={checklistTitle}>
        <Stack spacing={1.2}>
          {checklist.map((item) => (
            <Stack
              key={item}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Typography
                variant="body2"
                noWrap
              >
                {item}
              </Typography>
              <CheckCircleTwoToneIcon
                color="success"
                fontSize="small"
              />
            </Stack>
          ))}
        </Stack>
      </SidePanel>
    </Stack>
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

function DetailList({
  details
}: {
  details: PreviewDetail[];
}) {
  return (
    <Stack
      divider={<Divider flexItem />}
      spacing={1}
    >
      {details.map((detail) => (
        <Stack
          key={detail.label}
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {detail.label}
          </Typography>
          <Typography
            variant="subtitle2"
            textAlign="right"
          >
            {detail.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
