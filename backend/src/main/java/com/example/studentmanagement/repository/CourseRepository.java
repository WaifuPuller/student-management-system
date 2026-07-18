package com.example.studentmanagement.repository;

import com.example.studentmanagement.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCourseNameContainingIgnoreCaseOrCourseCodeContainingIgnoreCaseOrTeacherTeacherNameContainingIgnoreCase(String courseName, String courseCode, String teacherName);
    boolean existsByCourseCode(String courseCode);
    List<Course> findByTeacherId(Long teacherId);
}
