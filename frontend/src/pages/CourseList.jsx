import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/apiService';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async (keyword = '') => {
        try {
            setLoading(true);
            let res;
            if (keyword) {
                res = await courseService.searchCourses(keyword);
            } else {
                res = await courseService.getAllCourses();
            }
            if (res.success) {
                setCourses(res.data);
            }
        } catch (err) {
            setError('Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCourses(searchTerm);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const res = await courseService.deleteCourse(id);
                if (res.success) {
                    fetchCourses(searchTerm);
                }
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete course. Ensure no students are enrolled.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
                <Link to="/courses/new" className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
                    <FaPlus />
                    <span>Add Course</span>
                </Link>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex">
                <input
                    type="text"
                    placeholder="Search by course name, code or teacher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700 transition-colors flex items-center">
                    <FaSearch />
                </button>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-3 text-sm font-semibold text-gray-600">Course Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Course Code</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Credits</th>
                                <th className="p-3 text-sm font-semibold text-gray-600">Teacher</th>
                                <th className="p-3 text-sm font-semibold text-gray-600 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">No courses found</td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-3 font-medium text-gray-800">{course.courseName}</td>
                                        <td className="p-3 text-gray-600">{course.courseCode}</td>
                                        <td className="p-3 text-gray-600">{course.credits}</td>
                                        <td className="p-3 text-gray-600">{course.teacherName}</td>
                                        <td className="p-3 text-center space-x-3">
                                            <Link to={`/courses/${course.id}/edit`} className="text-blue-500 hover:text-blue-700 inline-block" title="Edit">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 inline-block" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseList;
