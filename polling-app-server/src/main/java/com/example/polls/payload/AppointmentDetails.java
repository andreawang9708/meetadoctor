package com.example.polls.payload;

import java.time.LocalDate;

import com.example.polls.model.Doctor;
import com.fasterxml.jackson.annotation.JsonFormat;

public class AppointmentDetails {
	private Long id;
	private String hospital;
	private String department;
	private String date;
	private String time_interval;
	private String doctorName;
	public AppointmentDetails() {
		
	}
	public AppointmentDetails(Long id, String hospital, String department, String date, String time_interval,Doctor doctor) {
		super();
		this.id = id;
		this.hospital = hospital;
		this.department = department;
		this.date = date;
		this.time_interval = time_interval;
		this.doctorName = doctor.getName();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime_interval() {
		return time_interval;
	}
	public void setTime_interval(String time_interval) {
		this.time_interval = time_interval;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctor(String doctorName) {
		this.doctorName = doctorName;
	}
	
	
}
