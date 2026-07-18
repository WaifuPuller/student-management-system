import React, { useEffect, useState } from 'react';
import { studentService, teacherService, courseService } from '../services/apiService';
import { FaUsers, FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studentsRes, teachersRes, coursesRes] = await Promise.all([
                    studentService.getAllStudents(),
                    teacherService.getAllTeachers(),
                    courseService.getAllCourses()
                ]);
                
                if (studentsRes.success) setTotalStudents(studentsRes.data.length);
                if (teachersRes.success) setTotalTeachers(teachersRes.data.length);
                if (coursesRes.success) setTotalCourses(coursesRes.data.length);
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 text-2xl">
                        <FaUsers />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase font-semibold">Total Students</p>
                        <p className="text-3xl font-bold text-gray-800">{totalStudents}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-green-100 rounded-full text-green-600 text-2xl">
                        <FaChalkboardTeacher />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase font-semibold">Total Teachers</p>
                        <p className="text-3xl font-bold text-gray-800">{totalTeachers}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600 text-2xl">
                        <FaBook />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase font-semibold">Total Courses</p>
                        <p className="text-3xl font-bold text-gray-800">{totalCourses}</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center space-y-4 hover:shadow-lg transition-shadow">
                     <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2"><FaUserGraduate className="text-indigo-500"/> Quick Actions</h3>
                     <div className="flex flex-col space-y-2">
                        <Link to="/students/new" className="text-center py-2 px-4 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition">Add New Student</Link>
                        <Link to="/students" className="text-center py-2 px-4 bg-white border border-indigo-600 text-indigo-600 rounded shadow hover:bg-indigo-50 transition">View All Students</Link>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
