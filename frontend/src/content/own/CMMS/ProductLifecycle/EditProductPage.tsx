import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

import { Helmet } from 'react-helmet-async';

import {
  alpha,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Link,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';

import { QRCodeSVG } from 'qrcode.react';
import { useDropzone } from 'react-dropzone';

import {
  Link as RouterLink,
  useNavigate,
  useParams
} from 'react-router-dom';

import axios from 'src/utils/axios';

import { CustomSnackBarContext } from 'src/contexts/CustomSnackBarContext';
import { TitleContext } from 'src/contexts/TitleContext';

import { lifecycleStages } from '../mockData';

type ProductFormValues = {
  productUid: string;
  productName: string;
  productCategory: string;
  productSerialNumber: string;
  productVersion: string;
  bomVersion: string;
  manufacturingBatchId: string;
  manufacturingDate: string;
  assemblyDate: string;
  qcStatus: string;
  productStatus: string;
  lifecycleStage: string;
  modelNumber: string;
  partNumber: string;
  macAddress: string;
  imeiModuleId: string;
  hardwareVersion: string;
  firmwareVersion: string;
  rfidTagId: string;
  digitalTwinLink: string;
  remarks: string;
  assignedCustomer: string;
  installationSite: string;
  locationGps: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
};

const emptyFormValues: ProductFormValues = {
  productUid: '',
  productName: '',
  productCategory: '',
  productSerialNumber: '',
  productVersion: '',
  bomVersion: '',
  manufacturingBatchId: '',
  manufacturingDate: '',
  assemblyDate: '',
  qcStatus: 'Pending',
  productStatus: 'Manufacturing',
  lifecycleStage: 'Design',
  modelNumber: '',
  partNumber: '',
  macAddress: '',
  imeiModuleId: '',
  hardwareVersion: '',
  firmwareVersion: '',
  rfidTagId: '',
  digitalTwinLink: '',
  remarks: '',
  assignedCustomer: '',
  installationSite: '',
  locationGps: '',
  contactPerson: '',
  contactNumber: '',
  email: ''
};

const categoryOptions = [
  'Electronics',
  'Machinery',
  'Power',
  'Gateway'
];

const qcOptions = [
  'Pending',
  'In Progress',
  'Passed',
  'Failed'
];

const statusOptions = [
  'Manufacturing',
  'In Service',
  'Maintenance',
  'Retired',
  'Draft'
];

const lifecycleStageDetails = [
  {
    stage: 'Design',
    description: 'Product is in design phase.',
    color: '#2563eb',
    icon: DescriptionTwoToneIcon
  },
  {
    stage: 'Prototype',
    description: 'Prototype development.',
    color: '#16a34a',
    icon: Inventory2TwoToneIcon
  },
  {
    stage: 'Manufacturing',
    description: 'In production.',
    color: '#2563eb',
    icon: PrecisionManufacturingTwoToneIcon
  },
  {
    stage: 'In Service',
    description: 'Deployed / In operation.',
    color: '#059669',
    icon: BuildCircleTwoToneIcon
  },
  {
    stage: 'Maintenance',
    description: 'Under maintenance.',
    color: '#f59e0b',
    icon: BuildCircleTwoToneIcon
  },
  {
    stage: 'Retired',
    description: 'Product retired / obsolete.',
    color: '#64748b',
    icon: Inventory2TwoToneIcon
  }
];

function EditProductPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { setTitle } = useContext(TitleContext);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const [product, setProduct] = useState<any>(null);
  const [formValues, setFormValues] =
    useState<ProductFormValues>(emptyFormValues);
  const [attachmentFiles, setAttachmentFiles] =
    useState<File[]>([]);
  const [imageFiles, setImageFiles] =
    useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle('Edit Product');
  }, [setTitle]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `/api/products/${productId}`
        );

        const productData = response.data?.data;

        setProduct(productData);
        setFormValues(
          getFormValues(productData)
        );
      } catch (error: any) {
        console.error('EDIT PRODUCT FETCH ERROR:', error);

        showSnackBar(
          error?.response?.data?.message ||
            'Unable to load product',
          'error'
        );

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, showSnackBar]);

  useEffect(() => {
    let active = true;
    let objectUrl = '';

    const loadImage = async () => {
      if (imageFiles[0]) {
        objectUrl = URL.createObjectURL(
          imageFiles[0]
        );

        if (active) {
          setImagePreview(objectUrl);
        }

        return;
      }

      if (!product?.imageUrl) {
        setImagePreview('');
        return;
      }

      try {
        const response = await axios.get(
          product.imageUrl,
          {
            responseType: 'blob'
          }
        );

        objectUrl = URL.createObjectURL(
          response.data
        );

        if (active) {
          setImagePreview(objectUrl);
        }
      } catch (error) {
        console.error('EDIT IMAGE FETCH ERROR:', error);
        if (active) {
          setImagePreview('');
        }
      }
    };

    loadImage();

    return () => {
      active = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [product, imageFiles]);

  const handleAttachmentsDrop =
    useCallback((acceptedFiles: File[]) => {
      setAttachmentFiles((prev) => [
        ...prev,
        ...acceptedFiles
      ]);
    }, []);

  const handleImageDrop =
    useCallback((acceptedFiles: File[]) => {
      setImageFiles(
        acceptedFiles.slice(0, 1)
      );
    }, []);

  const attachmentDropzone = useDropzone({
    onDrop: handleAttachmentsDrop,
    multiple: true
  });

  const imageDropzone = useDropzone({
    onDrop: handleImageDrop,
    multiple: false
  });

  const handleFieldChange =
    (field: keyof ProductFormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: event.target.value
      }));
    };

  const buildFormData = (
    values: ProductFormValues
  ) => {
    const formData = new FormData();

    formData.append(
      'product',
      JSON.stringify(values)
    );

    if (imageFiles.length > 0) {
      formData.append(
        'image',
        imageFiles[0]
      );
    }

    attachmentFiles.forEach((file) => {
      formData.append(
        'attachments',
        file
      );
    });

    return formData;
  };

  const saveProduct = async (
    draft: boolean
  ) => {
    if (!productId) return;

    try {
      setSaving(true);

      const valuesToSave = {
        ...formValues,
        productStatus: draft
          ? 'Draft'
          : formValues.productStatus
      };

      const response = await axios.put(
        `/api/products/${productId}`,
        buildFormData(valuesToSave),
        {
          headers: {
            'Content-Type':
              'multipart/form-data'
          }
        }
      );

      const updatedProduct = response.data?.data;

      setProduct(updatedProduct);
      setFormValues(
        getFormValues(updatedProduct)
      );
      setImageFiles([]);
      setAttachmentFiles([]);

      showSnackBar(
        response.data?.message ||
          (draft
            ? 'Draft saved successfully'
            : 'Product updated successfully'),
        'success'
      );
    } catch (error: any) {
      console.error('EDIT PRODUCT SAVE ERROR:', error);

      showSnackBar(
        error?.response?.data?.message ||
          'Unable to update product',
        'error'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    void saveProduct(false);
  };

  const renderField = (
    field: keyof ProductFormValues,
    label: string,
    options?: readonly string[],
    props: {
      type?: string;
      multiline?: boolean;
      rows?: number;
      disabled?: boolean;
    } = {}
  ) => (
    <TextField
      fullWidth
      size="small"
      label={label}
      select={Boolean(options)}
      value={formValues[field]}
      onChange={handleFieldChange(field)}
      type={props.type}
      multiline={props.multiline}
      rows={props.rows}
      disabled={props.disabled}
      InputLabelProps={
        props.type === 'date'
          ? { shrink: true }
          : undefined
      }
    >
      {options?.map((option) => (
        <MenuItem
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </TextField>
  );

  const renderSection = (
    title: string,
    icon: ReactNode,
    children: ReactNode
  ) => (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mb: 1.5 }}
      >
        <Box
          sx={{
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main'
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {title}
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>
            Loading product...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box p={4}>
        <Typography variant="h4">
          Product not found
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() =>
            navigate('/app/product-lifecycle')
          }
        >
          Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        p={{ xs: 2, md: 4 }}
        sx={{
          backgroundColor: '#f4f6fb',
          minHeight: '100vh'
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction={{
              xs: 'column',
              md: 'row'
            }}
            justifyContent="space-between"
            alignItems={{
              xs: 'stretch',
              md: 'flex-start'
            }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h2"
                fontWeight={700}
              >
                Edit Product
              </Typography>

              <Breadcrumbs sx={{ mt: 1 }}>
                <Link
                  component={RouterLink}
                  underline="hover"
                  color="inherit"
                  to="/app/home"
                >
                  Modules
                </Link>

                <Link
                  component={RouterLink}
                  underline="hover"
                  color="inherit"
                  to="/app/product-lifecycle"
                >
                  Product life cycle Log
                </Link>

                <Link
                  component={RouterLink}
                  underline="hover"
                  color="inherit"
                  to={`/app/product-lifecycle/${product.productUid}`}
                >
                  Product Details
                </Link>

                <Typography color="text.primary">
                  Edit Product
                </Typography>
              </Breadcrumbs>
            </Box>

            <Stack
              direction={{
                xs: 'column',
                sm: 'row'
              }}
              spacing={1}
            >
              <Button
                variant="outlined"
                onClick={() =>
                  navigate('/app/product-lifecycle')
                }
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="outlined"
                startIcon={<SaveTwoToneIcon />}
                onClick={() =>
                  void saveProduct(true)
                }
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : 'Save as Draft'}
              </Button>

              <Button
                type="submit"
                variant="contained"
                startIcon={
                  saving ? (
                    <CircularProgress
                      size={18}
                      color="inherit"
                    />
                  ) : (
                    <SaveTwoToneIcon />
                  )
                }
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : 'Save Changes'}
              </Button>
            </Stack>
          </Stack>

          <Grid
            container
            spacing={3}
            alignItems="flex-start"
          >
            <Grid item xs={12} lg={9}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: '1px solid #e5e7eb',
                  boxShadow: 'none'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={4}>
                    {renderSection(
                      'Basic Information',
                      <Inventory2TwoToneIcon fontSize="small" />,
                      <>
                        <Grid item xs={12} md={4}>
                          {renderField(
                            'productUid',
                            'Product UID',
                            undefined,
                            { disabled: true }
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'productName',
                            'Product Name'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'productCategory',
                            'Product Category',
                            categoryOptions
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'productSerialNumber',
                            'Product Serial Number'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'productVersion',
                            'Product Version'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'bomVersion',
                            'BOM Version'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'manufacturingBatchId',
                            'Manufacturing Batch ID'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'manufacturingDate',
                            'Manufacturing Date',
                            undefined,
                            { type: 'date' }
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'assemblyDate',
                            'Assembly Date',
                            undefined,
                            { type: 'date' }
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'qcStatus',
                            'QC Status',
                            qcOptions
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'productStatus',
                            'Product Status',
                            statusOptions
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'lifecycleStage',
                            'Lifecycle Stage',
                            lifecycleStages
                          )}
                        </Grid>
                      </>
                    )}

                    {renderSection(
                      'Technical Information',
                      <PrecisionManufacturingTwoToneIcon fontSize="small" />,
                      <>
                        <Grid item xs={12} md={4}>
                          {renderField(
                            'modelNumber',
                            'Model Number'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'partNumber',
                            'Part Number'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'macAddress',
                            'MAC Address'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'imeiModuleId',
                            'IMEI / Module ID'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'hardwareVersion',
                            'Hardware Version'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'firmwareVersion',
                            'Firmware Version'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'rfidTagId',
                            'RFID Tag ID'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'digitalTwinLink',
                            'Digital Twin Link'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'remarks',
                            'Description / Remarks',
                            undefined,
                            {
                              multiline: true,
                              rows: 3
                            }
                          )}
                        </Grid>
                      </>
                    )}

                    {renderSection(
                      'Customer & Location Information',
                      <GroupsTwoToneIcon fontSize="small" />,
                      <>
                        <Grid item xs={12} md={4}>
                          {renderField(
                            'assignedCustomer',
                            'Assigned Customer'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'installationSite',
                            'Installation Site'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'locationGps',
                            'Location (GPS)'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'contactPerson',
                            'Contact Person'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'contactNumber',
                            'Contact Number'
                          )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                          {renderField(
                            'email',
                            'Email'
                          )}
                        </Grid>
                      </>
                    )}

                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1.5 }}
                      >
                        <AttachFileTwoToneIcon
                          fontSize="small"
                          color="primary"
                        />

                        <Typography
                          variant="h4"
                          fontWeight={700}
                        >
                          Attachments
                        </Typography>
                      </Stack>

                      <Typography
                        color="text.secondary"
                        sx={{ mb: 1.5 }}
                      >
                        Upload related documents (BOM,
                        datasheets, manuals, certificates,
                        etc.)
                      </Typography>

                      <Paper
                        variant="outlined"
                        {...attachmentDropzone.getRootProps()}
                        sx={{
                          p: 2,
                          minHeight: 78,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          cursor: 'pointer',
                          borderStyle: 'dashed',
                          bgcolor:
                            attachmentDropzone.isDragActive
                              ? alpha(
                                  theme.palette.primary.main,
                                  0.08
                                )
                              : 'background.default'
                        }}
                      >
                        <input
                          {...attachmentDropzone.getInputProps()}
                        />

                        <Stack
                          spacing={0.5}
                          alignItems="center"
                        >
                          <UploadFileTwoToneIcon color="primary" />

                          <Typography variant="subtitle2">
                            Drag & drop files here or click to browse
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                          >
                            Selecting new files replaces existing attachments
                            on save.
                          </Typography>
                        </Stack>
                      </Paper>

                      <AttachmentsTable
                        attachments={
                          product.attachments || []
                        }
                        pendingFiles={attachmentFiles}
                        onRemovePending={(index) =>
                          setAttachmentFiles((prev) =>
                            prev.filter(
                              (_file, fileIndex) =>
                                fileIndex !== index
                            )
                          )
                        }
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={3}>
              <Stack spacing={2}>
                <Card
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #e5e7eb',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ mb: 2 }}
                    >
                      Product Image & QR Code
                    </Typography>

                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item xs={7}>
                        <Paper
                          variant="outlined"
                          sx={{
                            height: 118,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                          }}
                        >
                          {imagePreview ? (
                            <Box
                              component="img"
                              src={imagePreview}
                              alt={product.productName}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                              }}
                            />
                          ) : (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              No image
                            </Typography>
                          )}
                        </Paper>
                      </Grid>

                      <Grid item xs={5}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 1,
                            minHeight: 118,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <QRCodeSVG
                            value={
                              formValues.productUid ||
                              product.productUid
                            }
                            size={82}
                          />
                        </Paper>
                      </Grid>
                    </Grid>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 2 }}
                    >
                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                        {...imageDropzone.getRootProps()}
                      >
                        <input
                          {...imageDropzone.getInputProps()}
                        />
                        Change Image
                      </Button>

                      <Button
                        fullWidth
                        size="small"
                        variant="outlined"
                      >
                        Generate QR Code
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #e5e7eb',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ mb: 2 }}
                    >
                      Lifecycle Stages
                    </Typography>

                    <Stack spacing={1.25}>
                      {lifecycleStageDetails.map(
                        (stage) => {
                          const Icon = stage.icon;
                          const active =
                            formValues.lifecycleStage ===
                            stage.stage;

                          return (
                            <Stack
                              key={stage.stage}
                              direction="row"
                              spacing={1.5}
                              alignItems="flex-start"
                              onClick={() =>
                                setFormValues(
                                  (prev) => ({
                                    ...prev,
                                    lifecycleStage:
                                      stage.stage
                                  })
                                )
                              }
                              sx={{
                                cursor: 'pointer',
                                p: 0.75,
                                borderRadius: 1,
                                bgcolor: active
                                  ? alpha(stage.color, 0.08)
                                  : 'transparent'
                              }}
                            >
                              <Icon
                                fontSize="small"
                                sx={{
                                  color: stage.color,
                                  mt: 0.25
                                }}
                              />

                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={700}
                                >
                                  {stage.stage}
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {stage.description}
                                </Typography>
                              </Box>
                            </Stack>
                          );
                        }
                      )}
                    </Stack>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #e5e7eb',
                    boxShadow: 'none'
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ mb: 2 }}
                    >
                      Audit Information
                    </Typography>

                    <AuditRow
                      label="Created By"
                      value="System"
                    />
                    <AuditRow
                      label="Created On"
                      value={formatDateTime(
                        product.createdAt
                      )}
                    />
                    <AuditRow
                      label="Last Updated By"
                      value="System"
                    />
                    <AuditRow
                      label="Last Updated On"
                      value={formatDateTime(
                        product.createdAt
                      )}
                    />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

function AttachmentsTable({
  attachments,
  pendingFiles,
  onRemovePending
}: {
  attachments: any[];
  pendingFiles: File[];
  onRemovePending: (index: number) => void;
}) {
  return (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell>File Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Uploaded On</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {attachments.map((attachment) => (
          <TableRow key={attachment.id || attachment.fileName}>
            <TableCell>
              {attachment.fileName || attachment.name}
            </TableCell>
            <TableCell>Existing</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell align="center">
              <DeleteTwoToneIcon
                color="error"
                fontSize="small"
              />
            </TableCell>
          </TableRow>
        ))}

        {pendingFiles.map((file, index) => (
          <TableRow key={`${file.name}-${index}`}>
            <TableCell>{file.name}</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>
              {formatFileSize(file.size)}
            </TableCell>
            <TableCell>On save</TableCell>
            <TableCell align="center">
              <Button
                size="small"
                color="error"
                onClick={() =>
                  onRemovePending(index)
                }
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}

        {!attachments.length &&
          !pendingFiles.length && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography
                  color="text.secondary"
                  textAlign="center"
                >
                  No attachments yet.
                </Typography>
              </TableCell>
            </TableRow>
          )}
      </TableBody>
    </Table>
  );
}

function AuditRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <Grid container spacing={1} sx={{ mb: 1.5 }}>
      <Grid item xs={6}>
        <Typography color="text.secondary">
          {label}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="subtitle2">
          {value || '-'}
        </Typography>
      </Grid>
    </Grid>
  );
}

function getFormValues(product: any): ProductFormValues {
  if (!product) {
    return emptyFormValues;
  }

  return {
    productUid: product.productUid || '',
    productName: product.productName || '',
    productCategory:
      product.productCategory || product.category || '',
    productSerialNumber:
      product.productSerialNumber || '',
    productVersion: product.productVersion || '',
    bomVersion: product.bomVersion || '',
    manufacturingBatchId:
      product.manufacturingBatchId || '',
    manufacturingDate: toDateInputValue(
      product.manufacturingDate
    ),
    assemblyDate: toDateInputValue(
      product.assemblyDate
    ),
    qcStatus: product.qcStatus || 'Pending',
    productStatus:
      product.productStatus || 'Manufacturing',
    lifecycleStage:
      product.lifecycleStage || 'Design',
    modelNumber: product.modelNumber || '',
    partNumber: product.partNumber || '',
    macAddress: product.macAddress || '',
    imeiModuleId: product.imeiModuleId || '',
    hardwareVersion: product.hardwareVersion || '',
    firmwareVersion: product.firmwareVersion || '',
    rfidTagId: product.rfidTagId || '',
    digitalTwinLink: product.digitalTwinLink || '',
    remarks: product.remarks || '',
    assignedCustomer:
      product.assignedCustomer || '',
    installationSite:
      product.installationSite || '',
    locationGps: product.locationGps || '',
    contactPerson: product.contactPerson || '',
    contactNumber: product.contactNumber || '',
    email: product.email || ''
  };
}

function toDateInputValue(value: string) {
  return value ? value.slice(0, 10) : '';
}

function formatDateTime(value: string) {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default EditProductPage;
