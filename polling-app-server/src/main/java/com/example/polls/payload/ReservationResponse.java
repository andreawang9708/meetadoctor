package com.example.polls.payload;

import java.time.LocalDate;

public class ReservationResponse {
	private Integer id;
	private LocalDate date;
	private String time_interval;
	private UserSummary reservedBy;
	private DoctorSummary doctor;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getTime_interval() {
		return time_interval;
	}
	public void setTime_interval(String time_interval) {
		this.time_interval = time_interval;
	}
	
	public UserSummary getReservedBy() {
		return reservedBy;
	}
	public void setReservedBy(UserSummary reservedBy) {
		this.reservedBy = reservedBy;
	}
	
	public DoctorSummary getDoctor() {
		return doctor;
	}
	public void setDoctor(DoctorSummary doctor) {
		this.doctor = doctor;
	}
	
	
}
