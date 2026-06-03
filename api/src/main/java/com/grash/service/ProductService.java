package com.grash.service;

import com.grash.dto.ProductAttachmentResponseDto;
import com.grash.dto.ProductRequestDto;
import com.grash.dto.ProductResponseDto;
import com.grash.exception.DuplicateResourceException;
import com.grash.exception.ResourceNotFoundException;
import com.grash.model.Product;
import com.grash.model.ProductAttachment;
import com.grash.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private final String IMAGE_UPLOAD_DIR =
            "uploads/product-images/";

    private final String ATTACHMENT_UPLOAD_DIR =
            "uploads/product-attachments/";

    public ProductResponseDto createProduct(
            ProductRequestDto dto,
            MultipartFile image,
            MultipartFile[] attachments
    ) throws IOException {

        if (productRepository.existsByProductUid(
                dto.getProductUid()
        )) {
            throw new DuplicateResourceException(
                    "Product UID already exists"
            );
        }

        if (
                dto.getProductSerialNumber() != null
                        &&
                        productRepository.existsByProductSerialNumber(
                                dto.getProductSerialNumber()
                        )
        ) {
            throw new DuplicateResourceException(
                    "Product Serial Number already exists"
            );
        }

        Files.createDirectories(
                Paths.get(IMAGE_UPLOAD_DIR)
        );

        Files.createDirectories(
                Paths.get(ATTACHMENT_UPLOAD_DIR)
        );

        String imageUrl = null;

        /**
         * SAVE IMAGE
         */
        if (image != null && !image.isEmpty()) {

            String imageName =
                    UUID.randomUUID() +
                            "_" +
                            image.getOriginalFilename();

            Path imagePath = Paths.get(
                    IMAGE_UPLOAD_DIR,
                    imageName
            );

            Files.copy(
                    image.getInputStream(),
                    imagePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            imageUrl =
                    "/uploads/product-images/" + imageName;
        }

        /**
         * BUILD PRODUCT
         */
        Product product = Product.builder()

                .productUid(dto.getProductUid())

                .productName(dto.getProductName())

                .productCategory(dto.getProductCategory())

                .productSerialNumber(dto.getProductSerialNumber())

                .productVersion(dto.getProductVersion())

                .bomVersion(dto.getBomVersion())

                .manufacturingBatchId(dto.getManufacturingBatchId())

                .manufacturingDate(
                        dto.getManufacturingDate() != null
                                ? LocalDate.parse(
                                dto.getManufacturingDate()
                        )
                                : null
                )

                .assemblyDate(
                        dto.getAssemblyDate() != null
                                ? LocalDate.parse(
                                dto.getAssemblyDate()
                        )
                                : null
                )

                // WARRANTY START DATE
                .warrantyStartDate(
                        dto.getWarrantyStartDate() != null
                                ? LocalDate.parse(
                                dto.getWarrantyStartDate()
                        )
                                : null
                )

                // WARRANTY END DATE
                .warrantyEndDate(
                        dto.getWarrantyEndDate() != null
                                ? LocalDate.parse(
                                dto.getWarrantyEndDate()
                        )
                                : null
                )

                .qcStatus(dto.getQcStatus())

                .productStatus(dto.getProductStatus())

                .lifecycleStage(dto.getLifecycleStage())

                .modelNumber(dto.getModelNumber())

                .partNumber(dto.getPartNumber())

                .macAddress(dto.getMacAddress())

                .imeiModuleId(dto.getImeiModuleId())

                .hardwareVersion(dto.getHardwareVersion())

                .firmwareVersion(dto.getFirmwareVersion())

                .rfidTagId(dto.getRfidTagId())

                .digitalTwinLink(dto.getDigitalTwinLink())

                .remarks(dto.getRemarks())

                .assignedCustomer(dto.getAssignedCustomer())

                .installationSite(dto.getInstallationSite())

                .locationGps(dto.getLocationGps())

                .contactPerson(dto.getContactPerson())

                .contactNumber(dto.getContactNumber())

                .email(dto.getEmail())

                .imageUrl(imageUrl)

                .createdAt(LocalDateTime.now())

                .build();

        /**
         * SAVE ATTACHMENTS
         */
        if (attachments != null) {

            List<ProductAttachment> attachmentList =
                    new ArrayList<>();

            for (MultipartFile file : attachments) {

                if (file.isEmpty()) {
                    continue;
                }

                String fileName =
                        UUID.randomUUID() +
                                "_" +
                                file.getOriginalFilename();

                Path filePath = Paths.get(
                        ATTACHMENT_UPLOAD_DIR,
                        fileName
                );

                Files.copy(
                        file.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING
                );

                ProductAttachment attachment =
                        ProductAttachment.builder()
                                .fileName(file.getOriginalFilename())
                                .fileUrl(
                                        "/uploads/product-attachments/"
                                                + fileName
                                )
                                .product(product)
                                .build();

                attachmentList.add(attachment);
            }

            product.setAttachments(attachmentList);
        }

        Product savedProduct =
                productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    public List<ProductResponseDto> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProductResponseDto getProductByUid(
            String productUid
    ) {

        Product product =
                productRepository
                        .findByProductUid(productUid)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found"
                                ));

        return mapToResponse(product);
    }

    public void deleteProductByUid(
            String productUid
    ) throws IOException {

        Product product =
                productRepository
                        .findByProductUid(productUid)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found"
                                ));

        /**
         * DELETE IMAGE
         */
        if (product.getImageUrl() != null) {

            String imagePath =
                    product.getImageUrl()
                            .replace("/uploads/", "uploads/");

            Files.deleteIfExists(
                    Paths.get(imagePath)
            );
        }

        /**
         * DELETE ATTACHMENTS
         */
        if (product.getAttachments() != null) {

            for (
                    ProductAttachment attachment
                    : product.getAttachments()
            ) {

                if (attachment.getFileUrl() != null) {

                    String filePath =
                            attachment.getFileUrl()
                                    .replace(
                                            "/uploads/",
                                            "uploads/"
                                    );

                    Files.deleteIfExists(
                            Paths.get(filePath)
                    );
                }
            }
        }

        productRepository.delete(product);
    }

    public ProductResponseDto updateProduct(
            String productUid,
            ProductRequestDto dto,
            MultipartFile image,
            MultipartFile[] attachments
    ) throws IOException {

        Product product =
                productRepository
                        .findByProductUid(productUid)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found"
                                ));

        /**
         * CHECK SERIAL NUMBER
         */
        Optional<Product> existingSerialProduct =
                productRepository
                        .findByProductSerialNumber(
                                dto.getProductSerialNumber()
                        );

        if (
                existingSerialProduct.isPresent()
                        &&
                        !existingSerialProduct
                                .get()
                                .getId()
                                .equals(product.getId())
        ) {

            throw new DuplicateResourceException(
                    "Product Serial Number already exists"
            );
        }

        /**
         * UPDATE IMAGE
         */
        if (
                image != null &&
                        !image.isEmpty()
        ) {

            if (product.getImageUrl() != null) {

                String oldImagePath =
                        product.getImageUrl()
                                .replace(
                                        "/uploads/",
                                        "uploads/"
                                );

                Files.deleteIfExists(
                        Paths.get(oldImagePath)
                );
            }

            String imageName =
                    UUID.randomUUID() +
                            "_" +
                            image.getOriginalFilename();

            Path imagePath =
                    Paths.get(
                            IMAGE_UPLOAD_DIR,
                            imageName
                    );

            Files.copy(
                    image.getInputStream(),
                    imagePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            product.setImageUrl(
                    "/uploads/product-images/"
                            + imageName
            );
        }

        /**
         * UPDATE ATTACHMENTS
         */
        if (
                attachments != null &&
                        attachments.length > 0
        ) {

            if (product.getAttachments() != null) {

                for (
                        ProductAttachment oldAttachment
                        : product.getAttachments()
                ) {

                    if (
                            oldAttachment.getFileUrl()
                                    != null
                    ) {

                        String oldFilePath =
                                oldAttachment
                                        .getFileUrl()
                                        .replace(
                                                "/uploads/",
                                                "uploads/"
                                        );

                        Files.deleteIfExists(
                                Paths.get(oldFilePath)
                        );
                    }
                }

                product.getAttachments().clear();
            }

            List<ProductAttachment> attachmentList =
                    new ArrayList<>();

            for (MultipartFile file : attachments) {

                if (file.isEmpty()) {
                    continue;
                }

                String fileName =
                        UUID.randomUUID() +
                                "_" +
                                file.getOriginalFilename();

                Path filePath =
                        Paths.get(
                                ATTACHMENT_UPLOAD_DIR,
                                fileName
                        );

                Files.copy(
                        file.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING
                );

                ProductAttachment attachment =
                        ProductAttachment.builder()
                                .fileName(
                                        file.getOriginalFilename()
                                )
                                .fileUrl(
                                        "/uploads/product-attachments/"
                                                + fileName
                                )
                                .product(product)
                                .build();

                attachmentList.add(attachment);
            }

            product.setAttachments(
                    attachmentList
            );
        }

        /**
         * UPDATE PRODUCT FIELDS
         */
        product.setProductName(
                dto.getProductName()
        );

        product.setProductCategory(
                dto.getProductCategory()
        );

        product.setProductSerialNumber(
                dto.getProductSerialNumber()
        );

        product.setProductVersion(
                dto.getProductVersion()
        );

        product.setBomVersion(
                dto.getBomVersion()
        );

        product.setManufacturingBatchId(
                dto.getManufacturingBatchId()
        );

        product.setManufacturingDate(
                dto.getManufacturingDate() != null
                        ? LocalDate.parse(
                        dto.getManufacturingDate()
                )
                        : null
        );

        product.setAssemblyDate(
                dto.getAssemblyDate() != null
                        ? LocalDate.parse(
                        dto.getAssemblyDate()
                )
                        : null
        );

        // WARRANTY START DATE
        product.setWarrantyStartDate(
                dto.getWarrantyStartDate() != null
                        ? LocalDate.parse(
                        dto.getWarrantyStartDate()
                )
                        : null
        );

        // WARRANTY END DATE
        product.setWarrantyEndDate(
                dto.getWarrantyEndDate() != null
                        ? LocalDate.parse(
                        dto.getWarrantyEndDate()
                )
                        : null
        );

        product.setQcStatus(
                dto.getQcStatus()
        );

        product.setProductStatus(
                dto.getProductStatus()
        );

        product.setLifecycleStage(
                dto.getLifecycleStage()
        );

        product.setModelNumber(
                dto.getModelNumber()
        );

        product.setPartNumber(
                dto.getPartNumber()
        );

        product.setMacAddress(
                dto.getMacAddress()
        );

        product.setImeiModuleId(
                dto.getImeiModuleId()
        );

        product.setHardwareVersion(
                dto.getHardwareVersion()
        );

        product.setFirmwareVersion(
                dto.getFirmwareVersion()
        );

        product.setRfidTagId(
                dto.getRfidTagId()
        );

        product.setDigitalTwinLink(
                dto.getDigitalTwinLink()
        );

        product.setRemarks(
                dto.getRemarks()
        );

        product.setAssignedCustomer(
                dto.getAssignedCustomer()
        );

        product.setInstallationSite(
                dto.getInstallationSite()
        );

        product.setLocationGps(
                dto.getLocationGps()
        );

        product.setContactPerson(
                dto.getContactPerson()
        );

        product.setContactNumber(
                dto.getContactNumber()
        );

        product.setEmail(
                dto.getEmail()
        );

        Product updatedProduct =
                productRepository.save(product);

        return mapToResponse(
                updatedProduct
        );
    }

    private ProductResponseDto mapToResponse(
            Product product
    ) {

        return ProductResponseDto.builder()

                .id(product.getId())

                .productUid(product.getProductUid())

                .productName(product.getProductName())

                .productCategory(product.getProductCategory())

                .productSerialNumber(product.getProductSerialNumber())

                .productVersion(product.getProductVersion())

                .bomVersion(product.getBomVersion())

                .manufacturingBatchId(product.getManufacturingBatchId())

                .manufacturingDate(
                        product.getManufacturingDate() != null
                                ? product.getManufacturingDate().toString()
                                : null
                )

                .assemblyDate(
                        product.getAssemblyDate() != null
                                ? product.getAssemblyDate().toString()
                                : null
                )

                // WARRANTY START DATE
                .warrantyStartDate(
                        product.getWarrantyStartDate() != null
                                ? product.getWarrantyStartDate().toString()
                                : null
                )

                // WARRANTY END DATE
                .warrantyEndDate(
                        product.getWarrantyEndDate() != null
                                ? product.getWarrantyEndDate().toString()
                                : null
                )

                .qcStatus(product.getQcStatus())

                .productStatus(product.getProductStatus())

                .lifecycleStage(product.getLifecycleStage())

                .modelNumber(product.getModelNumber())

                .partNumber(product.getPartNumber())

                .macAddress(product.getMacAddress())

                .imeiModuleId(product.getImeiModuleId())

                .hardwareVersion(product.getHardwareVersion())

                .firmwareVersion(product.getFirmwareVersion())

                .rfidTagId(product.getRfidTagId())

                .digitalTwinLink(product.getDigitalTwinLink())

                .remarks(product.getRemarks())

                .category(product.getProductCategory())

                .assignedCustomer(product.getAssignedCustomer())

                .installationSite(product.getInstallationSite())

                .locationGps(product.getLocationGps())

                .contactPerson(product.getContactPerson())

                .contactNumber(product.getContactNumber())

                .email(product.getEmail())

                .imageUrl(product.getImageUrl())

                .attachments(
                        product.getAttachments() != null
                                ? product.getAttachments()
                                .stream()
                                .map(att ->
                                        ProductAttachmentResponseDto.builder()
                                                .id(att.getId())
                                                .fileName(att.getFileName())
                                                .fileUrl(att.getFileUrl())
                                                .build()
                                )
                                .toList()
                                : List.of()
                )

                .createdAt(
                        product.getCreatedAt() != null
                                ? product.getCreatedAt().toString()
                                : null
                )

                .build();
    }
}