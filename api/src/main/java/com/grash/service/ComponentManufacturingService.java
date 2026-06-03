package com.grash.service;

import com.grash.dto.ComponentManufacturingAttachmentDto;
import com.grash.dto.ComponentManufacturingRequestDto;
import com.grash.dto.ComponentManufacturingResponseDto;
import com.grash.model.ComponentManufacturingAttachment;
import com.grash.model.ComponentManufacturingLog;
import com.grash.model.Product;
import com.grash.repository.ComponentManufacturingAttachmentRepository;
import com.grash.repository.ComponentManufacturingRepository;
import com.grash.repository.ProductRepository;
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
public class ComponentManufacturingService {

    private final ComponentManufacturingRepository repository;

    private final ComponentManufacturingAttachmentRepository attachmentRepository;

    private final ProductRepository productRepository;

    private static final String DOCUMENT_FOLDER =
            "uploads/product-attachments";

    private static final String IMAGE_FOLDER =
            "uploads/product-images";

    public ComponentManufacturingResponseDto create(
            ComponentManufacturingRequestDto dto,
            List<MultipartFile> documents,
            List<MultipartFile> productImages
    ) throws Exception {

        Product product =
                productRepository.findByProductUid(
                        dto.getAssociatedProductUid()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Product not found"
                        )
                );

        ComponentManufacturingLog log =
                ComponentManufacturingLog.builder()
                        .logUid(generateLogUid())
                        .componentSerial(dto.getComponentSerial())
                        .componentName(dto.getComponentName())
                        .associatedProduct(product)
                        .pcbVersion(dto.getPcbVersion())
                        .cadVersion(dto.getCadVersion())
                        .bomVersion(dto.getBomVersion())
                        .revision(dto.getRevision())
                        .manufacturingDate(dto.getManufacturingDate())
                        .manufacturingTime(dto.getManufacturingTime())
                        .operatorId(dto.getOperatorId())
                        .machineId(dto.getMachineId())
                        .smtBatchId(dto.getSmtBatchId())
                        .solderPasteBatch(dto.getSolderPasteBatch())
                        .firmwareLoaded(dto.getFirmwareLoaded())
                        .testJig(dto.getTestJig())
                        .burnInStatus(dto.getBurnInStatus())
                        .functionalTest(dto.getFunctionalTest())
                        .calibrationResult(dto.getCalibrationResult())
                        .testEquipment(dto.getTestEquipment())
                        .burnInDuration(dto.getBurnInDuration())
                        .voltageCheck(dto.getVoltageCheck())
                        .currentCheck(dto.getCurrentCheck())
                        .frequencyCheck(dto.getFrequencyCheck())
                        .reworkCount(dto.getReworkCount())
                        .reworkDetails(dto.getReworkDetails())
                        .scrapStatus(dto.getScrapStatus())
                        .scrapReason(dto.getScrapReason())
                        .qcInspector(dto.getQcInspector())
                        .qcTimestamp(dto.getQcTimestamp())
                        .packagingStatus(dto.getPackagingStatus())
                        .remarks(dto.getRemarks())
                        .notes(dto.getNotes())
                        .internalReference(dto.getInternalReference())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
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

    public List<ComponentManufacturingResponseDto> getAll() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    public ComponentManufacturingResponseDto getByLogUid(
            String logUid
    ) {

        ComponentManufacturingLog log =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Component Manufacturing Log not found"
                                )
                        );

        return map(log);
    }

    public void deleteByLogUid(
            String logUid
    ) {

        ComponentManufacturingLog log =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Component Manufacturing Log not found"
                                )
                        );

        repository.delete(log);
    }

    private void saveAttachments(
            ComponentManufacturingLog log,
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
                    UUID.randomUUID() +
                            "_" +
                            file.getOriginalFilename();

            Path path =
                    Paths.get(folder, fileName);

            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );

            ComponentManufacturingAttachment attachment =
                    ComponentManufacturingAttachment.builder()
                            .fileName(fileName)
                            .originalFileName(
                                    file.getOriginalFilename()
                            )
                            .filePath(path.toString())
                            .fileType(
                                    file.getContentType()
                            )
                            .fileSize(
                                    file.getSize()
                            )
                            .attachmentType(type)
                            .componentManufacturingLog(log)
                            .build();

            attachmentRepository.save(
                    attachment
            );
        }
    }

    private String generateLogUid() {

        return "CMP-" +
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern(
                                "yyyyMMddHHmmss"
                        )
                );
    }

    private ComponentManufacturingResponseDto map(
            ComponentManufacturingLog log
    ) {

        List<ComponentManufacturingAttachmentDto> attachments =
                attachmentRepository
                        .findByComponentManufacturingLogId(
                                log.getId()
                        )
                        .stream()
                        .map(file ->
                                ComponentManufacturingAttachmentDto
                                        .builder()
                                        .id(file.getId())
                                        .fileName(file.getFileName())
                                        .originalFileName(
                                                file.getOriginalFileName()
                                        )
                                        .filePath(file.getFilePath())
                                        .fileType(file.getFileType())
                                        .fileSize(file.getFileSize())
                                        .attachmentType(
                                                file.getAttachmentType()
                                        )
                                        .build()
                        )
                        .toList();

        return ComponentManufacturingResponseDto
                .builder()
                .id(log.getId())
                .logUid(log.getLogUid())
                .componentSerial(log.getComponentSerial())
                .componentName(log.getComponentName())
                .associatedProductUid(
                        log.getAssociatedProduct()
                                .getProductUid()
                )
                .associatedProductName(
                        log.getAssociatedProduct()
                                .getProductName()
                )
                .pcbVersion(log.getPcbVersion())
                .cadVersion(log.getCadVersion())
                .bomVersion(log.getBomVersion())
                .revision(log.getRevision())
                .manufacturingDate(log.getManufacturingDate())
                .manufacturingTime(log.getManufacturingTime())
                .operatorId(log.getOperatorId())
                .machineId(log.getMachineId())
                .functionalTest(log.getFunctionalTest())
                .calibrationResult(log.getCalibrationResult())
                .packagingStatus(log.getPackagingStatus())
                .remarks(log.getRemarks())
                .attachments(attachments)
                .build();
    }
}