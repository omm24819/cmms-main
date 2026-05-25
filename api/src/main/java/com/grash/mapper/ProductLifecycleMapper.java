package com.grash.mapper;

import com.grash.dto.ProductLifecycleAttachmentDTO;
import com.grash.dto.ProductLifecycleDocumentDTO;
import com.grash.dto.ProductLifecycleEventDTO;
import com.grash.dto.ProductLifecycleMetricDTO;
import com.grash.dto.ProductLifecyclePatchDTO;
import com.grash.dto.ProductLifecyclePostDTO;
import com.grash.dto.ProductLifecycleShowDTO;
import com.grash.exception.CustomException;
import com.grash.model.ProductLifecycle;
import com.grash.model.ProductLifecycleAttachment;
import com.grash.model.ProductLifecycleDocument;
import com.grash.model.ProductLifecycleEvent;
import com.grash.model.ProductLifecycleMetric;
import com.grash.model.enums.ProductLifecycleStage;
import com.grash.model.enums.ProductLifecycleStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class ProductLifecycleMapper {

    public ProductLifecycle fromPostDto(ProductLifecyclePostDTO dto) {
        ProductLifecycle product = new ProductLifecycle();
        product.setPublicId(valueOrNull(dto.getId()));
        product.setProductUid(requiredValue(dto.getProductUid(), "Product UID is required"));
        product.setName(requiredValue(firstPresent(dto.getProductName(), dto.getName()), "Product name is required"));
        product.setCategory(firstPresent(dto.getProductCategory(), dto.getCategory()));
        product.setSubcategory(valueOrNull(dto.getSubcategory()));
        product.setDescription(valueOrNull(dto.getDescription()));
        product.setStatus(resolveStatus(firstPresent(dto.getProductStatus(), dto.getStatus()), ProductLifecycleStatus.MANUFACTURING));
        product.setSerialNumber(firstPresent(dto.getProductSerialNumber(), dto.getSerialNumber()));
        product.setProductVersion(valueOrNull(dto.getProductVersion()));
        product.setBomVersion(valueOrNull(dto.getBomVersion()));
        product.setManufacturingBatchId(valueOrNull(dto.getManufacturingBatchId()));
        product.setManufacturingDate(dto.getManufacturingDate());
        product.setAssemblyDate(dto.getAssemblyDate());
        product.setQcStatus(valueOrNull(dto.getQcStatus()));
        product.setLifecycleStage(resolveStage(dto.getLifecycleStage(), ProductLifecycleStage.DESIGN));
        product.setModelNumber(valueOrNull(dto.getModelNumber()));
        product.setPartNumber(valueOrNull(dto.getPartNumber()));
        product.setMacAddress(valueOrNull(dto.getMacAddress()));
        product.setImeiModuleId(valueOrNull(dto.getImeiModuleId()));
        product.setHardwareVersion(valueOrNull(dto.getHardwareVersion()));
        product.setFirmwareVersion(valueOrNull(dto.getFirmwareVersion()));
        product.setRfidTagId(valueOrNull(dto.getRfidTagId()));
        product.setDigitalTwinLink(valueOrNull(dto.getDigitalTwinLink()));
        product.setRemarks(valueOrNull(dto.getRemarks()));
        product.setAssignedCustomer(valueOrNull(dto.getAssignedCustomer()));
        product.setInstallationSite(valueOrNull(dto.getInstallationSite()));
        product.setLocationGps(valueOrNull(dto.getLocationGps()));
        product.setContactPerson(valueOrNull(dto.getContactPerson()));
        product.setContactNumber(valueOrNull(dto.getContactNumber()));
        product.setEmail(valueOrNull(dto.getEmail()));
        product.setImageUrl(valueOrNull(dto.getImageUrl()));
        product.setQrValue(valueOrNull(dto.getQrValue()));
        product.setDraft(Boolean.TRUE.equals(dto.getDraft()));
        product.setAttachments(toAttachmentModels(dto.getAttachments()));
        product.setMasterLog(toEventModels(dto.getMasterLog()));
        product.setLogisticsTrail(toEventModels(dto.getLogisticsTrail()));
        product.setMaintenanceHistory(toEventModels(dto.getMaintenanceHistory()));
        product.setDocuments(toDocumentModels(dto.getDocuments()));
        product.setDigitalTwinMetrics(toMetricModels(dto.getDigitalTwinMetrics()));
        product.setAuditTrail(toEventModels(dto.getAuditTrail()));
        return product;
    }

    public ProductLifecycle updateProduct(ProductLifecycle product, ProductLifecyclePatchDTO dto) {
        if (dto.getProductUid() != null) product.setProductUid(requiredValue(dto.getProductUid(), "Product UID is required"));
        if (dto.getProductName() != null || dto.getName() != null) {
            product.setName(requiredValue(firstPresent(dto.getProductName(), dto.getName()), "Product name is required"));
        }
        if (dto.getProductCategory() != null || dto.getCategory() != null) {
            product.setCategory(firstPresent(dto.getProductCategory(), dto.getCategory()));
        }
        if (dto.getSubcategory() != null) product.setSubcategory(valueOrNull(dto.getSubcategory()));
        if (dto.getDescription() != null) product.setDescription(valueOrNull(dto.getDescription()));
        if (dto.getProductStatus() != null || dto.getStatus() != null) {
            product.setStatus(resolveStatus(firstPresent(dto.getProductStatus(), dto.getStatus()), product.getStatus()));
        }
        if (dto.getProductSerialNumber() != null || dto.getSerialNumber() != null) {
            product.setSerialNumber(firstPresent(dto.getProductSerialNumber(), dto.getSerialNumber()));
        }
        if (dto.getProductVersion() != null) product.setProductVersion(valueOrNull(dto.getProductVersion()));
        if (dto.getBomVersion() != null) product.setBomVersion(valueOrNull(dto.getBomVersion()));
        if (dto.getManufacturingBatchId() != null) product.setManufacturingBatchId(valueOrNull(dto.getManufacturingBatchId()));
        if (dto.getManufacturingDate() != null) product.setManufacturingDate(dto.getManufacturingDate());
        if (dto.getAssemblyDate() != null) product.setAssemblyDate(dto.getAssemblyDate());
        if (dto.getQcStatus() != null) product.setQcStatus(valueOrNull(dto.getQcStatus()));
        if (dto.getLifecycleStage() != null) product.setLifecycleStage(resolveStage(dto.getLifecycleStage(), product.getLifecycleStage()));
        if (dto.getModelNumber() != null) product.setModelNumber(valueOrNull(dto.getModelNumber()));
        if (dto.getPartNumber() != null) product.setPartNumber(valueOrNull(dto.getPartNumber()));
        if (dto.getMacAddress() != null) product.setMacAddress(valueOrNull(dto.getMacAddress()));
        if (dto.getImeiModuleId() != null) product.setImeiModuleId(valueOrNull(dto.getImeiModuleId()));
        if (dto.getHardwareVersion() != null) product.setHardwareVersion(valueOrNull(dto.getHardwareVersion()));
        if (dto.getFirmwareVersion() != null) product.setFirmwareVersion(valueOrNull(dto.getFirmwareVersion()));
        if (dto.getRfidTagId() != null) product.setRfidTagId(valueOrNull(dto.getRfidTagId()));
        if (dto.getDigitalTwinLink() != null) product.setDigitalTwinLink(valueOrNull(dto.getDigitalTwinLink()));
        if (dto.getRemarks() != null) product.setRemarks(valueOrNull(dto.getRemarks()));
        if (dto.getAssignedCustomer() != null) product.setAssignedCustomer(valueOrNull(dto.getAssignedCustomer()));
        if (dto.getInstallationSite() != null) product.setInstallationSite(valueOrNull(dto.getInstallationSite()));
        if (dto.getLocationGps() != null) product.setLocationGps(valueOrNull(dto.getLocationGps()));
        if (dto.getContactPerson() != null) product.setContactPerson(valueOrNull(dto.getContactPerson()));
        if (dto.getContactNumber() != null) product.setContactNumber(valueOrNull(dto.getContactNumber()));
        if (dto.getEmail() != null) product.setEmail(valueOrNull(dto.getEmail()));
        if (dto.getImageUrl() != null) product.setImageUrl(valueOrNull(dto.getImageUrl()));
        if (dto.getQrValue() != null) product.setQrValue(valueOrNull(dto.getQrValue()));
        if (dto.getDraft() != null) product.setDraft(dto.getDraft());
        if (dto.getAttachments() != null) product.setAttachments(toAttachmentModels(dto.getAttachments()));
        if (dto.getMasterLog() != null) product.setMasterLog(toEventModels(dto.getMasterLog()));
        if (dto.getLogisticsTrail() != null) product.setLogisticsTrail(toEventModels(dto.getLogisticsTrail()));
        if (dto.getMaintenanceHistory() != null) product.setMaintenanceHistory(toEventModels(dto.getMaintenanceHistory()));
        if (dto.getDocuments() != null) product.setDocuments(toDocumentModels(dto.getDocuments()));
        if (dto.getDigitalTwinMetrics() != null) product.setDigitalTwinMetrics(toMetricModels(dto.getDigitalTwinMetrics()));
        if (dto.getAuditTrail() != null) product.setAuditTrail(toEventModels(dto.getAuditTrail()));
        return product;
    }

    public ProductLifecycleShowDTO toShowDto(ProductLifecycle product) {
        ProductLifecycleShowDTO dto = new ProductLifecycleShowDTO();
        dto.setId(product.getPublicId());
        dto.setDatabaseId(product.getId());
        dto.setCreatedBy(product.getCreatedBy());
        dto.setUpdatedBy(product.getUpdatedBy());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        dto.setProductUid(product.getProductUid());
        dto.setName(product.getName());
        dto.setProductName(product.getName());
        dto.setCategory(product.getCategory());
        dto.setProductCategory(product.getCategory());
        dto.setSubcategory(product.getSubcategory());
        dto.setDescription(product.getDescription());
        dto.setStatus(product.getStatus() == null ? null : product.getStatus().getLabel());
        dto.setProductStatus(dto.getStatus());
        dto.setSerialNumber(product.getSerialNumber());
        dto.setProductSerialNumber(product.getSerialNumber());
        dto.setProductVersion(product.getProductVersion());
        dto.setBomVersion(product.getBomVersion());
        dto.setManufacturingBatchId(product.getManufacturingBatchId());
        dto.setManufacturingDate(product.getManufacturingDate());
        dto.setAssemblyDate(product.getAssemblyDate());
        dto.setQcStatus(product.getQcStatus());
        dto.setLifecycleStage(product.getLifecycleStage() == null ? null : product.getLifecycleStage().getLabel());
        dto.setModelNumber(product.getModelNumber());
        dto.setPartNumber(product.getPartNumber());
        dto.setMacAddress(product.getMacAddress());
        dto.setImeiModuleId(product.getImeiModuleId());
        dto.setHardwareVersion(product.getHardwareVersion());
        dto.setFirmwareVersion(product.getFirmwareVersion());
        dto.setRfidTagId(product.getRfidTagId());
        dto.setDigitalTwinLink(product.getDigitalTwinLink());
        dto.setRemarks(product.getRemarks());
        dto.setAssignedCustomer(product.getAssignedCustomer());
        dto.setInstallationSite(product.getInstallationSite());
        dto.setLocationGps(product.getLocationGps());
        dto.setContactPerson(product.getContactPerson());
        dto.setContactNumber(product.getContactNumber());
        dto.setEmail(product.getEmail());
        dto.setImageUrl(product.getImageUrl());
        dto.setQrValue(product.getQrValue());
        dto.setDraft(product.isDraft());
        dto.setAttachments(toAttachmentDtos(product.getAttachments()));
        dto.setMasterLog(toEventDtos(product.getMasterLog()));
        dto.setLogisticsTrail(toEventDtos(product.getLogisticsTrail()));
        dto.setMaintenanceHistory(toEventDtos(product.getMaintenanceHistory()));
        dto.setDocuments(toDocumentDtos(product.getDocuments()));
        dto.setDigitalTwinMetrics(toMetricDtos(product.getDigitalTwinMetrics()));
        dto.setAuditTrail(toEventDtos(product.getAuditTrail()));
        return dto;
    }

    public ProductLifecycleAttachment toAttachmentModel(ProductLifecycleAttachmentDTO dto) {
        ProductLifecycleAttachment attachment = new ProductLifecycleAttachment();
        attachment.setName(valueOrNull(dto.getName()));
        attachment.setType(valueOrNull(dto.getType()));
        attachment.setSize(valueOrNull(dto.getSize()));
        attachment.setUpdatedAt(valueOrNull(dto.getUpdatedAt()));
        attachment.setUrl(valueOrNull(dto.getUrl()));
        return attachment;
    }

    public ProductLifecycleAttachmentDTO toAttachmentDto(ProductLifecycleAttachment attachment) {
        ProductLifecycleAttachmentDTO dto = new ProductLifecycleAttachmentDTO();
        dto.setName(attachment.getName());
        dto.setType(attachment.getType());
        dto.setSize(attachment.getSize());
        dto.setUpdatedAt(attachment.getUpdatedAt());
        dto.setUrl(attachment.getUrl());
        return dto;
    }

    private ProductLifecycleEvent toEventModel(ProductLifecycleEventDTO dto) {
        ProductLifecycleEvent event = new ProductLifecycleEvent();
        event.setEventId(valueOrNull(dto.getId()));
        event.setLabel(valueOrNull(dto.getLabel()));
        event.setDescription(valueOrNull(dto.getDescription()));
        event.setTimestamp(valueOrNull(dto.getTimestamp()));
        event.setOwner(valueOrNull(dto.getOwner()));
        return event;
    }

    public ProductLifecycleEventDTO toEventDto(ProductLifecycleEvent event) {
        ProductLifecycleEventDTO dto = new ProductLifecycleEventDTO();
        dto.setId(event.getEventId());
        dto.setLabel(event.getLabel());
        dto.setDescription(event.getDescription());
        dto.setTimestamp(event.getTimestamp());
        dto.setOwner(event.getOwner());
        return dto;
    }

    private ProductLifecycleDocument toDocumentModel(ProductLifecycleDocumentDTO dto) {
        ProductLifecycleDocument document = new ProductLifecycleDocument();
        document.setDocumentId(valueOrNull(dto.getId()));
        document.setName(valueOrNull(dto.getName()));
        document.setCategory(valueOrNull(dto.getCategory()));
        document.setOwner(valueOrNull(dto.getOwner()));
        document.setUpdatedAt(valueOrNull(dto.getUpdatedAt()));
        return document;
    }

    private ProductLifecycleDocumentDTO toDocumentDto(ProductLifecycleDocument document) {
        ProductLifecycleDocumentDTO dto = new ProductLifecycleDocumentDTO();
        dto.setId(document.getDocumentId());
        dto.setName(document.getName());
        dto.setCategory(document.getCategory());
        dto.setOwner(document.getOwner());
        dto.setUpdatedAt(document.getUpdatedAt());
        return dto;
    }

    private ProductLifecycleMetric toMetricModel(ProductLifecycleMetricDTO dto) {
        ProductLifecycleMetric metric = new ProductLifecycleMetric();
        metric.setLabel(valueOrNull(dto.getLabel()));
        metric.setValue(valueOrNull(dto.getValue()));
        metric.setMetricStatus(valueOrNull(dto.getStatus()));
        return metric;
    }

    private ProductLifecycleMetricDTO toMetricDto(ProductLifecycleMetric metric) {
        ProductLifecycleMetricDTO dto = new ProductLifecycleMetricDTO();
        dto.setLabel(metric.getLabel());
        dto.setValue(metric.getValue());
        dto.setStatus(metric.getMetricStatus());
        return dto;
    }

    private List<ProductLifecycleAttachment> toAttachmentModels(List<ProductLifecycleAttachmentDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().filter(Objects::nonNull).map(this::toAttachmentModel).collect(Collectors.toList());
    }

    private List<ProductLifecycleAttachmentDTO> toAttachmentDtos(List<ProductLifecycleAttachment> attachments) {
        if (attachments == null) return new ArrayList<>();
        return attachments.stream().filter(Objects::nonNull).map(this::toAttachmentDto).collect(Collectors.toList());
    }

    private List<ProductLifecycleEvent> toEventModels(List<ProductLifecycleEventDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().filter(Objects::nonNull).map(this::toEventModel).collect(Collectors.toList());
    }

    private List<ProductLifecycleEventDTO> toEventDtos(List<ProductLifecycleEvent> events) {
        if (events == null) return new ArrayList<>();
        return events.stream().filter(Objects::nonNull).map(this::toEventDto).collect(Collectors.toList());
    }

    private List<ProductLifecycleDocument> toDocumentModels(List<ProductLifecycleDocumentDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().filter(Objects::nonNull).map(this::toDocumentModel).collect(Collectors.toList());
    }

    private List<ProductLifecycleDocumentDTO> toDocumentDtos(List<ProductLifecycleDocument> documents) {
        if (documents == null) return new ArrayList<>();
        return documents.stream().filter(Objects::nonNull).map(this::toDocumentDto).collect(Collectors.toList());
    }

    private List<ProductLifecycleMetric> toMetricModels(List<ProductLifecycleMetricDTO> dtos) {
        if (dtos == null) return new ArrayList<>();
        return dtos.stream().filter(Objects::nonNull).map(this::toMetricModel).collect(Collectors.toList());
    }

    private List<ProductLifecycleMetricDTO> toMetricDtos(List<ProductLifecycleMetric> metrics) {
        if (metrics == null) return new ArrayList<>();
        return metrics.stream().filter(Objects::nonNull).map(this::toMetricDto).collect(Collectors.toList());
    }

    private ProductLifecycleStatus resolveStatus(String value, ProductLifecycleStatus fallback) {
        ProductLifecycleStatus status = ProductLifecycleStatus.fromLabel(value);
        return status == null ? fallback : status;
    }

    private ProductLifecycleStage resolveStage(String value, ProductLifecycleStage fallback) {
        ProductLifecycleStage stage = ProductLifecycleStage.fromLabel(value);
        return stage == null ? fallback : stage;
    }

    private String firstPresent(String first, String second) {
        return first != null ? first : second;
    }

    private String valueOrNull(String value) {
        return value == null ? null : value.trim();
    }

    private String requiredValue(String value, String message) {
        String normalized = valueOrNull(value);
        if (normalized == null || normalized.isEmpty()) throw new CustomException(message, HttpStatus.BAD_REQUEST);
        return normalized;
    }
}
