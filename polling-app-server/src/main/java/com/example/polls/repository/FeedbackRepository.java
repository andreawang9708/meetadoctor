package com.example.polls.repository;

import com.example.polls.model.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

/**
 * Created by lepan.
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findById(Long feedbackId);

    List<Feedback> findByIdIn(List<Long> feedbackIds);

    List<Feedback> findByIdIn(List<Long> feedbackIds, Sort sort);

    Page<Feedback> findByCreatedBy(Long userId, Pageable pageable);

   // @Query("SELECT b FROM Feedback b where b.doctorHospital LIKE '%'+:hospital+'%' and b.doctorDepartment LIKE '%'+:department+'%' and b.doctorName LIKE '%'+:name+'%'")
    //Page<Feedback> findByFeedbackInfo(@Param("hospital") String hospital, @Param("department") String departmnent, @Param("name") String name, Pageable pageable);

  @Query("SELECT b FROM Feedback b where (:name = 'null' or b.doctorName = :name) and (:hospital = 'null' or b.doctorHospital = :hospital) and (:department = 'null' or b.doctorDepartment = :department)")
  Page<Feedback> findByFeedbackInfo(@Param("hospital") String hospital, @Param("department") String departmnent, @Param("name") String name, Pageable pageable);
// SELECT b FROM Feedback b where b.doctorName = :name and b.doctorHospital = :hospital and b.doctorDepartment = :department
  // @Query("SELECT b FROM Feedback b where (IF(:name = 'null', true, false) or b.doctorName = :name) and (IF(:hospital = 'null', true, false) or b.doctorHospital = :hospital) and (IF(:department = 'null', true, false) or b.doctorDepartment = :department)")
  // Page<Feedback> findByFeedbackInfo(@Param("hospital") String hospital, @Param("department") String departmnent, @Param("name") String name, Pageable pageable);
}
