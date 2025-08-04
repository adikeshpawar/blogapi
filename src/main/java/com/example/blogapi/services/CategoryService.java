package com.example.blogapi.services;

import com.example.blogapi.dtos.CategoryDto;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {
    CategoryDto createCategory(CategoryDto categoryDto);
    CategoryDto updateCategory(CategoryDto categoryDto,Integer postId);
    void deleteCategory (Integer categoryId);
}
