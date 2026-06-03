package com.grash.service;

import com.grash.dto.AssemblyLineTrackingAttachmentDto;
import com.grash.dto.AssemblyLineTrackingRequestDto;
import com.grash.dto.AssemblyLineTrackingResponseDto;
import com.grash.model.*;
import com.grash.repository.AssemblyLineTrackingAttachmentRepository;
import com.grash.repository.AssemblyLineTrackingRepository;
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
public class AssemblyLineTrackingService {

    private final AssemblyLineTrackingRepository repository;

    private final AssemblyLineTrackingAttachmentRepository attachmentRepository;

    private final ProductRepository productRepository;

    private static final String DOCUMENT_FOLDER =
            "uploads/product-attachments";

    private static final String IMAGE_FOLDER =
            "uploads/product-images";

    public AssemblyLineTrackingResponseDto create(
            AssemblyLineTrackingRequestDto dto,
            List<MultipartFile> documents,
            List<MultipartFile> productImages
    ) throws Exception {

        Product product =
                productRepository.findByProductUid(
                        dto.getAssociatedProductUid()
                ).orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        AssemblyLineTrackingLog log =
                AssemblyLineTrackingLog.builder()
                        .logUid(generateLogUid())
                        .productionOrderId(dto.getProductionOrderId())
                        .associatedProduct(product)
                        .bomVersion(dto.getBomVersion())
                        .assemblyLine(dto.getAssemblyLine())
                        .assemblyStation(dto.getAssemblyStation())
                        .shift(dto.getShift())
                        .assemblyDate(dto.getAssemblyDate())

                        .operatorEmployee(dto.getOperatorEmployee())
                        .startTime(dto.getStartTime())
                        .endTime(dto.getEndTime())
                        .totalCycleTime(dto.getTotalCycleTime())
                        .shiftIncharge(dto.getShiftIncharge())
                        .teamMembers(dto.getTeamMembers())
                        .unitsStarted(dto.getUnitsStarted())
                        .unitsCompleted(dto.getUnitsCompleted())

                        .assemblySopVersion(dto.getAssemblySopVersion())
                        .toolsEquipmentUsed(dto.getToolsEquipmentUsed())
                        .toolCalibrationStatus(dto.getToolCalibrationStatus())
                        .torqueLogs(dto.getTorqueLogs())
                        .assemblyVerification(dto.getAssemblyVerification())
                        .imageCaptureStatus(dto.getImageCaptureStatus())
                        .videoCaptureStatus(dto.getVideoCaptureStatus())
                        .iotSensorLogs(dto.getIotSensorLogs())

                        .goodUnits(dto.getGoodUnits())
                        .rejectedUnits(dto.getRejectedUnits())
                        .reworkUnits(dto.getReworkUnits())
                        .defectCode(dto.getDefectCode())
                        .productionYield(dto.getProductionYield())
                        .cycleTimePerUnit(dto.getCycleTimePerUnit())
                        .downtimeMinutes(dto.getDowntimeMinutes())
                        .downtimeReason(dto.getDowntimeReason())

                        .energyConsumption(dto.getEnergyConsumption())
                        .voltage(dto.getVoltage())
                        .temperature(dto.getTemperature())
                        .humidity(dto.getHumidity())
                        .ambientCondition(dto.getAmbientCondition())

                        .remarks(dto.getRemarks())
                        .approvedBy(dto.getApprovedBy())
                        .approvalTime(dto.getApprovalTime())
                        .signature(dto.getSignature())

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

    public List<AssemblyLineTrackingResponseDto> getAll() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    public AssemblyLineTrackingResponseDto getByLogUid(
            String logUid
    ) {

        AssemblyLineTrackingLog log =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Assembly Line Tracking Log not found"
                                )
                        );

        return map(log);
    }

    public void deleteByLogUid(
            String logUid
    ) {

        AssemblyLineTrackingLog log =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Assembly Line Tracking Log not found"
                                )
                        );

        repository.delete(log);
    }

    private void saveAttachments(
            AssemblyLineTrackingLog log,
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

            AssemblyLineTrackingAttachment attachment =
                    AssemblyLineTrackingAttachment.builder()
                            .fileName(fileName)
                            .originalFileName(file.getOriginalFilename())
                            .filePath(path.toString())
                            .fileType(file.getContentType())
                            .fileSize(file.getSize())
                            .attachmentType(type)
                            .assemblyLineTrackingLog(log)
                            .build();

            attachmentRepository.save(
                    attachment
            );
        }
    }

    private String generateLogUid() {

        return "ALT-" +
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern(
                                "yyyyMMddHHmmss"
                        )
                );
    }

    private AssemblyLineTrackingResponseDto map(
            AssemblyLineTrackingLog log
    ) {

        List<AssemblyLineTrackingAttachmentDto> attachments =
                attachmentRepository
                        .findByAssemblyLineTrackingLogId(
                                log.getId()
                        )
                        .stream()
                        .map(file ->
                                AssemblyLineTrackingAttachmentDto
                                        .builder()
                                        .id(file.getId())
                                        .fileName(file.getFileName())
                                        .originalFileName(file.getOriginalFileName())
                                        .filePath(file.getFilePath())
                                        .fileType(file.getFileType())
                                        .fileSize(file.getFileSize())
                                        .attachmentType(file.getAttachmentType())
                                        .build()
                        )
                        .toList();

        return AssemblyLineTrackingResponseDto
                .builder()
                .id(log.getId())
                .logUid(log.getLogUid())
                .productionOrderId(log.getProductionOrderId())
                .associatedProductUid(
                        log.getAssociatedProduct().getProductUid()
                )
                .associatedProductName(
                        log.getAssociatedProduct().getProductName()
                )
                .assemblyLine(log.getAssemblyLine())
                .assemblyStation(log.getAssemblyStation())
                .shift(log.getShift())
                .assemblyDate(log.getAssemblyDate())
                .operatorEmployee(log.getOperatorEmployee())
                .unitsStarted(log.getUnitsStarted())
                .unitsCompleted(log.getUnitsCompleted())
                .goodUnits(log.getGoodUnits())
                .rejectedUnits(log.getRejectedUnits())
                .reworkUnits(log.getReworkUnits())
                .productionYield(log.getProductionYield())
                .approvedBy(log.getApprovedBy())
                .remarks(log.getRemarks())
                .attachments(attachments)
                .build();
    }
}