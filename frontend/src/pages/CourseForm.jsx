import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService, teacherService } from '../services/apiService';

const CourseForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        credits: '',
        teacherId: ''
    });
    
    const [teachers, setTeachers] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const teachersRes = await teacherService.getAllTeachers();
                if (teachersRes.success) {
                    setTeachers(teachersRes.data);
                }

                if (isEditMode) {
                    const courseRes = await courseService.getCourseById(id);
                    if (courseRes.success) {
                        setFormData({
                            courseName: courseRes.data.courseName,
                            courseCode: courseRes.data.courseCode,
                            credits: courseRes.data.credits,
                            teacherId: courseRes.data.teacherId
                        });
                    }
                }
            } catch (err) {
                setApiError('Failed to load required data');
            }
        };
        fetchInitialData();
    }, [id, isEditMode]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.courseName) tempErrors.courseName = 'Course Name is required';
        if (!formData.courseCode) tempErrors.courseCode = 'Course Code is required';
        if (!formData.credits) {
            tempErrors.credits = 'Credits are required';
        } else if (isNaN(formData.credits) || parseInt(formData.credits) <= 0) {
            tempErrors.credits = 'Credits must be a number greater than 0';
        }
        if (!formData.teacherId) tempErrors.teacherId = 'Teacher is required';
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        setApiError('');
        try {
            // ensure credits is a number
            const dataToSubmit = { ...formData, credits: parseInt(formData.credits) };
            
            let res;
            if (isEditMode) {
                res = await courseService.updateCourse(id, dataToSubmit);
            } else {
                res = await courseService.createCourse(dataToSubmit);
            }

            if (res.success) {
                navigate('/courses');
            } else {
                setApiError(res.message || 'An error occurred');
            }
        } catch (err) {
            setApiError(err.response?.data?.message || 'Server error occurred');
            if (err.response?.data?.data) {
                setErrors(err.response.data.data);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditMode ? 'Edit Course' : 'Add New Course'}
            </h1>

            {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.courseName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                        <input
                            type="text"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.courseCode ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.courseCode && <p className="text-red-500 text-xs mt-1">{errors.courseCode}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                        <input
                            type="number"
                            name="credits"
                            value={formData.credits}
                            onChange={handleChange}
                            min="1"
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.credits ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.credits && <p className="text-red-500 text-xs mt-1">{errors.credits}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                        <select
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500 ${errors.teacherId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map(t => (
                                <option key={t.id} value={t.id}>{t.teacherName} ({t.department})</option>
                            ))}
                        </select>
                        {errors.teacherId && <p className="text-red-500 text-xs mt-1">{errors.teacherId}</p>}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                    <button
                        type="button"
                        onClick={() => navigate('/courses')}
                        className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-4 py-2 border border-transparent rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {submitting ? 'Saving...' : 'Save Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseForm;
