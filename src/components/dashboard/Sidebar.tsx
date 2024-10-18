"use client"
import { FaHome, FaTachometerAlt } from 'react-icons/fa';
import { adminMenuItems, userMenuItems } from '@/src/config/dashboardMenu';
import Link from 'next/link';
import React from 'react';
import { useUser } from '@/src/context/user.provider';
import Loading from '../UI/Loading';

const Sidebar = () => {
    const { user, isLoading } = useUser();

    return (
        <div className="flex flex-col w-64 h-screen bg-gray-800 text-white shadow-lg">
            {isLoading && <Loading />}
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 mt-4">
                <ul className="space-y-2">
                    <li>
                        <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                            <FaTachometerAlt className="h-5 w-5" />
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </li>
                    {
                        user?.role === 'admin' ? adminMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.path} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            </li>
                        )) : userMenuItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.path} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Link href="/" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                    <FaHome className="h-5 w-5" />
                    <span className="ml-2">Back to home</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
