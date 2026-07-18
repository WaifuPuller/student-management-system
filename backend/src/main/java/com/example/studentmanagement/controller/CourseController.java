package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.ApiResponse;
import com.example.studentmanagement.dto.CourseRequestDto;
import com.example.studentmanagement.dto.CourseResponseDto;
import com.example.studentmanagement.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponseDto>> createCourse(@Valid @RequestBody CourseRequestDto courseRequestDto) {
        CourseResponseDto course = courseService.createCourse(courseRequestDto);
        return new ResponseEntity<>(ApiResponse.<CourseResponseDto>builder()
                .success(true)
                .message("Course created successfully")
                .data(course)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponseDto>>> getAllCourses() {
        List<CourseResponseDto> courses = courseService.getAllCourses();
        return ResponseEntity.ok(ApiResponse.<List<CourseResponseDto>>builder()
                .success(true)
                .message("Courses retrieved successfully")
                .data(courses)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponseDto>> getCourseById(@PathVariable Long id) {
        CourseResponseDto course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.<CourseResponseDto>builder()
                .success(true)
                .message("Course retrieved successfully")
                .data(course)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<CourseResponseDto>>> searchCourses(@RequestParam String keyword) {
        List<CourseResponseDto> courses = courseService.searchCourses(keyword);
        return ResponseEntity.ok(ApiResponse.<List<CourseResponseDto>>builder()
                .success(true)
                .message("Courses retrieved successfully")
                .data(courses)
                .build());
    }
    
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<ApiResponse<List<CourseResponseDto>>> getCoursesByTeacher(@PathVariable Long teacherId) {
        List<CourseResponseDto> courses = courseService.getCoursesByTeacherId(teacherId);
        return ResponseEntity.ok(ApiResponse.<List<CourseResponseDto>>builder()
                .success(true)
                .message("Courses retrieved successfully")
                .data(courses)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponseDto>> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequestDto courseRequestDto) {
        CourseResponseDto course = courseService.updateCourse(id, courseRequestDto);
        return ResponseEntity.ok(ApiResponse.<CourseResponseDto>builder()
                .success(true)
                .message("Course updated successfully")
                .data(course)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Course deleted successfully")
                .build());
    }
}
