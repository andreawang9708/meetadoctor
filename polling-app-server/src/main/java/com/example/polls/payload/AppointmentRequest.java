package com.example.polls.payload;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AppointmentRequest {
	@NotBlank
	@Size(max = 50)
	private String hospital;

	@NotBlank
	@Size(max = 20)
	private String department;

	@NotBlank
	private String date;
	
	//for representing the appointment time in detail
	//@NotBlank
	private String time_interval;
	
	@NotBlank
	private String doctorName;

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

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}


	
	
}
