package com.example.blogapi.services.impl;

import com.example.blogapi.dtos.CommentDto;
import com.example.blogapi.entities.Comment;
import com.example.blogapi.entities.Post;
import com.example.blogapi.entities.User;
import com.example.blogapi.exceptions.ResourceNotFoundException;
import com.example.blogapi.repositories.CommentRepo;
import com.example.blogapi.repositories.PostRepo;
import com.example.blogapi.repositories.UserRepo;
import com.example.blogapi.services.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepo commentRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    PostRepo postRepo;
    @Override
    public CommentDto createComment(Integer userId, Integer postId, CommentDto commentDto) {
        User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","userId",userId));
        Post post = this.postRepo.findById(postId).orElseThrow(()-> new ResourceNotFoundException("post","postId",postId));
        Comment comment = this.modelMapper.map(commentDto,Comment.class);
        comment.setPost(post);
        comment.setUser(user);
        Comment savedComment = this.commentRepo.save(comment);
        return this.modelMapper.map(savedComment,CommentDto.class);
    }


    @Override
    public CommentDto updateComment(Integer commentId, CommentDto commentDto) {
        Comment comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "commentId", commentId));

        comment.setContent(commentDto.getContent());
        Comment updatedComment = commentRepo.save(comment);

        return modelMapper.map(updatedComment, CommentDto.class);
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "commentId", commentId));
        commentRepo.delete(comment);
    }

    @Override
    public List<CommentDto> getCommentByPostId(Integer postId) {
        Post post = this.postRepo.findById(postId).orElseThrow(()-> new ResourceNotFoundException("post","postId",postId));
        List<Comment> comments = commentRepo.findByPost(post);

        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());
    }
}
