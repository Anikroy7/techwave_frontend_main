import { FaEdit, FaCreditCard, FaUsers, FaPen, FaList } from "react-icons/fa";

export const userMenuItems = [
  {
    path: "myPosts",
    label: "My Posts",
    icon: <FaEdit className="h-5 w-5" />,
  },
  {
    path: "followingActivity",
    label: "Following Activity",
    icon: <FaList className="h-5 w-5" />,
  },
  {
    path: "paymentDetails",
    label: "Payments",
    icon: <FaCreditCard className="h-5 w-5" />,
  },
];

// Import the icons you want to use

export const adminMenuItems = [
  {
    path: "manageUsers",
    label: "Manage Users",
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    path: "managePosts",
    label: "Manage Posts",
    icon: <FaPen className="h-5 w-5" />,
  },
  {
    path: "managePayments",
    label: "Manage Payments",
    icon: <FaCreditCard className="h-5 w-5" />,
  },
];
