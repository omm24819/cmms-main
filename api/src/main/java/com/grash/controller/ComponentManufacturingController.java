package com.grash.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grash.dto.*;
import com.grash.service.ComponentManufacturingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/component-manufacturing")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ComponentManufacturingController {

    private final ComponentManufacturingService service;

    private final ObjectMapper objectMapper;

    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ComponentManufacturingResponseDto create(

            @RequestParam("componentData")
            String componentData,

            @RequestParam(
                    value = "documents",
                    required = false
            )
            List<MultipartFile> documents,

            @RequestParam(
                    value = "productImages",
                    required = false
            )
            List<MultipartFile> productImages

    ) throws Exception {

        ComponentManufacturingRequestDto dto =
                objectMapper.readValue(
                        componentData,
                        ComponentManufacturingRequestDto.class
                );

        return service.create(
                dto,
                documents,
                productImages
        );
    }

    @GetMapping
    public List<ComponentManufacturingResponseDto>
    getAll() {

        return service.getAll();
    }

    @GetMapping("/{logUid}")
    public ComponentManufacturingResponseDto getByLogUid(
            @PathVariable String logUid
    ) {

        return service.getByLogUid(logUid);
    }

    @DeleteMapping("/{logUid}")
    public void deleteByLogUid(
            @PathVariable String logUid
    ) {

        service.deleteByLogUid(logUid);
    }
}