import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { studentService } from '../services/apiService';
import { FaArrowLeft, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';

const StudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await studentService.getStudentById(id);
                if (res.success) {
                    setStudent(res.data);
                } else {
                    setError('Student not found');
                }
            } catch (err) {
                setError('Error loading student details');
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const res = await studentService.deleteStudent(id);
                if (res.success) {
                    navigate('/students');
                }
            } catch (err) {
                alert('Error deleting student');
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading student details...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!student) return null;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center space-x-4 mb-6">
                <Link to="/students" className="text-gray-500 hover:text-indigo-600 transition">
                    <FaArrowLeft className="text-xl" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Student Details</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-indigo-600 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-16 mb-6">
                        <div className="bg-white p-2 rounded-full shadow-lg">
                            <FaUserCircle className="text-8xl text-gray-300" />
                        </div>
                        <div className="space-x-3 mb-2">
                            <Link to={`/students/${student.id}/edit`} className="inline-flex items-center space-x-2 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-50 transition">
                                <FaEdit /> <span>Edit</span>
                            </Link>
                            <button onClick={handleDelete} className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                                <FaTrash /> <span>Delete</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                            <p className="text-indigo-600 font-medium">Student ID: #{student.id}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="text-gray-900 font-medium">{student.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="text-gray-900 font-medium">{student.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Academic Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Course / Program</p>
                                        <p className="text-gray-900 font-medium">{student.course}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Current Year</p>
                                        <p className="text-gray-900 font-medium">{student.year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
