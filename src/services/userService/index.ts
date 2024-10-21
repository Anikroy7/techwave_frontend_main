"use server";

import { cookies } from "next/headers";

export const updateFollowers = async (followData: {
  userId: string;
  followingId: string;
  type?: "add" | "delete";
}) => {
  const url = `http://localhost:5000/api/users/${followData.type}-followers`;

  delete followData.type;
  const refreshToken = cookies().get("refreshToken");

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(followData),
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

export const getMyInfo = async () => {
  // console.log(process.env.NEXT_PUBLIC_BASE_API, 'sdfgasdf')
  const url = `http://localhost:5000/api/users/me`;
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

export const getAllUsers = async () => {
  const res = await fetch(`http://localhost:5000/api/users`);

  return await res.json();
};

/* export const updateUser = async (
    userData: FieldValues
) => {

    const url = `http://localhost:5000/api/users/me`;
    const accessToken = cookies().get('accessToken');
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${accessToken?.value}`
            },
            body: JSON.stringify(userData),
        });
        const result = await res.json();

        return result;
    } catch (error: any) {
        throw new Error(error);
    }
}; */
