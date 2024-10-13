import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}


export type TPost = {
  _id: string
  body: string;
  attachments?: string[];
  category: string;
  comments: { id: number; text: string; user: { id: number; name: string } }[];
  upvote: string[];
  downvote: string[];
  user: { _id: string; name: string; profileImage?: string };
  isDeleted: boolean;
};