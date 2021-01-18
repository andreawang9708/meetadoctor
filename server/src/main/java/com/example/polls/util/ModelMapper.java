package com.example.polls.util;

import com.example.polls.model.Poll;
import com.example.polls.model.User;
import com.example.polls.model.Comment;
import com.example.polls.model.Feedback;
import com.example.polls.payload.CommentResponse;
import com.example.polls.payload.FeedbackResponse;
import com.example.polls.payload.ChoiceResponse;
import com.example.polls.payload.PollResponse;
import com.example.polls.payload.UserSummary;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.polls.model.Appointment;

import com.example.polls.payload.AppointmentDetails;
import com.example.polls.payload.AppointmentResponse;
import com.example.polls.payload.DoctorSummary;


public class ModelMapper {

    public static PollResponse mapPollToPollResponse(Poll poll, Map<Long, Long> choiceVotesMap, User creator, Long userVote) {
        PollResponse pollResponse = new PollResponse();
        pollResponse.setId(poll.getId());
        pollResponse.setQuestion(poll.getQuestion());
        pollResponse.setCreationDateTime(poll.getCreatedAt());
        pollResponse.setFeedbackId(poll.getFeedbackId());


        List<ChoiceResponse> choiceResponses = poll.getChoices().stream().map(choice -> {
            ChoiceResponse choiceResponse = new ChoiceResponse();
            choiceResponse.setId(choice.getId());
            choiceResponse.setText(choice.getText());

            if(choiceVotesMap.containsKey(choice.getId())) {
                choiceResponse.setVoteCount(choiceVotesMap.get(choice.getId()));
            } else {
                choiceResponse.setVoteCount(0);
            }
            return choiceResponse;
        }).collect(Collectors.toList());

        pollResponse.setChoices(choiceResponses);
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        pollResponse.setCreatedBy(creatorSummary);

        if(userVote != null) {
            pollResponse.setSelectedChoice(userVote);
        }

        long totalVotes = pollResponse.getChoices().stream().mapToLong(ChoiceResponse::getVoteCount).sum();
        pollResponse.setTotalVotes(totalVotes);

        return pollResponse;
    }


    public static FeedbackResponse mapFeedbackToFeedbackResponse(Feedback feedback, User creator) {
        FeedbackResponse feedbackResponse = new FeedbackResponse();
        feedbackResponse.setId(feedback.getId());
        feedbackResponse.setDoctorName(feedback.getDoctorName());
        feedbackResponse.setDoctorHospital(feedback.getDoctorHospital());
        feedbackResponse.setDoctorInfo(feedback.getDoctorInfo());
        feedbackResponse.setDoctorDepartment(feedback.getDoctorDepartment());
        feedbackResponse.setCreationDateTime(feedback.getCreatedAt());
        feedbackResponse.setPollId(feedback.getPollId());
        List<CommentResponse> commentResponses = feedback.getComments().stream().map(comment -> {
            CommentResponse commentResponse = new CommentResponse();
            commentResponse.setId(comment.getId());
            commentResponse.setText(comment.getText());
            commentResponse.setUserId(comment.getUser().getId());
            commentResponse.setUserName(comment.getUser().getUsername());
            commentResponse.setFeedbackId(comment.getFeedback().getId());
            commentResponse.setCreationDateTime(comment.getCreatedAt());
            UserSummary creatorSummary = new UserSummary(comment.getId(), comment.getUser().getUsername(), comment.getUser().getName());
            commentResponse.setCreatedBy(creatorSummary);
            return commentResponse;
        }).collect(Collectors.toList());

        feedbackResponse.setComments(commentResponses);
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        feedbackResponse.setCreatedBy(creatorSummary);

        return feedbackResponse;
    }

    public static CommentResponse mapCommentToCommentResponse(Comment comment, User creator) {
        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(comment.getId());
        commentResponse.setUserId(creator.getId());
        commentResponse.setText(comment.getText());
        commentResponse.setUserName(comment.getUserName());
        commentResponse.setCreationDateTime(comment.getCreatedAt());
        commentResponse.setFeedbackId(comment.getFeedback().getId());

        commentResponse.setCreationDateTime(comment.getCreatedAt());

        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        commentResponse.setCreatedBy(creatorSummary);

        return commentResponse;
    }

    public static AppointmentResponse mapAppointmentToAppointmentResponse(Appointment appointment) {
    	AppointmentDetails appointmentDetails = new AppointmentDetails(appointment.getId(),appointment.getHospital(),
    			appointment.getDepartment(),appointment.getDate(),appointment.getTime_interval(),appointment.getDoctor());
    	DoctorSummary doctorSummary = new DoctorSummary(appointment.getDoctor().getId(),appointment.getDoctor().getName());
    	AppointmentResponse appointmentResponse = new AppointmentResponse(appointment.getId(),doctorSummary,
    			appointmentDetails,appointment.isAvailable());
		return appointmentResponse;

    }

}
