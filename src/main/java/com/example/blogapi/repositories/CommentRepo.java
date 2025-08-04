package com.example.blogapi.repositories;

import com.example.blogapi.dtos.CommentDto;
import com.example.blogapi.entities.Comment;
import com.example.blogapi.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment,Integer> {

    List<Comment> findByPost(Post post);
}
