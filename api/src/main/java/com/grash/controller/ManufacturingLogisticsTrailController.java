package com.grash.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grash.dto.ManufacturingLogisticsTrailRequestDto;
import com.grash.dto.ManufacturingLogisticsTrailResponseDto;
import com.grash.service.ManufacturingLogisticsTrailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/manufacturing-logistics-trail")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ManufacturingLogisticsTrailController {

    private final ManufacturingLogisticsTrailService service;

    private final ObjectMapper objectMapper;

    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ManufacturingLogisticsTrailResponseDto create(

            @RequestParam("logisticsData")
            String logisticsData,

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

        ManufacturingLogisticsTrailRequestDto dto =
                objectMapper.readValue(
                        logisticsData,
                        ManufacturingLogisticsTrailRequestDto.class
                );

        return service.create(
                dto,
                documents,
                productImages
        );
    }

    @GetMapping
    public List<ManufacturingLogisticsTrailResponseDto>
    getAll() {

        return service.getAll();
    }

    @GetMapping("/{logUid}")
    public ManufacturingLogisticsTrailResponseDto
    getByLogUid(
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

    @GetMapping("/test")
    public String test() {
        return "WORKING";
    }
}