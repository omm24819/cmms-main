package com.grash.repository;

import com.grash.model.ProductAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductAttachmentRepository
        extends JpaRepository<ProductAttachment, Long> {
}