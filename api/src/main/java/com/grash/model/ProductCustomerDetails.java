package com.grash.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "product_customer_details")
public class ProductCustomerDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String assignedCustomer;

    private String installationSite;

    private Double latitude;

    private Double longitude;

    private String contactPerson;

    private String contactNumber;

    private String email;
}
