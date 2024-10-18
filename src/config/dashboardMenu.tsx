
import { FaUser, FaChartLine, FaEdit, FaCreditCard, FaUsers, FaPen, FaList } from 'react-icons/fa';

export const userMenuItems = [
    {
        path: '/dashboard/profile',
        label: 'Profile',
        icon: <FaUser className="h-5 w-5" />,
    },
    {
        path: '/dashboard/analytics',
        label: 'Analytics',
        icon: <FaChartLine className="h-5 w-5" />,
    },
    {
        path: '/dashboard/my-posts',
        label: 'My Posts',
        icon: <FaEdit className="h-5 w-5" />,
    },
    {
        path: '/dashboard/following',
        label: 'Following Activity',
        icon: <FaList className="h-5 w-5" />,
    },
    {
        path: '/dashboard/payments',
        label: 'Payments',
        icon: <FaCreditCard className="h-5 w-5" />,
    },
];

// Import the icons you want to use

export const adminMenuItems = [
    {
        path: '/admin/manage-users',
        label: 'Manage Users',
        icon: <FaUsers className="h-5 w-5" />
    },
    {
        path: '/admin/manage-posts',
        label: 'Manage Posts',
        icon: <FaPen className="h-5 w-5" />
    },
    {
        path: '/admin/manage-payments',
        label: 'Manage Payments',
        icon: <FaCreditCard className="h-5 w-5" />
    },
];
