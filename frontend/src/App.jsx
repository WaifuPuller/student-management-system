import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import StudentDetails from './pages/StudentDetails';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import CourseList from './pages/CourseList';
import CourseForm from './pages/CourseForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/new" element={<StudentForm />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="students/:id/edit" element={<StudentForm />} />
        <Route path="teachers" element={<TeacherList />} />
        <Route path="teachers/new" element={<TeacherForm />} />
        <Route path="teachers/:id/edit" element={<TeacherForm />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="courses/new" element={<CourseForm />} />
        <Route path="courses/:id/edit" element={<CourseForm />} />
      </Route>
    </Routes>
  );
}

export default App;
