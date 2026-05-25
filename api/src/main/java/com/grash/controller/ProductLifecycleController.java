package com.grash.controller;

import com.grash.advancedsearch.FilterField;
import com.grash.advancedsearch.SearchCriteria;
import com.grash.dto.ProductLifecycleAttachmentDTO;
import com.grash.dto.ProductLifecyclePatchDTO;
import com.grash.dto.ProductLifecyclePostDTO;
import com.grash.dto.ProductLifecycleShowDTO;
import com.grash.dto.SuccessResponse;
import com.grash.model.User;
import com.grash.model.enums.ProductLifecycleStatus;
import com.grash.service.ProductLifecycleService;
import com.grash.service.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/product-lifecycle")
@Tag(name = "Product Lifecycle Log", description = "Operations on product lifecycle records")
@RequiredArgsConstructor
public class ProductLifecycleController {
    private final ProductLifecycleService productLifecycleService;
    private final UserService userService;

    @GetMapping("")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<ProductLifecycleShowDTO>> list(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortField", defaultValue = "id") String sortField,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        SearchCriteria searchCriteria = new SearchCriteria();
        searchCriteria.setPageNum(page);
        searchCriteria.setPageSize(size);
        searchCriteria.setSortField(sortField);
        searchCriteria.setDirection(Sort.Direction.fromString(direction));

        if (hasText(search)) {
            FilterField searchField = FilterField.builder()
                    .field("publicId")
                    .value(search)
                    .operation("cn")
                    .values(new ArrayList<>())
                    .alternatives(new ArrayList<>())
                    .build();
            searchField.getAlternatives().add(buildContainsFilter("productUid", search));
            searchField.getAlternatives().add(buildContainsFilter("name", search));
            searchField.getAlternatives().add(buildContainsFilter("category", search));
            searchField.getAlternatives().add(buildContainsFilter("subcategory", search));
            searchField.getAlternatives().add(buildContainsFilter("description", search));
            searchCriteria.getFilterFields().add(searchField);
        }
        if (hasText(status) && !"All".equalsIgnoreCase(status)) {
            searchCriteria.getFilterFields().add(FilterField.builder()
                    .field("status")
                    .value(ProductLifecycleStatus.fromLabel(status))
                    .operation("eq")
                    .values(new ArrayList<>())
                    .build());
        }
        return ResponseEntity.ok(productLifecycleService.search(searchCriteria, user));
    }

    @PostMapping("/search")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Page<ProductLifecycleShowDTO>> search(
            @Parameter(description = "Search criteria for filtering product lifecycle records")
            @RequestBody SearchCriteria searchCriteria,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return ResponseEntity.ok(productLifecycleService.search(searchCriteria, user));
    }

    @GetMapping("/next-product-uid")
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ResponseEntity<Map<String, String>> getNextProductUid(HttpServletRequest req) {
        User user = userService.whoami(req);
        return ResponseEntity.ok(Map.of("productUid", productLifecycleService.getNextProductUid(user)));
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ProductLifecycleShowDTO getById(
            @Parameter(description = "Product lifecycle public ID, Product UID, or database ID")
            @PathVariable("id") String id,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.getByIdentifier(id, user);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ProductLifecycleShowDTO create(
            @Parameter(description = "Product lifecycle record to create")
            @Valid @RequestBody ProductLifecyclePostDTO productReq,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.create(productReq, user, false);
    }

    @PostMapping("/drafts")
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ProductLifecycleShowDTO createDraft(
            @Parameter(description = "Draft product lifecycle record to create")
            @Valid @RequestBody ProductLifecyclePostDTO productReq,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.create(productReq, user, true);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ProductLifecycleShowDTO patch(
            @Parameter(description = "Product lifecycle fields to update")
            @Valid @RequestBody ProductLifecyclePatchDTO productReq,
            @Parameter(description = "Product lifecycle public ID, Product UID, or database ID")
            @PathVariable("id") String id,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.update(id, productReq, user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ResponseEntity<SuccessResponse> delete(
            @Parameter(description = "Product lifecycle public ID, Product UID, or database ID")
            @PathVariable("id") String id,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        productLifecycleService.delete(id, user);
        return new ResponseEntity<>(new SuccessResponse(true, "Deleted successfully"), HttpStatus.OK);
    }

    @PostMapping(value = "/{id}/attachments", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ProductLifecycleShowDTO addAttachmentMetadata(
            @Parameter(description = "Product lifecycle public ID, Product UID, or database ID")
            @PathVariable("id") String id,
            @Valid @RequestBody ProductLifecycleAttachmentDTO attachment,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.addAttachment(id, attachment, user);
    }

    @PostMapping(value = "/{id}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ProductLifecycleShowDTO uploadAttachments(
            @Parameter(description = "Product lifecycle public ID, Product UID, or database ID")
            @PathVariable("id") String id,
            @Parameter(description = "Attachment files")
            @RequestParam("files") MultipartFile[] files,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.addUploadedAttachments(id, files, user);
    }

    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_CLIENT')")
    public ProductLifecycleShowDTO uploadImage(
            @Parameter(description = "Product lifecycle public ID, Product UID, or database ID")
            @PathVariable("id") String id,
            @Parameter(description = "Product image file")
            @RequestParam("image") MultipartFile image,
            HttpServletRequest req
    ) {
        User user = userService.whoami(req);
        return productLifecycleService.updateImage(id, image, user);
    }

    private FilterField buildContainsFilter(String field, String value) {
        return FilterField.builder()
                .field(field)
                .value(value)
                .operation("cn")
                .values(new ArrayList<>())
                .build();
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}
