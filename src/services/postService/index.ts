"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createPost = async (postData: FieldValues) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `https://techwave-backend-six.vercel.app/api/posts`;

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
  const url = `https://techwave-backend-six.vercel.app/api/posts/my-posts?userId=${userData.userId}`;

  try {
    const res = await fetch(url);
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllposts = async () => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `https://techwave-backend-six.vercel.app/api/posts`;

  try {
    const res = await fetch(url);
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getSinglePost = async (postId: string) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `https://techwave-backend-six.vercel.app/api/posts/${postId}`;
  const accessToken = cookies().get('accessToken')?.value
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
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
  const url = `https://techwave-backend-six.vercel.app/api/posts/${postId}`;

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

export const updatePost = async (
  postId: string,
  postData: FieldValues
) => {

  const url = `https://techwave-backend-six.vercel.app/api/posts/${postId}`;

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
  const url = `https://techwave-backend-six.vercel.app/api/posts/${postId}`;

  try {
    const res = await fetch(url, {
      method: "DELETE"
    });
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};
