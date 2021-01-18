package com.example.polls.repository;

import com.example.polls.model.Comment;
import com.example.polls.model.Vote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	
    @Query("SELECT c FROM Comment c where c.feedback.id = :feedbackId")
    List<Comment> findByFeedbackId(@Param("feedbackId") Long feedbackId);
    
    Optional<Comment> findById(Long id);
    
//    @Query("SELECT c FROM Comment c where c.user.id = :userId")
//    List<Comment> findByUserId(@Param("userId") Long userId);
    
    Page<Comment> findByCreatedBy(Long userId, Pageable pageable);
    
}

