import {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography
} from '@mui/material';

import QrCodeScannerTwoToneIcon from '@mui/icons-material/QrCodeScannerTwoTone';

import {
  Link as RouterLink,
  useNavigate
} from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';

import {
  EntryActionButtons,
  FormSectionBlock,
  RightSidebarPanels
} from './components';

import { manufacturingEntryConfigs } from './mockData';
import type {
  ManufacturingEntryConfig,
  ManufacturingLogType
} from './types';

function createInitialValues(
  config: ManufacturingEntryConfig
) {
  return config.sections.reduce<
    Record<string, string>
  >((accumulator, section) => {
    section.fields.forEach((field) => {
      accumulator[field.name] = field.value;
    });

    return accumulator;
  }, {});
}

function EntryPage({
  type
}: {
  type: ManufacturingLogType;
}) {
  const navigate = useNavigate();
  const { setTitle } =
    useContext(TitleContext);

  const config =
    manufacturingEntryConfigs[type];

  const initialValues = useMemo(
    () => createInitialValues(config),
    [config]
  );

  const [values, setValues] =
    useState<Record<string, string>>(
      initialValues
    );

  useEffect(() => {
    setTitle(config.title);
  }, [config.title, setTitle]);

  const handleFieldChange = (
    name: string,
    value: string
  ) => {
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value
    }));
  };

  const handleDraft = () => {
    // TODO(API): Persist draft with POST /api/manufacturing-execution-log/:type/drafts.
    console.log(
      'Manufacturing draft payload',
      type,
      values
    );
    window.alert(
      'Draft saved locally. Backend API wiring is marked in the code.'
    );
  };

  const handleSubmit = () => {
    // TODO(API): Create entry with POST /api/manufacturing-execution-log/:type.
    // TODO(API): For edit mode later, update existing entries with PUT/PATCH /api/manufacturing-execution-log/:type/:id.
    // TODO(API): Validate required fields with backend rules before final submission.
    console.log(
      'Manufacturing submit payload',
      type,
      values
    );
    window.alert(
      'Entry submitted locally. Backend API wiring is marked in the code.'
    );
  };

  const handleReset = () => {
    setValues(initialValues);
    // TODO(API): If editing an existing record later, reset from the latest GET response.
  };

  return (
    <>
      <Helmet>
        <title>{config.title}</title>
      </Helmet>

      <Box
        p={{ xs: 2, md: 3 }}
        sx={{
          bgcolor: 'background.default'
        }}
      >
        <Stack spacing={2.5}>
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
              <Link
                component={RouterLink}
                to={config.listPath}
              >
                {config.title.replace(
                  ' Entry',
                  ''
                )}
              </Link>
              <Typography>
                New Entry
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
                  {config.title}
                </Typography>
                <Typography color="text.secondary">
                  {config.subtitle}
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
                <Button
                  variant="outlined"
                  startIcon={
                    <QrCodeScannerTwoToneIcon />
                  }
                >
                  Scan QR / Barcode
                </Button>

                <EntryActionButtons
                  compact
                  onDraft={handleDraft}
                  onSubmit={handleSubmit}
                />

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    minWidth: 140,
                    justifyContent: 'flex-end'
                  }}
                >
                  <Avatar
                    src="/static/images/avatars/2.jpg"
                    sx={{
                      width: 34,
                      height: 34
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2">
                      John Smith
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {config.role}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              lg: 'row'
            }}
            spacing={2}
            alignItems="flex-start"
          >
            <Stack
              spacing={2}
              sx={{
                flex: 1,
                width: '100%'
              }}
            >
              {config.sections.map(
                (section, index) => (
                  <FormSectionBlock
                    key={section.title}
                    section={section}
                    number={index + 1}
                    values={values}
                    onFieldChange={
                      handleFieldChange
                    }
                  />
                )
              )}

              <EntryActionButtons
                onDraft={handleDraft}
                onSubmit={handleSubmit}
                onReset={handleReset}
                onCancel={() =>
                  navigate(config.listPath)
                }
              />
            </Stack>

            <Box
              sx={{
                width: {
                  xs: '100%',
                  lg: 330
                },
                flexShrink: 0
              }}
            >
              <RightSidebarPanels
                title={config.previewTitle}
                image={config.previewImage}
                previewDetails={
                  config.previewDetails
                }
                summaryTitle={config.summaryTitle}
                summaryDetails={
                  config.summaryDetails
                }
                checklistTitle={
                  config.checklistTitle
                }
                checklist={config.checklist}
                attachments={
                  config.attachments
                }
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default EntryPage;
