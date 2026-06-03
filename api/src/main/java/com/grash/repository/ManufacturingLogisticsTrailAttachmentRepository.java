package com.grash.repository;

import com.grash.model.ManufacturingLogisticsTrailAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManufacturingLogisticsTrailAttachmentRepository
        extends JpaRepository<ManufacturingLogisticsTrailAttachment, Long> {

    List<ManufacturingLogisticsTrailAttachment>
    findByLogisticsTrailLogId(Long id);
}