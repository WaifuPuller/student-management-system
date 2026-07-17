package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.ApiResponse;
import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;
import com.example.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<ApiResponse<StudentResponseDto>> createStudent(@Valid @RequestBody StudentRequestDto studentRequestDto) {
        StudentResponseDto student = studentService.createStudent(studentRequestDto);
        return new ResponseEntity<>(ApiResponse.<StudentResponseDto>builder()
                .success(true)
                .message("Student created successfully")
                .data(student)
                .build(), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentResponseDto>>> getAllStudents() {
        List<StudentResponseDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(ApiResponse.<List<StudentResponseDto>>builder()
                .success(true)
                .message("Students retrieved successfully")
                .data(students)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponseDto>> getStudentById(@PathVariable Long id) {
        StudentResponseDto student = studentService.getStudentById(id);
        return ResponseEntity.ok(ApiResponse.<StudentResponseDto>builder()
                .success(true)
                .message("Student retrieved successfully")
                .data(student)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<StudentResponseDto>>> searchStudents(@RequestParam String name) {
        List<StudentResponseDto> students = studentService.searchStudents(name);
        return ResponseEntity.ok(ApiResponse.<List<StudentResponseDto>>builder()
                .success(true)
                .message("Students retrieved successfully")
                .data(students)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponseDto>> updateStudent(@PathVariable Long id, @Valid @RequestBody StudentRequestDto studentRequestDto) {
        StudentResponseDto student = studentService.updateStudent(id, studentRequestDto);
        return ResponseEntity.ok(ApiResponse.<StudentResponseDto>builder()
                .success(true)
                .message("Student updated successfully")
                .data(student)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Student deleted successfully")
                .build());
    }
}
