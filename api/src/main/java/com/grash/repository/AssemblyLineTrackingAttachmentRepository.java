package com.grash.repository;

import com.grash.model.AssemblyLineTrackingAttachment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssemblyLineTrackingAttachmentRepository
        extends JpaRepository<AssemblyLineTrackingAttachment, Long> {

    List<AssemblyLineTrackingAttachment>
    findByAssemblyLineTrackingLogId(Long id);
}