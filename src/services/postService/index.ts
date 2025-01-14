"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { cookies } from "next/headers";
import { skip } from "node:test";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `http://localhost:5000/api/posts`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getMyposts = async (userData: FieldValues) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  // const url = `http://localhost:5000/api/posts/my-posts?userId=${userData.userId}`;

  try {
    const { data } = await axiosInstance.get("/posts/my-posts");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getAllposts = async (filters: FieldValues) => {
  try {
    const { data } = await axiosInstance.get(`/posts?limit=${filters.limit || 10}&page=${filters.page || ''}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getSinglePost = async (postId: string) => {
  const url = `http://localhost:5000/api/posts/${postId}`;
  const accessToken = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatePostVote = async (
  postId: string,
  voteType: string,
  votes: string[],
) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  let postData = null;

  if (voteType === "up") {
    postData = {
      upvote: votes,
    };
  }

  if (voteType == "down") {
    postData = {
      downvote: votes,
    };
  }
  const url = `http://localhost:5000/api/posts/${postId}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updatePost = async (postId: string, postData: FieldValues) => {
  const url = `http://localhost:5000/api/posts/${postId}`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePost = async ({ postId }: { postId: string }) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `http://localhost:5000/api/posts/${postId}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
