package com.grash.service;

import com.grash.dto.AttachmentResponseDto;
import com.grash.dto.RawMaterialProcurementRequestDto;
import com.grash.dto.RawMaterialProcurementResponseDto;
import com.grash.model.ProcurementAttachment;
import com.grash.model.RawMaterialProcurement;
import com.grash.repository.ProcurementAttachmentRepository;
import com.grash.repository.RawMaterialProcurementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RawMaterialProcurementService {

    private final RawMaterialProcurementRepository repository;

    private final ProcurementAttachmentRepository
            attachmentRepository;

    public RawMaterialProcurementResponseDto create(
            RawMaterialProcurementRequestDto dto,
            List<MultipartFile> files
    ) throws Exception {

        RawMaterialProcurement procurement =
                RawMaterialProcurement.builder()

                        // BASIC DETAILS
                        .logUid(
                                "RMP-"
                                        + System.currentTimeMillis()
                        )

                        .status(dto.getStatus())

                        .createdAt(
                                LocalDateTime.now()
                        )

                        // PURCHASE INFORMATION
                        .poNumber(dto.getPoNumber())
                        .poDate(dto.getPoDate())
                        .supplierVendorName(
                                dto.getSupplierVendorName()
                        )
                        .supplierCode(
                                dto.getSupplierCode()
                        )
                        .invoiceNumber(
                                dto.getInvoiceNumber()
                        )
                        .invoiceDate(
                                dto.getInvoiceDate()
                        )
                        .currency(
                                dto.getCurrency()
                        )
                        .paymentTerms(
                                dto.getPaymentTerms()
                        )

                        // MATERIAL DETAILS
                        .materialName(
                                dto.getMaterialName()
                        )
                        .materialCategory(
                                dto.getMaterialCategory()
                        )
                        .materialSpecification(
                                dto.getMaterialSpecification()
                        )
                        .hsnSacCode(
                                dto.getHsnSacCode()
                        )
                        .uom(
                                dto.getUom()
                        )
                        .quantityPurchased(
                                dto.getQuantityPurchased()
                        )
                        .unitPrice(
                                dto.getUnitPrice()
                        )
                        .totalAmount(
                                dto.getTotalAmount()
                        )

                        // RECEIPT & INSPECTION
                        .grnNumber(
                                dto.getGrnNumber()
                        )
                        .grnDate(
                                dto.getGrnDate()
                        )
                        .receivedQuantity(
                                dto.getReceivedQuantity()
                        )
                        .warehouseLocation(
                                dto.getWarehouseLocation()
                        )
                        .receivedBy(
                                dto.getReceivedBy()
                        )
                        .inspectionStatus(
                                dto.getInspectionStatus()
                        )
                        .inspectedBy(
                                dto.getInspectedBy()
                        )
                        .inspectionDate(
                                dto.getInspectionDate()
                        )

                        // ADDITIONAL INFORMATION
                        .complianceCertificate(
                                dto.getComplianceCertificate()
                        )
                        .materialSpecificationDocument(
                                dto.getMaterialSpecificationDocument()
                        )
                        .expiryDate(
                                dto.getExpiryDate()
                        )
                        .shelfLife(
                                dto.getShelfLife()
                        )
                        .materialStatus(
                                dto.getMaterialStatus()
                        )
                        .rejectionReason(
                                dto.getRejectionReason()
                        )
                        .remarks(
                                dto.getRemarks()
                        )

                        // COST & ACCOUNTING
                        .taxableAmount(
                                dto.getTaxableAmount()
                        )
                        .taxPercentage(
                                dto.getTaxPercentage()
                        )
                        .taxAmount(
                                dto.getTaxAmount()
                        )
                        .freightCharges(
                                dto.getFreightCharges()
                        )
                        .otherCharges(
                                dto.getOtherCharges()
                        )
                        .finalAmount(
                                dto.getFinalAmount()
                        )

                        .build();

        RawMaterialProcurement saved =
                repository.save(procurement);

        // ==========================================
        // FILE UPLOAD
        // ==========================================

        if (files != null && !files.isEmpty()) {

            for (MultipartFile file : files) {

                if (file.isEmpty()) {
                    continue;
                }

                String fileName =
                        UUID.randomUUID()
                                + "_"
                                + file.getOriginalFilename();

                // ABSOLUTE PATH
                String uploadPath =
                        System.getProperty("user.dir")
                                + "/uploads/product-attachments/";

                File uploadDir =
                        new File(uploadPath);

                // CREATE DIRECTORY IF NOT EXISTS
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                File destination =
                        new File(uploadPath + fileName);

                // SAVE FILE
                file.transferTo(destination);

                ProcurementAttachment attachment =
                        ProcurementAttachment.builder()

                                .fileName(
                                        file.getOriginalFilename()
                                )

                                .fileType(
                                        file.getContentType()
                                )

                                .fileUrl(
                                        "/uploads/product-attachments/"
                                                + fileName
                                )

                                .fileSize(
                                        file.getSize()
                                )

                                .procurement(saved)

                                .build();

                attachmentRepository.save(
                        attachment
                );
            }
        }

        return map(saved);
    }

    public List<RawMaterialProcurementResponseDto>
    getAll() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    public RawMaterialProcurementResponseDto
    getByLogUid(String logUid) {

        RawMaterialProcurement procurement =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Procurement not found"
                                )
                        );

        return map(procurement);
    }

    public void deleteByLogUid(String logUid) {

        RawMaterialProcurement procurement =
                repository.findByLogUid(logUid)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Procurement not found"
                                )
                        );

        repository.delete(procurement);
    }

    public RawMaterialProcurementResponseDto update(
            Long id,
            RawMaterialProcurementRequestDto dto,
            List<MultipartFile> files
    ) throws Exception {

        RawMaterialProcurement procurement =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Procurement not found"
                                )
                        );

        procurement.setStatus(dto.getStatus());

        procurement.setPoNumber(dto.getPoNumber());
        procurement.setPoDate(dto.getPoDate());

        procurement.setSupplierVendorName(
                dto.getSupplierVendorName()
        );

        procurement.setSupplierCode(
                dto.getSupplierCode()
        );

        procurement.setInvoiceNumber(
                dto.getInvoiceNumber()
        );

        procurement.setInvoiceDate(
                dto.getInvoiceDate()
        );

        procurement.setCurrency(
                dto.getCurrency()
        );

        procurement.setPaymentTerms(
                dto.getPaymentTerms()
        );

        procurement.setMaterialName(
                dto.getMaterialName()
        );

        procurement.setMaterialCategory(
                dto.getMaterialCategory()
        );

        procurement.setMaterialSpecification(
                dto.getMaterialSpecification()
        );

        procurement.setHsnSacCode(
                dto.getHsnSacCode()
        );

        procurement.setUom(
                dto.getUom()
        );

        procurement.setQuantityPurchased(
                dto.getQuantityPurchased()
        );

        procurement.setUnitPrice(
                dto.getUnitPrice()
        );

        procurement.setTotalAmount(
                dto.getTotalAmount()
        );

        procurement.setGrnNumber(
                dto.getGrnNumber()
        );

        procurement.setGrnDate(
                dto.getGrnDate()
        );

        procurement.setReceivedQuantity(
                dto.getReceivedQuantity()
        );

        procurement.setWarehouseLocation(
                dto.getWarehouseLocation()
        );

        procurement.setReceivedBy(
                dto.getReceivedBy()
        );

        procurement.setInspectionStatus(
                dto.getInspectionStatus()
        );

        procurement.setInspectedBy(
                dto.getInspectedBy()
        );

        procurement.setInspectionDate(
                dto.getInspectionDate()
        );

        procurement.setComplianceCertificate(
                dto.getComplianceCertificate()
        );

        procurement.setMaterialSpecificationDocument(
                dto.getMaterialSpecificationDocument()
        );

        procurement.setExpiryDate(
                dto.getExpiryDate()
        );

        procurement.setShelfLife(
                dto.getShelfLife()
        );

        procurement.setMaterialStatus(
                dto.getMaterialStatus()
        );

        procurement.setRejectionReason(
                dto.getRejectionReason()
        );

        procurement.setRemarks(
                dto.getRemarks()
        );

        procurement.setTaxableAmount(
                dto.getTaxableAmount()
        );

        procurement.setTaxPercentage(
                dto.getTaxPercentage()
        );

        procurement.setTaxAmount(
                dto.getTaxAmount()
        );

        procurement.setFreightCharges(
                dto.getFreightCharges()
        );

        procurement.setOtherCharges(
                dto.getOtherCharges()
        );

        procurement.setFinalAmount(
                dto.getFinalAmount()
        );

        RawMaterialProcurement updated =
                repository.save(procurement);

        return map(updated);
    }

    private RawMaterialProcurementResponseDto map(
            RawMaterialProcurement p
    ) {

        return RawMaterialProcurementResponseDto
                .builder()

                .id(
                        p.getId()
                )

                .logUid(
                        p.getLogUid()
                )

                .status(
                        p.getStatus()
                )

                .poNumber(
                        p.getPoNumber()
                )

                .supplierVendorName(
                        p.getSupplierVendorName()
                )

                .materialName(
                        p.getMaterialName()
                )

                .finalAmount(
                        p.getFinalAmount()
                )

                .remarks(
                        p.getRemarks()
                )

                .quantityPurchased(p.getQuantityPurchased())

                .unitPrice(p.getUnitPrice())

                .inspectionStatus(p.getInspectionStatus())

                .materialStatus(p.getMaterialStatus())

                .createdAt(
                        p.getCreatedAt()
                )

                .attachments(
                        p.getAttachments() != null
                                ? p.getAttachments()
                                .stream()
                                .map(att ->
                                        AttachmentResponseDto
                                                .builder()

                                                .id(
                                                        att.getId()
                                                )

                                                .fileName(
                                                        att.getFileName()
                                                )

                                                .fileType(
                                                        att.getFileType()
                                                )

                                                .fileUrl(
                                                        att.getFileUrl()
                                                )

                                                .fileSize(
                                                        att.getFileSize()
                                                )

                                                .build()
                                )
                                .toList()
                                : List.of()
                )

                .build();
    }
}