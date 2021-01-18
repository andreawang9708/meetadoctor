package com.example.polls.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.polls.model.Reservation;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    //@Query("SELECT r FROM Reservation r where r.user.id = :userId")
    //List<Reservation> findByUserIdIn(@Param("userId") Long userId);
 //   Page<Reservation> findByReservedBy(Long userId, Pageable pageable);
    
    @Query("SELECT r FROM Reservation r where r.user.id = :userId")
    Page<Reservation> findByReservedBy(@Param("userId") Long userId,Pageable pageable);
    
    @Query("SELECT r.appointment.id FROM Reservation r WHERE r.user.id = :userId")
    Page<Long> findReservedAppointmentIdsByUserId(@Param("userId") Long userId, Pageable pageable);

    long countByCreatedBy(Long userId);
    Optional<Reservation> findById(Long reservationId);

    //long countByCreatedBy(Long userId);

    List<Reservation> findByIdIn(List<Long> reservationIds);

    List<Reservation> findByIdIn(List<Long> reservationIds, Sort sort);
}
