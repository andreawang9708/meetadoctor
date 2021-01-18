package com.example.polls.payload;

public class AppointmentResponse {
	private Long id;
	private DoctorSummary doctor;
	//check if this appointment time is available
	private AppointmentDetails details;
	private Boolean isAvailable;
	

	public AppointmentResponse(Long id, DoctorSummary doctor, AppointmentDetails details, Boolean isAvailable) {
		super();
		this.id = id;
		this.doctor = doctor;
		this.details = details;
		this.isAvailable = isAvailable;
	}
	
	public long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public DoctorSummary getDoctor() {
		return doctor;
	}
	public void setDoctor(DoctorSummary doctor) {
		this.doctor = doctor;
	}
	
	public AppointmentDetails getDetails() {
		return details;
	}
	public void setDetails(AppointmentDetails details) {
		this.details = details;
	}
	public Boolean getIsAvailable() {
		return isAvailable;
	}
	public void setIsAvailable(Boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
	
}
