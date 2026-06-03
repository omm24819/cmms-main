package com.grash.repository;

import com.grash.model.ComponentManufacturingAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComponentManufacturingAttachmentRepository
        extends JpaRepository<ComponentManufacturingAttachment, Long> {

    List<ComponentManufacturingAttachment>
    findByComponentManufacturingLogId(Long id);
}