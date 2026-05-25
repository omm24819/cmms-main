package com.grash.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCustomerDetailsDto {

    private String assignedCustomer;

    private String installationSite;

    private Double latitude;

    private Double longitude;

    private String contactPerson;

    private String contactNumber;

    private String email;
}