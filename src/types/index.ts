import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IInput = {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
};
export type TUser = {
  _id:string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  // dateOfBirth: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  isDeleted: boolean;
  followers: TUser[];
  following: TUser[];
  posts: TPost[];
};

// export type TComment = { id: number; text: string; user: { id: number; name: string } }
export type TComment = {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
    profileImage?: string;

  };
  post: string;
  isDeleted: boolean;
};

export type TPost = {
  _id: string;
  body: string;
  attachments?: string[];
  category: string;
  comments: TComment[];
  upvote: string[];
  downvote: string[];
  user: {
    _id: string; name: string; profileImage?: string, followers: string[]
    following: string[],
    isVerified:boolean
  };
  createdAt:string;
  isDeleted: boolean;
};


export type TOrder = {
  user: TUser;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  transactionId: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
};