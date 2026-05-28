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
  Link,
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

  // TODO(API): Replace this temporary frontend ID with a backend-generated sequence.
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
    type: file.type || 'Unknown'
  };
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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
    // TODO(API): Replace mock attachment initialization with GET /api/manufacturing-execution-log/:type/:id/attachments.
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
    // TODO(API): Persist draft with POST /api/manufacturing-execution-log/:type/drafts.
    // TODO(API): Include documentFiles and productImageFiles in multipart upload once the backend accepts attachments.
    console.log(
      'Manufacturing draft payload',
      type,
      values,
      documentFiles,
      productImageFiles
    );
    window.alert(
      'Draft saved locally. Backend API wiring is marked in the code.'
    );
  };

  const handleSubmit = () => {
    // TODO(API): Create entry with POST /api/manufacturing-execution-log/:type.
    // TODO(API): For edit mode later, update existing entries with PUT/PATCH /api/manufacturing-execution-log/:type/:id.
    // TODO(API): Upload documentFiles and productImageFiles to the backend attachment service.
    // TODO(API): Validate required fields with backend rules before final submission.
    console.log(
      'Manufacturing submit payload',
      type,
      values,
      documentFiles,
      productImageFiles
    );
    window.alert(
      'Entry submitted locally. Backend API wiring is marked in the code.'
    );
  };

  const handleDocumentFilesAdded = (
    files: File[]
  ) => {
    setDocumentFiles((previousFiles) => [
      ...previousFiles,
      ...files.map((file) =>
        fileToAttachment(file, 'document')
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
          fileToAttachment(file, 'product-image')
        )
    );
  };

  const handleDocumentFileRemove = (
    fileId: string
  ) => {
    // TODO(API): Call DELETE /api/manufacturing-execution-log/:type/attachments/:fileId when backend storage exists.
    setDocumentFiles((previousFiles) =>
      previousFiles.filter(
        (file) =>
          (file.id || file.name) !== fileId
      )
    );
  };

  const handleProductImageFileRemove = (
    fileId: string
  ) => {
    // TODO(API): Call DELETE /api/manufacturing-execution-log/:type/product-image/:fileId when backend storage exists.
    setProductImageFiles((previousFiles) =>
      previousFiles.filter(
        (file) =>
          (file.id || file.name) !== fileId
      )
    );
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
                documentFiles={documentFiles}
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
                  config.type !== 'raw-materials'
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
