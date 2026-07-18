package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.ApiResponse;
import com.example.studentmanagement.dto.TeacherRequestDto;
import com.example.studentmanagement.dto.TeacherResponseDto;
import com.example.studentmanagement.service.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PostMapping
    public ResponseEntity<ApiResponse<TeacherResponseDto>> createTeacher(@Valid @RequestBody TeacherRequestDto teacherRequestDto) {
        TeacherResponseDto teacher = teacherService.createTeacher(teacherRequestDto);
        return new ResponseEntity<>(ApiResponse.<TeacherResponseDto>builder()
                .success(true)
                .message("Teacher created successfully")
                .data(teacher)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TeacherResponseDto>>> getAllTeachers() {
        List<TeacherResponseDto> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(ApiResponse.<List<TeacherResponseDto>>builder()
                .success(true)
                .message("Teachers retrieved successfully")
                .data(teachers)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TeacherResponseDto>> getTeacherById(@PathVariable Long id) {
        TeacherResponseDto teacher = teacherService.getTeacherById(id);
        return ResponseEntity.ok(ApiResponse.<TeacherResponseDto>builder()
                .success(true)
                .message("Teacher retrieved successfully")
                .data(teacher)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<TeacherResponseDto>>> searchTeachers(@RequestParam String keyword) {
        List<TeacherResponseDto> teachers = teacherService.searchTeachers(keyword);
        return ResponseEntity.ok(ApiResponse.<List<TeacherResponseDto>>builder()
                .success(true)
                .message("Teachers retrieved successfully")
                .data(teachers)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TeacherResponseDto>> updateTeacher(@PathVariable Long id, @Valid @RequestBody TeacherRequestDto teacherRequestDto) {
        TeacherResponseDto teacher = teacherService.updateTeacher(id, teacherRequestDto);
        return ResponseEntity.ok(ApiResponse.<TeacherResponseDto>builder()
                .success(true)
                .message("Teacher updated successfully")
                .data(teacher)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Teacher deleted successfully")
                .build());
    }
}
