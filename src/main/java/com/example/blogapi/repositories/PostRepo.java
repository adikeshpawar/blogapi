package com.example.blogapi.repositories;

import com.example.blogapi.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepo extends JpaRepository<Post,Integer> {

    List<Post> findByPostTagsContaining(String tag);
    List<Post> findByUser_Id(Integer userId);
}
