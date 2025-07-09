package com.example.blogapi.controller;

import com.example.blogapi.dtos.CommentDto;
import com.example.blogapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Create a comment (requires userId and postId as path variables)
    @PostMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<CommentDto> createComment(
            @PathVariable Integer userId,
            @PathVariable Integer postId,
            @RequestBody CommentDto commentDto
    ) {
        CommentDto createdComment = commentService.createComment(userId, postId, commentDto);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    // Update a comment
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDto> updateComment(
            @PathVariable Integer commentId,
            @RequestBody CommentDto commentDto
    ) {
        CommentDto updatedComment = commentService.updateComment(commentId, commentDto);
        return ResponseEntity.ok(updatedComment);
    }

    // Delete a comment
    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment deleted successfully");
    }
}
