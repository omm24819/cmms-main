package com.grash.service;

import com.grash.dto.ManufacturingLogisticsTrailAttachmentDto;
import com.grash.dto.ManufacturingLogisticsTrailRequestDto;
import com.grash.dto.ManufacturingLogisticsTrailResponseDto;
import com.grash.model.ManufacturingLogisticsTrailAttachment;
import com.grash.model.ManufacturingLogisticsTrailLog;
import com.grash.repository.ManufacturingLogisticsTrailAttachmentRepository;
import com.grash.repository.ManufacturingLogisticsTrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ManufacturingLogisticsTrailService {

    private final ManufacturingLogisticsTrailRepository repository;

    private final ManufacturingLogisticsTrailAttachmentRepository
            attachmentRepository;

    private static final String DOCUMENT_FOLDER =
            "uploads/product-attachments";

    private static final String IMAGE_FOLDER =
            "uploads/product-images";

    public ManufacturingLogisticsTrailResponseDto create(
            ManufacturingLogisticsTrailRequestDto dto,
            List<MultipartFile> documents,
            List<MultipartFile> productImages
    ) throws Exception {

        ManufacturingLogisticsTrailLog log =
                ManufacturingLogisticsTrailLog.builder()

                        .logUid(generateLogUid())

                        .transferDateTime(
                                dto.getTransferDateTime()
                        )
                        .movementType(
                                dto.getMovementType()
                        )
                        .referenceNumber(
                                dto.getReferenceNumber()
                        )
                        .priority(
                                dto.getPriority()
                        )
                        .reasonForTransfer(
                                dto.getReasonForTransfer()
                        )
                        .materialItemType(
                                dto.getMaterialItemType()
                        )
                        .itemProductDetails(
                                dto.getItemProductDetails()
                        )

                        .sourceWarehouse(
                                dto.getSourceWarehouse()
                        )
                        .sourceAreaZone(
                                dto.getSourceAreaZone()
                        )
                        .sourceBinShelfNo(
                                dto.getSourceBinShelfNo()
                        )
                        .sourceBatchLotNo(
                                dto.getSourceBatchLotNo()
                        )
                        .quantityAvailable(
                                dto.getQuantityAvailable()
                        )
                        .uom(
                                dto.getUom()
                        )
                        .quantityToTransfer(
                                dto.getQuantityToTransfer()
                        )
                        .serialBatchRange(
                                dto.getSerialBatchRange()
                        )

                        .destinationWarehouse(
                                dto.getDestinationWarehouse()
                        )
                        .destinationAreaZone(
                                dto.getDestinationAreaZone()
                        )
                        .destinationBinShelfNo(
                                dto.getDestinationBinShelfNo()
                        )
                        .expectedUsePurpose(
                                dto.getExpectedUsePurpose()
                        )
                        .requiredByDateTime(
                                dto.getRequiredByDateTime()
                        )
                        .linkedWorkOrder(
                                dto.getLinkedWorkOrder()
                        )
                        .linkedProductionOrder(
                                dto.getLinkedProductionOrder()
                        )
                        .endProduct(
                                dto.getEndProduct()
                        )

                        .handledByOperator(
                                dto.getHandledByOperator()
                        )
                        .movementMethod(
                                dto.getMovementMethod()
                        )
                        .packagingCondition(
                                dto.getPackagingCondition()
                        )
                        .transportDeviceVehicle(
                                dto.getTransportDeviceVehicle()
                        )
                        .packagingContainerId(
                                dto.getPackagingContainerId()
                        )
                        .sealTagRfid(
                                dto.getSealTagRfid()
                        )
                        .conditionOnTransfer(
                                dto.getConditionOnTransfer()
                        )
                        .transitDelayMinutes(
                                dto.getTransitDelayMinutes()
                        )

                        .checkedBySupervisor(
                                dto.getCheckedBySupervisor()
                        )
                        .verificationTime(
                                dto.getVerificationTime()
                        )
                        .status(
                                dto.getStatus()
                        )
                        .remarks(
                                dto.getRemarks()
                        )

                        .createdAt(
                                LocalDateTime.now()
                        )
                        .updatedAt(
                                LocalDateTime.now()
                        )
                        .build();

        repository.save(log);

        saveAttachments(
                log,
                documents,
                DOCUMENT_FOLDER,
                "DOCUMENT"
        );

        saveAttachments(
                log,
                productImages,
                IMAGE_FOLDER,
                "PRODUCT_IMAGE"
        );

        return map(log);
    }

    public List<ManufacturingLogisticsTrailResponseDto>
    getAll() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    public ManufacturingLogisticsTrailResponseDto
    getByLogUid(
            String logUid
    ) {

        ManufacturingLogisticsTrailLog log =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Logistics Trail Log not found"
                                )
                        );

        return map(log);
    }

    public void deleteByLogUid(
            String logUid
    ) {

        ManufacturingLogisticsTrailLog log =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Logistics Trail Log not found"
                                )
                        );

        repository.delete(log);
    }

    private void saveAttachments(
            ManufacturingLogisticsTrailLog log,
            List<MultipartFile> files,
            String folder,
            String type
    ) throws IOException {

        if (files == null || files.isEmpty()) {
            return;
        }

        Files.createDirectories(
                Paths.get(folder)
        );

        for (MultipartFile file : files) {

            String fileName =
                    UUID.randomUUID()
                            + "_"
                            + file.getOriginalFilename();

            Path path =
                    Paths.get(
                            folder,
                            fileName
                    );

            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            ManufacturingLogisticsTrailAttachment
                    attachment =
                    ManufacturingLogisticsTrailAttachment
                            .builder()
                            .fileName(fileName)
                            .originalFileName(
                                    file.getOriginalFilename()
                            )
                            .filePath(
                                    path.toString()
                            )
                            .fileType(
                                    file.getContentType()
                            )
                            .fileSize(
                                    file.getSize()
                            )
                            .attachmentType(
                                    type
                            )
                            .logisticsTrailLog(
                                    log
                            )
                            .build();

            attachmentRepository.save(
                    attachment
            );
        }
    }

    private String generateLogUid() {

        return "LGT-" +
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern(
                                "yyyyMMddHHmmss"
                        )
                );
    }

    private ManufacturingLogisticsTrailResponseDto map(
            ManufacturingLogisticsTrailLog log
    ) {

        List<ManufacturingLogisticsTrailAttachmentDto>
                attachments =
                attachmentRepository
                        .findByLogisticsTrailLogId(
                                log.getId()
                        )
                        .stream()
                        .map(file ->
                                ManufacturingLogisticsTrailAttachmentDto
                                        .builder()
                                        .id(file.getId())
                                        .fileName(file.getFileName())
                                        .originalFileName(
                                                file.getOriginalFileName()
                                        )
                                        .filePath(
                                                file.getFilePath()
                                        )
                                        .fileType(
                                                file.getFileType()
                                        )
                                        .fileSize(
                                                file.getFileSize()
                                        )
                                        .attachmentType(
                                                file.getAttachmentType()
                                        )
                                        .build()
                        )
                        .toList();

        return ManufacturingLogisticsTrailResponseDto
                .builder()
                .id(log.getId())
                .logUid(log.getLogUid())
                .transferDateTime(
                        log.getTransferDateTime()
                )
                .movementType(
                        log.getMovementType()
                )
                .sourceWarehouse(
                        log.getSourceWarehouse()
                )
                .destinationWarehouse(
                        log.getDestinationWarehouse()
                )
                .quantityToTransfer(
                        log.getQuantityToTransfer()
                )
                .handledByOperator(
                        log.getHandledByOperator()
                )
                .status(
                        log.getStatus()
                )
                .remarks(
                        log.getRemarks()
                )
                .attachments(
                        attachments
                )
                .build();
    }
}