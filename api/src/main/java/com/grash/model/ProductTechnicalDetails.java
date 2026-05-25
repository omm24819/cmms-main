package com.grash.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "product_technical_details")
public class ProductTechnicalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String modelNumber;

    private String partNumber;

    private String macAddress;

    private String imeiModuleId;

    private String hardwareVersion;

    private String firmwareVersion;

    private String rfidTagId;

    private String digitalTwinLink;

    @Column(columnDefinition = "TEXT")
    private String description;
}
