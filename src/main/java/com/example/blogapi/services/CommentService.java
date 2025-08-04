package com.example.blogapi.services;

import com.example.blogapi.dtos.CommentDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    CommentDto createComment(Integer userId, Integer postId, CommentDto commentDto);

    CommentDto updateComment(Integer commentId, CommentDto commentDto);
    void deleteComment(Integer commentId);
    List<CommentDto> getCommentByPostId(Integer postId);
}
