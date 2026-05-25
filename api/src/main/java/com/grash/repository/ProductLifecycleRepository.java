package com.grash.repository;

import com.grash.model.ProductLifecycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductLifecycleRepository extends JpaRepository<ProductLifecycle, Long>, JpaSpecificationExecutor<ProductLifecycle> {
    List<ProductLifecycle> findByCompany_Id(Long companyId);

    Optional<ProductLifecycle> findByPublicId(String publicId);

    Optional<ProductLifecycle> findByPublicIdAndCompany_Id(String publicId, Long companyId);

    Optional<ProductLifecycle> findByProductUid(String productUid);

    Optional<ProductLifecycle> findByProductUidAndCompany_Id(String productUid, Long companyId);

    Optional<ProductLifecycle> findByIdAndCompany_Id(Long id, Long companyId);

    boolean existsByPublicIdAndCompany_Id(String publicId, Long companyId);

    boolean existsByPublicIdAndCompany_IdAndIdNot(String publicId, Long companyId, Long id);

    boolean existsByProductUidAndCompany_Id(String productUid, Long companyId);

    boolean existsByProductUidAndCompany_IdAndIdNot(String productUid, Long companyId, Long id);

    @Query(value = """
            SELECT COALESCE(MAX(CAST(SUBSTRING(product_uid FROM 5) AS INTEGER)), 0)
            FROM product_lifecycle
            WHERE company_id = :companyId
              AND product_uid ~ '^PRD-[0-9]+$'
            """, nativeQuery = true)
    Integer findMaxProductUidSequenceByCompanyId(@Param("companyId") Long companyId);
}
