package com.example.blogapi.repositories;

import com.example.blogapi.dtos.CategoryDto;
import com.example.blogapi.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Integer> {



}
