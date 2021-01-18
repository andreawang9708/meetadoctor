package com.example.polls.service;
import com.example.polls.exception.BadRequestException;
import com.example.polls.exception.ResourceNotFoundException;
import com.example.polls.model.*;
import com.example.polls.payload.AppointmentRequest;
import com.example.polls.payload.AppointmentResponse;
import com.example.polls.payload.PagedResponse;
import com.example.polls.payload.ReservationRequest;
import com.example.polls.repository.AppointmentRepository;
import com.example.polls.repository.DoctorRepository;
import com.example.polls.repository.ReservationRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.UserPrincipal;
import com.example.polls.util.AppConstants;
import com.example.polls.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;
    
    private static final Logger logger = LoggerFactory.getLogger(AppointmentService.class);

    public PagedResponse<AppointmentResponse> getAllAppointments(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Polls
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Appointment> appointments = appointmentRepository.findAll(pageable);

        if(appointments.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), appointments.getNumber(),
            		appointments.getSize(), appointments.getTotalElements(), appointments.getTotalPages(), appointments.isLast());
        }

        // Map Polls to PollResponses containing vote counts and poll creator details
        List<Long> appointmentIds = appointments.map(Appointment::getId).getContent();
//add available map

        List<AppointmentResponse> appointmentResponses = appointments.map(appointment -> {
            return ModelMapper.mapAppointmentToAppointmentResponse(appointment);
        }).getContent();

        return new PagedResponse<>(appointmentResponses, appointments.getNumber(),
        		appointments.getSize(), appointments.getTotalElements(), appointments.getTotalPages(), appointments.isLast());
    }
    
    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
    	Appointment appointment = new Appointment();
        appointment.setHospital(appointmentRequest.getHospital());

        appointment.setAvailable(true);
        appointment.setDepartment(appointmentRequest.getDepartment());
        String doctorName = appointmentRequest.getDoctorName();
        Doctor doctor = doctorRepository.findByName(doctorName).orElseThrow(() -> new ResourceNotFoundException("Doctor", "name", doctorName));;
        appointment.setDoctor(doctor);
        String date = appointmentRequest.getDate();
        //String dateString =  date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        appointment.setDate(date);
        appointment.setTime_interval(appointmentRequest.getTime_interval());

        return appointmentRepository.save(appointment);
    }


    public PagedResponse<AppointmentResponse> getAppointmentsReservedBy(String username, UserPrincipal currentUser, int page, int size) {
        validatePageNumberAndSize(page, size);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        // Retrieve all pollIds in which the given username has voted
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Long> userReservedAppointmentIds = reservationRepository.findReservedAppointmentIdsByUserId(user.getId(), pageable);

        if (userReservedAppointmentIds.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), userReservedAppointmentIds.getNumber(),
            		userReservedAppointmentIds.getSize(), userReservedAppointmentIds.getTotalElements(),
            		userReservedAppointmentIds.getTotalPages(), userReservedAppointmentIds.isLast());
        }

        // Retrieve all poll details from the voted pollIds.
        List<Long> appointmentIds = userReservedAppointmentIds.getContent();

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Appointment> appointments = appointmentRepository.findByIdIn(appointmentIds, sort);
        //Map appointments to AppointMentResponses containing doctor details and appointment details
       // Map<Long, Long> pollUserVoteMap = getPollUserVoteMap(currentUser, appointmentIds);

        List<AppointmentResponse> appointmentResponses = appointments.stream().map(appointment -> {
            return ModelMapper.mapAppointmentToAppointmentResponse(appointment);
        }).collect(Collectors.toList());

        return new PagedResponse<>(appointmentResponses, userReservedAppointmentIds.getNumber(), userReservedAppointmentIds.getSize(), userReservedAppointmentIds.getTotalElements(), userReservedAppointmentIds.getTotalPages(), userReservedAppointmentIds.isLast());
    }


    public PagedResponse<AppointmentResponse> getAppointmentByDateAndDepartment(String date,String department, int page, int size) {
    	validatePageNumberAndSize(page, size);
    	Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
    	System.out.println(date+" "+department+" "+page+" "+size);
    	Page<Long> availableAppointmentIds = appointmentRepository.findByDateAndDepartment(date,department,pageable);
    	System.out.println("id"+availableAppointmentIds.getNumberOfElements());
    	if (availableAppointmentIds.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), availableAppointmentIds.getNumber(),
            		availableAppointmentIds.getSize(), availableAppointmentIds.getTotalElements(),
            		availableAppointmentIds.getTotalPages(), availableAppointmentIds.isLast());
        }
    	List<Long> appointmentIds = availableAppointmentIds.getContent();

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<Appointment> appointments = appointmentRepository.findByIdIn(appointmentIds, sort);
        //Map appointments to AppointMentResponses containing doctor details and appointment details
       // Map<Long, Long> pollUserVoteMap = getPollUserVoteMap(currentUser, appointmentIds);

        List<AppointmentResponse> appointmentResponses = appointments.stream().map(appointment -> {
            return ModelMapper.mapAppointmentToAppointmentResponse(appointment);
        }).collect(Collectors.toList());

        return new PagedResponse<>(appointmentResponses, availableAppointmentIds.getNumber(), availableAppointmentIds.getSize(), availableAppointmentIds.getTotalElements(), availableAppointmentIds.getTotalPages(), availableAppointmentIds.isLast());
    }
    

    public AppointmentResponse castReservationAndGetUpdatedAppointment(Long appointmentId,ReservationRequest reservationRequest, UserPrincipal currentUser) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", appointmentId));

        if(!appointment.isAvailable()) {
            throw new BadRequestException("Sorry! This appointment is not available.");
        }

        User user = userRepository.getOne(currentUser.getId());

        Reservation reservation = new Reservation();
        reservation.setAppointment(appointment);
        reservation.setUser(user);

        try {
            reservation = reservationRepository.save(reservation);
            appointment.setAvailable(false);
            appointment.setReservation(reservation);
            appointmentRepository.save(appointment);
        } catch (DataIntegrityViolationException ex) {
            logger.info("User {} has already reserved appointment with id {}", currentUser.getId(), appointmentId);
            throw new BadRequestException("Sorry! You have already made this appointment.");
        }

        //-- Vote Saved, Return the updated Poll Response now --

        // Retrieve poll creator details
 //       User creator = userRepository.findById(.getCreatedBy())
       //         .orElseThrow(() -> new ResourceNotFoundException("User", "id", poll.getCreatedBy()));

        return ModelMapper.mapAppointmentToAppointmentResponse(appointment);
    }


    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }




}
