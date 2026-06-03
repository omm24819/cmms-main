// src/content/own/CMMS/ManufacturingExecutionLog/EntryPage.tsx

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
  CircularProgress,
  Link,
  Snackbar,
  Stack,
  Typography
} from '@mui/material';

import {
  Link as RouterLink
} from 'react-router-dom';

import { TitleContext } from 'src/contexts/TitleContext';

import {
  EntryUploadSidebar,
  EntryActionButtons,
  FormSectionBlock
} from './components';

import { manufacturingEntryConfigs } from './mockData';

import type {
  AttachmentItem,
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

      accumulator[field.name] =
        field.autoGenerate
          ? generateLogId(config.type)
          : field.value;
    });

    return accumulator;

  }, {});
}

function generateLogId(
  type: ManufacturingLogType
) {

  const prefixes:
    Record<ManufacturingLogType, string> = {
    'raw-materials': 'RMP',
    components: 'CMP',
    'assembly-line': 'ASM',
    'logistics-trail': 'LGT'
  };

  const now = new Date();

  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('');

  const randomPart = Math.floor(
    1000 + Math.random() * 9000
  );

  return `${prefixes[type]}-${datePart}-${randomPart}`;
}

function createMockAttachments(
  config: ManufacturingEntryConfig
): AttachmentItem[] {

  return (config.attachments || []).map(
    (attachment, index) => ({
      ...attachment,
      id:
        attachment.id ||
        `${config.type}-mock-document-${index}`
    })
  );
}

function fileToAttachment(
  file: File,
  prefix: string
): AttachmentItem {

  return {
    id: `${prefix}-${file.name}-${file.lastModified}`,
    name: file.name,
    size: formatFileSize(file.size),
    type: file.type || 'Unknown',

    // IMPORTANT
    file
  };
}

function formatFileSize(size: number) {

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function EntryPage({
  type
}: {
  type: ManufacturingLogType;
}) {

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

  const [loading, setLoading] =
    useState(false);

  const [successOpen, setSuccessOpen] =
    useState(false);

  const [errorOpen, setErrorOpen] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [documentFiles, setDocumentFiles] =
    useState<AttachmentItem[]>(() =>
      createMockAttachments(config)
    );

  const [
    productImageFiles,
    setProductImageFiles
  ] = useState<AttachmentItem[]>([]);

  useEffect(() => {

    setTitle(config.title);

  }, [config.title, setTitle]);

  useEffect(() => {

    setValues(initialValues);

    setDocumentFiles(
      createMockAttachments(config)
    );

    setProductImageFiles([]);

  }, [config, initialValues]);

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

    console.log(
      'Draft Data',
      values
    );

    window.alert(
      'Draft saved locally'
    );
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const formData = new FormData();

    let apiUrl = '';
    let payloadKey = '';

    switch (type) {
      case 'raw-materials':
        apiUrl =
          'http://localhost:8080/api/raw-material-procurement/create';

        payloadKey = 'procurementData';

        formData.append(
          payloadKey,
          JSON.stringify(values)
        );

        documentFiles.forEach((item) => {
          if (item.file) {
            formData.append(
              'files',
              item.file
            );
          }
        });

        break;

      case 'components':
        apiUrl =
          'http://localhost:8080/api/component-manufacturing/create';

        payloadKey = 'componentData';

        formData.append(
          payloadKey,
          JSON.stringify(values)
        );

        documentFiles.forEach((item) => {
          if (item.file) {
            formData.append(
              'documents',
              item.file
            );
          }
        });

        productImageFiles.forEach((item) => {
          if (item.file) {
            formData.append(
              'productImages',
              item.file
            );
          }
        });

        break;

      case 'assembly-line':
        apiUrl =
          'http://localhost:8080/api/assembly-line/create';

        payloadKey = 'assemblyData';

        formData.append(
          payloadKey,
          JSON.stringify(values)
        );

        break;

      case 'logistics-trail':
        apiUrl =
          'http://localhost:8080/api/logistics-trail/create';

        payloadKey = 'logisticsData';

        formData.append(
          payloadKey,
          JSON.stringify(values)
        );

        break;

      default:
        throw new Error(
          'Unsupported entry type'
        );
    }

    const token =
      localStorage.getItem(
        'accessToken'
      );

    const response =
      await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

    console.log(
      'SUCCESS RESPONSE',
      response.data
    );

    setSuccessOpen(true);

    setValues(initialValues);

    setDocumentFiles([]);

    setProductImageFiles([]);
  } catch (error: any) {
    console.error(error);

    setErrorMessage(
      error?.response?.data?.message ||
        'Failed to submit entry'
    );

    setErrorOpen(true);
  } finally {
    setLoading(false);
  }
};

  const handleDocumentFilesAdded = (
    files: File[]
  ) => {

    setDocumentFiles((previousFiles) => [
      ...previousFiles,
      ...files.map((file) =>
        fileToAttachment(
          file,
          'document'
        )
      )
    ]);
  };

  const handleProductImageFilesAdded = (
    files: File[]
  ) => {

    setProductImageFiles(
      files
        .slice(0, 1)
        .map((file) =>
          fileToAttachment(
            file,
            'product-image'
          )
        )
    );
  };

  const handleDocumentFileRemove = (
    fileId: string
  ) => {

    setDocumentFiles((previousFiles) =>
      previousFiles.filter(
        (file) =>
          (file.id || file.name) !==
          fileId
      )
    );
  };

  const handleProductImageFileRemove = (
    fileId: string
  ) => {

    setProductImageFiles(
      (previousFiles) =>
        previousFiles.filter(
          (file) =>
            (file.id || file.name) !==
            fileId
        )
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {config.title}
        </title>
      </Helmet>

      <Box
        p={{ xs: 2, md: 3 }}
        sx={{
          bgcolor:
            'background.default'
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

                <EntryActionButtons
                  compact
                  onDraft={handleDraft}
                  onSubmit={handleSubmit}
                />

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
              />

              {loading && (
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              )}

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

              <EntryUploadSidebar
                documentFiles={
                  documentFiles
                }
                productImageFiles={
                  productImageFiles
                }
                onDocumentFilesAdded={
                  handleDocumentFilesAdded
                }
                onProductImageFilesAdded={
                  handleProductImageFilesAdded
                }
                onDocumentFileRemove={
                  handleDocumentFileRemove
                }
                onProductImageFileRemove={
                  handleProductImageFileRemove
                }
                showProductImageUpload={
                  config.type !==
                  'raw-materials'
                }
              />

            </Box>
          </Stack>
        </Stack>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() =>
          setSuccessOpen(false)
        }
      >
        <Alert severity="success">
          Entry submitted successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() =>
          setErrorOpen(false)
        }
      >
        <Alert severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EntryPage;