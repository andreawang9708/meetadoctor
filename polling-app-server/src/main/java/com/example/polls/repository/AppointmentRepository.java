package com.example.polls.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.polls.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Optional<Appointment> findById(Long appointmentId);
    
    @Query("SELECT b.id FROM Appointment b where b.date = :date and b.department = :department and b.isAvailable = true")
    Page<Long> findByDateAndDepartment(@Param("date") String date, @Param("department") String departmnent, Pageable pageable);
    
    List<Appointment> findByIdIn(List<Long> appointmentIds);

    List<Appointment> findByIdIn(List<Long> appointmentIds, Sort sort);
}
