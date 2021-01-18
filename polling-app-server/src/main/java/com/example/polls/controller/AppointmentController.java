package com.example.polls.controller;

import com.example.polls.exception.ResourceNotFoundException;
import com.example.polls.model.*;

import com.example.polls.payload.*;
import com.example.polls.repository.AppointmentRepository;
import com.example.polls.repository.ReservationRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.AppointmentService;
import com.example.polls.util.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;


@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentService appointmentService;

    private static final Logger logger = LoggerFactory.getLogger(AppointmentController.class);

    @GetMapping
    public PagedResponse<AppointmentResponse> getAppointments(
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return appointmentService.getAllAppointments(page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
        System.out.println(appointmentRequest.getHospital());
        Appointment appointment = appointmentService.createAppointment(appointmentRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{appointmentId}")
                .buildAndExpand(appointment.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Appointment Created Successfully"));
    }
    @GetMapping("/{appointmentId}/checkAppointmentAvailability")
    public AppointmentAvailability AppointmentAvailability(@PathVariable(value = "appointmentId") Long appointmentId) {
    	Appointment appointment = appointmentRepository.findById(appointmentId)
    			.orElseThrow(() -> new ResourceNotFoundException("Appointment", "appointmentId",appointmentId));
        Boolean isAvailable = appointment.isAvailable();
        return new AppointmentAvailability(isAvailable);
    }

    @GetMapping("/{appointmentId}/details")
    public AppointmentDetails AppointmentDetails(@PathVariable(value = "appointmentId") Long appointmentId) {
    	Appointment appointment = appointmentRepository.findById(appointmentId)
    			.orElseThrow(() -> new ResourceNotFoundException("Appointment", "appointmentId",appointmentId));
    	AppointmentDetails appointmentDetails = new AppointmentDetails(appointment.getId(),appointment.getHospital(),appointment.getDepartment()
    			,appointment.getDate(),appointment.getTime_interval(),appointment.getDoctor());
        return appointmentDetails;
    }

    @GetMapping("/{department}/{date}")
    public PagedResponse<AppointmentResponse> getAppointmentByDateAndDepartment(@PathVariable String date, @PathVariable String department,
    		@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
    	System.out.println(date);
    	System.out.println(department);
        return appointmentService.getAppointmentByDateAndDepartment(date,department,page,size);
    }

    @PostMapping("/{appointmentId}/reservations")
    @PreAuthorize("hasRole('USER')")
    public AppointmentResponse castReservation(@CurrentUser UserPrincipal currentUser,
                         @PathVariable Long appointmentId,
                         @Valid @RequestBody ReservationRequest reservationRequest) {
        return appointmentService.castReservationAndGetUpdatedAppointment(appointmentId, reservationRequest, currentUser);
    }
}
