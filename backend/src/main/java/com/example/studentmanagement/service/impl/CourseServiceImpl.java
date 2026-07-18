package com.example.studentmanagement.service.impl;

import com.example.studentmanagement.dto.CourseRequestDto;
import com.example.studentmanagement.dto.CourseResponseDto;
import com.example.studentmanagement.entity.Course;
import com.example.studentmanagement.entity.Teacher;
import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.repository.CourseRepository;
import com.example.studentmanagement.repository.TeacherRepository;
import com.example.studentmanagement.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;

    @Override
    public CourseResponseDto createCourse(CourseRequestDto dto) {
        if (courseRepository.existsByCourseCode(dto.getCourseCode())) {
            throw new IllegalArgumentException("Course code already exists");
        }

        Teacher teacher = teacherRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + dto.getTeacherId()));

        Course course = Course.builder()
                .courseName(dto.getCourseName())
                .courseCode(dto.getCourseCode())
                .credits(dto.getCredits())
                .teacher(teacher)
                .build();

        Course savedCourse = courseRepository.save(course);
        return mapToResponseDto(savedCourse);
    }

    @Override
    public CourseResponseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return mapToResponseDto(course);
    }

    @Override
    public List<CourseResponseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseResponseDto> searchCourses(String keyword) {
        return courseRepository.findByCourseNameContainingIgnoreCaseOrCourseCodeContainingIgnoreCaseOrTeacherTeacherNameContainingIgnoreCase(keyword, keyword, keyword).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<CourseResponseDto> getCoursesByTeacherId(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId).stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResponseDto updateCourse(Long id, CourseRequestDto dto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        if (!course.getCourseCode().equals(dto.getCourseCode()) && courseRepository.existsByCourseCode(dto.getCourseCode())) {
            throw new IllegalArgumentException("Course code already exists");
        }

        Teacher teacher = teacherRepository.findById(dto.getTeacherId())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + dto.getTeacherId()));

        course.setCourseName(dto.getCourseName());
        course.setCourseCode(dto.getCourseCode());
        course.setCredits(dto.getCredits());
        course.setTeacher(teacher);

        Course updatedCourse = courseRepository.save(course);
        return mapToResponseDto(updatedCourse);
    }

    @Override
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        if (course.getStudents() != null && !course.getStudents().isEmpty()) {
            throw new IllegalArgumentException("Cannot delete course because there are students enrolled in it.");
        }

        courseRepository.deleteById(id);
    }

    private CourseResponseDto mapToResponseDto(Course course) {
        return CourseResponseDto.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .courseCode(course.getCourseCode())
                .credits(course.getCredits())
                .teacherId(course.getTeacher().getId())
                .teacherName(course.getTeacher().getTeacherName())
                .build();
    }
}
