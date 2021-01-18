package com.example.polls.payload;

public class AppointmentAvailability {
	private Boolean available;

    public AppointmentAvailability(Boolean available) {
        this.available = available;
    }

	public Boolean getAvailable() {
		return available;
	}

	public void setAvailable(Boolean available) {
		this.available = available;
	}
    

}
