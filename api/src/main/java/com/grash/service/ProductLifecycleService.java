package com.grash.service;

import com.grash.advancedsearch.SearchCriteria;
import com.grash.dto.ProductLifecycleAttachmentDTO;
import com.grash.dto.ProductLifecyclePatchDTO;
import com.grash.dto.ProductLifecyclePostDTO;
import com.grash.dto.ProductLifecycleShowDTO;
import com.grash.model.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ProductLifecycleService {
    Page<ProductLifecycleShowDTO> search(SearchCriteria searchCriteria, User user);

    ProductLifecycleShowDTO getByIdentifier(String identifier, User user);

    String getNextProductUid(User user);

    ProductLifecycleShowDTO create(ProductLifecyclePostDTO productReq, User user, boolean draft);

    ProductLifecycleShowDTO update(String identifier, ProductLifecyclePatchDTO productReq, User user);

    void delete(String identifier, User user);

    ProductLifecycleShowDTO addAttachment(String identifier, ProductLifecycleAttachmentDTO attachment, User user);

    ProductLifecycleShowDTO addUploadedAttachments(String identifier, MultipartFile[] files, User user);

    ProductLifecycleShowDTO updateImage(String identifier, MultipartFile file, User user);
}
