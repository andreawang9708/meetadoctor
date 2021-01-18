package com.example.polls.payload;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class FeedbackRequest {
    
    @NotBlank
    @Size(max = 50)
    private String doctorName;
    
    @Size(max = 50)
    private String doctorHospital;
    
    @Size(max = 50)
    private String doctorDepartment;
    
    @Size(max = 10000)
    private String doctorInfo;
    
    @NotNull
    @Size(min = 0)
    @Valid
    private List<CommentRequest> comments;

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorHospital() {
        return doctorHospital;
    }

    public void setDoctorHospital(String doctorHospital) {
        this.doctorHospital = doctorHospital;
    }
    
    public String getDoctorDepartment() {
        return doctorDepartment;
    }

    public void setDoctorDepartment(String doctorDepartment) {
        this.doctorDepartment = doctorDepartment;
    }
    
    public String getDoctorInfo() {
        return doctorInfo;
    }

    public void setDoctorInfo(String doctorInfo) {
        this.doctorInfo = doctorInfo;
    }
    
    public List<CommentRequest> getComments() {
        return comments;
    }

    public void setComments(List<CommentRequest> comments) {
        this.comments = comments;
    }

}
