import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaGraduationCap, FaHome, FaUsers, FaPlus } from 'react-icons/fa';

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-800 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold flex items-center space-x-2 border-b border-indigo-700">
                    <FaGraduationCap />
                    <span>StudentSys</span>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
                        <FaHome />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/students" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
                        <FaUsers />
                        <span>Students List</span>
                    </Link>
                    <Link to="/students/new" className="flex items-center space-x-2 p-2 hover:bg-indigo-700 rounded transition-colors">
                        <FaPlus />
                        <span>Add Student</span>
                    </Link>
                </nav>
                <div className="p-4 text-sm text-indigo-300 border-t border-indigo-700">
                    &copy; 2026 Student Management System 
                    Built by Aaditya Singh
                    2411CS020003
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
                    <h2 className="text-xl font-semibold text-gray-800">Student Management System</h2>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
