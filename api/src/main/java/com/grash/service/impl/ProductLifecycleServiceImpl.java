package com.grash.service.impl;

import com.grash.advancedsearch.SearchCriteria;
import com.grash.advancedsearch.SpecificationBuilder;
import com.grash.dto.ProductLifecycleAttachmentDTO;
import com.grash.dto.ProductLifecyclePatchDTO;
import com.grash.dto.ProductLifecyclePostDTO;
import com.grash.dto.ProductLifecycleShowDTO;
import com.grash.exception.CustomException;
import com.grash.mapper.ProductLifecycleMapper;
import com.grash.model.ProductLifecycle;
import com.grash.model.ProductLifecycleAttachment;
import com.grash.model.ProductLifecycleEvent;
import com.grash.model.User;
import com.grash.model.enums.ProductLifecycleStatus;
import com.grash.model.enums.RoleType;
import com.grash.repository.ProductLifecycleRepository;
import com.grash.service.ProductLifecycleService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductLifecycleServiceImpl implements ProductLifecycleService {
    private static final DateTimeFormatter EVENT_TIMESTAMP = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final ProductLifecycleRepository productLifecycleRepository;
    private final ProductLifecycleMapper productLifecycleMapper;
    private final EntityManager em;

    @Override
    public Page<ProductLifecycleShowDTO> search(SearchCriteria searchCriteria, User user) {
        if (user.getRole().getRoleType().equals(RoleType.ROLE_CLIENT)) {
            searchCriteria.filterCompany(user);
        }

        SpecificationBuilder<ProductLifecycle> builder = new SpecificationBuilder<>();
        searchCriteria.getFilterFields().forEach(builder::with);
        Pageable page = PageRequest.of(
                searchCriteria.getPageNum(),
                searchCriteria.getPageSize(),
                searchCriteria.getDirection(),
                searchCriteria.getSortField()
        );
        return productLifecycleRepository.findAll(builder.build(), page).map(productLifecycleMapper::toShowDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductLifecycleShowDTO getByIdentifier(String identifier, User user) {
        return productLifecycleMapper.toShowDto(findVisibleProduct(identifier, user));
    }

    @Override
    @Transactional(readOnly = true)
    public String getNextProductUid(User user) {
        Long companyId = user.getCompany().getId();
        Integer maxSequence = productLifecycleRepository.findMaxProductUidSequenceByCompanyId(companyId);
        return "PRD-" + String.format("%04d", (maxSequence == null ? 0 : maxSequence) + 1);
    }

    @Override
    @Transactional
    public ProductLifecycleShowDTO create(ProductLifecyclePostDTO productReq, User user, boolean draft) {
        ProductLifecycle product = productLifecycleMapper.fromPostDto(productReq);
        product.setCompany(user.getCompany());
        product.setDraft(draft || product.isDraft());
        if (product.isDraft()) {
            product.setStatus(ProductLifecycleStatus.DRAFT);
        }
        validateUniqueProductUid(product.getProductUid(), user.getCompany().getId(), null);
        if (hasText(product.getPublicId())) {
            validateUniquePublicId(product.getPublicId(), user.getCompany().getId(), null);
        }
        if (!hasText(product.getQrValue()) && hasText(product.getPublicId())) {
            product.setQrValue(buildQrValue(product));
        }

        ProductLifecycle savedProduct = productLifecycleRepository.saveAndFlush(product);
        if (!hasText(savedProduct.getPublicId())) {
            savedProduct.setPublicId(buildPublicId(savedProduct.getId()));
            savedProduct = productLifecycleRepository.saveAndFlush(savedProduct);
        }
        if (!hasText(savedProduct.getQrValue())) {
            savedProduct.setQrValue(buildQrValue(savedProduct));
            savedProduct = productLifecycleRepository.saveAndFlush(savedProduct);
        }
        if (savedProduct.getMasterLog().isEmpty()) {
            savedProduct.getMasterLog().add(createEvent(
                    "ML-1",
                    product.isDraft() ? "Draft created" : "Product created",
                    product.isDraft() ? "Draft lifecycle record created." : "Product lifecycle master record created.",
                    user
            ));
            savedProduct = productLifecycleRepository.saveAndFlush(savedProduct);
        }
        em.refresh(savedProduct);
        return productLifecycleMapper.toShowDto(savedProduct);
    }

    @Override
    @Transactional
    public ProductLifecycleShowDTO update(String identifier, ProductLifecyclePatchDTO productReq, User user) {
        ProductLifecycle product = findVisibleProduct(identifier, user);
        if (productReq.getProductUid() != null && !productReq.getProductUid().equals(product.getProductUid())) {
            validateUniqueProductUid(productReq.getProductUid(), product.getCompany().getId(), product.getId());
        }

        productLifecycleMapper.updateProduct(product, productReq);
        if (product.isDraft()) {
            product.setStatus(ProductLifecycleStatus.DRAFT);
        }
        if (!hasText(product.getQrValue())) {
            product.setQrValue(buildQrValue(product));
        }
        product.getAuditTrail().add(createEvent(
                "AT-" + (product.getAuditTrail().size() + 1),
                "Record updated",
                "Product lifecycle record updated through API.",
                user
        ));

        ProductLifecycle savedProduct = productLifecycleRepository.saveAndFlush(product);
        em.refresh(savedProduct);
        return productLifecycleMapper.toShowDto(savedProduct);
    }

    @Override
    @Transactional
    public void delete(String identifier, User user) {
        ProductLifecycle product = findVisibleProduct(identifier, user);
        productLifecycleRepository.delete(product);
    }

    @Override
    @Transactional
    public ProductLifecycleShowDTO addAttachment(String identifier, ProductLifecycleAttachmentDTO attachment, User user) {
        ProductLifecycle product = findVisibleProduct(identifier, user);
        ProductLifecycleAttachment attachmentModel = productLifecycleMapper.toAttachmentModel(attachment);
        if (!hasText(attachmentModel.getUpdatedAt())) {
            attachmentModel.setUpdatedAt(LocalDate.now().toString());
        }
        product.getAttachments().add(attachmentModel);
        return productLifecycleMapper.toShowDto(productLifecycleRepository.save(product));
    }

    @Override
    @Transactional
    public ProductLifecycleShowDTO addUploadedAttachments(String identifier, MultipartFile[] files, User user) {
        ProductLifecycle product = findVisibleProduct(identifier, user);
        if (files == null || files.length == 0) {
            throw new CustomException("At least one attachment file is required", HttpStatus.BAD_REQUEST);
        }
        for (MultipartFile file : files) {
            ProductLifecycleAttachment attachment = new ProductLifecycleAttachment();
            attachment.setName(file.getOriginalFilename());
            attachment.setType(file.getContentType());
            attachment.setSize(formatFileSize(file.getSize()));
            attachment.setUpdatedAt(LocalDate.now().toString());
            product.getAttachments().add(attachment);
        }
        return productLifecycleMapper.toShowDto(productLifecycleRepository.save(product));
    }

    @Override
    @Transactional
    public ProductLifecycleShowDTO updateImage(String identifier, MultipartFile file, User user) {
        ProductLifecycle product = findVisibleProduct(identifier, user);
        if (file == null || file.isEmpty()) {
            throw new CustomException("Product image file is required", HttpStatus.BAD_REQUEST);
        }
        product.setImageUrl(file.getOriginalFilename());
        return productLifecycleMapper.toShowDto(productLifecycleRepository.save(product));
    }

    private ProductLifecycle findVisibleProduct(String identifier, User user) {
        if (!hasText(identifier)) {
            throw new CustomException("Product identifier is required", HttpStatus.BAD_REQUEST);
        }
        Optional<ProductLifecycle> product;
        if (user.getRole().getRoleType().equals(RoleType.ROLE_CLIENT)) {
            Long companyId = user.getCompany().getId();
            product = productLifecycleRepository.findByPublicIdAndCompany_Id(identifier, companyId)
                    .or(() -> productLifecycleRepository.findByProductUidAndCompany_Id(identifier, companyId))
                    .or(() -> parseLong(identifier).flatMap(id -> productLifecycleRepository.findByIdAndCompany_Id(id, companyId)));
        } else {
            product = productLifecycleRepository.findByPublicId(identifier)
                    .or(() -> productLifecycleRepository.findByProductUid(identifier))
                    .or(() -> parseLong(identifier).flatMap(productLifecycleRepository::findById));
        }
        return product.orElseThrow(() -> new CustomException("Product lifecycle record not found", HttpStatus.NOT_FOUND));
    }

    private void validateUniqueProductUid(String productUid, Long companyId, Long currentId) {
        boolean exists = currentId == null
                ? productLifecycleRepository.existsByProductUidAndCompany_Id(productUid, companyId)
                : productLifecycleRepository.existsByProductUidAndCompany_IdAndIdNot(productUid, companyId, currentId);
        if (exists) {
            throw new CustomException("Product UID already exists", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    private void validateUniquePublicId(String publicId, Long companyId, Long currentId) {
        boolean exists = currentId == null
                ? productLifecycleRepository.existsByPublicIdAndCompany_Id(publicId, companyId)
                : productLifecycleRepository.existsByPublicIdAndCompany_IdAndIdNot(publicId, companyId, currentId);
        if (exists) {
            throw new CustomException("Product lifecycle ID already exists", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    private ProductLifecycleEvent createEvent(String id, String label, String description, User user) {
        ProductLifecycleEvent event = new ProductLifecycleEvent();
        event.setEventId(id);
        event.setLabel(label);
        event.setDescription(description);
        event.setTimestamp(LocalDateTime.now().format(EVENT_TIMESTAMP));
        event.setOwner(user.getFirstName() + " " + user.getLastName());
        return event;
    }

    private String buildPublicId(Long id) {
        return "PL-" + String.format("%04d", id);
    }

    private String buildQrValue(ProductLifecycle product) {
        return product.getPublicId() + " | " + product.getName() + " | " + product.getAssignedCustomer();
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private Optional<Long> parseLong(String value) {
        try {
            return Optional.of(Long.parseLong(value));
        } catch (NumberFormatException ignored) {
            return Optional.empty();
        }
    }

    private String formatFileSize(long size) {
        if (size < 1024) return size + " B";
        double kb = size / 1024.0;
        if (kb < 1024) return String.format("%.1f KB", kb);
        return String.format("%.1f MB", kb / 1024.0);
    }
}
