package com.grash.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grash.dto.RawMaterialProcurementRequestDto;
import com.grash.dto.RawMaterialProcurementResponseDto;
import com.grash.service.RawMaterialProcurementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/raw-material-procurement")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RawMaterialProcurementController {

    private final RawMaterialProcurementService service;

    private final ObjectMapper objectMapper;

    /**
     * CREATE
     */
    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public RawMaterialProcurementResponseDto create(

            @RequestParam("procurementData")
            String procurementData,

            @RequestParam(
                    value = "files",
                    required = false
            )
            List<MultipartFile> files

    ) throws Exception {

        RawMaterialProcurementRequestDto dto =
                objectMapper.readValue(
                        procurementData,
                        RawMaterialProcurementRequestDto.class
                );

        return service.create(dto, files);
    }

    /**
     * GET ALL
     */
    @GetMapping
    public List<RawMaterialProcurementResponseDto> getAll() {

        return service.getAll();
    }

    /**
     * GET BY ID
     */
    @GetMapping("/log/{logUid}")
    public RawMaterialProcurementResponseDto getByLogUid(
            @PathVariable String logUid
    ) {
        return service.getByLogUid(logUid);
    }

    /**
     * UPDATE
     */
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public RawMaterialProcurementResponseDto update(

            @PathVariable Long id,

            @RequestParam("procurementData")
            String procurementData,

            @RequestParam(
                    value = "files",
                    required = false
            )
            List<MultipartFile> files

    ) throws Exception {

        RawMaterialProcurementRequestDto dto =
                objectMapper.readValue(
                        procurementData,
                        RawMaterialProcurementRequestDto.class
                );

        return service.update(
                id,
                dto,
                files
        );
    }

    /**
     * DELETE
     */
    @DeleteMapping("/log/{logUid}")
    public void deleteByLogUid(
            @PathVariable String logUid
    ) {
        service.deleteByLogUid(logUid);
    }
}