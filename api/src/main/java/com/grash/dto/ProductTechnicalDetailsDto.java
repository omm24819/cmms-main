package com.grash.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductTechnicalDetailsDto {

    private String modelNumber;

    private String partNumber;

    private String macAddress;

    private String imeiModuleId;

    private String hardwareVersion;

    private String firmwareVersion;

    private String rfidTagId;

    private String digitalTwinLink;

    private String description;
}
