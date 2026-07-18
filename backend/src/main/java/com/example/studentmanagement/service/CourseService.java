package com.example.studentmanagement.service;

import com.example.studentmanagement.dto.CourseRequestDto;
import com.example.studentmanagement.dto.CourseResponseDto;

import java.util.List;

public interface CourseService {
    CourseResponseDto createCourse(CourseRequestDto courseRequestDto);
    CourseResponseDto getCourseById(Long id);
    List<CourseResponseDto> getAllCourses();
    List<CourseResponseDto> searchCourses(String keyword);
    List<CourseResponseDto> getCoursesByTeacherId(Long teacherId);
    CourseResponseDto updateCourse(Long id, CourseRequestDto courseRequestDto);
    void deleteCourse(Long id);
}
