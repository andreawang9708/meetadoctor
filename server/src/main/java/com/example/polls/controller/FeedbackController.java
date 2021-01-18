package com.example.polls.controller;

import com.example.polls.model.*;
import com.example.polls.payload.*;
import com.example.polls.repository.PollRepository;
import com.example.polls.repository.FeedbackRepository;
import com.example.polls.repository.CommentRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.repository.VoteRepository;
import com.example.polls.security.CurrentUser;
import com.example.polls.security.UserPrincipal;
import com.example.polls.service.PollService;
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
import com.example.polls.exception.ResourceNotFoundException;

/**
 * Created by rajeevkumarsingh on 20/11/17.
 */

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PollService pollService;

    private static final Logger logger = LoggerFactory.getLogger(PollController.class);

    @GetMapping
    public PagedResponse<FeedbackResponse> getFeedbacks(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getAllFeedbacks(currentUser, page, size);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public Long createFeedback(@Valid @RequestBody FeedbackRequest feedbackRequest) {
        System.out.println(feedbackRequest.getDoctorName());
    	Feedback feedback = pollService.createFeedback(feedbackRequest);
    	System.out.println("0"+feedback.getPollId());

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{feedbackId}")
                .buildAndExpand(feedback.getId()).toUri();

        ResponseEntity.created(location).body(new ApiResponse(true, "Feedback Created Successfully"));
        return feedback.getId();
    }


    @GetMapping("/{feedbackId}")
    public FeedbackResponse getFeedbackById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long feedbackId) {
        return pollService.getFeedbackById(feedbackId, currentUser);
    }

    @PostMapping("/{feedbackId}/comments")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createComment(@Valid @RequestBody CommentRequest commentRequest,
    		             @CurrentUser UserPrincipal currentUser,
                         @PathVariable Long feedbackId) {
    	Feedback feedback = feedbackRepository.findById(feedbackId)
                   .orElseThrow(() -> new ResourceNotFoundException("Feedback", "ID", feedbackId));
    	System.out.println("0"+currentUser.getName());
    	System.out.println("1"+commentRequest.getText());
    	System.out.println("2"+commentRequest.getFeedbackId());
    	CommentResponse comment = pollService.createComment(commentRequest, feedback, currentUser);
    	System.out.println("1"+comment.getText());
    	System.out.println("2"+comment.getFeedbackId());
    	System.out.println("3"+comment.getUserName());
    	URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{commentId}")
                .buildAndExpand(comment.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Comment Created Successfully"));
    }
    
    @GetMapping("/hospital/{hospital}/department/{department}/name/{name}")
    public PagedResponse<FeedbackResponse> getFeedbackByInfo(@PathVariable String hospital, 
    		                                @PathVariable String department,
    		                                @PathVariable String name,
    		                                @CurrentUser UserPrincipal currentUser,
                                            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getFeedbackByInfo(hospital, department, name, currentUser, page, size);    
    }

}
