import { FaEdit, FaCreditCard, FaUsers, FaPen, FaList } from "react-icons/fa";

export const userMenuItems = [
  {
    path: "my-posts",
    label: "My Posts",
    icon: <FaEdit className="h-5 w-5" />,
  },
  {
    path: "following-activity",
    label: "Following Activity",
    icon: <FaList className="h-5 w-5" />,
  },
  {
    path: "payment-details",
    label: "Payments",
    icon: <FaCreditCard className="h-5 w-5" />,
  },
];

// Import the icons you want to use

export const adminMenuItems = [
  {
    path: "manage-users",
    label: "Manage Users",
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    path: "manage-posts",
    label: "Manage Posts",
    icon: <FaPen className="h-5 w-5" />,
  },
  {
    path: "manage-payments",
    label: "Manage Payments",
    icon: <FaCreditCard className="h-5 w-5" />,
  },
];
