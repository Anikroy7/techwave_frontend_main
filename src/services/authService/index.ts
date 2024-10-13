"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

/* export const signupUser = async (userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData);

      if (data.success) {
        cookies().set("accessToken", data?.data?.accessToken);
        cookies().set("refreshToken", data?.data?.refreshToken);
      }

      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }; */

export const signupUser = async (userData: FieldValues) => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `http://localhost:5000/api/auth/signup`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    // const result = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  const url = `http://localhost:5000/api/auth/signin`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result?.success) {
      cookies().set("accessToken", result?.accessToken);
      cookies().set("refreshToken", result?.refreshToken);
    }

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUser = async (userData: FieldValues) => {
  const url = `http://localhost:5000/api/users/me`;
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.message) {
      const res = await fetch("http://localhost:5000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `Bearer ${refreshToken?.value}`,
        },
        body: JSON.stringify({}),
      });
      const refreshResponse = await res.json();

      if (refreshResponse?.data) {
        cookies().set("accessToken", refreshResponse?.data?.accessToken);
      }
      // console.log('refreshResponse', refreshResponse)
    }

    return result;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    // console.log('decodedToken', decodedToken)
    return {
      userId: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
      profileImage: decodedToken.profileImage,
      name: decodedToken.name,
      followers: decodedToken.followers,
      following: decodedToken.following,
      posts: decodedToken.posts,
      phone: decodedToken.phone,
      address: decodedToken.address,
    };
  }

  return decodedToken;
};
