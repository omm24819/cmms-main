package com.grash.repository;

import com.grash.model.ProcurementAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementAttachmentRepository
        extends JpaRepository<
        ProcurementAttachment,
        Long
        > {
}