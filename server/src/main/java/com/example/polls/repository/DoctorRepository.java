package com.example.polls.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


import com.example.polls.model.Doctor;


@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	Optional<Doctor> findById(Long doctorId);
	Optional<Doctor> findByName(String doctorName);
}
